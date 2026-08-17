import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect, vi } from 'vitest'
import { RipFooter } from './RipFooter'
import { brand } from '@/lib/brand'

it('has a link to /privacy', () => {
  render(<RipFooter />)
  const link = screen.getByRole('link', { name: /privacy/i })
  expect(link).toHaveAttribute('href', '/privacy')
})

it('has a link to /cookie', () => {
  render(<RipFooter />)
  const link = screen.getByRole('link', { name: /cookie/i })
  expect(link).toHaveAttribute('href', '/cookie')
})

it('has a link to /termini', () => {
  render(<RipFooter />)
  const link = screen.getByRole('link', { name: /termini/i })
  expect(link).toHaveAttribute('href', '/termini')
})

it('has a "Gestisci le preferenze sui cookie" BUTTON (not a link)', () => {
  render(<RipFooter />)
  const el = screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i })
  expect(el.tagName).toBe('BUTTON')
})

it('clicking the cookie preferences button dispatches d360:open-cookie-banner on document', () => {
  render(<RipFooter />)
  const spy = vi.fn()
  document.addEventListener('d360:open-cookie-banner', spy)
  fireEvent.click(screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i }))
  expect(spy).toHaveBeenCalledTimes(1)
  document.removeEventListener('d360:open-cookie-banner', spy)
})

it('has a mailto link to the brand contact email', () => {
  render(<RipFooter />)
  const link = screen.getByRole('link', { name: brand.contacts.email })
  expect(link).toHaveAttribute('href', `mailto:${brand.contacts.email}`)
})
