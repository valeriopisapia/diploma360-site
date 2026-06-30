// @vitest-environment node
import { describe, it, expect, vi, beforeEach } from 'vitest'
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
