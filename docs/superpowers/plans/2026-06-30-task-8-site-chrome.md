# Task 8: Site Chrome (Navigation Data + SiteHeader/MegaMenu/MobileMenu/Footer) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the Diploma360 showcase site header (logo, mega-menu, mobile menu) and footer as React components, with accessible keyboard navigation, backed by typed nav data.

**Architecture:** `data/navigazione.ts` exports two `NavGroup[]` arrays (header columns + footer columns). `SiteHeader` is a `'use client'` component that manages mobile-menu open state and renders both the `<header>` element and a sibling `<MobileMenu>` in a Fragment. `MegaMenu` is a `'use client'` child component with per-item `open` state, ported from `js/site.js` `initMega`. `Footer` is a pure server component. All four use existing `site.css` classes; component `.module.css` files provide only component-scoped overrides.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, `next/link`, Vitest + @testing-library/react + happy-dom.

## Global Constraints

- `NavGroup = { label: string; items: { label: string; href: string }[] }` — exact type, no extensions.
- All hrefs use clean routes, never `*.html` (e.g. `/come-funziona`, `/sedi-esame`, `/privacy`).
- Primary CTA: text **"Chiama ora"** → `href="tel:0684280999"` (verbatim).
- Logo: `<img class="brand-logo" src="/assets-vetrina/logo-diploma360.png" alt="Diploma360 — Powered by LaScuola360">`.
- Footer company data VERBATIM: `Classme S.r.l.`, `P.IVA 15441141007`, `Viale Castrense 5, 00182 Roma`, `info@diploma360.it`.
- Contacts: `tel:0684280999`, `https://wa.me/393517214644`, `info@diploma360.it`.
- Footer legal links must contain `/privacy`, `/cookie`, `/termini`.
- NEVER introduce "MIM"/"MIUR", "senza interessi", or AI claims.
- Single commit message: `feat(layout): header/mega-menu/mobile/footer + nav data`.
- Test runner: `npm test` (vitest run). Focused runs: `npm test -- <path>`.

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `data/navigazione.ts` | Create | `NavGroup` type + `headerNav` (mega-menu columns) + `footerNav` (footer columns + legal) |
| `data/navigazione.test.ts` | Create | Non-empty header, no `.html` hrefs, footer has /privacy,/cookie,/termini |
| `components/layout/SiteHeader.tsx` | Create | `'use client'` — manages `mobileOpen` state, renders `<header>` + `<MobileMenu>` Fragment |
| `components/layout/SiteHeader.module.css` | Create | Scroll shadow (`.scrolled`) override only |
| `components/layout/MegaMenu.tsx` | Create | `'use client'` — `openIndex` state, aria-expanded/aria-controls, keyboard nav from `initMega` |
| `components/layout/MegaMenu.module.css` | Create | Minimal (bulk styling comes from `site.css`) |
| `components/layout/MobileMenu.tsx` | Create | `'use client'` — receives `isOpen`/`onClose` props, `<details>/<summary>` accordion |
| `components/layout/MobileMenu.module.css` | Create | Minimal (site.css handles `.mobile-menu.open`) |
| `components/layout/Footer.tsx` | Create | Server component — company data, footerNav columns, legal row |
| `components/layout/Footer.module.css` | Create | Minimal |
| `components/layout/SiteHeader.test.tsx` | Create | "Chiama ora" link has `href="tel:0684280999"` |
| `components/layout/MegaMenu.test.tsx` | Create | Clicking parent toggles `aria-expanded`; Esc closes; ArrowDown opens |
| `components/layout/Footer.test.tsx` | Create | Legal links rendered; company data visible |

---

## Data Model

`headerNav` groups = **mega-menu columns** (label = column heading). The MegaMenu component maps column groups to top-level nav items via an internal `MEGA_NAV` constant.

```
headerNav:
  { label: 'Il metodo',        items: [ metodo-diploma360, piattaforma ] }
  { label: 'Diploma ed esami', items: [ esami-diploma, esami-normativa, iscrizioni, sedi-esame ] }
  { label: 'Diploma360',       items: [ chi-siamo, credibilita, partner, contatti ] }

footerNav:
  { label: 'Percorso',  items: [ come-funziona, diplomi, esami-diploma, sedi-esame, prezzi ] }
  { label: 'Diploma360', items: [ chi-siamo, credibilita, iscrizioni, faq, contatti ] }
  { label: 'Contatti',  items: [ tel, whatsapp, email ] }
  { label: 'Legale',    items: [ /privacy, /cookie, /termini ] }
```

