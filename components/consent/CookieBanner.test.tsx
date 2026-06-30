import { render, screen, fireEvent } from '@testing-library/react'
import { vi, beforeEach, it, expect } from 'vitest'
vi.mock('@/lib/analytics', () => ({ grantConsent: vi.fn() }))
import { grantConsent } from '@/lib/analytics'
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
  expect(grantConsent).toHaveBeenCalled()
})
it('reject persists necessary and does NOT grant consent', () => {
  render(<CookieBanner />)
  fireEvent.click(screen.getByRole('button', { name: /solo necessari/i }))
  expect(localStorage.getItem('d360_consent')).toBe('necessary')
  expect(grantConsent).not.toHaveBeenCalled()
})
