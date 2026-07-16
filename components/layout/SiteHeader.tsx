'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './MobileMenu'
import { brand } from '@/lib/brand'

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Soft scroll shadow — mirrors site.js initHeader
  useEffect(() => {
    function update() {
      headerRef.current?.classList.toggle('scrolled', window.scrollY > 8)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <>
      <a className="skip-link" href="#contenuto">Salta al contenuto</a>

      <header ref={headerRef} className="site-header">
        <div className="wrap">
          <Link className="brand" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand-logo"
              src={brand.logo.header}
              alt={brand.logo.alt}
              width={160}
              height={44}
            />
          </Link>

          <MegaMenu />

          <div className="header-cta">
            {brand.header.showPhone && (
              <a
                className="header-tel"
                href={brand.contacts.telHref}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  color: '#1F1F1F',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '13.5px',
                  whiteSpace: 'nowrap',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#993C1D"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 14, height: 14, flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                </svg>
                {brand.contacts.telDisplay}
              </a>
            )}
            <a className="login-link" href="https://app.schoolr.net/">Accedi</a>
            <a className="btn btn-primary" href={brand.header.primaryCta.href}>{brand.header.primaryCta.label}</a>
          </div>

          <button
            className="nav-toggle"
            aria-label={mobileOpen ? 'Chiudi il menu' : 'Apri il menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(v => !v)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </header>

      <span id="contenuto" tabIndex={-1} />

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  )
}
