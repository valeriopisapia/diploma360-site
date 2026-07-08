export type LeadPayload = {
  nome?: string
  telefono: string
  email: string
  per_chi?: string
  messaggio?: string
  pagina?: string
  origine?: string
  ts?: string
  /** Brand that produced the lead (e.g. "Diploma360" / "La Scuola360") — set
   *  server-side, distinguishes brands that share one Brevo list. */
  brand?: string
  /** Product the lead is for (e.g. "Diploma" / "Ripetizioni") — client-supplied
   *  by the form, distinguishes products that share one Brevo list. */
  prodotto?: string
}

type BrevoEnv = { apiKey: string; listId: string }

/**
 * Normalise a phone number to E.164 for Brevo's NATIVE `SMS` field (the one
 * shown in the contact card and used for SMS/WhatsApp campaigns). Returns null
 * when the value isn't confidently a valid mobile — the caller then omits SMS
 * and relies on the always-safe `TELEFONO` text attribute, which holds the raw
 * number regardless.
 *
 * Conservative on purpose: Brevo E.164-validates SMS and a wrong guess would
 * 400 the whole request. So we only emit SMS for cases we're sure about:
 *   - already-E.164 (`+…`, 8–15 digits) → kept as-is
 *   - a bare 10-digit Italian mobile (starts with 3, e.g. 345 116 8611) → +39…
 *   - anything else (landline, partial, foreign-without-+) → null (SMS omitted)
 */
export function toE164Mobile(raw: string): string | null {
  const v = raw.trim()
  if (v.startsWith('+')) {
    const digits = v.slice(1).replace(/\D/g, '')
    return digits.length >= 8 && digits.length <= 15 ? '+' + digits : null
  }
  const digits = v.replace(/\D/g, '')
  if (digits.length === 10 && digits.startsWith('3')) return '+39' + digits
  return null
}

export async function createBrevoContact(
  p: LeadPayload,
  env: BrevoEnv,
  fetchImpl: typeof fetch = globalThis.fetch
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  // `TELEFONO` (text) always holds the raw number and never fails validation.
  // `SMS` is the native, E.164-validated field — populate it only when we can
  // normalise confidently (see toE164Mobile), and drop it on a phone rejection
  // so a bad guess can never lose the lead.
  const baseAttributes = {
    NOME: p.nome,
    TELEFONO: p.telefono,
    PER_CHI: p.per_chi,
    MESSAGGIO: p.messaggio,
    PAGINA_ARRIVO: p.pagina,
    ORIGINE: p.origine,
    DATA_RICHIESTA: p.ts,
    BRAND: p.brand,
    PRODOTTO: p.prodotto,
  }
  const sms = toE164Mobile(p.telefono)

  const post = (attributes: Record<string, unknown>) =>
    fetchImpl('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': env.apiKey,
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify({
        email: p.email,
        updateEnabled: true,
        listIds: [Number(env.listId)],
        attributes,
      }),
    })

  const isDuplicate = (text: string) =>
    /duplicate_parameter|Contact already exist/i.test(text)

  try {
    let r = await post(sms ? { ...baseAttributes, SMS: sms } : baseAttributes)

    // If the with-SMS attempt failed, retry once WITHOUT it. The native SMS field
    // is a UNIQUE identifier in Brevo: a number already tied to another contact
    // fails the whole request with `duplicate_parameter` and NOTHING is saved — so
    // this error must NOT be treated as success here (that would silently drop the
    // lead). Dropping SMS and retrying keeps the lead (TELEFONO still holds the
    // number); if the email genuinely already exists, updateEnabled updates it.
    if (!r.ok && sms) {
      await r.text().catch(() => {}) // drain the body before re-posting
      r = await post(baseAttributes)
    }

    if (r.ok) {
      return { ok: true }
    }

    // With no SMS in play, a remaining `duplicate` is a real already-exists that
    // updateEnabled has updated → success.
    const text = await r.text()
    if (isDuplicate(text)) {
      return { ok: true }
    }

    return { ok: false, status: r.status, error: text }
  } catch (e) {
    return { ok: false, status: 0, error: String(e) }
  }
}
