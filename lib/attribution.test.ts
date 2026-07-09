// lib/attribution.test.ts
import { it, expect, beforeEach } from 'vitest'
import { captureAttribution, getAttribution, ATTR_PARAMS } from './attribution'

// happy-dom: clear cookies between tests
beforeEach(() => {
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0].trim()
    if (name) document.cookie = `${name}=; max-age=0; path=/`
  }
})

it('exposes the fixed attribution param list', () => {
  expect(ATTR_PARAMS).toContain('gclid')
  expect(ATTR_PARAMS).toContain('utm_source')
  expect(ATTR_PARAMS).toContain('gbraid')
})

it('captures gclid + utm from a search string into the cookie', () => {
  captureAttribution('?gclid=ABC123&utm_source=google&utm_medium=cpc&foo=bar')
  expect(getAttribution()).toEqual({ gclid: 'ABC123', utm_source: 'google', utm_medium: 'cpc' })
})

it('last-click-wins: a new value overwrites, absent params are preserved', () => {
  captureAttribution('?gclid=OLD&utm_campaign=spring')
  captureAttribution('?gclid=NEW')
  expect(getAttribution()).toEqual({ gclid: 'NEW', utm_campaign: 'spring' })
})

it('is a no-op when no known params are present', () => {
  captureAttribution('?foo=bar&baz=1')
  expect(getAttribution()).toEqual({})
})

it('ignores empty param values', () => {
  captureAttribution('?gclid=')
  expect(getAttribution()).toEqual({})
})

it('returns {} for a malformed cookie without throwing', () => {
  document.cookie = 'mkt_attr=%7Bnot-json; path=/'
  expect(() => getAttribution()).not.toThrow()
  expect(getAttribution()).toEqual({})
})
