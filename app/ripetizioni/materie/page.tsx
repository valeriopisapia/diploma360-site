import Image from 'next/image'
import Link from 'next/link'
import { assertBrand } from '@/lib/assertBrand'
import { JsonLd } from '@/components/seo/JsonLd'
import { RipForm } from '@/components/forms/RipForm'
import { Reveal, Counter } from '@/components/motion/Reveal'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import './materie.css'

/**
 * /ripetizioni/materie — La Scuola360 only (brand-exclusive; 404s on Diploma360).
 * Ported 1:1 from `materiale/consegna-valerio 2/Ripetizioni-Materie.dc.html`.
 * Anchors `#livello` and `#esigenza` are targeted by the header nav
 * (`data/navigazione.ts` → LASCUOLA_NAV "Per livello" / "Recupero debiti · aiuto compiti").
 */

export const metadata = buildMetadata({
  title: `Materie e DSA | Ripetizioni ${brand.name}`,
  description:
    `Ripetizioni per oltre 150 materie, dalle elementari all'università: scientifiche, umanistiche, lingue. Percorsi anche per DSA e BES, con tutor qualificati.`,
  path: '/ripetizioni/materie',
})

const SUBJECT_GROUPS = [
  {
    label: 'Scientifiche',
    tone: 'coral' as const,
    items: ['Matematica', 'Fisica', 'Chimica', 'Biologia', 'Informatica'],
  },
  {
    label: 'Umanistiche',
    tone: 'rosa' as const,
    items: ['Italiano', 'Latino', 'Greco', 'Storia', 'Filosofia'],
  },
  {
    label: 'Lingue',
    tone: 'coral' as const,
    items: ['Inglese', 'Spagnolo', 'Francese', 'Tedesco'],
  },
]

const LEVELS = [
  {
    title: 'Medie',
    desc: 'Metodo di studio e recupero delle basi, per arrivare pronti alle superiori.',
  },
  {
    title: 'Superiori',
    desc: 'Ogni materia e indirizzo, dal biennio fino alla maturità.',
  },
  {
    title: 'Università',
    desc: 'Preparazione esami e materie specifiche, con tutor della tua area.',
  },
]

const NEEDS = [
  { title: 'Aiuto compiti', desc: 'Supporto costante per compiti e verifiche.' },
  {
    title: 'Recupero debiti',
    desc: 'Piano mirato per chiudere il debito entro settembre.',
  },
  {
    title: 'DSA e BES',
    desc: 'Percorsi guidati, ordinati e sostenibili, con tutor formati.',
  },
  {
    title: 'Esami università',
    desc: 'Preparazione mirata a singoli esami e sessioni.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${brand.domain}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Ripetizioni',
      item: `${brand.domain}/ripetizioni/`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Materie e DSA',
      item: `${brand.domain}/ripetizioni/materie/`,
    },
  ],
}

export default function RipetizioniMateriePage() {
  assertBrand('lascuola360')

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Hero (no form) */}
      <section className="mat-hero-sec">
        <div className="wrap">
          <div className="mat-crumb">
            <Link href="/ripetizioni">Ripetizioni</Link> ›{' '}
            <span className="cur">Materie e DSA</span>
          </div>
          <div className="mat-hero-grid">
            <div>
              <span className="eyebrow">Ogni materia, ogni livello</span>
              <h1>
                Tutor per ogni materia, anche{' '}
                <span className="grad-text">DSA e BES</span>.
              </h1>
              <p className="lead">
                Copriamo oltre 150 materie, dalle elementari all&apos;università. Non
                scegli da una lista infinita: ci dici cosa ti serve e ti mettiamo in
                contatto con il tutor giusto.
              </p>
              <div className="mat-hero-cta">
                <a href="#lead" className="btn btn-primary">
                  Trova il tuo tutor
                </a>
                <Link href="/ripetizioni/prezzi" className="btn btn-white">
                  Vedi i prezzi
                </Link>
              </div>
            </div>
            <div className="mat-hero-img">
              <Image
                src="/lascuola360/testimonial-marta.jpg"
                alt={`Tutor ${brand.name}`}
                fill
                style={{ objectFit: 'cover' }}
              />
              <div className="mat-hero-badge">
                <div className="v grad-text">
                  <Counter value="150+" />
                </div>
                <div className="l">
                  materie
                  <br />
                  coperte
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gruppi materie */}
      <Reveal as="section" id="materie" className="section">
        <div className="wrap">
          <div className="mat-sec-head">
            <span className="eyebrow">Le materie</span>
            <h2>Dalle scientifiche alle lingue, c&apos;è un tutor per te.</h2>
          </div>
          <div className="grid grid-3">
            {SUBJECT_GROUPS.map((group) => (
              <div className="card" key={group.label}>
                <div className={`mat-group-label${group.tone === 'rosa' ? ' rosa' : ''}`}>
                  {group.label}
                </div>
                <div className="mat-pills">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className={`mat-pill${group.tone === 'rosa' ? ' rosa' : ''}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mat-more">
            …e oltre 150 materie.{' '}
            <a href="#lead">Non trovi la tua? Chiedi →</a>
          </p>
        </div>
      </Reveal>

      {/* Per livello */}
      <Reveal as="section" id="livello" className="section">
        <div className="wrap">
          <div className="mat-sec-head sm">
            <span className="eyebrow">Per livello scolastico</span>
            <h2>Dalle medie all&apos;università.</h2>
          </div>
          <div className="grid grid-3">
            {LEVELS.map((level) => (
              <div className="card mat-plain" key={level.title}>
                <h3>{level.title}</h3>
                <p>{level.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Per esigenza */}
      <Reveal as="section" id="esigenza" className="section">
        <div className="wrap">
          <div className="mat-sec-head sm">
            <span className="eyebrow">Per esigenza</span>
            <h2>Qualunque sia il tuo obiettivo.</h2>
          </div>
          <div className="grid grid-4">
            {NEEDS.map((need) => (
              <div className="card mat-need" key={need.title}>
                <div className="t">{need.title}</div>
                <p>{need.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Form (in fondo) */}
      <section className="section">
        <div className="wrap">
          <div id="lead" className="mat-lead">
            <div className="mat-lead-info">
              <span className="mat-lead-badge">Trova il tuo tutor</span>
              <h2>Dicci la materia, al tutor pensiamo noi.</h2>
              <p>
                Lascia i tuoi dati: ti ricontattiamo entro 24h con il tutor giusto per
                la tua materia e il tuo obiettivo. Gratis e senza impegno.
              </p>
              <div className="mat-lead-contacts">
                <a href={brand.contacts.telHref}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  {brand.contacts.telDisplay}
                </a>
                <a href={brand.contacts.whatsappUrl}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  WhatsApp 351 721 4644
                </a>
              </div>
            </div>
            <div className="mat-lead-form">
              <RipForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
