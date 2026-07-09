'use client'

import Link from 'next/link'
import { getHeaderNav } from '@/data/navigazione'

interface Props {
  isOpen: boolean
  onClose: () => void
}

const ChevronDown = () => (
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
)

export function MobileMenu({ isOpen, onClose }: Props) {
  const nav = getHeaderNav()

  return (
    <div
      id="mobile-nav"
      className={`mobile-menu${isOpen ? ' open' : ''}`}
      aria-hidden={!isOpen}
    >
      {nav.map(item =>
        item.kind === 'link' ? (
          <Link key={item.label} className="m-flat" href={item.href} onClick={onClose}>
            {item.label}
          </Link>
        ) : (
          <details key={item.label} className="m-grp">
            <summary>
              {item.label}
              <ChevronDown />
            </summary>
            <div className="m-sub">
              {item.columns.map(col =>
                col.items.map(link => (
                  <Link key={link.href} href={link.href} onClick={onClose}>
                    {link.label}
                  </Link>
                ))
              )}
            </div>
          </details>
        )
      )}

      <Link
        className="btn btn-primary btn-block"
        href="/contatti"
        style={{ marginTop: 12 }}
        onClick={onClose}
      >
        Scopri il tuo percorso
      </Link>
    </div>
  )
}
