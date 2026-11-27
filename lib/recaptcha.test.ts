// @vitest-environment node
import { it, expect, vi, beforeEach, describe } from 'vitest'
import {
  describeOutcome,
  recaptchaConfig,
  resetRecaptchaTokenCache,
  shouldReject,
  verifyRecaptcha,
  type RecaptchaConfig,
} from './recaptcha'

const CFG: RecaptchaConfig = { siteKey: 'site-key', projectId: 'schoolrcloud', enforce: true, threshold: 0.3 }

const metadataOk = () =>
  new Response(JSON.stringify({ access_token: 'ya29.test', expires_in: 3600, token_type: 'Bearer' }), { status: 200 })

const assessment = (tokenProperties: object, score?: number) =>
  new Response(JSON.stringify({ tokenProperties, riskAnalysis: score === undefined ? {} : { score } }), { status: 200 })

/** fetch mock routing metadata vs assessments calls. */
function mockFetch(assessmentResponse: () => Response | Promise<Response>) {
  return vi.fn(async (url: string | URL | Request) => {
    const u = String(url)
    if (u.startsWith('http://metadata.google.internal/')) return metadataOk()
    if (u.startsWith('https://recaptchaenterprise.googleapis.com/')) return assessmentResponse()
    throw new Error(`unexpected url ${u}`)
  })
}

beforeEach(() => resetRecaptchaTokenCache())

describe('recaptchaConfig', () => {
  it('is disabled with an empty environment and defaults to observe-only, threshold 0.3', () => {
    const c = recaptchaConfig({} as NodeJS.ProcessEnv)
    expect(c).toEqual({ siteKey: '', projectId: '', enforce: false, threshold: 0.3 })
  })
  it('reads all flags; enforce only on "true"; bad threshold falls back to 0.3', () => {
    expect(recaptchaConfig({
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: ' k ', RECAPTCHA_PROJECT_ID: 'p', RECAPTCHA_ENFORCE: 'TRUE', RECAPTCHA_SCORE_THRESHOLD: '0.5',
    } as unknown as NodeJS.ProcessEnv)).toEqual({ siteKey: 'k', projectId: 'p', enforce: true, threshold: 0.5 })
    expect(recaptchaConfig({ RECAPTCHA_ENFORCE: '1', RECAPTCHA_SCORE_THRESHOLD: 'abc' } as unknown as NodeJS.ProcessEnv))
      .toMatchObject({ enforce: false, threshold: 0.3 })
    expect(recaptchaConfig({ RECAPTCHA_SCORE_THRESHOLD: '7' } as unknown as NodeJS.ProcessEnv).threshold).toBe(0.3)
  })
})

