'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { headerNav } from '@/data/navigazione'

/**
 * Maps top-level nav items to their mega-menu column group labels in headerNav.
 * Columns are looked up by label to populate the dropdown panels.
 */
const MEGA_NAV = [
  { label: 'Come funziona', groupLabels: ['Il metodo', 'Diploma ed esami'] },
  { label: 'Chi siamo', groupLabels: ['Diploma360'] },
] as const

export function MegaMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Close all when clicking outside the nav or pressing global Esc
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

        function toggle() {
          setOpenIndex(prev => (prev === i ? null : i))
        }
        function close() {
          setOpenIndex(null)
        }

        function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLAnchorElement>) {
          if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault()
            toggle()
          } else if (e.key === 'ArrowDown' || e.key === 'Down') {
            e.preventDefault()
            setOpenIndex(i)
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
              onKeyDown={handleTriggerKeyDown}
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
