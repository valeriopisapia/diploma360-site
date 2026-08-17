import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest'
import { OpenCookiePreferencesButton } from './OpenCookiePreferencesButton'
import { CookieBanner } from './CookieBanner'
import { writeConsent } from '@/lib/consent'

function clearAllCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0]?.trim())
    .filter((n): n is string => !!n)
  for (const name of names) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`
  }
}

/** In the app, `gtag` is defined by the inline ConsentDefault script in <head>, parsed long
 *  before React mounts. These integration tests mount the banner without the layout around
 *  it, so they have to provide the same guarantee — the banner re-applies a stored choice at
 *  mount and would otherwise hit an undefined gtag that never happens in production. */
beforeEach(() => {
  clearAllCookies()
  window.dataLayer = []
  window.gtag = vi.fn()
})

afterEach(() => {
  clearAllCookies()
})

it('renders as a real <button>, not a link (this is not navigation)', () => {
  render(<OpenCookiePreferencesButton />)
  const el = screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i })
  expect(el.tagName).toBe('BUTTON')
})

it('clicking dispatches d360:open-cookie-banner on document', () => {
  render(<OpenCookiePreferencesButton />)
  const spy = vi.fn()
  document.addEventListener('d360:open-cookie-banner', spy)
  fireEvent.click(screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i }))
  expect(spy).toHaveBeenCalledTimes(1)
  document.removeEventListener('d360:open-cookie-banner', spy)
})

describe('integration: footer button + cookie banner mounted together (Task 4/5 seam)', () => {
  it('clicking the footer button makes the (already-hidden) banner visible', () => {
    writeConsent({ statistics: true, marketing: false })
    render(
      <>
        <OpenCookiePreferencesButton />
        <CookieBanner />
      </>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent.click(screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i }))

    expect(screen.getByRole('dialog', { name: /preferenze cookie/i })).toBeInTheDocument()
  })
})
