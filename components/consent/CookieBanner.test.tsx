import { render, screen, fireEvent } from '@testing-library/react'
import { vi, beforeEach, afterEach, it, expect, describe } from 'vitest'
vi.mock('@/lib/analytics', () => ({ applyConsent: vi.fn() }))
vi.mock('@/lib/attribution', () => ({ captureAttribution: vi.fn() }))
import { applyConsent } from '@/lib/analytics'
import { captureAttribution } from '@/lib/attribution'
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

describe('marketing attribution capture (mkt_attr) follows the choice', () => {
  // lib/attribution refuses to write without marketing consent, so on the landing page the
  // ad params are still in location.search but nothing has been captured yet. Whoever accepts
  // marketing must have the capture re-run right away, or the click id is lost for good.
  it('accept all re-runs the capture', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('button', { name: /accetta tutti/i }))
    expect(captureAttribution).toHaveBeenCalled()
  })

  it('saving preferences with marketing on re-runs the capture', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('checkbox', { name: /profilazione|marketing/i }))
    fireEvent.click(screen.getByRole('button', { name: /salva preferenze/i }))
    expect(captureAttribution).toHaveBeenCalled()
  })

  it('reject all does NOT capture', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('button', { name: /rifiuta tutti/i }))
    expect(captureAttribution).not.toHaveBeenCalled()
  })

  it('saving preferences with statistics only does NOT capture', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('checkbox', { name: /statistic/i }))
    fireEvent.click(screen.getByRole('button', { name: /salva preferenze/i }))
    expect(captureAttribution).not.toHaveBeenCalled()
  })

  it('closing with the X does NOT capture', () => {
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('button', { name: /chiudi/i }))
    expect(captureAttribution).not.toHaveBeenCalled()
  })

  it('the capture runs after the consent cookie is written, never before', () => {
    // Ordering matters: captureAttribution reads the consent cookie itself. Called before
    // writeConsent it would read the *old* value and skip the write entirely.
    let consentAtCaptureTime: string | null = null
    vi.mocked(captureAttribution).mockImplementation(() => {
      consentAtCaptureTime = readConsent() ? 'written' : 'missing'
    })
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('button', { name: /accetta tutti/i }))
    expect(consentAtCaptureTime).toBe('written')
  })
})

describe('a stored choice is re-applied at mount', () => {
  it('applies the stored choice on mount instead of leaving the page denied', () => {
    // The inline ConsentFromStorage script covers the normal returning visitor, but it runs
    // before the bundle and can only see a cookie that already exists.
    writeConsent({ statistics: true, marketing: true })
    render(<CookieBanner />)
    expect(applyConsent).toHaveBeenCalledWith(true, true)
  })

  it('applies a partial stored choice verbatim', () => {
    writeConsent({ statistics: true, marketing: false })
    render(<CookieBanner />)
    expect(applyConsent).toHaveBeenCalledWith(true, false)
  })

  it('applies the migrated choice on the page load that performs the migration', () => {
    // The migration path is the one the inline script cannot help with: at that point the
    // cookie does not exist yet, readConsent() creates it here — so without this, the whole
    // first page load after the migration stayed denied despite a stored consent.
    localStorage.setItem('d360_consent', 'all')
    render(<CookieBanner />)
    expect(applyConsent).toHaveBeenCalledWith(true, false)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('applies nothing at mount when no choice is stored (the banner asks instead)', () => {
    render(<CookieBanner />)
    expect(applyConsent).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})

describe('the X means "cancel", and cancel never revokes a stored choice', () => {
  it('closing a REOPENED banner leaves the stored choice untouched and applies nothing', () => {
    // Regression: handleClose used to call applyConsent(false, false) unconditionally. On a
    // banner reopened from the footer that silently pushed the tags to denied for the rest of
    // the SPA session while the cookie still said granted — UI and tags out of sync, and the
    // user had asked to cancel, not to revoke.
    writeConsent({ statistics: true, marketing: true })
    render(<CookieBanner />)
    fireEvent(document, new Event('d360:open-cookie-banner'))
    vi.mocked(applyConsent).mockClear()

    fireEvent.click(screen.getByRole('button', { name: /chiudi/i }))

    expect(applyConsent).not.toHaveBeenCalled()
    expect(readConsent()).toEqual({ statistics: true, marketing: true })
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('discards unsaved toggles instead of persisting them', () => {
    writeConsent({ statistics: true, marketing: false })
    render(<CookieBanner />)
    fireEvent(document, new Event('d360:open-cookie-banner'))
    vi.mocked(applyConsent).mockClear() // mount re-applies the stored choice; not what this asserts

    fireEvent.click(screen.getByRole('checkbox', { name: /profilazione|marketing/i }))
    fireEvent.click(screen.getByRole('button', { name: /chiudi/i }))

    expect(readConsent()).toEqual({ statistics: true, marketing: false })
    expect(applyConsent).not.toHaveBeenCalled()
  })

  it('still applies the session-only denied when nothing was ever stored', () => {
    // First visit: closing is not a choice, so the tags stay denied for this session and no
    // cookie is written — the banner has to come back next time.
    render(<CookieBanner />)
    fireEvent.click(screen.getByRole('button', { name: /chiudi/i }))

    expect(applyConsent).toHaveBeenCalledWith(false, false)
    expect(readConsent()).toBeNull()
  })
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
