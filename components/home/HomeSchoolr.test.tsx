import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect, vi } from 'vitest'
import { HomeSchoolr } from './HomeSchoolr'
import { brand } from '@/lib/brand'

/**
 * HomeSchoolr is the self-contained schoolr-brand landing (own header/footer, ChromeGate
 * hides the shared site chrome for this brand — see ChromeGate.tsx). Its inline footer
 * (~L1458-1499) had no way to reopen the cookie banner and no contact email, even though
 * CookieBanner is mounted unconditionally by the root layout. See Task 5 report, review
 * round 1.
 */

it('has a "Gestisci le preferenze sui cookie" BUTTON (not a link) in the footer', () => {
  render(<HomeSchoolr />)
  const el = screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i })
  expect(el.tagName).toBe('BUTTON')
})

it('clicking the cookie preferences button dispatches d360:open-cookie-banner on document', () => {
  render(<HomeSchoolr />)
  const spy = vi.fn()
  document.addEventListener('d360:open-cookie-banner', spy)
  fireEvent.click(screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i }))
  expect(spy).toHaveBeenCalledTimes(1)
  document.removeEventListener('d360:open-cookie-banner', spy)
})

it('has a mailto link to the brand contact email in the footer', () => {
  render(<HomeSchoolr />)
  const link = screen.getByRole('link', { name: brand.contacts.email })
  expect(link).toHaveAttribute('href', `mailto:${brand.contacts.email}`)
})
