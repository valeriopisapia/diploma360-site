import Image from 'next/image'
import { assertBrand } from '@/lib/assertBrand'
import { RipForm } from '@/components/forms/RipForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { Reveal, Counter } from '@/components/motion/Reveal'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import './ripetizioni.css'

/**
 * /ripetizioni — La Scuola360 only (brand-exclusive; 404s on the sibling brand
 * via assertBrand). Ported 1:1 from `materiale/consegna-valerio 2/Ripetizioni.dc.html`.
 * Header/footer come from the root layout (RipFooter for this brand, per
 * `components/layout/ChromeGate.tsx`) — this page never renders its own chrome.
 */

export const metadata = buildMetadata({
  title: `Ripetizioni online: tutor per ogni materia | ${brand.name}`,
  description:
    "Lezioni private 1:1 con tutor qualificati, per medie, superiori e università. Prima lezione di prova gratuita, nessun vincolo. Trova il tuo tutor su misura.",
  path: '/ripetizioni',
})

const SUBJECTS = [
  'Matematica',
  'Fisica',
  'Chimica',
  'Italiano',
  'Latino e Greco',
  'Inglese',
  'Spagnolo',
  'Storia e Filosofia',
]

const FAQ = [
  {
    q: 'Come trovo il tutor giusto?',
    a: 'Ci dici materia, livello e obiettivo con il form o in una chiamata. Ti proponiamo il tutor più adatto e fissiamo una prima lezione conoscitiva gratuita per capire se è quello giusto per te.',
  },
  {
    q: `Chi sono i tutor di ${brand.name}?`,
    a: 'Tutor selezionati con almeno una laurea, esperienza reale nella didattica e strumenti adatti alle lezioni online. Persone vere, non un call center.',
  },
  {
    q: 'Dove si svolgono le ripetizioni?',
    a: 'Le lezioni sono online, nella nostra aula virtuale: lavagna interattiva, webcam e microfono in HD, condivisione di appunti e registrazione della lezione.',
  },
  {
    q: "C'è un abbonamento o un vincolo?",
    a: 'No. Paghi solo le lezioni che decidi di svolgere: nessun rinnovo automatico, nessun vincolo, nessuna scadenza.',
  },
  {
    q: 'Quali materie posso recuperare?',
    a: "Oltre 150 materie, dalle elementari all'università. Qualsiasi materia tu debba imparare o ripassare, troviamo il tutor che fa per te — anche per DSA e BES.",
  },
]

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: brand.name,
  url: `${brand.domain}/ripetizioni`,
  logo: `${brand.domain}${brand.logo.header}`,
  description:
    "Servizio di ripetizioni e lezioni private online di La Scuola360: tutor per ogni materia, dalle medie all'università.",
  telephone: brand.contacts.telHref.replace('tel:', '+39'),
  email: brand.contacts.email,
  parentOrganization: {
    '@type': 'Organization',
    name: 'Classme S.r.l.',
    vatID: 'IT15441141007',
    address: { '@type': 'PostalAddress', addressLocality: 'Roma', addressCountry: 'IT' },
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const CheckIcon = ({ stroke = '#16a34a' }: { stroke?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export default function Ripetizioni() {
  assertBrand('lascuola360')

  return (
    <>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={faqJsonLd} />

      {/* ── HERO + FORM ─────────────────────────────────────────── */}
      <Reveal as="section" className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <span className="pill">Ripetizioni</span> Il servizio ripetizioni di {brand.name}
            </span>
            <h1>
              Le ripetizioni che <span className="grad-text">trasformano i tuoi voti</span>.
            </h1>
            <p className="hero-lead">
              Tutor reali per ogni materia, lezioni 1:1 dal vivo e strumenti di ripasso già
              pronti. Scegli tu giorno e orario — dalle medie all&apos;università.
            </p>
            <ul className="rl-checks">
              <li>
                <CheckIcon />
                Lezioni private su misura per te
              </li>
              <li>
                <CheckIcon />
                Solo tutor esperti e qualificati
              </li>
              <li>
                <CheckIcon />
                Nessun vincolo, anche il weekend
              </li>
            </ul>
            <div className="av-cluster">
              <div className="avs">
                <Image src="/lascuola360/p_female2.jpg" alt="" width={42} height={42} />
                <Image src="/lascuola360/p_maleglasses.jpg" alt="" width={42} height={42} />
                <Image src="/lascuola360/p_blonde.jpg" alt="" width={42} height={42} />
              </div>
              <div className="avtxt">
                <b>+97% recupera le insufficienze</b>
                <br />
                <span className="stars">★★★★★</span> 4,8 su Google
              </div>
            </div>
          </div>

          <aside className="form-card" id="lead">
            <span className="form-flag">
              <span className="dotpulse" />
              Prima lezione gratuita
            </span>
            <h2>Prenota una lezione di prova.</h2>
            <p className="form-sub">
              Lascia i dati: ti aiutiamo a trovare il tutor giusto per la tua materia e il tuo
              obiettivo.
            </p>
            <RipForm />
          </aside>
        </div>
      </Reveal>

      {/* ── TRUSTBAR ────────────────────────────────────────────── */}
      <Reveal as="section" className="trustbar">
        <div className="wrap">
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Tutor verificati per ogni materia
          </span>
          <span className="tb-item">
            <span className="stars">★★★★★</span> 4,8 su Google
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 10l5 5-5 5" />
              <path d="M4 4v7a4 4 0 0 0 4 4h12" />
            </svg>
            Lezioni 1:1 dal vivo
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Consulenza gratuita entro 24h
          </span>
        </div>
      </Reveal>

      {/* ── MATERIE ─────────────────────────────────────────────── */}
      <Reveal as="section" id="materie" className="section">
        <div className="wrap rl-materie-grid">
          <div>
            <span className="eyebrow">Ogni materia, ogni livello</span>
            <h2 className="sec-h2">
              Tutor per tutte le materie e necessità, anche{' '}
              <span className="grad-text">DSA e BES</span>.
            </h2>
            <p className="sec-lead" style={{ marginBottom: 22 }}>
              Copriamo <b>oltre 150 materie</b>, dalle elementari all&apos;università, a partire
              da <b>17,5€ all&apos;ora</b>. Non scegli tu da una lista infinita: ci dici cosa ti
              serve e ti mettiamo in contatto con il tutor giusto.
            </p>
            <div className="rl-chips">
              {SUBJECTS.map(s => (
                <span key={s} className="rl-chip">
                  {s}
                </span>
              ))}
              <span className="rl-chip hl">+ oltre 150 materie</span>
            </div>
            <a className="btn btn-primary" href="#lead">
              Trova il tuo tutor <span className="rl-arrow">→</span>
            </a>
          </div>
          <div className="rl-materie-photo">
            <Image
              src="/lascuola360/studentessa.jpg"
              alt="Studentessa in lezione online"
              width={900}
              height={800}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="rl-stat-badge">
              <div className="n grad-text">
                <Counter value="+3.000" />
              </div>
              <div className="l">
                tutor qualificati
                <br />
                per ogni disciplina
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── SEGUITO A 360° (emotivo) ────────────────────────────── */}
      <Reveal as="section" className="section tight">
        <div className="wrap">
          <div className="rl-emo">
            <h2>
              Lezioni pensate per farti sentire{' '}
              <span className="grad-text">capito, seguito e supportato</span>.
            </h2>
            <p>
              Non hai bisogno solo di ripetizioni. Hai bisogno di qualcuno che ti ascolti, ti
              guidi e ti aiuti a ritrovare fiducia. Con il tutor giusto e un piano costruito su
              di te, sei accompagnato passo dopo passo — è questo il calore delle persone unito
              alla potenza degli strumenti.
            </p>
          </div>
        </div>
      </Reveal>

      {/* ── COME FUNZIONA (3 step) ──────────────────────────────── */}
      <Reveal as="section" id="come-funziona" className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Come funziona</span>
            <h2 className="sec-h2">Bastano 3 passi per iniziare.</h2>
          </div>
          <div className="steps">
            <div className="rl-step">
              <div className="n">1</div>
              <h3>Prenota la lezione di prova</h3>
              <p>
                Parlaci delle tue difficoltà: troviamo insieme il tutor più adatto per materia,
                livello e modo di studiare. Nessun algoritmo a caso.
              </p>
            </div>
            <div className="rl-step">
              <div className="n">2</div>
              <h3>Scopri il metodo</h3>
              <p>
                Durante la prima lezione vedi l&apos;aula virtuale in azione: uno spazio semplice
                e interattivo dove studente e tutor lavorano come in presenza.
              </p>
            </div>
            <div className="rl-step">
              <div className="n">3</div>
              <h3>Costruisci un percorso su misura</h3>
              <p>
                Con il tutor e gli strumenti di ripasso segui un piano costruito su di te, per
                recuperare fiducia e migliorare davvero.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── PIATTAFORMA ─────────────────────────────────────────── */}
      <Reveal as="section" id="piattaforma" className="section">
        <div className="wrap rl-piattaforma-grid">
          <div>
            <span className="eyebrow">La piattaforma</span>
            <h2 className="sec-h2">
              L&apos;aula virtuale che ti fa dimenticare{' '}
              <span className="grad-text">le classi reali</span>.
            </h2>
            <p className="sec-lead">
              Lavagna interattiva, webcam e audio in HD, condivisione di appunti e file. E da
              ogni lezione, con <b>Riepilogo360</b>, hai già pronti riassunto, podcast, quiz e
              flashcard — più la registrazione da rivedere quando vuoi.
            </p>
            <a href="/" style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: 15, color: 'var(--coral-dk)' }}>
              Scopri gli strumenti →
            </a>
          </div>
          <div className="browser-frame">
            <div className="bf-bar">
              <span className="r" />
              <span />
              <span />
            </div>
            <Image
              src="/lascuola360/piattaforma.png"
              alt={`L'aula virtuale di ${brand.name}`}
              width={820}
              height={525}
              style={{ width: '100%', display: 'block' }}
            />
          </div>
        </div>
      </Reveal>

      {/* ── PER LIVELLO / PER ESIGENZA ──────────────────────────── */}
      <Reveal as="section" id="esigenza" className="section">
        <div className="wrap rl-esigenza-grid">
          <div className="rl-esigenza-card c1">
            <div className="rl-esigenza-lbl">Per livello scolastico</div>
            <div className="rl-esigenza-list">
              <div className="item">
                <b>Medie</b>
                <span>Metodo di studio e recupero delle basi.</span>
              </div>
              <div className="item">
                <b>Superiori</b>
                <span>Ogni materia e indirizzo, fino alla maturità.</span>
              </div>
              <div className="item">
                <b>Università</b>
                <span>Preparazione esami e materie specifiche.</span>
              </div>
            </div>
          </div>
          <div className="rl-esigenza-card c2">
            <div className="rl-esigenza-lbl">Per esigenza</div>
            <div className="rl-esigenza-list">
              <div className="item">
                <b>Aiuto compiti</b>
                <span>Supporto costante per i compiti e le verifiche.</span>
              </div>
              <div className="item">
                <b>Recupero debiti</b>
                <span>Piano mirato per chiudere il debito entro settembre.</span>
              </div>
              <div className="item">
                <b>DSA e BES · Esami università</b>
                <span>Percorsi guidati, ordinati e sostenibili.</span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── PREZZI ──────────────────────────────────────────────── */}
      <Reveal as="section" id="prezzi" className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Prezzi trasparenti</span>
            <h2 className="sec-h2">Paghi solo le lezioni che fai.</h2>
            <p className="sec-lead">
              Più ore scegli, meno costa l&apos;ora. Nessun rinnovo automatico, nessun vincolo,
              nessuna scadenza. In consulenza gratuita troviamo la soluzione più adatta a te.
            </p>
          </div>
          <div className="rl-pricing">
            <div className="rl-price-card">
              <div className="hrs">5 ore</div>
              <div className="amt">
                25€<span>/ora</span>
              </div>
              <div className="tot">125€ totali</div>
              <a className="cta" href="#lead">
                Richiedi info
              </a>
            </div>
            <div className="rl-price-card">
              <div className="hrs">10 ore</div>
              <div className="amt">
                22,5€<span>/ora</span>
              </div>
              <div className="tot save">225€ · risparmi 25€</div>
              <a className="cta" href="#lead">
                Richiedi info
              </a>
            </div>
            <div className="rl-price-card featured">
              <span className="rl-price-badge">Più scelto</span>
              <div className="hrs">20 ore</div>
              <div className="amt">
                20€<span>/ora</span>
              </div>
              <div className="tot">400€ · risparmi 100€</div>
              <a className="cta" href="#lead">
                Richiedi info
              </a>
            </div>
            <div className="rl-price-card">
              <div className="hrs">40 ore</div>
              <div className="amt">
                17,5€<span>/ora</span>
              </div>
              <div className="tot save">700€ · risparmi 300€</div>
              <a className="cta" href="#lead">
                Richiedi info
              </a>
            </div>
          </div>
          <div className="rl-pricing-notes">
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
        </div>
      </Reveal>

      {/* ── NUMERI ──────────────────────────────────────────────── */}
      <Reveal as="section" className="section tight">
        <div className="wrap">
          <div className="rl-numbers">
            <div className="rl-stat">
              <div className="v">
                <Counter value="+5.000" />
              </div>
              <div className="l">studenti seguiti</div>
            </div>
            <div className="rl-stat">
              <div className="v">
                <Counter value="+3.000" />
              </div>
              <div className="l">tutor qualificati</div>
            </div>
            <div className="rl-stat">
              <div className="v">
                <Counter value="150+" />
              </div>
              <div className="l">materie coperte</div>
            </div>
            <div className="rl-stat">
              <div className="v">
                <Counter value="97%" />
              </div>
              <div className="l">recupera le insufficienze</div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── SUPPORTO ────────────────────────────────────────────── */}
      <Reveal as="section" className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Sempre al tuo fianco</span>
            <h2 className="sec-h2">Supporto e controllo sempre a disposizione.</h2>
          </div>
          <div className="feat-grid">
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <circle cx={12} cy={12} r={10} />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h3>Assistenza continua</h3>
              <p>Il nostro team è sempre pronto a supportarti, in piattaforma e al telefono.</p>
            </div>
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3>Feedback continui</h3>
              <p>I tutor rilasciano feedback regolari in base alla preparazione che maturi.</p>
            </div>
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Controllo per i genitori</h3>
              <p>Uno strumento per seguire lezioni, percorso e pagamenti in trasparenza.</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <Reveal as="section" id="faq" className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Dubbi frequenti</span>
            <h2 className="sec-h2">Le domande più comuni.</h2>
          </div>
          <div className="faq">
            {FAQ.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>
                  {item.q}
                  <span className="chev">+</span>
                </summary>
                <div className="a">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── CHIUSURA ────────────────────────────────────────────── */}
      <Reveal as="section" className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Trova subito il tuo tutor.</h2>
              <p>
                Prima lezione di prova gratuita, poi decidi tu. Consulenza senza impegno, anche
                su WhatsApp.
              </p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="#lead">
                Prenota la lezione di prova
              </a>
              <a
                className="btn btn-glass btn-lg"
                href={brand.contacts.whatsappUrl}
                target="_blank"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
                </svg>
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  )
}
