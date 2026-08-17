import { render } from '@testing-library/react'
import { it, expect, beforeEach, afterEach } from 'vitest'
import { ConsentFromStorage } from './ConsentFromStorage'
import { applyConsent } from '@/lib/analytics'
import { writeConsent } from '@/lib/consent'

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

/**
 * Anti-divergence guard.
 *
 * The category -> gtag-keys map exists in two places out of necessity (lib/analytics.ts's
 * applyConsent, and the inline script built by buildScript() here — the latter can't import
 * the former, it has to stay a dependency-free string). The tests above assert each map
 * against hand-typed literals, which does NOT link them: someone could edit one map and
 * leave the other stale, and neither test would notice.
 *
 * This block closes that gap two ways at once:
 *  - it drives the inline script from a cookie built by the REAL lib/consent.ts serializer
 *    (writeConsent), not a hand-typed `v1.x.y` literal — so a future cookie-format change
 *    (e.g. v1 -> v2) that isn't mirrored in the inline script's regex shows up here too;
 *  - it compares the script's resulting gtag('consent','update', …) call against
 *    applyConsent()'s call for the SAME input, rather than against a third hand-typed map —
 *    so editing either map alone (without the other) turns this red.
 */
const CONSENT_COMBINATIONS: Array<{ statistics: boolean; marketing: boolean }> = [
  { statistics: true, marketing: true },
  { statistics: true, marketing: false },
  { statistics: false, marketing: true },
  { statistics: false, marketing: false },
]

for (const combo of CONSENT_COMBINATIONS) {
  it(`inline script reading a real writeConsent(${JSON.stringify(combo)}) cookie matches applyConsent(...) exactly`, () => {
    // Ground truth: lib/analytics.ts's own map, for this exact input.
    ;(window as any).dataLayer = []
    applyConsent(combo.statistics, combo.marketing)
    const expected = (window as any).dataLayer.at(-1)

    // Same input, but through the real cookie pipeline: lib/consent.ts serializes it, the
    // inline script (its own, duplicated map) reads it back and calls gtag itself.
    clearAllCookies()
    writeConsent(combo)
    ;(window as any).dataLayer = []
    runScript()
    const actual = (window as any).dataLayer.at(-1)

    expect(actual).toEqual(expected)
  })
}
