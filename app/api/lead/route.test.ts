// @vitest-environment node
import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { POST } from './route'
import { resetRateLimit } from '@/lib/leadGuard'
import { resolveBrand } from '@/lib/brand'
import { resetRecaptchaTokenCache } from '@/lib/recaptcha'

beforeEach(() => {
  process.env.BREVO_API_KEY = 'k'
  process.env.BREVO_LIST_ID = '7'
  delete process.env.LEAD_RATE_LIMIT_MAX
  for (const k of ['NEXT_PUBLIC_RECAPTCHA_SITE_KEY', 'RECAPTCHA_PROJECT_ID', 'RECAPTCHA_ENFORCE', 'RECAPTCHA_SCORE_THRESHOLD']) delete process.env[k]
  resetRateLimit()
  resetRecaptchaTokenCache()
  vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 201 })))
})
afterEach(() => {
  vi.restoreAllMocks()
})

const post = (body: unknown, headers: Record<string, string> = {}) =>
  POST(new Request('http://x/api/lead', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json', ...headers },
  }))

const D360_APEX = resolveBrand('diploma360').domain.replace('://www.', '://')

const VALID = { email: 'a@b.it', telefono: '3331234567', nome: 'Ada', origine: 'vetrina' }

const brevoBody = () =>
  JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string)

it('400 when email or telefono missing', async () => {
  const r = await post({ email: '', telefono: '' }); expect(r.status).toBe(400)
})
it('200 no-op when honeypot filled', async () => {
  const r = await post({ email: 'a@b.it', telefono: '1', website: 'bot' })
  expect(r.status).toBe(200); expect(fetch).not.toHaveBeenCalled()
})
it('200 on valid lead', async () => {
  const r = await post(VALID)
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
  const r = await post(VALID)
  expect(r.status).toBe(500)
  expect(fetch).not.toHaveBeenCalled()
})
it('returns generic error when Brevo fails', async () => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response('internal brevo error', { status: 500 })))
  const r = await post(VALID)
  expect(r.status).toBe(500)
  const json = await r.json()
  expect(json.error).toBe('Brevo ha rifiutato la richiesta')
  expect(json.error).not.toContain('brevo error')
})

// --- validation -----------------------------------------------------------

it('400 with {error} on a non-object JSON body', async () => {
  for (const b of [null, [1, 2], 'x', 42]) {
    const r = await post(b)
    expect(r.status).toBe(400)
    expect(typeof (await r.json()).error).toBe('string')
  }
  expect(fetch).not.toHaveBeenCalled()
})
it('400 on invalid email or phone', async () => {
  expect((await post({ ...VALID, email: 'not-an-email' })).status).toBe(400)
  expect((await post({ ...VALID, telefono: '333' })).status).toBe(400)
  expect((await post({ ...VALID, telefono: '33312abc67' })).status).toBe(400)
  expect(fetch).not.toHaveBeenCalled()
})
it('400 on non-string fields', async () => {
  expect((await post({ ...VALID, telefono: 3331234567 })).status).toBe(400)
  expect((await post({ ...VALID, nome: { a: 1 } })).status).toBe(400)
  expect(fetch).not.toHaveBeenCalled()
})
it('accepts every phone shape the client form accepts, raw value forwarded', async () => {
  for (const telefono of ['333123', '+393331234567', '123456789012345', ' 3331234567 ']) {
    vi.mocked(fetch).mockClear()
    const r = await post({ ...VALID, telefono })
    expect(r.status, telefono).toBe(200)
    expect(brevoBody().attributes.TELEFONO).toBe(telefono.trim())
  }
})
it('prodotto: defaults to Diploma, accepts Ripetizioni, rejects anything else', async () => {
  await post(VALID)
  expect(brevoBody().attributes.PRODOTTO).toBe('Diploma')
  vi.mocked(fetch).mockClear()
  await post({ ...VALID, prodotto: 'Ripetizioni' })
  expect(brevoBody().attributes.PRODOTTO).toBe('Ripetizioni')
  vi.mocked(fetch).mockClear()
  const r = await post({ ...VALID, prodotto: 'Hacked' })
  expect(r.status).toBe(400)
  expect(fetch).not.toHaveBeenCalled()
})
it('truncates an over-long messaggio instead of rejecting the lead', async () => {
  const r = await post({ ...VALID, messaggio: 'x'.repeat(20000) })
  expect(r.status).toBe(200)
  expect(brevoBody().attributes.MESSAGGIO).toHaveLength(5000)
})
it('413 on an oversized body', async () => {
  const r = await post({ ...VALID, messaggio: 'x'.repeat(40000) })
  expect(r.status).toBe(413)
  expect(fetch).not.toHaveBeenCalled()
})

// --- origin -----------------------------------------------------------------

it('accepts brand, hosted.app, localhost and same-origin Origins', async () => {
  for (const origin of [
    // diploma360 apex + www, derived from lib/brand.ts (no hardcoded brand host — see
    // test/no-hardcoded-brand.test.ts)
    D360_APEX,
    D360_APEX.replace('https://', 'https://www.'),
    'https://lascuola360.it',
    'https://www.lascuola360.it',
    'https://schoolr.net',
    'https://diploma360-site--schoolrcloud.us-east4.hosted.app',
    'http://localhost:3000',
  ]) {
    expect((await post(VALID, { origin })).status, origin).toBe(200)
  }
  expect((await post(VALID, { origin: 'https://preview.example', host: 'preview.example' })).status).toBe(200)
})
it('403 on a foreign Origin, without calling Brevo', async () => {
  const r = await post(VALID, { origin: 'https://evil.example' })
  expect(r.status).toBe(403)
  expect(typeof (await r.json()).error).toBe('string')
  expect(fetch).not.toHaveBeenCalled()
})

