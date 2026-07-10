import { LeadForm } from './LeadForm'
import styles from './LeadSection.module.css'

type LeadSectionProps = {
  /** Green pill above the title. */
  flag?: string
  title?: string
  subtitle?: string
}

/**
 * Reusable "form in fondo" block — the same `.form-card` used in the hero, dropped at the
 * bottom of content pages that lack an in-page conversion form. Anchors `#lead` so on-page
 * CTAs can point to it. Vetrina origin (→ /grazie thank-you).
 */
export function LeadSection({
  flag = 'Gratis e senza impegno',
  title = 'Scopri gratis il tuo percorso.',
  subtitle = 'Lascia i dati: ti aiutiamo a capire anni recuperabili, indirizzo e costi.',
}: LeadSectionProps) {
  return (
    <section className={styles.section}>
      <div className="wrap">
        <div className={styles.inner}>
          <aside className="form-card" id="lead">
            <span className="form-flag">
              <span className="dotpulse" />
              {flag}
            </span>
            <h2>{title}</h2>
            <p className="form-sub">{subtitle}</p>
            <LeadForm origine="vetrina" showPerChi />
          </aside>
        </div>
      </div>
    </section>
  )
}
