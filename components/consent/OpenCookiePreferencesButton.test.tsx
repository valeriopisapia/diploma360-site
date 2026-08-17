import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect, describe, vi, beforeEach, afterEach } from 'vitest'
import { OpenCookiePreferencesButton } from './OpenCookiePreferencesButton'
import { CookieBanner } from './CookieBanner'
import { writeConsent } from '@/lib/consent'
import { getAttribution } from '@/lib/attribution'

const DEFAULT_URL = 'http://localhost:3000/'

function setUrl(url: string) {
  ;(window as unknown as { happyDOM: { setURL(u: string): void } }).happyDOM.setURL(url)
}

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
  setUrl(DEFAULT_URL)
  clearAllCookies()
  window.dataLayer = []
  window.gtag = vi.fn()
})

afterEach(() => {
  clearAllCookies()
  setUrl(DEFAULT_URL)
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

describe('end-to-end revocation from the footer (real consent + real attribution modules)', () => {
  it('accept with ad params, then revoke marketing from the footer: mkt_attr is gone', () => {
    // Arrival from an ad: the click id is in the URL for the whole visit.
    setUrl('http://localhost:3000/?gclid=ABC123&utm_source=google')
    render(
      <>
        <OpenCookiePreferencesButton />
        <CookieBanner />
      </>,
    )

    fireEvent.click(screen.getByRole('button', { name: /accetta tutti/i }))
    expect(getAttribution()).toEqual({ gclid: 'ABC123', utm_source: 'google' })

    // Second thoughts: reopen the preferences from the footer and turn marketing off.
    fireEvent.click(screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i }))
    fireEvent.click(screen.getByRole('checkbox', { name: /profilazione|marketing/i }))
    fireEvent.click(screen.getByRole('button', { name: /salva preferenze/i }))

    expect(document.cookie).not.toMatch(/mkt_attr=[^;]+/)
    expect(getAttribution()).toEqual({})
  })

  it('cancelling with the X after reopening keeps the attribution (cancel is not revoke)', () => {
    setUrl('http://localhost:3000/?gclid=ABC123')
    render(
      <>
        <OpenCookiePreferencesButton />
        <CookieBanner />
      </>,
    )
    fireEvent.click(screen.getByRole('button', { name: /accetta tutti/i }))

    fireEvent.click(screen.getByRole('button', { name: /gestisci le preferenze sui cookie/i }))
    fireEvent.click(screen.getByRole('checkbox', { name: /profilazione|marketing/i }))
    fireEvent.click(screen.getByRole('button', { name: /chiudi/i }))

    expect(getAttribution()).toEqual({ gclid: 'ABC123' })
  })
})
