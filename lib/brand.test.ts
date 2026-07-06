import { it, expect } from 'vitest'
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