---

## Task 1: Nav Data Tests + Failing Baseline

**Files:**
- Create: `data/navigazione.test.ts`

**Interfaces:**
- Consumes: `data/navigazione.ts` (does not exist yet — tests must fail)
- Produces: failing test baseline to build against

- [ ] **Step 1: Write the failing tests**

Create `data/navigazione.test.ts`:

```ts
import { it, expect } from 'vitest'
import { headerNav, footerNav } from './navigazione'

it('header is non-empty and all hrefs are clean routes', () => {
  expect(headerNav.length).toBeGreaterThan(0)
  for (const g of headerNav) {
    for (const i of g.items) {
      expect(i.href.endsWith('.html')).toBe(false)
    }
  }
})

it('footer links to legal pages', () => {
  const hrefs = footerNav.flatMap(g => g.items.map(i => i.href))
  expect(hrefs).toEqual(expect.arrayContaining(['/privacy', '/cookie', '/termini']))
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site && npm test -- data/navigazione.test.ts
```

Expected: FAIL — "Cannot find module './navigazione'"

---

## Task 2: Implement Nav Data

**Files:**
- Create: `data/navigazione.ts`

**Interfaces:**
- Produces:
  - `export type NavGroup = { label: string; items: { label: string; href: string }[] }`
  - `export const headerNav: NavGroup[]` — 3 column groups
  - `export const footerNav: NavGroup[]` — 4 groups (Percorso, Diploma360, Contatti, Legale)

- [ ] **Step 1: Implement `data/navigazione.ts`**

```ts
export type NavGroup = {
  label: string
  items: { label: string; href: string }[]
}

/** Mega-menu columns. MegaMenu maps these to top-level nav items via MEGA_NAV. */
export const headerNav: NavGroup[] = [
  // ── Come funziona dropdown ────────────────────────────────────────────────
  {
    label: 'Il metodo',
    items: [
      { label: 'Il metodo Diploma360', href: '/come-funziona' },
      { label: 'La piattaforma', href: '/piattaforma' },
    ],
  },
  {
    label: 'Diploma ed esami',
    items: [
      { label: 'Il valore del diploma', href: '/esami-diploma' },
      { label: 'Esami e normativa', href: '/esami-normativa' },
      { label: 'Iscrizioni', href: '/iscrizioni' },
      { label: "Sedi d'esame", href: '/sedi-esame' },
    ],
  },
  // ── Chi siamo dropdown ────────────────────────────────────────────────────
  {
    label: 'Diploma360',
    items: [
      { label: 'Chi siamo', href: '/chi-siamo' },
      { label: 'Perché fidarti', href: '/credibilita' },
      { label: 'Partner', href: '/chi-siamo#partner' },
      { label: 'Lavora con noi', href: '/contatti' },
    ],
  },
]

/** Footer column groups. "Legale" items satisfy the /privacy,/cookie,/termini test. */
export const footerNav: NavGroup[] = [
  {
    label: 'Percorso',
    items: [
      { label: 'Come funziona', href: '/come-funziona' },
      { label: 'Diplomi e indirizzi', href: '/diplomi' },
      { label: 'Esami e diploma', href: '/esami-diploma' },
      { label: "Sedi d'esame", href: '/sedi-esame' },
      { label: 'Prezzi e piani', href: '/prezzi' },
    ],
  },
  {
    label: 'Diploma360',
    items: [
      { label: 'Chi siamo', href: '/chi-siamo' },
      { label: 'Perché fidarti', href: '/credibilita' },
      { label: 'Iscrizioni', href: '/iscrizioni' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contatti', href: '/contatti' },
    ],
  },
  {
    label: 'Contatti',
    items: [
      { label: '06 84 280 999', href: 'tel:0684280999' },
      { label: 'WhatsApp 351 721 4644', href: 'https://wa.me/393517214644' },
      { label: 'info@diploma360.it', href: 'mailto:info@diploma360.it' },
    ],
  },
  {
    label: 'Legale',
    items: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Cookie', href: '/cookie' },
      { label: 'Termini', href: '/termini' },
    ],
  },
]
```