// --- rate limit ---------------------------------------------------------------

it('429 after too many requests from one IP; other IPs unaffected', async () => {
  process.env.LEAD_RATE_LIMIT_MAX = '2'
  const h = { 'x-forwarded-for': '203.0.113.7, 10.0.0.1' }
  expect((await post(VALID, h)).status).toBe(200)
  expect((await post(VALID, h)).status).toBe(200)
  const r = await post(VALID, h)
  expect(r.status).toBe(429)
  expect(typeof (await r.json()).error).toBe('string')
  expect((await post(VALID, { 'x-forwarded-for': '198.51.100.1' })).status).toBe(200)
})

// --- logging ------------------------------------------------------------------

it('logs only Brevo status and code, never the response body', async () => {
  const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
  vi.stubGlobal('fetch', vi.fn(async () =>
    new Response('{"code":"invalid_parameter","message":"a@b.it 3331234567 is bad"}', { status: 400 })))
  const r = await post(VALID)
  expect(r.status).toBe(400)
  const logged = spy.mock.calls.flat().join(' ')
  expect(logged).toContain('status=400')
  expect(logged).toContain('code=invalid_parameter')
  expect(logged).not.toContain('a@b.it')
  expect(logged).not.toContain('3331234567')
})

// --- reCAPTCHA ----------------------------------------------------------------

/** Brevo 201, metadata token, and a configurable assessments response. */
function stubGoogleAndBrevo(assessment: () => Response | Promise<Response>) {
  const f = vi.fn(async (url: string | URL | Request) => {
    const u = String(url)
    if (u.startsWith('http://metadata.google.internal/')) {
      return new Response(JSON.stringify({ access_token: 't', expires_in: 3600 }), { status: 200 })
    }
    if (u.startsWith('https://recaptchaenterprise.googleapis.com/')) return assessment()
    return new Response(null, { status: 201 }) // Brevo
  })
  vi.stubGlobal('fetch', f)
  return f
}
const brevoCalls = (f: ReturnType<typeof vi.fn>) => f.mock.calls.filter(c => String(c[0]).includes('api.brevo.com')).length
const score = (s: number, action = 'lead_submit') =>
  new Response(JSON.stringify({ tokenProperties: { valid: true, action }, riskAnalysis: { score: s } }), { status: 200 })

function enableCaptcha(enforce: boolean) {
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY = 'site-key'
  process.env.RECAPTCHA_PROJECT_ID = 'schoolrcloud'
  process.env.RECAPTCHA_ENFORCE = enforce ? 'true' : 'false'
}

it('reCAPTCHA not configured: no Google call, payload token ignored (today\'s behaviour)', async () => {
  const f = stubGoogleAndBrevo(() => score(0.9))
  const r = await post({ ...VALID, recaptcha_token: 'tok' })
  expect(r.status).toBe(200)
  expect(f).toHaveBeenCalledOnce()
  expect(brevoCalls(f)).toBe(1)
  expect(JSON.stringify(f.mock.calls[0][1])).not.toContain('tok')
})

it('reCAPTCHA enforced: good score passes, low score / missing token → 400 without Brevo', async () => {
  enableCaptcha(true)
  vi.spyOn(console, 'info').mockImplementation(() => {})
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})

  let f = stubGoogleAndBrevo(() => score(0.9))
  expect((await post({ ...VALID, recaptcha_token: 'tok' })).status).toBe(200)
  expect(brevoCalls(f)).toBe(1)

  f = stubGoogleAndBrevo(() => score(0.1))
  const low = await post({ ...VALID, recaptcha_token: 'tok' })
  expect(low.status).toBe(400)
  expect((await low.json()).error).toBe('Verifica di sicurezza non superata')
  expect(brevoCalls(f)).toBe(0)

  f = stubGoogleAndBrevo(() => score(0.9))
  expect((await post(VALID)).status).toBe(400)
  expect(brevoCalls(f)).toBe(0)
  expect(warn.mock.calls.flat().join(' ')).toContain('reason=missing_token')
})

it('reCAPTCHA enforced but Google down / 403 → fail open, lead saved', async () => {
  enableCaptcha(true)
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  for (const status of [503, 403]) {
    resetRecaptchaTokenCache()
    const f = stubGoogleAndBrevo(() => new Response('{}', { status }))
    expect((await post({ ...VALID, recaptcha_token: 'tok' })).status).toBe(200)
    expect(brevoCalls(f)).toBe(1)
  }
  expect(warn.mock.calls.flat().join(' ')).toContain('(fail-open)')
})

it('reCAPTCHA observe-only (RECAPTCHA_ENFORCE=false): failures are logged, never rejected', async () => {
  enableCaptcha(false)
  const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  let f = stubGoogleAndBrevo(() => score(0.1))
  expect((await post({ ...VALID, recaptcha_token: 'tok' })).status).toBe(200)
  expect(brevoCalls(f)).toBe(1)
  f = stubGoogleAndBrevo(() => score(0.9))
  expect((await post(VALID)).status).toBe(200)
  expect(brevoCalls(f)).toBe(1)
  const logged = warn.mock.calls.flat().join(' ')
  expect(logged).toContain('reason=low_score')
  expect(logged).toContain('enforce=false')
  expect(logged).not.toContain('a@b.it')
})
