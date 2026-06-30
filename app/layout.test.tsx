/**
 * Root layout integration test.
 *
 * happy-dom normalises a rendered <html> element into the actual document
 * structure (head → document.head, body → document.body), so:
 *  - screen queries work against document.body as expected
 *  - ordering assertions use document.documentElement.outerHTML which
 *    contains the full serialised markup including <head> and <body>
 */

import { vi, it, expect, describe, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import React from 'react'

// Mock next/script BEFORE layout import so GtmScript renders its
// dangerouslySetInnerHTML content inline (enabling the ordering assertion)
vi.mock('next/script', () => ({
  default: ({
    id,
    dangerouslySetInnerHTML,
    children,
  }: {
    id?: string
    dangerouslySetInnerHTML?: { __html: string }
    children?: React.ReactNode
  }) => (
    <script id={id} dangerouslySetInnerHTML={dangerouslySetInnerHTML}>
      {children}
    </script>
  ),
}))

// Mock next/font/google — fonts are a build-time concern; tests only need the
// className and style objects the layout receives
vi.mock('next/font/google', () => ({
  Inter: () => ({ className: '__inter', style: { fontFamily: 'Inter' } }),
  Poppins: () => ({ className: '__poppins', style: { fontFamily: 'Poppins' } }),
}))

// CookieBanner pulls grantConsent from lib/analytics
vi.mock('@/lib/analytics', () => ({ grantConsent: vi.fn() }))

import RootLayout from './layout'

beforeEach(() => {
  // Clear localStorage so CookieBanner renders visible (no prior consent choice)
  localStorage.clear()
})

describe('RootLayout', () => {
  it('renders the header "Chiama ora" CTA', () => {
    render(
      <RootLayout>
        <div>contenuto pagina</div>
      </RootLayout>,
    )
    expect(screen.getByRole('link', { name: /chiama ora/i })).toBeInTheDocument()
  })

  it('renders the cookie banner', () => {
    render(
      <RootLayout>
        <div>contenuto pagina</div>
      </RootLayout>,
    )
    expect(screen.getByText(/rispettiamo la tua privacy/i)).toBeInTheDocument()
  })

  it('ConsentDefault appears before GtmScript in markup order', () => {
    render(
      <RootLayout>
        <div>contenuto pagina</div>
      </RootLayout>,
    )
    // happy-dom distributes <html> content into document.head / document.body,
    // so we read document.documentElement.outerHTML for the full source order
    const fullHtml = document.documentElement.outerHTML
    const consentIdx = fullHtml.indexOf("'consent','default'")
    const gtmIdx = fullHtml.indexOf('GTM-K5VMGM8C')
    expect(consentIdx, 'ConsentDefault script not found in document HTML').toBeGreaterThan(-1)
    expect(gtmIdx, 'GtmScript (GTM-K5VMGM8C) not found in document HTML').toBeGreaterThan(-1)
    expect(consentIdx, 'ConsentDefault must precede GtmScript in source order').toBeLessThan(
      gtmIdx,
    )
  })
})
