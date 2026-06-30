import { createBrevoContact, LeadPayload } from '@/lib/brevo'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  const body = await req.json()
  const { nome, telefono, email, per_chi, messaggio, pagina, origine, ts, website } = body

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

  const payload: LeadPayload = { nome, telefono, email, per_chi, messaggio, pagina, origine, ts }
  const result = await createBrevoContact(payload, { apiKey, listId })

  if (result.ok) {
    return Response.json({ ok: true })
  }

  const httpStatus = result.status >= 400 ? result.status : 502
  return Response.json({ error: result.error }, { status: httpStatus })
}
