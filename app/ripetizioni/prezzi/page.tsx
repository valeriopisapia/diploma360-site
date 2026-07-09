import Image from 'next/image'
import Link from 'next/link'
import { assertBrand } from '@/lib/assertBrand'
import { brand } from '@/lib/brand'
import { buildMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal } from '@/components/motion/Reveal'
import { RipForm } from '@/components/forms/RipForm'
import './prezzi.css'

/**
 * Ripetizioni → Prezzi — ported 1:1 from
 * `materiale/consegna-valerio 2/Ripetizioni-Prezzi.dc.html`. Brand-exclusive:
 * La Scuola360 only, 404s on any other brand via assertBrand.
 */

export const metadata = buildMetadata({
  title: `Prezzi ripetizioni | ${brand.name}`,
  description:
    "Lezioni individuali di ripetizioni da 60 minuti, a partire da 17,5€ l'ora. Pacchetti da 5 a 40 ore, nessun rinnovo automatico, nessun vincolo. Prima lezione gratuita.",
  path: '/ripetizioni/prezzi',
})

const FAQ = [
  {
    q: "C'è un abbonamento o un vincolo?",
    a: 'No. Paghi solo le lezioni che decidi di svolgere: nessun rinnovo automatico, nessun vincolo, nessuna scadenza.',
  },
  {
    q: "Quanto dura un'ora di lezione?",
    a: "Ogni ora di lezione è di 60 minuti pieni, uno a uno col tutor nell'aula virtuale.",
  },
  {
    q: 'La prima lezione è davvero gratis?',
    a: 'Sì: la prima lezione conoscitiva col tutor è gratuita, senza impegno e senza carta di credito. Serve a capire se è quello giusto per te.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const PERKS = [
  {
    t: 'Lezioni 1:1 da 60 minuti',
    d: 'Personalizzate, con tutor esperti selezionati.',
  },
  {
    t: 'Accesso illimitato alla dashboard',
    d: 'Chat, prenotazioni e piattaforma, senza limiti.',
  },
  {
    t: 'Supporto 7 giorni su 7',
    d: 'Un team Customer Success sempre al tuo fianco.',
  },
  {
    t: 'Quiz360 su tutte le lezioni',
    d: "Ti eserciti e ti metti alla prova dopo ogni lezione.",
  },
  {
    t: 'Studio360, percorso su misura',
    d: 'Materiali e registrazioni tarati sul tuo programma.',
  },
  {
    t: 'Riepilogo360 dopo ogni lezione',
    d: 'Registrazione, appunti digitali, riassunto e podcast.',
  },
]

const CheckIcon = ({ stroke = '#16a34a' }: { stroke?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.5">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function RipetizioniPrezziPage() {
  assertBrand('lascuola360')

  return (
    <>
      <JsonLd data={faqJsonLd} />

      {/* Hero (no form) */}
      <section className="wrap rp-hero">
        <p className="rp-crumb">
          <Link href="/ripetizioni">Ripetizioni</Link> › <span>Prezzi</span>
        </p>
        <Reveal as="div" className="rp-hero-grid">
          <div className="rp-hero-copy">
            <span className="eb">Prezzi trasparenti</span>
            <h1>
              Qualità garantita, <span className="hl">a partire da 17,5€</span> a lezione.
            </h1>
            <p className="lead">
              Lezioni individuali da 60 minuti con tutor selezionati. Più ore prenoti, più
              risparmi. Nessun rinnovo automatico, nessun vincolo, nessuna scadenza.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="#lead">
                Prima lezione gratuita
              </a>
              <a className="btn btn-out btn-lg" href="#pacchetti">
                Vedi i pacchetti
              </a>
            </div>
          </div>
          <div className="rp-hero-visual">
            <Image
              src="/lascuola360/testimonial-giulia.jpg"
              alt={`Studente ${brand.name}`}
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="rp-hero-badge">
              <span className="amt">17,5€</span>
              <span className="desc">
                al minimo,
                <br />
                con 40 ore
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Pacchetti */}
      <section className="wrap rp-pkgs" id="pacchetti">
        <div className="rp-shd">
          <span className="eb">I pacchetti</span>
          <h2>Più ore scegli, meno costa l&apos;ora.</h2>
        </div>

        <Reveal as="div" className="rp-pkg-grid">
          <div className="rp-pkg">
            <div className="hrs">5 ore</div>
            <div className="rate">
              25€<small>/ora</small>
            </div>
            <div className="tot">125€ totali</div>
            <a className="cta" href="#lead">
              Richiedi info
            </a>
          </div>

          <div className="rp-pkg">
            <div className="hrs">10 ore</div>
            <div className="rate">
              22,5€<small>/ora</small>
            </div>
            <div className="tot save">225€ · risparmi 25€</div>
            <a className="cta" href="#lead">
              Richiedi info
            </a>
          </div>

          <div className="rp-pkg feat">
            <span className="rp-pkg-badge">Più scelto</span>
            <div className="hrs">20 ore</div>
            <div className="rate">
              20€<small>/ora</small>
            </div>
            <div className="tot">400€ · risparmi 100€</div>
            <a className="cta" href="#lead">
              Richiedi info
            </a>
          </div>

          <div className="rp-pkg">
            <div className="hrs">40 ore</div>
            <div className="rate">
              17,5€<small>/ora</small>
            </div>
            <div className="tot save">700€ · risparmi 300€</div>
            <a className="cta" href="#lead">
              Richiedi info
            </a>
          </div>
        </Reveal>

        <div className="rp-pkg-checks">
          <span>
            <CheckIcon />
            Ore di lezione da 60 minuti
          </span>
          <span>
            <CheckIcon />
            Nessun rinnovo automatico
          </span>
          <span>
            <CheckIcon />
            Nessun vincolo né scadenza
          </span>
        </div>
      </section>

      {/* Tutto incluso */}
      <section className="wrap rp-perks">
        <div className="rp-shd">
          <span className="eb">Vantaggi esclusivi</span>
          <h2>Tutto incluso nel prezzo.</h2>
        </div>
        <Reveal as="div" className="rp-perk-grid">
          {PERKS.map((perk) => (
            <div className="rp-perk" key={perk.t}>
              <CheckIcon />
              <div>
                <div className="t">{perk.t}</div>
                <p>{perk.d}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* Flessibilità + Trasparenza */}
      <section className="wrap rp-flex">
        <Reveal as="div" className="rp-flex-grid">
          <div className="rp-flex-card tint">
            <div className="kk">Tu decidi</div>
            <h3>Quando, dove e quanto</h3>
            <p>
              Lezioni in orari flessibili, anche serali e nel weekend. Credito trasferibile
              tra familiari, più materie insieme. Puoi iniziare anche solo con poche ore.
            </p>
            <div className="rp-flex-list">
              <span>
                <CheckIcon stroke="#993C1D" />
                Individuali o di gruppo con gli amici
              </span>
              <span>
                <CheckIcon stroke="#993C1D" />
                Credito trasferibile in famiglia
              </span>
            </div>
          </div>

          <div className="rp-flex-card plain">
            <div className="kk">Massima trasparenza, zero vincoli</div>
            <div className="rp-flex-list">
              <span>
                <CheckIcon />
                Pagamenti sicuri, nessun costo nascosto
              </span>
              <span>
                <CheckIcon />
                Carta, PayPal, bonifico o a rate
              </span>
              <span>
                <CheckIcon />
                Anche voucher welfare aziendali
              </span>
              <span>
                <CheckIcon />
                Puoi interrompere quando vuoi
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FAQ prezzi */}
      <section className="wrap rp-faq">
        <div className="rp-faq-list">
          {FAQ.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <div className="a">{item.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Form (in fondo) */}
      <section className="wrap rp-lead-sec">
        <div className="rp-lead-card" id="lead">
          <div className="rp-lead-grid">
            <div className="rp-lead-panel">
              <span className="tag">Trova il piano giusto</span>
              <h2>Non sai quante ore ti servono?</h2>
              <p>
                In una consulenza gratuita capiamo la tua situazione e ti proponiamo il
                pacchetto più adatto. Senza impegno.
              </p>
              <div className="rp-lead-contacts">
                <a href={brand.contacts.telHref}>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                  WhatsApp 351 721 4644
                </a>
              </div>
            </div>
            <div className="rp-lead-form">
              <RipForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
