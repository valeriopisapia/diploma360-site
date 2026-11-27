import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getRecaptchaToken, isRecaptchaEnabled, loadRecaptcha, resetRecaptchaClient } from './recaptchaClient'

// Never let happy-dom fetch the real Google script: intercept the <script> append and
// fire onload/onerror ourselves.
let appendSpy: ReturnType<typeof vi.spyOn>
function interceptScript(outcome: 'load' | 'error' = 'load') {
  appendSpy = vi.spyOn(document.head, 'appendChild').mockImplementation(<T extends Node>(node: T): T => {
    const s = node as unknown as HTMLScriptElement
    queueMicrotask(() => (outcome === 'load' ? s.onload : s.onerror)?.call(s, new Event(outcome)))
    return node
  })
}

beforeEach(() => {
  resetRecaptchaClient()
  delete window.grecaptcha
})
afterEach(() => {
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

it('disabled without a site key: no script, no token', async () => {
  vi.stubEnv('NEXT_PUBLIC_RECAPTCHA_SITE_KEY', '')
  interceptScript()
  expect(isRecaptchaEnabled()).toBe(false)
  await loadRecaptcha()
  expect(await getRecaptchaToken('lead_submit')).toBeUndefined()
  expect(appendSpy).not.toHaveBeenCalled()
})

it('loads the Enterprise script once with the site key', async () => {
  vi.stubEnv('NEXT_PUBLIC_RECAPTCHA_SITE_KEY', 'site-key')
  interceptScript()
  await Promise.all([loadRecaptcha(), loadRecaptcha()])
  await loadRecaptcha()
  expect(appendSpy).toHaveBeenCalledOnce()
  const s = appendSpy.mock.calls[0][0] as HTMLScriptElement
  expect(s.src).toBe('https://www.google.com/recaptcha/enterprise.js?render=site-key')
})

it('returns the token for the requested action', async () => {
  vi.stubEnv('NEXT_PUBLIC_RECAPTCHA_SITE_KEY', 'site-key')
  interceptScript()
  const execute = vi.fn(async () => 'tok-123')
  window.grecaptcha = { enterprise: { ready: cb => cb(), execute } }
  expect(await getRecaptchaToken('lead_submit')).toBe('tok-123')
  expect(execute).toHaveBeenCalledWith('site-key', { action: 'lead_submit' })
})

it('never throws: blocked script, execute error or timeout → undefined', async () => {
  vi.stubEnv('NEXT_PUBLIC_RECAPTCHA_SITE_KEY', 'site-key')

  interceptScript('error')
  expect(await getRecaptchaToken('lead_submit')).toBeUndefined()
  vi.restoreAllMocks()

  resetRecaptchaClient()
  interceptScript()
  window.grecaptcha = { enterprise: { ready: cb => cb(), execute: vi.fn(async () => { throw new Error('Invalid domain for site key') }) } }
  expect(await getRecaptchaToken('lead_submit')).toBeUndefined()

  window.grecaptcha = { enterprise: { ready: () => {}, execute: vi.fn() } } // ready never fires
  expect(await getRecaptchaToken('lead_submit', 20)).toBeUndefined()
})

it('retries loading after a failed attempt', async () => {
  vi.stubEnv('NEXT_PUBLIC_RECAPTCHA_SITE_KEY', 'site-key')
  interceptScript('error')
  await expect(loadRecaptcha()).rejects.toThrow()
  vi.restoreAllMocks()
  interceptScript('load')
  await expect(loadRecaptcha()).resolves.toBeUndefined()
  expect(appendSpy).toHaveBeenCalledOnce()
})
