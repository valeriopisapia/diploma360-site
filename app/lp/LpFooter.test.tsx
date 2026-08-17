import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect, vi } from 'vitest'
import { LpFooter } from './LpFooter'
import { brand } from '@/lib/brand'

it('has a link to /privacy', () => {
  render(<LpFooter />)
  const link = screen.getByRole('link', { name: /privacy/i })
  expect(link).toHaveAttribute('href', '/privacy')
})

it('has a link to /cookie', () => {
  render(<LpFooter />)
  const link = screen.getByRole('link', { name: /cookie policy/i })
  expect(link).toHaveAttribute('href', '/cookie')
})

it('has a link to /termini', () => {
  render(<LpFooter />)
  const link = screen.getByRole('link', { name: /termini/i })
  expect(link).toHaveAttribute('href', '/termini')
})

// Structural check: matches the default test-time brand (diploma360) either way, so it
// alone can't distinguish "reads brand.contacts.email" from "hardcoded to the same value
// by coincidence" — see LpFooter.brand.test.tsx for the regression test that actually mocks
// a different brand and would go red on a hardcoded address.
it('the contact email link uses brand.contacts.email', () => {
  render(<LpFooter />)
  const link = screen.getByRole('link', { name: brand.contacts.email })
  expect(link).toHaveAttribute('href', `mailto:${brand.contacts.email}`)
})

it('has a "Gestisci le preferenze sui cookie" BUTTON (not a link)', () => {
  render(<LpFooter />)
  const el = screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i })
  expect(el.tagName).toBe('BUTTON')
})

it('clicking the cookie preferences button dispatches d360:open-cookie-banner on document', () => {
  render(<LpFooter />)
  const spy = vi.fn()
  document.addEventListener('d360:open-cookie-banner', spy)
  fireEvent.click(screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i }))
  expect(spy).toHaveBeenCalledTimes(1)
  document.removeEventListener('d360:open-cookie-banner', spy)
})
