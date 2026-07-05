export type LeadPayload = {
  nome?: string
  telefono: string
  email: string
  per_chi?: string
  messaggio?: string
  pagina?: string
  origine?: string
  ts?: string
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

    // If the request failed only because of the extra native SMS field, retry
    // once without it — TELEFONO still carries the number, so the lead survives.
    if (!r.ok && sms) {
      const firstText = await r.text()
      if (isDuplicate(firstText)) return { ok: true }
      r = await post(baseAttributes)
    }

    if (r.ok) {
      return { ok: true }
    }

    const text = await r.text()
    if (isDuplicate(text)) {
      return { ok: true }
    }

    return { ok: false, status: r.status, error: text }
  } catch (e) {
    return { ok: false, status: 0, error: String(e) }
  }
}
