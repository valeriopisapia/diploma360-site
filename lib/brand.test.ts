import { describe, it, expect } from 'vitest'
import { resolveBrand } from './brand'

it('defaults to diploma360 when unset', () => {
  expect(resolveBrand(undefined).id).toBe('diploma360')
  expect(resolveBrand(undefined).name).toBe('Diploma360')
  expect(resolveBrand(undefined).domain).toBe('https://www.diploma360.it')
})

it('resolves lascuola360', () => {
  const b = resolveBrand('lascuola360')
  expect(b.id).toBe('lascuola360')
  expect(b.name).toBe('La Scuola360')
  expect(b.domain).toBe('https://www.lascuola360.it')
})

it('throws on an unknown brand so a misconfigured build fails loudly', () => {
  expect(() => resolveBrand('acme')).toThrow(/unknown brand/i)
})

describe('resolveBrand', () => {
  it('resolves schoolr with schoolr.net domain and its own GTM container', () => {
    const b = resolveBrand('schoolr')
    expect(b.id).toBe('schoolr')
    expect(b.domain).toBe('https://schoolr.net')
    expect(b.gtmId).toBe('GTM-K8W5CM7C')
  })

  it('still resolves the two existing brands', () => {
    expect(resolveBrand('diploma360').id).toBe('diploma360')
    expect(resolveBrand('lascuola360').id).toBe('lascuola360')
  })

  it('throws on unknown brand', () => {
    expect(() => resolveBrand('nope')).toThrow(/Unknown brand/)
  })
})
