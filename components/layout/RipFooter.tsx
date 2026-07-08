import Link from 'next/link'
import './RipFooter.css'
import { brand } from '@/lib/brand'

/**
 * RipFooter — La Scuola360 footer, ported from
 * `materiale/consegna-valerio 2/RipFooter.dc.html`. Reuses the same
 * `.site-footer`/`.footer-top`/`.fcol`/`.footer-bottom` classes as the
 * the sibling brand's `Footer` (styles/site.css already matches the reference 1:1);
 * only the footer-exclusive disclaimer paragraph gets its own class
 * (`RipFooter.css`). Rendered on all La Scuola360 pages (Home, Chi siamo,
 * Ripetizioni, and the shared Diploma pages) via `BrandFooter`.
 */

const FOOTER_COLUMNS = [
  {
    label: 'Diploma',
    items: [
      { label: 'Come funziona', href: '/come-funziona' },
      { label: 'Diplomi e indirizzi', href: '/diplomi' },
      { label: 'Prezzi e piani', href: '/prezzi' },
    ],
  },
  {
    label: 'Ripetizioni',
    items: [
      { label: 'Come funziona', href: '/ripetizioni/come-funziona' },
      { label: 'Prezzi', href: '/ripetizioni/prezzi' },
      { label: 'Materie e DSA', href: '/ripetizioni/materie' },
    ],
  },
  {
    label: 'Contatti',
    items: [
      { label: brand.contacts.telDisplay, href: brand.contacts.telHref },
      { label: 'Scrivici su WhatsApp', href: brand.contacts.whatsappUrl },
      { label: 'Chi siamo', href: '/chi-siamo' },
    ],
  },
] as const

const LEGAL_LINKS = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Cookie', href: '/cookie' },
  { label: 'Termini', href: '/termini' },
] as const

export function RipFooter() {
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
                  strokeWidth={2.4}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 2v6h-6" />
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M21 22v-6h-6" />
                  <path d="M3 12a9 9 0 0 0 15 6.7L21 16" />
                </svg>
              </span>
              <span className="brand-txt">
                <span className="brand-name">{brand.name}</span>
              </span>
            </div>
            <p>
              La scuola online di Classme. Diploma e ripetizioni, con tutor reali e strumenti
              che tengono l&apos;ordine — il calore delle persone, la potenza della tecnologia.
            </p>
          </div>

          {/* Nav columns */}
          {FOOTER_COLUMNS.map(col => (
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
            © 2026 {brand.name} · Classme S.r.l. · P.IVA 15441141007 · Viale Castrense 5, 00182 Roma
          </div>
          <div>
            {LEGAL_LINKS.map((item, idx) => (
              <span key={item.href}>
                {idx > 0 && ' · '}
                <Link href={item.href}>{item.label}</Link>
              </span>
            ))}
          </div>
        </div>

        <p className="rip-footer-disclaimer">
          *Dati interni {brand.name}. I risultati possono variare in base alla situazione di
          partenza, al percorso scelto e all&apos;impegno dello studente.
        </p>
      </div>
    </footer>
  )
}