describe('verifyRecaptcha', () => {
  it('disabled without site key or project: no network call', async () => {
    const f = vi.fn()
    expect(await verifyRecaptcha('t', { config: { ...CFG, siteKey: '' }, fetchImpl: f })).toEqual({ status: 'disabled' })
    expect(await verifyRecaptcha('t', { config: { ...CFG, projectId: '' }, fetchImpl: f })).toEqual({ status: 'disabled' })
    expect(f).not.toHaveBeenCalled()
  })

  it('valid token, right action, good score → pass; sends the expected request', async () => {
    const f = mockFetch(() => assessment({ valid: true, action: 'lead_submit' }, 0.9))
    expect(await verifyRecaptcha('tok', { config: CFG, fetchImpl: f })).toEqual({ status: 'pass', score: 0.9 })
    const [mdUrl, mdInit] = f.mock.calls[0] as unknown as [string, RequestInit]
    expect(mdUrl).toContain('/computeMetadata/v1/instance/service-accounts/default/token')
    expect((mdInit.headers as Record<string, string>)['Metadata-Flavor']).toBe('Google')
    const [url, init] = f.mock.calls[1] as unknown as [string, RequestInit]
    expect(url).toBe('https://recaptchaenterprise.googleapis.com/v1/projects/schoolrcloud/assessments')
    expect((init.headers as Record<string, string>).authorization).toBe('Bearer ya29.test')
    expect(JSON.parse(init.body as string)).toEqual({
      event: { token: 'tok', siteKey: 'site-key', expectedAction: 'lead_submit' },
    })
  })

  it('caches the access token across calls', async () => {
    const f = mockFetch(() => assessment({ valid: true, action: 'lead_submit' }, 0.9))
    await verifyRecaptcha('a', { config: CFG, fetchImpl: f })
    await verifyRecaptcha('b', { config: CFG, fetchImpl: f })
    expect(f.mock.calls.filter(c => String(c[0]).includes('metadata'))).toHaveLength(1)
  })

  it('score exactly at the threshold passes; below fails as low_score', async () => {
    expect((await verifyRecaptcha('t', { config: CFG, fetchImpl: mockFetch(() => assessment({ valid: true, action: 'lead_submit' }, 0.3)) })).status).toBe('pass')
    expect(await verifyRecaptcha('t', { config: CFG, fetchImpl: mockFetch(() => assessment({ valid: true, action: 'lead_submit' }, 0.1)) }))
      .toEqual({ status: 'fail', reason: 'low_score', score: 0.1 })
  })

  it('wrong action → fail', async () => {
    const o = await verifyRecaptcha('t', { config: CFG, fetchImpl: mockFetch(() => assessment({ valid: true, action: 'login' }, 0.9)) })
    expect(o).toMatchObject({ status: 'fail', reason: 'wrong_action' })
  })

  it('invalid token (e.g. hostname not in the key, expired, malformed) → fail', async () => {
    const o = await verifyRecaptcha('t', { config: CFG, fetchImpl: mockFetch(() => assessment({ valid: false, invalidReason: 'BROWSER_ERROR' })) })
    expect(o).toEqual({ status: 'fail', reason: 'invalid_token', detail: 'BROWSER_ERROR' })
  })

  it('missing token → fail without calling Google', async () => {
    const f = vi.fn()
    expect(await verifyRecaptcha(undefined, { config: CFG, fetchImpl: f })).toEqual({ status: 'fail', reason: 'missing_token' })
    expect(f).not.toHaveBeenCalled()
  })

  it('API down: network error, 5xx, 403 (missing IAM role), metadata failure → unavailable (fail open)', async () => {
    const down = vi.fn(async () => { throw new TypeError('fetch failed') })
    expect((await verifyRecaptcha('t', { config: CFG, fetchImpl: down })).status).toBe('unavailable')

    for (const status of [500, 503, 403, 429]) {
      resetRecaptchaTokenCache()
      const o = await verifyRecaptcha('t', { config: CFG, fetchImpl: mockFetch(() => new Response('{}', { status })) })
      expect(o, String(status)).toEqual({ status: 'unavailable', detail: `assessments status ${status}` })
    }

    resetRecaptchaTokenCache()
    const mdFail = vi.fn(async () => new Response('', { status: 404 }))
    expect((await verifyRecaptcha('t', { config: CFG, fetchImpl: mdFail })).status).toBe('unavailable')
  })

  it('timeout → unavailable (fail open)', async () => {
    const hang = vi.fn((_url: string | URL | Request, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(init.signal!.reason))
      }))
    const o = await verifyRecaptcha('t', { config: CFG, fetchImpl: hang as unknown as typeof fetch, timeoutMs: 20 })
    expect(o).toEqual({ status: 'unavailable', detail: 'timeout' })
  })
})

describe('shouldReject / describeOutcome', () => {
  it('rejects only failed assessments, only when enforcing', () => {
    const fail = { status: 'fail', reason: 'low_score', score: 0.1 } as const
    expect(shouldReject(fail, CFG)).toBe(true)
    expect(shouldReject(fail, { ...CFG, enforce: false })).toBe(false)
    expect(shouldReject({ status: 'unavailable', detail: 'timeout' }, CFG)).toBe(false)
    expect(shouldReject({ status: 'pass', score: 0.9 }, CFG)).toBe(false)
    expect(shouldReject({ status: 'disabled' }, CFG)).toBe(false)
  })
  it('log line carries result/reason/score/flags and no token', () => {
    const line = describeOutcome({ status: 'fail', reason: 'low_score', score: 0.1 }, CFG)
    expect(line).toBe('reCAPTCHA: result=fail reason=low_score score=0.1 threshold=0.3 enforce=true')
    expect(describeOutcome({ status: 'unavailable', detail: 'timeout' }, CFG)).toContain('(fail-open)')
  })
})
