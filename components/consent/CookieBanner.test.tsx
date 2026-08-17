import { render, screen, fireEvent } from '@testing-library/react'
import { vi, beforeEach, it, expect } from 'vitest'
vi.mock('@/lib/analytics', () => ({ applyConsent: vi.fn() }))
import { applyConsent } from '@/lib/analytics'
import { CookieBanner } from './CookieBanner'

beforeEach(() => {
  localStorage.clear()
  vi.clearAllMocks()
})

it('hidden once a choice is stored', () => {
  localStorage.setItem('d360_consent', 'all')
  render(<CookieBanner />)
  expect(screen.queryByText(/cookie/i)).toBeNull()
})
it('accept grants consent and persists', () => {
  render(<CookieBanner />)
  fireEvent.click(screen.getByRole('button', { name: /accetta/i }))
  expect(localStorage.getItem('d360_consent')).toBe('all')
  expect(applyConsent).toHaveBeenCalledWith(true, true)
})
it('reject persists necessary and does NOT apply consent', () => {
  render(<CookieBanner />)
  fireEvent.click(screen.getByRole('button', { name: /solo necessari/i }))
  expect(localStorage.getItem('d360_consent')).toBe('necessary')
  expect(applyConsent).not.toHaveBeenCalled()
})
