import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

function clearAllCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0]?.trim())
    .filter((n): n is string => !!n)
  for (const name of names) {
    // `expires` in the past is the portable deletion idiom — more reliably honored than
    // `Max-Age=0` across cookie-jar implementations (incl. happy-dom).
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`
  }
}

const DEFAULT_URL = 'http://localhost:3000/'

/** The `Secure` attribute is conditional on the page being served over https, so these tests
 *  drive the protocol directly. happy-dom's own URL setter is used rather than stubbing
 *  `location`, which is not configurable. */
function setUrl(url: string) {
  ;(window as unknown as { happyDOM: { setURL(u: string): void } }).happyDOM.setURL(url)
}

beforeEach(() => {
  setUrl(DEFAULT_URL)
  clearAllCookies()
  localStorage.clear()
})

afterEach(() => {
  clearAllCookies()
  localStorage.clear()
  setUrl(DEFAULT_URL)
  vi.doUnmock('@/lib/brand')
  vi.resetModules()
})

describe('consent (default brand: diploma360, cookie d360_consent)', () => {
  it('roundtrip: writeConsent then readConsent returns the same choice', async () => {
    const { writeConsent, readConsent } = await import('./consent')
    writeConsent({ statistics: true, marketing: false })
    expect(readConsent()).toEqual({ statistics: true, marketing: false })
  })

  it('roundtrip works for every combination', async () => {
    const { writeConsent, readConsent } = await import('./consent')
    writeConsent({ statistics: false, marketing: false })
    expect(readConsent()).toEqual({ statistics: false, marketing: false })
    writeConsent({ statistics: true, marketing: true })
    expect(readConsent()).toEqual({ statistics: true, marketing: true })
  })

  it('serializeConsentCookie sets Max-Age=15552000, Path=/, SameSite=Lax and the v1 value format', async () => {
    const { serializeConsentCookie, CONSENT_MAX_AGE_DAYS } = await import('./consent')
    expect(CONSENT_MAX_AGE_DAYS).toBe(180)
    const str = serializeConsentCookie({ statistics: true, marketing: false })
    expect(str).toContain('d360_consent=v1.s._')
    expect(str).toContain('Max-Age=15552000')
    expect(str).toContain('Path=/')
    expect(str).toContain('SameSite=Lax')
  })

  it('serializeConsentCookie adds Secure over https', async () => {
    setUrl('https://lascuola360.it/')
    const { serializeConsentCookie } = await import('./consent')
    expect(serializeConsentCookie({ statistics: true, marketing: false })).toContain('; Secure')
  })

  it('serializeConsentCookie omits Secure over plain http (local dev would drop the cookie)', async () => {
    setUrl('http://localhost:3000/')
    const { serializeConsentCookie } = await import('./consent')
    expect(serializeConsentCookie({ statistics: true, marketing: false })).not.toContain('Secure')
  })

  it('the Secure flag does not disturb the rest of the attributes', async () => {
    setUrl('https://lascuola360.it/')
    const { serializeConsentCookie } = await import('./consent')
    const str = serializeConsentCookie({ statistics: false, marketing: true })
    expect(str).toContain('d360_consent=v1._.m')
    expect(str).toContain('Max-Age=15552000')
    expect(str).toContain('Path=/')
    expect(str).toContain('SameSite=Lax')
  })

  it('roundtrips over https — the written cookie is still readable', async () => {
    setUrl('https://lascuola360.it/')
    const { writeConsent, readConsent } = await import('./consent')
    writeConsent({ statistics: true, marketing: false })
    expect(readConsent()).toEqual({ statistics: true, marketing: false })
  })

  it('serializeConsentCookie encodes both flags on', async () => {
    const { serializeConsentCookie } = await import('./consent')
    expect(serializeConsentCookie({ statistics: true, marketing: true })).toContain(
      'd360_consent=v1.s.m',
    )
  })

  it('serializeConsentCookie encodes both flags off', async () => {
    const { serializeConsentCookie } = await import('./consent')
    expect(serializeConsentCookie({ statistics: false, marketing: false })).toContain(
      'd360_consent=v1._._',
    )
  })

  it('readConsent returns null when nothing is stored anywhere', async () => {
    const { readConsent } = await import('./consent')
    expect(readConsent()).toBeNull()
  })

  it('migrates legacy localStorage "all" to statistics ONLY — the old banner never asked about marketing', async () => {
    localStorage.setItem('d360_consent', 'all')
    const { readConsent } = await import('./consent')
    expect(readConsent()).toEqual({ statistics: true, marketing: false })
    expect(document.cookie).toContain('d360_consent=v1.s._')
    expect(localStorage.getItem('d360_consent')).toBeNull()
  })

  it('the migration never fabricates marketing consent out of the legacy value', async () => {
    // Guard against a well-meaning "all means all" simplification: the legacy banner's copy
    // only ever mentioned statistics, so no marketing consent exists to migrate.
    localStorage.setItem('d360_consent', 'all')
    const { readConsent } = await import('./consent')
    expect(readConsent()?.marketing).toBe(false)
    expect(document.cookie).not.toContain('v1.s.m')
  })

  it('migrates legacy localStorage "necessary" to no consent, writes the cookie, and clears the old key', async () => {
    localStorage.setItem('d360_consent', 'necessary')
    const { readConsent } = await import('./consent')
    expect(readConsent()).toEqual({ statistics: false, marketing: false })
    expect(document.cookie).toContain('d360_consent=v1._._')
    expect(localStorage.getItem('d360_consent')).toBeNull()
  })

  it('does not migrate once the cookie already exists (cookie wins)', async () => {
    const { writeConsent, readConsent } = await import('./consent')
    writeConsent({ statistics: false, marketing: false })
    localStorage.setItem('d360_consent', 'all')
    expect(readConsent()).toEqual({ statistics: false, marketing: false })
    // legacy key is left untouched when the cookie already decided
    expect(localStorage.getItem('d360_consent')).toBe('all')
  })

  it('returns null without throwing on a corrupted cookie value', async () => {
    const { readConsent } = await import('./consent')
    document.cookie = 'd360_consent=garbage; Path=/'
    expect(() => readConsent()).not.toThrow()
    expect(readConsent()).toBeNull()
  })

  it('returns null without throwing on a corrupted legacy localStorage value', async () => {
    localStorage.setItem('d360_consent', 'not-a-real-value')
    const { readConsent } = await import('./consent')
    expect(() => readConsent()).not.toThrow()
    expect(readConsent()).toBeNull()
  })
})

describe('consent cookie name follows the brand', () => {
  it('uses lascuola360_consent for the lascuola360 brand', async () => {
    vi.doMock('@/lib/brand', async () => {
      const real = await vi.importActual<typeof import('@/lib/brand')>('@/lib/brand')
      return { ...real, brand: real.resolveBrand('lascuola360') }
    })
    vi.resetModules()
    const { writeConsent, readConsent, serializeConsentCookie } = await import('./consent')

    expect(serializeConsentCookie({ statistics: true, marketing: true })).toContain(
      'lascuola360_consent=v1.s.m',
    )

    writeConsent({ statistics: true, marketing: false })
    expect(document.cookie).toContain('lascuola360_consent=v1.s._')
    expect(readConsent()).toEqual({ statistics: true, marketing: false })
  })

  it('uses the legacy d360_consent name for other brands (schoolr)', async () => {
    vi.doMock('@/lib/brand', async () => {
      const real = await vi.importActual<typeof import('@/lib/brand')>('@/lib/brand')
      return { ...real, brand: real.resolveBrand('schoolr') }
    })
    vi.resetModules()
    const { serializeConsentCookie } = await import('./consent')
    expect(serializeConsentCookie({ statistics: false, marketing: false })).toContain(
      'd360_consent=v1._._',
    )
  })
})
