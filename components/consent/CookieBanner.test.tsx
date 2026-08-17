import { render, screen, fireEvent } from '@testing-library/react'
import { vi, beforeEach, afterEach, it, expect, describe } from 'vitest'
vi.mock('@/lib/analytics', () => ({ applyConsent: vi.fn() }))
import { applyConsent } from '@/lib/analytics'
import { writeConsent, readConsent } from '@/lib/consent'
import { CookieBanner } from './CookieBanner'

function clearAllCookies() {
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0]?.trim())
    .filter((n): n is string => !!n)
  for (const name of names) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/`
  }
}

beforeEach(() => {
  clearAllCookies()
  localStorage.clear()
  vi.clearAllMocks()
})

afterEach(() => {
  clearAllCookies()
  localStorage.clear()
})

it('visible at mount when no consent is stored', () => {
  render(<CookieBanner />)
  expect(screen.getByRole('dialog', { name: /preferenze cookie/i })).toBeInTheDocument()
})

it('hidden at mount once a choice is already stored', () => {
  writeConsent({ statistics: true, marketing: false })
  render(<CookieBanner />)
  expect(screen.queryByRole('dialog')).toBeNull()
})

it('the "necessari" category is shown as always-on and not disableable', () => {
  render(<CookieBanner />)
  const necessari = screen.getByRole('checkbox', { name: /necessari/i })
  expect(necessari).toBeChecked()
  expect(necessari).toBeDisabled()
})

it('"Rifiuta tutti" and "Accetta tutti" carry the same button class (equal visual weight)', () => {
  render(<CookieBanner />)
  const reject = screen.getByRole('button', { name: /rifiuta tutti/i })
  const accept = screen.getByRole('button', { name: /accetta tutti/i })
  expect(reject.className).toBe(accept.className)
})

it('accept all writes full consent and applies it', () => {
  render(<CookieBanner />)
  fireEvent.click(screen.getByRole('button', { name: /accetta tutti/i }))
  expect(readConsent()).toEqual({ statistics: true, marketing: true })
  expect(applyConsent).toHaveBeenCalledWith(true, true)
  expect(screen.queryByRole('dialog')).toBeNull()
})

it('reject all writes no-consent (both false) and applies it — it is NOT a no-op', () => {
  render(<CookieBanner />)
  fireEvent.click(screen.getByRole('button', { name: /rifiuta tutti/i }))
  expect(readConsent()).toEqual({ statistics: false, marketing: false })
  expect(applyConsent).toHaveBeenCalledWith(false, false)
  expect(screen.queryByRole('dialog')).toBeNull()
})

it('granular: toggling statistica then saving preferences applies only statistics', () => {
  render(<CookieBanner />)
  fireEvent.click(screen.getByRole('checkbox', { name: /statistic/i }))
  fireEvent.click(screen.getByRole('button', { name: /salva preferenze/i }))
  expect(readConsent()).toEqual({ statistics: true, marketing: false })
  expect(applyConsent).toHaveBeenCalledWith(true, false)
  expect(screen.queryByRole('dialog')).toBeNull()
})

it('granular: toggling marketing then saving preferences applies only marketing', () => {
  render(<CookieBanner />)
  fireEvent.click(screen.getByRole('checkbox', { name: /profilazione|marketing/i }))
  fireEvent.click(screen.getByRole('button', { name: /salva preferenze/i }))
  expect(readConsent()).toEqual({ statistics: false, marketing: true })
  expect(applyConsent).toHaveBeenCalledWith(false, true)
})

it('closing without choosing applies only-technical for the session, writes NO cookie, and hides the banner', () => {
  render(<CookieBanner />)
  fireEvent.click(screen.getByRole('button', { name: /chiudi/i }))
  expect(readConsent()).toBeNull()
  expect(applyConsent).toHaveBeenCalledWith(false, false)
  expect(screen.queryByRole('dialog')).toBeNull()
})

it('none of the interactions ever touch localStorage (no legacy residue)', () => {
  render(<CookieBanner />)
  fireEvent.click(screen.getByRole('button', { name: /accetta tutti/i }))
  expect(localStorage.getItem('d360_consent')).toBeNull()
  expect(localStorage.length).toBe(0)

  writeConsent({ statistics: false, marketing: false })
  fireEvent(document, new Event('d360:open-cookie-banner'))
  fireEvent.click(screen.getByRole('button', { name: /rifiuta tutti/i }))
  expect(localStorage.length).toBe(0)

  fireEvent(document, new Event('d360:open-cookie-banner'))
  fireEvent.click(screen.getByRole('checkbox', { name: /statistic/i }))
  fireEvent.click(screen.getByRole('button', { name: /salva preferenze/i }))
  expect(localStorage.length).toBe(0)

  fireEvent(document, new Event('d360:open-cookie-banner'))
  fireEvent.click(screen.getByRole('button', { name: /chiudi/i }))
  expect(localStorage.length).toBe(0)
})

describe('reopening via d360:open-cookie-banner', () => {
  it('reopens the (already-hidden) banner precompiled with the stored choice', () => {
    writeConsent({ statistics: true, marketing: false })
    render(<CookieBanner />)
    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent(document, new Event('d360:open-cookie-banner'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /statistic/i })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /profilazione|marketing/i })).not.toBeChecked()
  })

  it('reopens precompiled with both categories on when the stored choice was full consent', () => {
    writeConsent({ statistics: true, marketing: true })
    render(<CookieBanner />)

    fireEvent(document, new Event('d360:open-cookie-banner'))

    expect(screen.getByRole('checkbox', { name: /statistic/i })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /profilazione|marketing/i })).toBeChecked()
  })

  it('reopens with both categories defaulted to off when nothing was ever stored', () => {
    render(<CookieBanner />)
    // banner is already visible (no consent yet) — dismiss it first without writing anything
    fireEvent.click(screen.getByRole('button', { name: /chiudi/i }))
    expect(screen.queryByRole('dialog')).toBeNull()

    fireEvent(document, new Event('d360:open-cookie-banner'))

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /statistic/i })).not.toBeChecked()
    expect(screen.getByRole('checkbox', { name: /profilazione|marketing/i })).not.toBeChecked()
  })
})

it('the copy mentions marketing/profiling, not just statistics', () => {
  render(<CookieBanner />)
  expect(screen.getByRole('dialog').textContent?.toLowerCase()).toMatch(/marketing|profilazione/)
})
