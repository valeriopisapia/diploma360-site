import { render } from '@testing-library/react'
import { it, expect, beforeEach, afterEach } from 'vitest'
import { ConsentFromStorage } from './ConsentFromStorage'

function clearAllCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0]?.trim())
    .filter((n): n is string => !!n)
  for (const name of names) {
    // `expires` in the past is the portable deletion idiom (matches lib/consent.test.ts).
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`
  }
}

/**
 * ConsentFromStorage renders a plain <script> via dangerouslySetInnerHTML. Scripts inserted
 * that way never auto-execute in a DOM (jsdom/happy-dom included, matching real browsers) —
 * to exercise the actual inline logic we have to grab the text content and eval it ourselves,
 * exactly as the browser's parser would when it hits the real <script> tag server-rendered
 * into the HTML stream.
 */
function runScript() {
  const { container } = render(<ConsentFromStorage />)
  const script = container.querySelector('script')
  expect(script).not.toBeNull()
  // eslint-disable-next-line no-eval
  ;(0, eval)(script!.textContent || '')
}

beforeEach(() => {
  clearAllCookies()
  ;(window as any).dataLayer = []
  ;(window as any).gtag = (...args: any[]) => (window as any).dataLayer.push(args)
})

afterEach(() => {
  clearAllCookies()
})

it('re-applies full consent (v1.s.m): all four keys granted', () => {
  document.cookie = 'd360_consent=v1.s.m; Path=/'
  runScript()
  expect((window as any).dataLayer).toContainEqual([
    'consent',
    'update',
    {
      analytics_storage: 'granted',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    },
  ])
})

it('re-applies statistics-only consent (v1.s._): analytics granted, ads denied', () => {
  document.cookie = 'd360_consent=v1.s._; Path=/'
  runScript()
  expect((window as any).dataLayer).toContainEqual([
    'consent',
    'update',
    {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    },
  ])
})

it('re-applies marketing-only consent (v1._.m): ads granted, analytics denied', () => {
  document.cookie = 'd360_consent=v1._.m; Path=/'
  runScript()
  expect((window as any).dataLayer).toContainEqual([
    'consent',
    'update',
    {
      analytics_storage: 'denied',
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
    },
  ])
})

it('does nothing when the cookie is absent', () => {
  runScript()
  expect((window as any).dataLayer).toEqual([])
})

it('does nothing and does not throw on a malformed cookie value', () => {
  document.cookie = 'd360_consent=garbage; Path=/'
  expect(() => runScript()).not.toThrow()
  expect((window as any).dataLayer).toEqual([])
})

it('ignores an unrelated cookie with a similar-looking name', () => {
  document.cookie = 'other_consent=v1.s.m; Path=/'
  runScript()
  expect((window as any).dataLayer).toEqual([])
})
