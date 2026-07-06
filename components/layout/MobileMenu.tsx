'use client'

import Link from 'next/link'
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
  return (
    <div
      id="mobile-nav"
      className={`mobile-menu${isOpen ? ' open' : ''}`}
      aria-hidden={!isOpen}
    >
      <Link className="m-flat" href="/" onClick={onClose}>
        Home
      </Link>

      <details className="m-grp">
        <summary>
          Come funziona
          <ChevronDown />
        </summary>
        <div className="m-sub">
          <Link href="/come-funziona" onClick={onClose}>Il metodo {brand.name}</Link>
          <Link href="/piattaforma" onClick={onClose}>La piattaforma</Link>
          <Link href="/esami-diploma" onClick={onClose}>Il valore del diploma</Link>
          <Link href="/esami-normativa" onClick={onClose}>Esami e normativa</Link>
          <Link href="/iscrizioni" onClick={onClose}>Iscrizioni</Link>
          <Link href="/sedi-esame" onClick={onClose}>Sedi d&apos;esame</Link>
        </div>
      </details>

      <Link className="m-flat" href="/diplomi" onClick={onClose}>
        Diplomi
      </Link>
      <Link className="m-flat" href="/prezzi" onClick={onClose}>
        Prezzi
      </Link>

      <details className="m-grp">
        <summary>
          Chi siamo
          <ChevronDown />
        </summary>
        <div className="m-sub">
          <Link href="/chi-siamo" onClick={onClose}>Chi siamo</Link>
          <Link href="/credibilita" onClick={onClose}>Perché fidarti</Link>
          <Link href="/chi-siamo#partner" onClick={onClose}>Partner</Link>
          <Link href="/contatti" onClick={onClose}>Lavora con noi</Link>
        </div>
      </details>

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