- [ ] **Step 2: Run nav data tests — verify they pass**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site && npm test -- data/navigazione.test.ts
```

Expected: 2 tests PASS.

---

## Task 3: SiteHeader + MegaMenu Tests (RED)

**Files:**
- Create: `components/layout/SiteHeader.test.tsx`
- Create: `components/layout/MegaMenu.test.tsx`

**Interfaces:**
- Consumes: `SiteHeader` and `MegaMenu` (do not exist yet)
- Produces: failing tests to drive implementation

- [ ] **Step 1: Create `components/layout/SiteHeader.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { it, expect } from 'vitest'
import { SiteHeader } from './SiteHeader'

it('shows the primary call CTA', () => {
  render(<SiteHeader />)
  const cta = screen.getByRole('link', { name: /chiama ora/i })
  expect(cta).toHaveAttribute('href', 'tel:0684280999')
})

it('renders the brand logo', () => {
  render(<SiteHeader />)
  const logo = screen.getByAltText(/diploma360/i)
  expect(logo).toBeInTheDocument()
})
```

- [ ] **Step 2: Create `components/layout/MegaMenu.test.tsx`**

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import { MegaMenu } from './MegaMenu'

describe('MegaMenu accessibility', () => {
  it('trigger starts with aria-expanded="false"', () => {
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /come funziona/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('clicking a parent trigger sets aria-expanded to true', () => {
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /come funziona/i })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('clicking the same trigger again closes it (aria-expanded false)', () => {
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /come funziona/i })
    fireEvent.click(trigger)
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('clicking one trigger closes another', () => {
    render(<MegaMenu />)
    const come = screen.getByRole('button', { name: /come funziona/i })
    const chi = screen.getByRole('button', { name: /chi siamo/i })
    fireEvent.click(come)
    fireEvent.click(chi)
    expect(come).toHaveAttribute('aria-expanded', 'false')
    expect(chi).toHaveAttribute('aria-expanded', 'true')
  })

  it('Escape key closes the open mega panel', () => {
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /come funziona/i })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(trigger, { key: 'Escape' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('trigger has aria-haspopup and aria-controls', () => {
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /come funziona/i })
    expect(trigger).toHaveAttribute('aria-haspopup', 'true')
    expect(trigger).toHaveAttribute('aria-controls')
  })
})
```

- [ ] **Step 3: Run to confirm RED**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site && npm test -- components/layout/SiteHeader.test.tsx components/layout/MegaMenu.test.tsx
```

Expected: FAIL — "Cannot find module './SiteHeader'" and "./MegaMenu".

---

## Task 4: Implement MegaMenu

**Files:**
- Create: `components/layout/MegaMenu.tsx`
- Create: `components/layout/MegaMenu.module.css`

**Interfaces:**
- Consumes: `headerNav` from `@/data/navigazione`
- Produces: `export function MegaMenu()` — `<nav class="mainnav">` with accessible dropdowns

- [ ] **Step 1: Create `components/layout/MegaMenu.module.css`**

```css
/* MegaMenu.module.css — bulk styling from site.css; this file is a placeholder */
/* Add component-specific overrides here only if needed */
```

- [ ] **Step 2: Create `components/layout/MegaMenu.tsx`**

```tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { headerNav } from '@/data/navigazione'

/** Maps top-level nav items to their column group labels in headerNav. */
const MEGA_NAV = [
  { label: 'Come funziona', groupLabels: ['Il metodo', 'Diploma ed esami'] },
  { label: 'Chi siamo', groupLabels: ['Diploma360'] },
] as const

