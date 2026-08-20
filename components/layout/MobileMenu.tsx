'use client'

import Link from 'next/link'
import { getHeaderNav } from '@/data/navigazione'
import { brand } from '@/lib/brand'

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

      {/* Le azioni dell'header (.header-cta) sono nascoste sotto i 980px: qui sotto
          tornano disponibili, altrimenti da mobile non esiste alcun accesso a
          Accedi / alla CTA di brand. */}
      <div className="m-actions">
        <Link className="btn btn-primary btn-block" href="/contatti" onClick={onClose}>
          Scopri il tuo percorso
        </Link>
        <div className="m-actions-row">
          <a className="btn btn-out" href={brand.header.loginUrl} onClick={onClose}>
            Accedi
          </a>
          <a
            className="btn btn-out"
            href={brand.header.primaryCta.href}
            onClick={onClose}
          >
            {brand.header.primaryCta.label}
          </a>
        </div>
      </div>
    </div>
  )
}
