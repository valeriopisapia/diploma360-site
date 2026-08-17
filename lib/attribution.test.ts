// lib/attribution.test.ts
import { it, expect, beforeEach, describe } from 'vitest'
import { captureAttribution, getAttribution, ATTR_PARAMS } from './attribution'
import { writeConsent } from './consent'

// happy-dom: clear cookies between tests. `expires` in the past is the portable deletion
// idiom — `max-age=0` is not reliably honored here and can leave an empty `name=` behind,
// which used to make the "nothing was written" assertions below flaky.
beforeEach(() => {
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0].trim()
    if (name) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
  }
})

/** True only when an `mkt_attr` cookie carrying an actual value exists. Deliberately not a
 *  substring match on the raw cookie string: a leftover empty `mkt_attr=` is not stored
 *  attribution, and treating it as one made this suite order-dependent. */
function hasStoredAttribution(): boolean {
  const m = document.cookie.match(/(?:^|;\s*)mkt_attr=([^;]*)/)
  return !!m && m[1].length > 0
}

/** `mkt_attr` is an advertising cookie: every capture test below has to opt in first,
 *  otherwise nothing is written at all (see the "consent gate" block). */
function grantMarketing() {
  writeConsent({ statistics: false, marketing: true })
}

it('exposes the fixed attribution param list', () => {
  expect(ATTR_PARAMS).toContain('gclid')
  expect(ATTR_PARAMS).toContain('utm_source')
  expect(ATTR_PARAMS).toContain('gbraid')
})

it('captures gclid + utm from a search string into the cookie', () => {
  grantMarketing()
  captureAttribution('?gclid=ABC123&utm_source=google&utm_medium=cpc&foo=bar')
  expect(getAttribution()).toEqual({ gclid: 'ABC123', utm_source: 'google', utm_medium: 'cpc' })
})

it('last-click-wins: a new value overwrites, absent params are preserved', () => {
  grantMarketing()
  captureAttribution('?gclid=OLD&utm_campaign=spring')
  captureAttribution('?gclid=NEW')
  expect(getAttribution()).toEqual({ gclid: 'NEW', utm_campaign: 'spring' })
})

it('is a no-op when no known params are present', () => {
  grantMarketing()
  captureAttribution('?foo=bar&baz=1')
  expect(getAttribution()).toEqual({})
})

it('ignores empty param values', () => {
  grantMarketing()
  captureAttribution('?gclid=')
  expect(getAttribution()).toEqual({})
})

describe('consent gate: mkt_attr is an advertising cookie', () => {
  it('writes nothing when no choice has been stored yet (first ever page load)', () => {
    captureAttribution('?gclid=ABC123&utm_source=google')
    expect(hasStoredAttribution()).toBe(false)
    expect(getAttribution()).toEqual({})
  })

  it('writes nothing when the stored choice excludes marketing', () => {
    writeConsent({ statistics: true, marketing: false })
    captureAttribution('?gclid=ABC123&utm_source=google')
    expect(hasStoredAttribution()).toBe(false)
    expect(getAttribution()).toEqual({})
  })

  it('writes nothing when the user rejected everything', () => {
    writeConsent({ statistics: false, marketing: false })
    captureAttribution('?gclid=ABC123')
    expect(hasStoredAttribution()).toBe(false)
    expect(getAttribution()).toEqual({})
  })

  it('writes once marketing consent is granted', () => {
    writeConsent({ statistics: false, marketing: true })
    captureAttribution('?gclid=ABC123')
    expect(hasStoredAttribution()).toBe(true)
    expect(getAttribution()).toEqual({ gclid: 'ABC123' })
  })

  it('captures on a later call once consent arrives, params still in the URL', () => {
    // The landing-page sequence: page loads with the ad params but no choice yet (nothing
    // written), then the visitor accepts marketing and the banner re-runs the capture.
    captureAttribution('?gclid=ABC123')
    expect(getAttribution()).toEqual({})

    writeConsent({ statistics: false, marketing: true })
    captureAttribution('?gclid=ABC123')
    expect(getAttribution()).toEqual({ gclid: 'ABC123' })
  })
})

it('returns {} for a malformed cookie without throwing', () => {
  document.cookie = 'mkt_attr=%7Bnot-json; path=/'
  expect(() => getAttribution()).not.toThrow()
  expect(getAttribution()).toEqual({})
})
