import { it, expect, vi } from 'vitest'
vi.mock('next/navigation', () => ({ notFound: () => { throw new Error('NEXT_NOT_FOUND') } }))
import { assertBrand } from './assertBrand'

it('passes for the active brand (diploma360 default) and 404s otherwise', () => {
  expect(() => assertBrand('diploma360')).not.toThrow()
  expect(() => assertBrand('lascuola360')).toThrow('NEXT_NOT_FOUND')
})