export function MegaMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (!(e.target as Element).closest('.mainnav .navitem')) {
        setOpenIndex(null)
      }
    }
    function handleGlobalEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('keydown', handleGlobalEsc)
    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('keydown', handleGlobalEsc)
    }
  }, [])

  return (
    <nav className="mainnav">
      <Link className="navlink" href="/">Home</Link>

      {MEGA_NAV.map((topItem, i) => {
        const cols = topItem.groupLabels
          .map(gl => headerNav.find(g => g.label === gl))
          .filter((g): g is NonNullable<typeof g> => Boolean(g))
        const panelId = `mega-${i + 1}`
        const isOpen = openIndex === i

        function open() { setOpenIndex(i) }
        function close() { setOpenIndex(null) }
        function toggle() { isOpen ? close() : open() }

        function handleKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault()
            toggle()
          } else if (e.key === 'ArrowDown' || e.key === 'Down') {
            e.preventDefault()
            open()
            const panel = document.getElementById(panelId)
            const first = panel?.querySelector<HTMLAnchorElement>('a')
            first?.focus()
          } else if (e.key === 'Escape' || e.key === 'Esc') {
            close()
          }
        }

        function handlePanelKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
          if (e.key === 'Escape' || e.key === 'Esc') {
            close()
            document
              .querySelector<HTMLElement>(`[aria-controls="${panelId}"]`)
              ?.focus()
          }
        }

        return (
          <div key={topItem.label} className={`navitem${isOpen ? ' open' : ''}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              className="navlink"
              role="button"
              tabIndex={0}
              aria-haspopup="true"
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-controls={panelId}
              onClick={(e) => { e.preventDefault(); toggle() }}
              onKeyDown={handleKeyDown}
            >
              {topItem.label}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="chev"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
            <div id={panelId} className="mega" onKeyDown={handlePanelKeyDown}>
              <div className="mega-cols">
                {cols.map(col => (
                  <div key={col.label} className="mega-col">
                    <div className="mega-h">{col.label}</div>
                    {col.items.map(item => (
                      <Link key={item.href} className="mega-link" href={item.href}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      <Link className="navlink" href="/diplomi">Diplomi</Link>
      <Link className="navlink" href="/prezzi">Prezzi</Link>
    </nav>
  )
}
```

- [ ] **Step 3: Run MegaMenu tests — verify they pass**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site && npm test -- components/layout/MegaMenu.test.tsx
```

Expected: 6 tests PASS.

---

## Task 5: Implement MobileMenu

**Files:**
- Create: `components/layout/MobileMenu.tsx`
- Create: `components/layout/MobileMenu.module.css`

**Interfaces:**
- Consumes: `headerNav` from `@/data/navigazione`
- Produces: `export function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void })`

- [ ] **Step 1: Create `components/layout/MobileMenu.module.css`**

```css
/* MobileMenu.module.css — site.css handles .mobile-menu and .mobile-menu.open */
```

- [ ] **Step 2: Create `components/layout/MobileMenu.tsx`**

```tsx
'use client'

import Link from 'next/link'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: Props) {
  function handleLinkClick() {
    onClose()
  }

  return (
    <div
      id="mobile-nav"
      className={`mobile-menu${isOpen ? ' open' : ''}`}
      aria-hidden={!isOpen}
    >
      <Link className="m-flat" href="/" onClick={handleLinkClick}>
        Home
      </Link>

      <details className="m-grp">
        <summary>
          Come funziona
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mchev"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </summary>
        <div className="m-sub">
          <Link href="/come-funziona" onClick={handleLinkClick}>Il metodo Diploma360</Link>
          <Link href="/piattaforma" onClick={handleLinkClick}>La piattaforma</Link>
          <Link href="/esami-diploma" onClick={handleLinkClick}>Il valore del diploma</Link>
          <Link href="/esami-normativa" onClick={handleLinkClick}>Esami e normativa</Link>
          <Link href="/iscrizioni" onClick={handleLinkClick}>Iscrizioni</Link>
          <Link href="/sedi-esame" onClick={handleLinkClick}>Sedi d&apos;esame</Link>
        </div>
      </details>

      <Link className="m-flat" href="/diplomi" onClick={handleLinkClick}>
        Diplomi
      </Link>
      <Link className="m-flat" href="/prezzi" onClick={handleLinkClick}>
        Prezzi
      </Link>

      <details className="m-grp">
        <summary>
          Chi siamo
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mchev"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </summary>
        <div className="m-sub">
          <Link href="/chi-siamo" onClick={handleLinkClick}>Chi siamo</Link>
          <Link href="/credibilita" onClick={handleLinkClick}>Perché fidarti</Link>
          <Link href="/chi-siamo#partner" onClick={handleLinkClick}>Partner</Link>
          <Link href="/contatti" onClick={handleLinkClick}>Lavora con noi</Link>
        </div>
      </details>

      <Link
        className="btn btn-primary btn-block"
        href="/contatti"
        style={{ marginTop: 12 }}
        onClick={handleLinkClick}
      >
        Scopri il tuo percorso
      </Link>
    </div>
  )
}
```

---

## Task 6: Implement SiteHeader

**Files:**
- Create: `components/layout/SiteHeader.tsx`
- Create: `components/layout/SiteHeader.module.css`

**Interfaces:**
- Consumes: `MegaMenu`, `MobileMenu`
- Produces: `export function SiteHeader()` — Fragment of `<header>` + `<MobileMenu>`

- [ ] **Step 1: Create `components/layout/SiteHeader.module.css`**

```css
/* SiteHeader.module.css */
/* site.css handles .site-header and .site-header.scrolled;
   scroll class is toggled via the useEffect below */
