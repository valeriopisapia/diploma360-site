'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getHeaderNav, type NavItem } from '@/data/navigazione'
import styles from './MegaMenu.module.css'

export function MegaMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const nav = getHeaderNav()

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

  function renderMega(topItem: Extract<NavItem, { kind: 'mega' }>, i: number) {
    const cols = topItem.columns

    const panelId = `mega-${i}`
    const isOpen = openIndex === i

    function toggle() {
      setOpenIndex(prev => (prev === i ? null : i))
    }
    function close() {
      setOpenIndex(null)
    }

    // <button> natively fires click on Enter and Space, so we only handle
    // ArrowDown (open + focus first panel link) and Esc (close) here.
    // Removing Enter/Space prevents double-toggle via keydown + click.
    function handleTriggerKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
      if (e.key === 'ArrowDown' || e.key === 'Down') {
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
        <button
          type="button"
          className={`navlink ${styles.trigger}`}
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-controls={panelId}
          onClick={toggle}
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
        </button>

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
  }

  return (
    <nav className="mainnav">
      {nav.map((item, i) =>
        item.kind === 'link' ? (
          <Link key={item.label} className="navlink" href={item.href}>
            {item.label}
          </Link>
        ) : (
          renderMega(item, i)
        )
      )}
    </nav>
  )
}
