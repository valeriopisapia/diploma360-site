import { createBrevoContact, LeadPayload } from '@/lib/brevo'
import { brand } from '@/lib/brand'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  let body: Record<string, unknown>
  try { body = await req.json() }
  catch { return Response.json({ error: 'Corpo della richiesta non valido' }, { status: 400 }) }
  const { nome, telefono, email, per_chi, messaggio, pagina, origine, ts, website, prodotto } = body

  // Honeypot: bot filled the hidden field — silently succeed, do not call Brevo
  if (website) {
    return Response.json({ ok: true })
  }

  // Validation: email and telefono are required
  if (!email || !telefono) {
    return Response.json({ error: 'Email e telefono sono obbligatori' }, { status: 400 })
  }

  // Check required env vars
  const apiKey = process.env.BREVO_API_KEY
  const listId = process.env.BREVO_LIST_ID
  if (!apiKey || !listId) {
    return Response.json({ error: 'Brevo non configurato (manca BREVO_API_KEY o BREVO_LIST_ID)' }, { status: 500 })
  }

  // Values are validated/trusted above; cast from unknown to the expected string types
  const payload: LeadPayload = {
    nome: nome as string | undefined,
    telefono: telefono as string,
    email: email as string,
    per_chi: per_chi as string | undefined,
    messaggio: messaggio as string | undefined,
    pagina: pagina as string | undefined,
    origine: origine as string | undefined,
    ts: ts as string | undefined,
    // Server-authoritative: the brand of THIS deployment, not client-supplied.
    brand: brand.name,
    // Client-supplied: which product the form belongs to (defaults to Diploma
    // for existing forms that don't pass it).
    prodotto: (prodotto as string | undefined) ?? 'Diploma',
  }
  const result = await createBrevoContact(payload, { apiKey, listId })

  if (result.ok) {
    return Response.json({ ok: true })
  }

  const httpStatus = result.status >= 400 ? result.status : 502
  console.error('Brevo error:', result.error)
  return Response.json({ error: 'Brevo ha rifiutato la richiesta' }, { status: httpStatus })
}