```

- [ ] **Step 2: Create `components/layout/SiteHeader.tsx`**

```tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { MegaMenu } from './MegaMenu'
import { MobileMenu } from './MobileMenu'

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Soft shadow after scroll — mirrors site.js initHeader
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
      <header ref={headerRef} className="site-header">
        <div className="wrap">
          <Link className="brand" href="/">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="brand-logo"
              src="/assets-vetrina/logo-diploma360.png"
              alt="Diploma360 — Powered by LaScuola360"
              width={160}
              height={44}
            />
          </Link>

          <MegaMenu />

          <div className="header-cta">
            <a
              className="header-tel"
              href="tel:0684280999"
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
              06 84 280 999
            </a>
            <a className="login-link" href="#">Accedi</a>
            <a className="btn btn-primary" href="tel:0684280999">Chiama ora</a>
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

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  )
}
```

- [ ] **Step 3: Run SiteHeader tests — verify they pass**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site && npm test -- components/layout/SiteHeader.test.tsx
```

Expected: 2 tests PASS.

---

## Task 7: Footer Tests (RED) + Implementation

**Files:**
- Create: `components/layout/Footer.test.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/Footer.module.css`

**Interfaces:**
- Consumes: `footerNav` from `@/data/navigazione`
- Produces: `export function Footer()` — server component

- [ ] **Step 1: Create `components/layout/Footer.test.tsx`** (RED first)

```tsx
import { render, screen } from '@testing-library/react'
import { it, expect } from 'vitest'
import { Footer } from './Footer'

it('renders company legal name', () => {
  render(<Footer />)
  expect(screen.getByText(/Classme S\.r\.l\./i)).toBeInTheDocument()
})

it('renders VAT number', () => {
  render(<Footer />)
  expect(screen.getByText(/P\.IVA 15441141007/i)).toBeInTheDocument()
})

it('renders address', () => {
  render(<Footer />)
  expect(screen.getByText(/Viale Castrense 5/i)).toBeInTheDocument()
})

it('has a link to /privacy', () => {
  render(<Footer />)
  const link = screen.getByRole('link', { name: /privacy/i })
  expect(link).toHaveAttribute('href', '/privacy')
})

it('has a link to /cookie', () => {
  render(<Footer />)
  const link = screen.getByRole('link', { name: /cookie/i })
  expect(link).toHaveAttribute('href', '/cookie')
})

it('has a link to /termini', () => {
  render(<Footer />)
  const link = screen.getByRole('link', { name: /termini/i })
  expect(link).toHaveAttribute('href', '/termini')
})
```

- [ ] **Step 2: Run to verify it fails**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site && npm test -- components/layout/Footer.test.tsx
```

Expected: FAIL — "Cannot find module './Footer'"

- [ ] **Step 3: Create `components/layout/Footer.module.css`**

```css
/* Footer.module.css — bulk styling from site.css .site-footer */
```

- [ ] **Step 4: Create `components/layout/Footer.tsx`**

```tsx
import Link from 'next/link'
import { footerNav } from '@/data/navigazione'

/** Footer content columns: all groups except 'Legale' (rendered in footer-bottom). */
const COLUMN_LABELS = ['Percorso', 'Diploma360', 'Contatti'] as const

