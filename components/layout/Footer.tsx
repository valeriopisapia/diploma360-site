import Link from 'next/link'
import { footerNav } from '@/data/navigazione'
import { brand } from '@/lib/brand'

/** Footer column group labels rendered as nav columns. */
const COLUMN_LABELS = ['Percorso', brand.name, 'Contatti'] as const

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
                <span className="brand-name">{brand.name}</span>
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

          {/* Nav columns driven by footerNav */}
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
            © 2026 {brand.name} · Classme S.r.l. · P.IVA 15441141007 · Viale Castrense 5, 00182 Roma
          </div>
          <div>
            {legalGroup.items.map((item, idx) => (
              <span key={item.href}>
                {idx > 0 && ' · '}
                <Link href={item.href}>{item.label}</Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
