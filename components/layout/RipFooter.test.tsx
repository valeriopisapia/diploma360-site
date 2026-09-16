import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect, vi, describe, beforeEach, afterEach } from 'vitest'
import { RipFooter } from './RipFooter'
import { CookieBanner } from '@/components/consent/CookieBanner'
import { writeConsent } from '@/lib/consent'
import { brand } from '@/lib/brand'

function clearAllCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0]?.trim())
    .filter((n): n is string => !!n)
  for (const name of names) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`
  }
}

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

it('links to the blog with a document navigation', () => {
  render(<RipFooter />)
  const link = screen.getByRole('link', { name: 'Blog' })
  expect(link).toHaveAttribute('href', '/blog')
  expect(link.tagName).toBe('A')
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

describe('integration: real RipFooter + real CookieBanner (lascuola360 seam)', () => {
  // In the app, `gtag` is defined by the inline ConsentDefault script in <head>, parsed long
  // before React mounts. This test mounts the banner without the layout around it, so it has
  // to provide the same guarantee — the banner re-applies a stored choice at mount and would
  // otherwise hit an undefined gtag that never happens in production.
  beforeEach(() => {
    clearAllCookies()
    window.dataLayer = []
    window.gtag = vi.fn()
  })

  afterEach(() => {
    clearAllCookies()
  })

  it('clicking the footer button on the actual lascuola360 footer makes the actual banner visible', () => {
    writeConsent({ statistics: true, marketing: false })
    render(
      <>
        <RipFooter />
        <CookieBanner />
      </>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i }))

    expect(screen.getByRole('dialog', { name: /preferenze cookie/i })).toBeInTheDocument()
  })
})
