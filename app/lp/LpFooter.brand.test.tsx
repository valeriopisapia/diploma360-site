import { render, screen } from '@testing-library/react'
import { it, expect, vi } from 'vitest'

/**
 * Regression test for the hardcoded-email bug: the default test-time brand (diploma360)
 * happens to share its email with the address that was hardcoded in LpFooter, so a plain
 * render-and-assert test can't tell "reads brand.contacts.email" apart from "still
 * hardcoded, coincidentally correct". Mocking the module to a brand with a DIFFERENT email
 * (lascuola360) closes that gap: this goes red against `mailto:info@diploma360.it`.
 */
vi.mock('@/lib/brand', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/brand')>()
  return { ...actual, brand: actual.resolveBrand('lascuola360') }
})

it('the contact email link follows brand.contacts.email across brands, not a hardcoded address', async () => {
  const { LpFooter } = await import('./LpFooter')
  const { brand } = await import('@/lib/brand')
  expect(brand.contacts.email).toBe('info@lascuola360.it')

  render(<LpFooter />)
  const link = screen.getByRole('link', { name: brand.contacts.email })
  expect(link).toHaveAttribute('href', 'mailto:info@lascuola360.it')
})
