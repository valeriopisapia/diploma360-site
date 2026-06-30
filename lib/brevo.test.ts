// @vitest-environment node
import { it, expect, vi } from 'vitest'
import { createBrevoContact } from './brevo'

const env = { apiKey: 'k', listId: '7' }

it('maps payload to Brevo attributes and succeeds on 201', async () => {
  const fetchMock = vi.fn(async () => new Response(null, { status: 201 }))
  const res = await createBrevoContact(
    { email: 'a@b.it', telefono: '333', nome: 'Ada', per_chi: 'Per me', pagina: '/lp', origine: 'landing-ads' },
    env, fetchMock as any)
  expect(res.ok).toBe(true)
  const body = JSON.parse((fetchMock.mock.calls[0][1] as any).body)
  expect(body.listIds).toEqual([7])
  expect(body.attributes).toMatchObject({ NOME: 'Ada', SMS: '333', PER_CHI: 'Per me', PAGINA_ARRIVO: '/lp', ORIGINE: 'landing-ads' })
})

it('treats duplicate contact as success', async () => {
  const fetchMock = vi.fn(async () => new Response('{"code":"duplicate_parameter"}', { status: 400 }))
  const res = await createBrevoContact({ email: 'a@b.it', telefono: '1' }, env, fetchMock as any)
  expect(res.ok).toBe(true)
})

it('reports real Brevo errors', async () => {
  const fetchMock = vi.fn(async () => new Response('boom', { status: 500 }))
  const res = await createBrevoContact({ email: 'a@b.it', telefono: '1' }, env, fetchMock as any)
  expect(res.ok).toBe(false)
})