export function Footer() {
  const columns = COLUMN_LABELS.map(
    label => footerNav.find(g => g.label === label)!
  )
  const legalGroup = footerNav.find(g => g.label === 'Legale')!

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          {/* Brand column */}
          <div className="footer-brand">
            <div className="brand">
              <span className="brand-mark">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12c0 5-4 9-9 9s-9-4-9-9 4-9 9-9c3 0 5.5 1.5 7 3.5" />
                  <polyline points="22 3 22 8 17 8" />
                </svg>
              </span>
              <span className="brand-txt">
                <span className="brand-name">Diploma360</span>
                <span className="brand-sub" style={{ color: '#80868F' }}>
                  Powered by LaScuola360
                  <br />
                  <small style={{ fontSize: 10, opacity: 0.8 }}>
                    Network di servizi educativi
                  </small>
                </span>
              </span>
            </div>
            <p>
              Recupera gli anni persi e preparati al diploma senza stress, con un percorso
              online costruito sulla tua situazione e tutor che ti seguono fino agli esami.
            </p>
          </div>

          {/* Nav columns */}
          {columns.map(col => (
            <div key={col.label} className="fcol">
              <h4>{col.label}</h4>
              {col.items.map(item => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 Diploma360 · Classme S.r.l. · P.IVA 15441141007 · Viale Castrense 5, 00182 Roma
          </div>
          <div>
            {legalGroup.items.map((item, i) => (
              <span key={item.href}>
                {i > 0 && ' · '}
                <Link href={item.href}>{item.label}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 5: Run Footer tests — verify they pass**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site && npm test -- components/layout/Footer.test.tsx
```

Expected: 6 tests PASS.

---

## Task 8: Full Test Suite + Commit

**Interfaces:**
- Consumes: all files created in Tasks 1–7
- Produces: clean test run + one commit

- [ ] **Step 1: Run the full test suite**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site && npm test
```

Expected: All tests pass (navigazione × 2, SiteHeader × 2, MegaMenu × 6, Footer × 6, plus existing tests).

- [ ] **Step 2: Fix any failures before committing**

If TypeScript errors: run `npx tsc --noEmit` and fix them.
If test failures: diagnose and fix; do not proceed with a red suite.

- [ ] **Step 3: Stage and commit**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site && git add data/navigazione.ts data/navigazione.test.ts components/layout/ && git commit -m "feat(layout): header/mega-menu/mobile/footer + nav data"
```

Expected: commit created. Run `git log --oneline -3` to confirm.

---

## Self-Review

### Spec Coverage

| Requirement | Covered By |
|-------------|-----------|
| `NavGroup` type + `headerNav`/`footerNav` exports | Task 2 |
| All hrefs clean routes (no `.html`) | Task 2 data + navigazione.test.ts |
| Logo with "Powered by LaScuola360" alt | Task 6 SiteHeader |
| "Chiama ora" → `tel:0684280999` | Task 6 SiteHeader |
| Mega-menu click + keyboard (Enter/Space/ArrowDown/Esc) | Task 4 MegaMenu |
| `aria-expanded`/`aria-controls`/`aria-haspopup` | Task 4 MegaMenu |
| Esc in panel returns focus to trigger | Task 4 MegaMenu |
| Click outside closes all | Task 4 MegaMenu (useEffect) |
| MobileMenu toggle with aria | Task 5+6 (aria-expanded on button, aria-hidden on panel) |
| Footer: Classme S.r.l., P.IVA, address, email | Task 7 Footer |
| Legal links `/privacy`, `/cookie`, `/termini` | Task 2 (footerNav) + Task 7 Footer |
| "Sedi d'esame" under Come funziona › Diploma ed esami | Task 2 headerNav |
| "Perché fidarti" under Chi siamo › Diploma360 | Task 2 headerNav |
| No MIM/MIUR, no "senza interessi", no AI claims | Verified — none present |
| Single commit message | Task 8 |

### Placeholder Scan
No TBD, TODO, or "similar to" references. All steps contain complete code.

### Type Consistency
- `NavGroup` defined once in `data/navigazione.ts` and imported everywhere.
- `headerNav` consumed by `MegaMenu.tsx` (finds by `.label`).
- `footerNav` consumed by `Footer.tsx` (finds by `.label`).
- `MobileMenu` props: `{ isOpen: boolean; onClose: () => void }` — used consistently in SiteHeader.

### Known Concern
The `MobileMenu` hard-codes the nav links (not driven by `headerNav` data) because the mobile structure merges columns from the same dropdown — acceptable YAGNI since MobileMenu isn't part of the data contract tested. If the nav changes, both `headerNav` and `MobileMenu` would need updating — this is noted as a tech-debt item.
