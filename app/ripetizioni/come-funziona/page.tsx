import Image from 'next/image'
import Link from 'next/link'
import { assertBrand } from '@/lib/assertBrand'
import { brand } from '@/lib/brand'
import { buildMetadata } from '@/lib/seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal, Counter } from '@/components/motion/Reveal'
import { RipForm } from '@/components/forms/RipForm'
import './come-funziona.css'

/**
 * Ripetizioni → Come funziona — ported 1:1 from
 * `materiale/consegna-valerio 2/Ripetizioni-Come-Funziona.dc.html`. Brand-exclusive:
 * only renders for La Scuola360, 404s on any other brand via assertBrand.
 */

export const metadata = buildMetadata({
  title: `Come funziona | Ripetizioni ${brand.name}`,
  description:
    'Come funzionano le ripetizioni online: tutor selezionati (solo l\'8% dei candidati), aula virtuale con lavagna e webcam HD, percorso personalizzato e kit di ripasso dopo ogni lezione. Prima lezione gratuita.',
  path: '/ripetizioni/come-funziona',
})

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
      name: 'Come funziona',
      item: `${brand.domain}/ripetizioni/come-funziona/`,
    },
  ],
}

const CheckIcon = ({ stroke = '#16a34a' }: { stroke?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const KIT_ITEMS = [
  { text: 'La registrazione completa, sempre rivedibile' },
  { text: 'Gli appunti del tutor, scaricabili in PDF' },
  { text: 'Un riassunto sintetico degli argomenti', c2: true },
  { text: 'Flashcard interattive e quiz per esercitarti', c2: true },
]

const PERCORSO_ITEMS = [
  { text: 'Lezioni mirate sulle materie da recuperare' },
  { text: 'Esercizi interattivi per mettersi alla prova' },
  { text: 'Momenti live per approfondire e non sentirsi soli', c2: true },
  { text: "Tutto in un'unica area personale, sempre disponibile", c2: true },
]

const PLAN_STEPS = [
  { t: 'Valutiamo il punto di partenza', s: 'Anno, indirizzo e programma da recuperare.' },
  { t: 'Costruiamo il piano su misura', s: 'Lezioni, esercizi e ripasso, ordinati per te.', c2: true },
  { t: 'Ti seguiamo passo dopo passo', s: 'Con feedback e materiali sempre a portata.' },
]

const THREE_STEPS = [
  {
    t: 'Prenota una consulenza',
    d: 'Scrivici o compila il form: un nostro consulente ti contatta per capire le tue esigenze.',
  },
  {
    t: 'Prova una lezione gratuita',
    d: 'Ti proponiamo un tutor selezionato per te. La prima lezione è gratuita, senza impegno e senza carta di credito.',
  },
  {
    t: 'Inizia il tuo percorso',
    d: 'Scegli il pacchetto più adatto e inizia a migliorare, con un tutor costante e una piattaforma semplice.',
  },
]

const MORE_FEATURES = [
  {
    t: 'I migliori tutor selezionati',
    d: 'Scegliamo il tuo tutor in base alla materia, al tuo stile di apprendimento e ai tuoi obiettivi.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
  {
    t: 'Lezioni in piattaforma o in sede',
    d: 'Aula virtuale con lavagna, condivisione file e chat, oppure lezioni in presenza dove disponibile.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    t: 'Riepilogo e materiali post-lezione',
    d: 'Dopo ogni lezione un report con ciò che hai fatto e cosa migliorare. Tutto salvato e accessibile.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
]

const NUMBERS = [
  { value: '+5.000', label: 'studenti seguiti' },
  { value: '+3.000', label: 'tutor qualificati' },
  { value: '150+', label: 'materie coperte' },
  { value: '97%', label: 'recupera le insufficienze' },
]

const DECIDE_CHECKS = [
  'Pagamenti sicuri, nessun costo nascosto',
  'Nessun vincolo contrattuale',
  'Tutor verificati',
  'Puoi interrompere quando vuoi',
  'Puoi cambiare tutor, senza costi',
]

export default function RipetizioniComeFunzionaPage() {
  assertBrand('lascuola360')

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      {/* Hero (no form) */}
      <section className="wrap cf-hero">
        <p className="cf-crumb">
          <Link href="/ripetizioni">Ripetizioni</Link> › <span className="cur">Come funziona</span>
        </p>
        <Reveal as="div" className="cf-hero-grid">
          <div>
            <span className="eyebrow">Come funziona</span>
            <h1>
              Il <span className="grad-text">97% degli studenti</span> migliora grazie alle nostre
              lezioni.
            </h1>
            <div className="cf-checks spaced">
              <span className="cf-checks-item">
                <CheckIcon />
                Troviamo il tutor perfetto per te
              </span>
              <span className="cf-checks-item">
                <CheckIcon />
                Lezioni personalizzate sulle tue esigenze
              </span>
              <span className="cf-checks-item">
                <CheckIcon />
                Flessibilità totale: impari quando vuoi
              </span>
            </div>
            <div className="cf-hero-cta">
              <a className="btn btn-primary btn-lg" href="#lead">
                Prenota una consulenza
              </a>
              <Link className="btn btn-out btn-lg" href="/ripetizioni/prezzi">
                Vedi i prezzi
              </Link>
            </div>
          </div>
          <div className="cf-hero-img">
            <Image
              src="/lascuola360/studentessa.jpg"
              alt="Studentessa in lezione online"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="cf-hero-badge">
              <span className="v grad-text">97%</span>
              <span className="l">
                recupera le
                <br />
                insufficienze
              </span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Trustbar */}
      <section className="trustbar cf-trustbar">
        <div className="wrap">
          <span className="tb-item">
            <span className="stars">★★★★★</span> 4,8 su Google
          </span>
          <span className="tb-item">
            <CheckIcon stroke="currentColor" />
            +3.000 tutor qualificati
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 10l5 5-5 5" />
              <path d="M4 4v7a4 4 0 0 0 4 4h12" />
            </svg>
            Lezioni 1:1 dal vivo
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Prima lezione gratuita
          </span>
        </div>
      </section>

      {/* Tutor eccellenti */}
      <Reveal as="section" className="cf-tutor">
        <div className="wrap cf-tutor-grid">
          <div className="cf-photo">
            <Image src="/lascuola360/p_female2.jpg" alt={`Tutor ${brand.name}`} fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <span className="eyebrow">I tutor</span>
            <h2>
              Tutor eccellenti, <span className="grad-text">su misura per te</span>.
            </h2>
            <p>
              Solo l&apos;<strong>8% dei candidati</strong> diventa tutor di {brand.name}. Li
              selezioniamo per competenza, empatia e capacità di adattarsi: ogni percorso è
              modellato sullo stile dello studente.
            </p>
            <div className="cf-tutor-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M3 3v18h18" />
                <path d="M7 14l4-4 3 3 5-6" />
              </svg>
              Il 97% degli studenti migliora con il nostro metodo
            </div>
          </div>
        </div>
      </Reveal>

      {/* Aula virtuale + kit */}
      <Reveal as="section" className="cf-aula">
        <div className="wrap cf-aula-grid">
          <div className="cf-mock">
            <div className="cf-mock-bar">
              <span />
              <span />
              <span />
            </div>
            <Image
              src="/lascuola360/piattaforma.png"
              alt={`L'aula virtuale di ${brand.name}`}
              width={820}
              height={525}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
          <div>
            <span className="eyebrow">L&apos;aula virtuale</span>
            <h2>Imparare non finisce quando finisce la lezione.</h2>
            <p>
              Lavagna virtuale, webcam e audio in HD. E dopo ogni lezione hai un kit completo per
              il ripasso, tutto in un&apos;unica area personale:
            </p>
            <div className="cf-kit">
              {KIT_ITEMS.map((item) => (
                <span key={item.text} className={`cf-kit-item${item.c2 ? ' c2' : ''}`}>
                  <i />
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Percorso costruito su di te */}
      <Reveal as="section" className="cf-percorso">
        <div className="wrap cf-percorso-grid">
          <div>
            <span className="eyebrow">Non solo lezioni</span>
            <h2>
              Un <span className="grad-text">percorso costruito su di te</span>, non lezioni
              sciolte.
            </h2>
            <p>
              Ogni studente ha bisogni diversi. Costruiamo un percorso personalizzato in base
              all&apos;anno scolastico, all&apos;indirizzo e al programma reale da recuperare o
              rafforzare — è come avere un tutor sempre con te, anche fuori dalla lezione.
            </p>
            <div className="cf-kit">
              {PERCORSO_ITEMS.map((item) => (
                <span key={item.text} className={`cf-kit-item${item.c2 ? ' c2' : ''}`}>
                  <i />
                  {item.text}
                </span>
              ))}
            </div>
          </div>
          <div className="cf-plan">
            <div className="cf-plan-list">
              {PLAN_STEPS.map((step, i) => (
                <div className="cf-plan-step" key={step.t}>
                  <span className={`cf-plan-num${step.c2 ? ' c2' : ''}`}>{i + 1}</span>
                  <div>
                    <div className="t">{step.t}</div>
                    <div className="s">{step.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 3 step */}
      <Reveal as="section" className="cf-steps">
        <div className="wrap">
          <div className="cf-head">
            <span className="eyebrow">In pratica</span>
            <h2>Bastano 3 step per iniziare.</h2>
          </div>
          <div className="grid grid-3">
            {THREE_STEPS.map((step, i) => (
              <div className="card cf-step-card" key={step.t}>
                <div className="cf-step-num">{i + 1}</div>
                <h3>{step.t}</h3>
                <p>{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Molto di più */}
      <Reveal as="section" className="cf-more">
        <div className="wrap">
          <div className="cf-head">
            <span className="eyebrow">Non solo ripetizioni</span>
            <h2>Ti offriamo molto di più di semplici ripetizioni.</h2>
          </div>
          <div className="grid grid-3">
            {MORE_FEATURES.map((feat) => (
              <div className="card cf-feat-card" key={feat.t}>
                <span className="cf-feat-ic">{feat.icon}</span>
                <h3>{feat.t}</h3>
                <p>{feat.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Numeri */}
      <section className="cf-numbers">
        <div className="wrap grid grid-4">
          {NUMBERS.map((n) => (
            <Reveal as="div" className="card cf-stat" key={n.label}>
              <div className="v grad-text">
                <Counter value={n.value} />
              </div>
              <div className="l">{n.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Tu decidi */}
      <Reveal as="section" className="cf-decide">
        <div className="wrap cf-decide-grid">
          <div className="cf-decide-a">
            <div className="tag">Tu decidi</div>
            <h3>Quando, dove e quanto</h3>
            <p>
              Lezioni online o in sede, in orari flessibili anche serali e weekend. Pacchetti
              flessibili, credito trasferibile tra familiari, più materie insieme. Puoi iniziare
              anche solo con poche ore.
            </p>
          </div>
          <div className="card cf-decide-b">
            <div className="tag">Massima trasparenza, zero vincoli</div>
            <div className="cf-checks">
              {DECIDE_CHECKS.map((text) => (
                <span className="cf-checks-item" key={text}>
                  <CheckIcon />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Form (in fondo) */}
      <section className="wrap cf-form-sec">
        <div className="cf-lead" id="lead">
          <div className="cf-lead-info">
            <span className="cf-lead-badge">Contattaci per iniziare</span>
            <h2>Compila il modulo per richiedere informazioni.</h2>
            <p>
              Un nostro consulente ti ricontatta entro 24h per trovare il tutor giusto. Gratis e
              senza impegno.
            </p>
            <div className="cf-lead-contacts">
              <a href={brand.contacts.telHref}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {brand.contacts.telDisplay}
              </a>
              <a href={brand.contacts.whatsappUrl}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                WhatsApp 351 721 4644
              </a>
            </div>
          </div>
          <div className="cf-lead-form">
            <RipForm />
          </div>
        </div>
      </section>
    </>
  )
}
