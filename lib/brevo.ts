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

export async function createBrevoContact(
  p: LeadPayload,
  env: BrevoEnv,
  fetchImpl: typeof fetch = globalThis.fetch
): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  try {
    const r = await fetchImpl('https://api.brevo.com/v3/contacts', {
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
        attributes: {
          NOME: p.nome,
          TELEFONO: p.telefono,
          PER_CHI: p.per_chi,
          MESSAGGIO: p.messaggio,
          PAGINA_ARRIVO: p.pagina,
          ORIGINE: p.origine,
          DATA_RICHIESTA: p.ts,
        },
      }),
    })

    if (r.ok) {
      return { ok: true }
    }

    const text = await r.text()
    if (/duplicate_parameter|Contact already exist/i.test(text)) {
      return { ok: true }
    }

    return { ok: false, status: r.status, error: text }
  } catch (e) {
    return { ok: false, status: 0, error: String(e) }
  }
}
