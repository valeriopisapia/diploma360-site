// @vitest-environment node
import { it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'

beforeEach(() => { process.env.BREVO_API_KEY = 'k'; process.env.BREVO_LIST_ID = '7'; vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 201 }))) })

const post = (body: any) => POST(new Request('http://x/api/lead', { method: 'POST', body: JSON.stringify(body), headers: { 'content-type': 'application/json' } }))

it('400 when email or telefono missing', async () => {
  const r = await post({ email: '', telefono: '' }); expect(r.status).toBe(400)
})
it('200 no-op when honeypot filled', async () => {
  const r = await post({ email: 'a@b.it', telefono: '1', website: 'bot' })
  expect(r.status).toBe(200); expect(fetch).not.toHaveBeenCalled()
})
it('200 on valid lead', async () => {
  const r = await post({ email: 'a@b.it', telefono: '1', origine: 'vetrina' })
  expect(r.status).toBe(200); expect(fetch).toHaveBeenCalledOnce()
})
it('400 on malformed (non-JSON) body', async () => {
  const r = await POST(new Request('http://x/api/lead', { method: 'POST', body: '{bad', headers: { 'content-type': 'application/json' } }))
  expect(r.status).toBe(400)
  const json = await r.json()
  expect(json.error).toBe('Corpo della richiesta non valido')
  expect(fetch).not.toHaveBeenCalled()
})
it('500 when BREVO_API_KEY is missing', async () => {
  delete process.env.BREVO_API_KEY
  const r = await post({ email: 'a@b.it', telefono: '1' })
  expect(r.status).toBe(500)
  expect(fetch).not.toHaveBeenCalled()
})
it('returns generic error when Brevo fails', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response('internal brevo error', { status: 500 })))
  const r = await post({ email: 'a@b.it', telefono: '1' })
  expect(r.status).toBe(500)
  const json = await r.json()
  expect(json.error).toBe('Brevo ha rifiutato la richiesta')
  expect(json.error).not.toContain('brevo error')
})
