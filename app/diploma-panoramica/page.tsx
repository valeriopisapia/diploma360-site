import { assertBrand } from '@/lib/assertBrand'
import { brand } from '@/lib/brand'
import { buildMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { LeadSection } from '@/components/forms/LeadSection'
import './panoramica.css'

/**
 * Diploma → Panoramica — La Scuola360 only (404s on any other brand via
 * assertBrand). Riepilogo del ramo Diploma: metodo + piattaforma + diplomi +
 * prezzi, con rimando alle pagine complete. È la "prima voce" del gruppo
 * "Il metodo" nel mega-menu Diploma (data/navigazione.ts). Chrome dal root
 * layout; form di conversione in fondo via <LeadSection>.
 */

export const metadata = buildMetadata({
  title: `Diploma di Stato online — panoramica del percorso | ${brand.name}`,
  description:
    'Il percorso Diploma in sintesi: come funziona il metodo, la piattaforma, gli indirizzi disponibili e i prezzi in chiaro. Diploma di Stato riconosciuto, con tutor e coordinatrice del percorso.',
  path: '/diploma-panoramica',
})

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${brand.domain}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Diploma — Panoramica',
      item: `${brand.domain}/diploma-panoramica`,
    },
  ],
}

const CARDS = [
  {
    k: 'Il metodo',
    title: 'Un percorso, non solo contenuti',
    text: 'Partiamo dagli anni da recuperare e costruiamo un piano su misura. Tutor per materia e coordinatrice del percorso ti seguono fino agli esami.',
    href: '/come-funziona',
    more: 'Come funziona',
  },
  {
    k: 'La piattaforma',
    title: 'Lezioni, materiali e strumenti in un posto',
    text: 'Lezioni live e registrate, materiali di studio e strumenti di ripasso, tutto organizzato per indirizzo e sempre disponibili quando studi.',
    href: '/piattaforma',
    more: 'Scopri la piattaforma',
  },
  {
    k: 'I diplomi',
    title: 'Tutti gli indirizzi disponibili',
    text: 'Licei, tecnici e professionali: scegli l’indirizzo giusto per te. Diploma di Stato riconosciuto, con valore legale a tutti gli effetti.',
    href: '/diplomi',
    more: 'Vedi i diplomi',
  },
  {
    k: 'Prezzi e piani',
    title: 'Tre piani, prezzi in chiaro',
    text: 'Basic, Plus e Max: sai da subito cosa è incluso e quanto costa, con pagamento rateizzabile. Nessuna sorpresa.',
    href: '/prezzi',
    more: 'Vedi prezzi e piani',
  },
]

const PRICES = [
  { plan: '01 · Basic', tot: '1.500 €', rate: 'in 24 rate da 72,68 €/mese' },
  { plan: '02 · Plus', tot: '1.900 €', rate: 'in 24 rate da 92,06 €/mese' },
  { plan: '03 · Max', tot: '2.900 €', rate: 'in 24 rate da 140,52 €/mese' },
]

export default function DiplomaPanoramicaPage() {
  assertBrand('lascuola360')

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="pan-hero">
        <div className="wrap">
          <span className="eyebrow">Percorso Diploma</span>
          <h1>
            Il Diploma di Stato online, <span className="pan-hl">dall’inizio all’esame</span>.
          </h1>
          <p className="pan-lead">
            Il percorso Diploma di {brand.name} in sintesi: il metodo, la piattaforma, gli
            indirizzi disponibili e i prezzi in chiaro. Da qui raggiungi ogni sezione in un click.
          </p>
          <div className="cta-row">
            <a className="btn btn-primary btn-lg" href="#lead">
              Prenota una consulenza gratuita
            </a>
            <a className="btn btn-out btn-lg" href="/diplomi">
              Vedi tutti i diplomi
            </a>
          </div>
        </div>
      </section>

      {/* ── RIEPILOGO (4 card) ──────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="pan-grid">
            {CARDS.map((c) => (
              <a key={c.href} className="pan-card" href={c.href}>
                <span className="pan-k">{c.k}</span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <span className="pan-more">{c.more} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PREZZI IN SINTESI ───────────────────────────────────── */}
      <section className="section tight">
        <div className="wrap">
          <span className="eyebrow">Prezzi in chiaro</span>
          <div className="pan-prices">
            {PRICES.map((p) => (
              <div key={p.plan} className="pan-price">
                <div className="pan-plan">{p.plan}</div>
                <div className="pan-tot">
                  {p.tot}
                  <small> totale</small>
                </div>
                <div className="pan-rate">{p.rate}</div>
              </div>
            ))}
          </div>
          <div className="cta-row" style={{ marginTop: 24 }}>
            <a className="btn btn-out" href="/prezzi">
              Confronta i piani nel dettaglio →
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM IN FONDO ───────────────────────────────────────── */}
      <LeadSection />
    </>
  )
}
