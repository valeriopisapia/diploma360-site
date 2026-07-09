// @vitest-environment node
import { it, expect, vi } from 'vitest'
import { createBrevoContact } from './brevo'

const env = { apiKey: 'k', listId: '7' }

it('maps payload to Brevo attributes and succeeds on 201', async () => {
  const fetchMock = vi.fn(async () => new Response(null, { status: 201 }))
  const res = await createBrevoContact(
    { email: 'a@b.it', telefono: '333', nome: 'Ada', per_chi: 'Per me', pagina: '/lp', origine: 'landing-ads', brand: 'La Scuola360', prodotto: 'Ripetizioni' },
    env, fetchMock as any)
  expect(res.ok).toBe(true)
  const body = JSON.parse((fetchMock.mock.calls[0][1] as any).body)
  expect(body.listIds).toEqual([7])
  expect(body.attributes).toMatchObject({ NOME: 'Ada', TELEFONO: '333', PER_CHI: 'Per me', PAGINA_ARRIVO: '/lp', ORIGINE: 'landing-ads', BRAND: 'La Scuola360' })
  expect(body.attributes.PRODOTTO).toBe('Ripetizioni')
})

it('also populates the native SMS field for a bare Italian mobile (E.164)', async () => {
  const fetchMock = vi.fn(async () => new Response(null, { status: 201 }))
  const res = await createBrevoContact(
    { email: 'a@b.it', telefono: '3451168611' }, env, fetchMock as any)
  expect(res.ok).toBe(true)
  const body = JSON.parse((fetchMock.mock.calls[0][1] as any).body)
  expect(body.attributes.TELEFONO).toBe('3451168611') // raw kept
  expect(body.attributes.SMS).toBe('+393451168611')   // normalised
})

it('keeps an already-E.164 number as-is in SMS', async () => {
  const fetchMock = vi.fn(async () => new Response(null, { status: 201 }))
  await createBrevoContact({ email: 'a@b.it', telefono: '+393496013212' }, env, fetchMock as any)
  const body = JSON.parse((fetchMock.mock.calls[0][1] as any).body)
  expect(body.attributes.SMS).toBe('+393496013212')
})

it('omits SMS when the number is not a confident mobile (never risk a 400)', async () => {
  const fetchMock = vi.fn(async () => new Response(null, { status: 201 }))
  await createBrevoContact({ email: 'a@b.it', telefono: '06 8428 0999' }, env, fetchMock as any)
  const body = JSON.parse((fetchMock.mock.calls[0][1] as any).body)
  expect(body.attributes.SMS).toBeUndefined()
  expect(body.attributes.TELEFONO).toBe('06 8428 0999')
})

it('retries without SMS (never loses the lead) when Brevo rejects the phone', async () => {
  const fetchMock = vi.fn()
    .mockResolvedValueOnce(new Response('{"code":"invalid_parameter","message":"Invalid phone number"}', { status: 400 }))
    .mockResolvedValueOnce(new Response(null, { status: 201 }))
  const res = await createBrevoContact({ email: 'a@b.it', telefono: '3451168611' }, env, fetchMock as any)
  expect(res.ok).toBe(true)
  expect(fetchMock).toHaveBeenCalledTimes(2)
  const retryBody = JSON.parse((fetchMock.mock.calls[1][1] as any).body)
  expect(retryBody.attributes.SMS).toBeUndefined()      // dropped on retry
  expect(retryBody.attributes.TELEFONO).toBe('3451168611') // number still saved
})

it('does NOT swallow an SMS-uniqueness collision — retries without SMS so the lead is saved', async () => {
  // Brevo's SMS field is a UNIQUE identifier: a number already tied to another
  // contact fails the whole create with duplicate_parameter and NOTHING is saved.
  // The old code treated that as success (200) and silently dropped the lead.
  const collision = new Response(
    '{"code":"duplicate_parameter","message":"Unable to update contact, SMS is already associated with another Contact","metadata":{"duplicate_identifiers":["SMS"]}}',
    { status: 400 })
  const fetchMock = vi.fn()
    .mockResolvedValueOnce(collision)
    .mockResolvedValueOnce(new Response(null, { status: 201 }))
  const res = await createBrevoContact({ email: 'new@b.it', telefono: '3451168611' }, env, fetchMock as any)
  expect(res.ok).toBe(true)
  expect(fetchMock).toHaveBeenCalledTimes(2)                 // retried, not swallowed
  const retryBody = JSON.parse((fetchMock.mock.calls[1][1] as any).body)
  expect(retryBody.attributes.SMS).toBeUndefined()           // dropped on retry
  expect(retryBody.attributes.TELEFONO).toBe('3451168611')   // number still saved
})

it('treats an already-existing contact (no SMS) as success', async () => {
  // No SMS in the payload (telefono not a mobile) → no retry → a duplicate here
  // is a genuine already-exists that updateEnabled has updated.
  const fetchMock = vi.fn(async () => new Response('{"code":"duplicate_parameter"}', { status: 400 }))
  const res = await createBrevoContact({ email: 'a@b.it', telefono: '1' }, env, fetchMock as any)
  expect(res.ok).toBe(true)
})

it('reports real Brevo errors', async () => {
  const fetchMock = vi.fn(async () => new Response('boom', { status: 500 }))
  const res = await createBrevoContact({ email: 'a@b.it', telefono: '1' }, env, fetchMock as any)
  expect(res.ok).toBe(false)
})
