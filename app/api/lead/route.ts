import { createBrevoContact, LeadPayload } from '@/lib/brevo'
import { brand } from '@/lib/brand'
import { checkRateLimit, clientIp, isAllowedOrigin, validateLead } from '@/lib/leadGuard'

export const runtime = 'nodejs'

/** Upper bound for the raw JSON body: the real form sends well under 10 KB. */
const MAX_BODY_BYTES = 32 * 1024

/**
 * Extract only Brevo's machine-readable error `code` (e.g. "invalid_parameter").
 * The body/message can echo contact data (email, phone), so it is never logged.
 */
function brevoErrorCode(text: string): string {
  try {
    const code = (JSON.parse(text) as { code?: unknown })?.code
    if (typeof code === 'string' && /^[a-z_]{1,64}$/i.test(code)) return code
  } catch {
    // not JSON
  }
  return 'unknown'
}

export async function POST(req: Request) {
  // Reject cross-site browser submissions (only when an Origin header is present).
  if (!isAllowedOrigin(req)) {
    return Response.json({ error: 'Origine della richiesta non consentita' }, { status: 403 })
  }

  // Best-effort per-IP speed bump (per instance, in memory).
  if (!checkRateLimit(clientIp(req))) {
    return Response.json(
      { error: 'Troppe richieste, riprova tra qualche minuto' },
      { status: 429, headers: { 'retry-after': '600' } },
    )
  }

  let body: unknown
  try {
    const raw = await req.text()
    if (raw.length > MAX_BODY_BYTES) {
      return Response.json({ error: 'Corpo della richiesta non valido' }, { status: 413 })
    }
    body = JSON.parse(raw)
  } catch {
    return Response.json({ error: 'Corpo della richiesta non valido' }, { status: 400 })
  }

  // Honeypot: bot filled the hidden field — silently succeed, do not call Brevo
  if (typeof body === 'object' && body !== null && (body as Record<string, unknown>).website) {
    return Response.json({ ok: true })
  }

  const v = validateLead(body)
  if (!v.ok) {
    return Response.json({ error: v.error }, { status: 400 })
  }
  const lead = v.lead

  // Check required env vars
  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_LIST_ID
  if (!apiKey || !listId) {
    return Response.json({ error: 'Brevo non configurato (manca BREVO_API_KEY o BREVO_LIST_ID)' }, { status: 500 })
  }

  const payload: LeadPayload = {
    nome: lead.nome,
    telefono: lead.telefono,
    email: lead.email,
    per_chi: lead.per_chi,
    messaggio: lead.messaggio,
    pagina: lead.pagina,
    origine: lead.origine,
    ts: lead.ts,
    // Server-authoritative: the brand of THIS deployment, not client-supplied.
    brand: brand.name,
    // Client-supplied but restricted to the known products (validateLead);
    // defaults to Diploma for forms that don't pass it.
    prodotto: lead.prodotto,
  }
  const result = await createBrevoContact(payload, { apiKey, listId })

  if (result.ok) {
    return Response.json({ ok: true })
  }

  const httpStatus = result.status >= 400 ? result.status : 502
  // Status + code only: the Brevo response body may contain personal data.
  console.error(
    `Brevo error: status=${result.status} code=${result.status === 0 ? 'network' : brevoErrorCode(result.error)}`,
  )
  return Response.json({ error: 'Brevo ha rifiutato la richiesta' }, { status: httpStatus })
}
