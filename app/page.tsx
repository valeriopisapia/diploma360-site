import Image from 'next/image'
import { LeadForm } from '@/components/forms/LeadForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { PartnerCarousel } from '@/components/marketing/PartnerCarousel'
import { FaqAccordion } from '@/components/marketing/FaqAccordion'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'

export const metadata = buildMetadata({
  title: `Diploma online e recupero anni scolastici | ${brand.name}`,
  description:
    'Recupera gli anni persi e prendi il Diploma di Stato da casa: lezioni live, tutor dedicati e materiali pronti. Scopri gratis il tuo percorso.',
  path: '/',
})

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: brand.name,
  alternateName: `${brand.name} by Classme S.r.l.`,
  url: `${brand.domain}/`,
  logo: `${brand.domain}${brand.logo.header}`,
  description:
    'Diploma online e recupero anni scolastici per il Diploma di Stato. Lezioni live, tutor 1:1 e materiali pronti.',
  telephone: '+390684280999',
  email: 'info@diploma360.it',
  parentOrganization: {
    '@type': 'Organization',
    name: 'Classme S.r.l.',
    vatID: 'IT15441141007',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Roma',
      addressCountry: 'IT',
    },
  },
}

export default function Home() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <span id="contenuto" tabIndex={-1} />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <span className="pill">2026 / 2027</span> Iscrizioni aperte · consulenza gratuita
            </span>
            <h1>
              Recupera <span className="grad-text">più anni in uno</span> e prendi il diploma da
              casa.
            </h1>
            <p className="hero-lead">
              Con {brand.name} hai un piano di studio costruito sui tuoi anni reali, tutor per ogni
              materia e una piattaforma che ti accompagna fino agli esami. Diploma di Stato
              riconosciuto.
            </p>
            <div className="hero-price">
              <span className="hp-label">A partire da</span>
              <div className="hp-line">
                <span className="hp-amount">72,68€</span>
                <span className="hp-desc">al mese</span>
              </div>
            </div>
            <div className="hero-cta">
              <span className="hero-alt-q">Preferisci sentirci subito?</span>
              <a className="hero-alt-link" href="tel:+390684280999">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                06 84 280 999
              </a>
              <a
                className="hero-alt-link wa"
                href="https://wa.me/393517214644"
                target="_blank"
                rel="noopener"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.25 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          <aside className="form-card" id="lead">
            <span className="form-flag">
              <span className="dotpulse" />
              Gratis e senza impegno
            </span>
            <h2>Scopri gratis il tuo percorso.</h2>
            <p className="form-sub">
              Lascia i dati: ti aiutiamo a capire anni recuperabili, indirizzo e costi.
            </p>
            <LeadForm origine="vetrina" showPerChi />
          </aside>
        </div>
      </section>

      {/* ── TRUSTBAR ────────────────────────────────────────────── */}
      <section className="trustbar">
        <div className="wrap">
          <span className="tb-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10L12 5 2 10l10 5 10-5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Diploma di Stato riconosciuto
          </span>
          <span className="tb-item">
            <a
              href={`https://www.google.com/search?q=${brand.name}+recensioni`}
              target="_blank"
              rel="noopener"
            >
              <span className="stars">★★★★★</span> 4,8 su Google →
            </a>
          </span>
          <span className="tb-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            97% promossi all&apos;esame<span className="tb-star">*</span>
          </span>
          <span className="tb-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx={9} cy={7} r={4} />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            </svg>
            +3.000 tutor
          </span>
          <span className="tb-item">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <rect x={2} y={5} width={20} height={14} rx={2} />
              <line x1={2} y1={10} x2={22} y2={10} />
            </svg>
            24 rate mensili
          </span>
          <p className="tb-note">
            * Tasso medio sugli studenti che completano il percorso. Statistiche e recensioni
            verificate in pubblicazione.
          </p>
        </div>
      </section>

      {/* ── QUANDO ─────────────────────────────────────────────── */}
      <section className="section" id="quando">
        <div className="wrap">
          <div className="quando-head">
            <div>
              <span className="eyebrow">Una soluzione, tante situazioni</span>
              <h2 className="sec-h2">
                Se hai perso anni, non significa che{' '}
                <span className="grad-text">hai perso il diploma</span>.
              </h2>
              <p className="sec-lead">
                Che tu abbia lasciato la scuola, sia stato bocciato, lavori, faccia sport o abbia
                bisogno di un percorso più flessibile, {brand.name} ti aiuta a rientrare in
                carreggiata.
              </p>
            </div>
            <div className="quando-photo">
              <Image
                src="/assets-vetrina/quando.jpg"
                alt="studentessa"
                width={900}
                height={600}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          <div className="grid grid-3">
            <div className="sit2">
              <div className="ic" style={{ background: 'var(--coral-lt)', color: 'var(--coral-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x={3} y={4} width={18} height={18} rx={2} />
                  <line x1={16} y1={2} x2={16} y2={6} />
                  <line x1={8} y1={2} x2={8} y2={6} />
                  <line x1={3} y1={10} x2={21} y2={10} />
                </svg>
              </div>
              <h3>Hai perso uno o più anni</h3>
              <p>Costruiamo un percorso per recuperarli nel modo più rapido possibile, senza tornare in classe.</p>
            </div>
            <div className="sit2">
              <div className="ic" style={{ background: 'var(--rosa-lt)', color: 'var(--rosa-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
                  <polyline points="17 18 23 18 23 12" />
                </svg>
              </div>
              <h3>Vuoi diplomarti senza tornare in classe</h3>
              <p>Studi online, con materiali, tutor e supporto costante. Senza orari fissi.</p>
            </div>
            <div className="sit2">
              <div className="ic" style={{ background: 'var(--amber-lt)', color: 'var(--amber-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8L12 21l7.8-7.6a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </div>
              <h3>Lavori o hai poco tempo</h3>
              <p>Organizziamo lo studio intorno ai tuoi impegni: lavoro, famiglia, viaggi o sport.</p>
            </div>
            <div className="sit2">
              <div className="ic" style={{ background: 'var(--green-lt)', color: 'var(--green-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx={12} cy={12} r={10} />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>Hai bisogno di essere seguito davvero</h3>
              <p>Non ti lasciamo davanti a una piattaforma vuota: hai tutor per materia e un piano chiaro.</p>
            </div>
            <div className="sit2">
              <div className="ic" style={{ background: 'var(--ai-lt)', color: 'var(--ai-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Sei un genitore preoccupato</h3>
              <p>
                Ti aiutiamo a capire se tuo figlio può recuperare anni e ritrovare metodo,
                motivazione e obiettivo.{' '}
                <a href="/come-funziona" style={{ color: 'var(--coral-dk)', fontWeight: 600 }}>
                  Scopri come funziona →
                </a>
              </p>
            </div>
            <div className="sit2">
              <div className="ic" style={{ background: 'var(--coral-lt)', color: 'var(--coral-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15 9 22 9.3 16.5 14 18.5 21 12 17 5.5 21 7.5 14 2 9.3 9 9" />
                </svg>
              </div>
              <h3>Hai DSA, BES o difficoltà nello studio</h3>
              <p>Ti guidiamo con un percorso più ordinato, flessibile e sostenibile.</p>
            </div>
          </div>

          <div className="callout">
            <span className="tag">La buona notizia</span>
            <p>
              Capita più spesso di quanto si pensi. La soluzione non è studiare di più, ma{' '}
              <em>sapere cosa studiare, in che ordine e con quali strumenti</em> — con qualcuno
              che ti accompagna fino agli esami.
            </p>
          </div>
          <div className="sec-cta">
            <a className="btn btn-primary btn-lg" href="#lead">
              Scopri il tuo percorso
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA BAND 1 ──────────────────────────────────────────── */}
      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Ti riconosci in una di queste situazioni?</h2>
              <p>
                Ti diciamo in una consulenza gratuita quale percorso puoi fare. Gratis, senza
                impegno, risposta entro 24h anche su WhatsApp.
              </p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="#lead">
                Scopri il tuo percorso
              </a>
              <a
                className="btn btn-glass btn-lg"
                href="https://wa.me/393517214644"
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
      </section>

      {/* ── SUPPORT (tutor & esperti) ───────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="support">
            <div className="support-visual">
              <Image
                src="/assets-vetrina/studentessa.jpg"
                alt={`Studente ${brand.name}`}
                width={820}
                height={546}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="support-quote">
                <p>
                  &ldquo;Far sentire ogni studente seguito: con qualcuno che spiega, corregge e
                  accompagna fino agli esami.&rdquo;
                </p>
                <span>— Il nostro obiettivo</span>
              </div>
            </div>
            <div>
              <span className="eyebrow">Tutor &amp; esperti didattici</span>
              <h2 className="sec-h2" style={{ fontSize: 34, marginBottom: 10 }}>
                Online <span className="grad-text">non significa da soli</span>.
              </h2>
              <p className="sec-lead" style={{ marginBottom: 28 }}>
                La tecnologia organizza lo studio. Le persone fanno la differenza: chiariscono i
                dubbi, aiutano a mantenere continuità e adattano il percorso quando serve.
              </p>
              <div className="srow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx={9} cy={7} r={4} />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  </svg>
                </span>
                <div>
                  <h3>Tutor per materia</h3>
                  <p>Aiuta a capire gli argomenti, chiarire i dubbi e ripassare in modo guidato.</p>
                </div>
              </div>
              <div className="srow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M3 3v18h18" />
                    <path d="M7 14l4-4 3 3 5-6" />
                  </svg>
                </span>
                <div>
                  <h3>Coordinatore del percorso</h3>
                  <p>Costruisce il piano, sceglie il livello di supporto e orienta il percorso verso l&apos;esame.</p>
                </div>
              </div>
              <div className="srow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <div>
                  <h3>Supporto continuo</h3>
                  <p>Se lo studente rallenta o perde il filo, il team aiuta a rimettere ordine.</p>
                </div>
              </div>
              <div className="srow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </span>
                <div>
                  <h3>Monitoraggio</h3>
                  <p>Quiz, test e aggiornamenti aiutano a capire cosa funziona e cosa va rinforzato.</p>
                </div>
              </div>
              <div className="srow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx={9} cy={7} r={4} />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  </svg>
                </span>
                <div>
                  <h3>Famiglia informata</h3>
                  <p>
                    Nei piani che lo prevedono, report e profilo genitore aiutano la famiglia a
                    seguire il percorso.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PIATTAFORMA ─────────────────────────────────────────── */}
      <section className="section" id="piattaforma">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">La piattaforma</span>
            <h2 className="sec-h2">
              Una piattaforma che ti dice{' '}
              <span className="grad-text">sempre cosa studiare dopo</span>.
            </h2>
            <p className="sec-lead">
              Dentro {brand.name} trovi lezioni, materiali, quiz, avanzamento e strumenti di
              ripasso. Non devi organizzarti da solo: hai un percorso chiaro, materia per materia.
            </p>
          </div>
          <div className="browser-frame">
            <div className="bf-bar">
              <span className="r" />
              <span />
              <span />
            </div>
            <Image
              src="/assets-vetrina/piattaforma.png"
              alt={`La piattaforma di studio ${brand.name}`}
              width={820}
              height={525}
              style={{ width: '100%', display: 'block' }}
            />
          </div>
          <div className="feat-grid">
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="M7 14l4-4 3 3 5-6" />
                </svg>
              </div>
              <h3>Piano di studio personale</h3>
              <p>Vedi le materie, gli argomenti e le attività da completare. Sai sempre cosa fare dopo.</p>
            </div>
            <div className="fc">
              <div className="ic" style={{ background: 'var(--rosa-lt)', color: 'var(--rosa-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <h3>Materiali già pronti</h3>
              <p>Video, appunti, esercizi e contenuti organizzati per il tuo indirizzo. Niente fogli sparsi.</p>
            </div>
            <div className="fc">
              <div className="ic" style={{ background: 'var(--amber-lt)', color: 'var(--amber-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <h3>Quiz e verifiche</h3>
              <p>Controlli cosa hai capito e dove devi rinforzare, con esercizi e test su ogni argomento.</p>
            </div>
            <div className="fc">
              <div className="ic" style={{ background: 'var(--green-lt)', color: 'var(--green-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx={12} cy={12} r={10} />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h3>Avanzamento del percorso</h3>
              <p>Sai sempre quanto hai completato e cosa manca. Senza perdere il filo.</p>
            </div>
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
              </div>
              <h3>Tutor e supporto</h3>
              <p>Puoi essere seguito da un tutor per materia e da un referente didattico che orienta il piano.</p>
            </div>
            <div className="fc">
              <div className="ic" style={{ background: 'var(--ai-lt)', color: 'var(--ai-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3>Riepilogo360</h3>
              <p>Ogni lezione diventa materiale di ripasso: riassunto, podcast, quiz e flashcard.</p>
            </div>
          </div>

          {/* Riepilogo360 block */}
          <div className="r360-bro">
            <div className="r360-head">
              <span className="eyebrow-b">Riepilogo360</span>
              <h2>
                Da una sola lezione, <span className="hl">4 strumenti per ripassare</span>. Pronti
                quando ti servono.
              </h2>
              <p>
                Appena finisce la lezione, hai già pronti il riassunto, il podcast, il quiz e le
                flashcard. Niente appunti da scrivere, niente materiale da preparare — tutto già al
                tuo posto.
              </p>
            </div>
            <div className="r360-grid">
              <article className="r360-card arancio">
                <div className="r360-num">01</div>
                <div className="r360-label">Riassunto</div>
                <h3>Una lezione di un&apos;ora, riassunta in 3 minuti.</h3>
                <p>
                  I concetti chiave vengono estratti e ordinati per importanza, pronti da rileggere
                  prima di una verifica per rinfrescare tutto il senso.
                </p>
                <ul className="r360-bullets">
                  <li>Concetti chiave evidenziati</li>
                  <li>Definizioni ed esempi pronti</li>
                  <li>Collegamenti tra argomenti</li>
                </ul>
              </article>
              <article className="r360-card rosa">
                <div className="r360-num">02</div>
                <div className="r360-label">Podcast</div>
                <h3>Riascolti la lezione mentre cammini.</h3>
                <p>
                  Versione audio della tua lezione, narrata con voce naturale. Ottima per i tempi
                  morti — in macchina, sui mezzi, mentre fai sport.
                </p>
                <ul className="r360-bullets">
                  <li>Voce naturale italiana</li>
                  <li>Scaricabile per ascolto offline</li>
                  <li>10-15 minuti per lezione</li>
                </ul>
              </article>
              <article className="r360-card rosa">
                <div className="r360-num">03</div>
                <div className="r360-label">Quiz</div>
                <h3>Ti verifichi prima della verifica.</h3>
                <p>
                  10 domande generate sui punti chiave della lezione. Scopri cosa hai capito
                  davvero e dove devi tornare a ripassare.
                </p>
                <ul className="r360-bullets">
                  <li>Domande a risposta multipla</li>
                  <li>Spiegazione di ogni errore</li>
                  <li>Punteggio a ogni tentativo</li>
                </ul>
              </article>
              <article className="r360-card arancio">
                <div className="r360-num">04</div>
                <div className="r360-label">Flashcard</div>
                <h3>I concetti chiave in 5 minuti al giorno.</h3>
                <p>
                  Carte digitali con domanda e risposta. Le ripeti a piccole dosi, anche solo 5
                  minuti tra un impegno e l&apos;altro.
                </p>
                <ul className="r360-bullets">
                  <li>Sistema di ripetizione spaziata</li>
                  <li>Preferite e archiviate</li>
                  <li>Senza doverle creare a mano</li>
                </ul>
              </article>
            </div>
            <p className="r360-foot">
              <span className="arr">→</span>Sempre pronto quando torni a studiare. Senza scrivere
              appunti, senza preparare nulla.
            </p>
          </div>

          <div className="sec-cta" style={{ justifyContent: 'center', marginTop: 30 }}>
            <a className="btn btn-primary btn-lg" href="#lead">
              Scopri il tuo piano gratuito
            </a>
            <a className="btn btn-out btn-lg" href="/come-funziona">
              Guarda come funziona il percorso
            </a>
          </div>
        </div>
      </section>

      {/* ── LE PERSONE (tutor) ──────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Le persone</span>
            <h2 className="sec-h2">
              Studi online, ma <span className="grad-text">non sei mai lasciato solo</span>.
            </h2>
            <p className="sec-lead">
              La differenza di {brand.name} non è solo la piattaforma: ti accompagniamo con tutor per
              materia, metodo e supporto fino agli esami. Ecco alcuni dei nostri tutor.
            </p>
          </div>
          <div className="tutors">
            {[
              { img: 'tutor-bianchi.jpg', name: 'Prof.ssa Bianchi', subj: 'Matematica' },
              { img: 'tutor-conti.jpg', name: 'Prof.ssa Conti', subj: 'Diritto' },
              { img: 'tutor-rossi.jpg', name: 'Prof. Rossi', subj: 'Economia' },
              { img: 'tutor-greco.jpg', name: 'Prof. Greco', subj: 'Inglese' },
            ].map(t => (
              <div key={t.name} className="tutorc">
                <Image
                  src={`/assets-vetrina/${t.img}`}
                  alt={t.name}
                  width={820}
                  height={546}
                  className="ph"
                />
                <h3>{t.name}</h3>
                <div className="subj">{t.subj}</div>
                <div className="vfy">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Tutor verificato
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIPLOMI (18 indirizzi) ──────────────────────────────── */}
      <section
        className="section"
        style={{
          background: 'var(--surface-soft)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Licei, Tecnici, Professionali</span>
            <h2 className="sec-h2">
              Oltre <span className="grad-text">18 indirizzi</span> disponibili.
            </h2>
            <p className="sec-lead">
              Prepariamo percorsi per indirizzi liceali, tecnici e professionali. Durante la
              consulenza valutiamo insieme qual è quello più adatto alla tua storia scolastica.
            </p>
          </div>
          <div className="grid grid-3">
            <div className="dipl">
              <div className="head">
                <span className="ic" style={{ background: 'linear-gradient(135deg,#E3815A,#EC89C0)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10L12 5 2 10l10 5 10-5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </span>
                <h3>Licei</h3>
              </div>
              <p className="desc" style={{ minHeight: 'auto' }}>
                Per un percorso più teorico — umanistico, scientifico, linguistico, artistico o
                sportivo.
              </p>
            </div>
            <div className="dipl">
              <div className="head">
                <span className="ic" style={{ background: 'linear-gradient(135deg,#EC89C0,#DD6BA6)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x={2} y={7} width={20} height={14} rx={2} />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </span>
                <h3>Istituti Tecnici</h3>
              </div>
              <p className="desc" style={{ minHeight: 'auto' }}>
                Per un diploma orientato a economia, turismo, tecnologia o informatica gestionale.
              </p>
            </div>
            <div className="dipl">
              <div className="head">
                <span className="ic" style={{ background: 'linear-gradient(135deg,#E48267,#E3815A)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx={9} cy={7} r={4} />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  </svg>
                </span>
                <h3>Ist. Professionali</h3>
              </div>
              <p className="desc" style={{ minHeight: 'auto' }}>
                Per un percorso vicino al mondo dei servizi, della sanità, dell&apos;assistenza o
                dell&apos;ospitalità.
              </p>
            </div>
          </div>
          <div className="sec-cta" style={{ justifyContent: 'center' }}>
            <a className="btn btn-primary btn-lg" href="/diplomi">
              Vedi tutti gli indirizzi
            </a>
            <a className="btn btn-out btn-lg" href="#lead">
              Non sai quale scegliere?
            </a>
          </div>
        </div>
      </section>

      {/* ── NUMERI ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Migliaia di studenti</span>
            <h2 className="sec-h2">
              I <span className="grad-text">numeri</span> di {brand.name}.
            </h2>
          </div>
          <div className="numbers">
            <div className="stat">
              <div className="v">97%</div>
              <div className="l">degli studenti promossi all&apos;esame finale*</div>
            </div>
            <div className="stat">
              <div className="v">+1.000</div>
              <div className="l">studenti seguiti</div>
            </div>
            <div className="stat">
              <div className="v">+3.000</div>
              <div className="l">tutor qualificati</div>
            </div>
            <div className="stat">
              <div className="v">+7.000</div>
              <div className="l">lezioni disponibili</div>
            </div>
          </div>
          <p
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'var(--muted)',
              marginTop: 16,
              maxWidth: 780,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            *Dati interni {brand.name}. I risultati possono variare in base alla situazione di
            partenza, al percorso scelto e all&apos;impegno dello studente.
          </p>
        </div>
      </section>

      {/* ── TESTIMONIANZE ───────────────────────────────────────── */}
      <section
        className="section"
        style={{
          background: 'var(--surface-soft)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Esperienze</span>
            <h2 className="sec-h2">
              Storie e situazioni reali che{' '}
              <span className="grad-text">seguiamo ogni giorno</span>.
            </h2>
            <p className="sec-lead">
              Tipologie di studenti che accompagniamo nel percorso {brand.name}, ricostruite a
              partire da feedback ricorrenti di chi lo ha fatto.
            </p>
          </div>
          <div className="grid grid-3">
            {[
              {
                img: 'testimonial-marta.jpg',
                name: 'Marta C.',
                role: 'Mamma di Luca, 17 anni',
                quote:
                  "All'inizio eravamo preoccupati, ma il tutor ci ha aiutato a capire il percorso e a organizzare lo studio. La cosa più utile è stata non sentirci soli.",
              },
              {
                img: 'testimonial-andrea.jpg',
                name: 'Andrea R.',
                role: 'Studente lavoratore, 24 anni',
                quote:
                  'Lavoro otto ore al giorno. I podcast e i riassunti già pronti mi hanno fatto risparmiare un sacco di tempo. Avevo sempre qualcuno a cui chiedere.',
              },
              {
                img: 'testimonial-giulia.jpg',
                name: 'Giulia P.',
                role: 'Studentessa, 19 anni',
                quote:
                  'Il piano di studi era costruito davvero sulla mia situazione. Mi seguivano materia per materia e capivo dove migliorare. Mi sono diplomata.',
              },
            ].map(t => (
              <div key={t.name} className="testi v6-photo">
                <Image
                  src={`/assets-vetrina/${t.img}`}
                  alt={t.name}
                  width={820}
                  height={546}
                  className="photoband"
                />
                <div className="body">
                  <div className="stars">★★★★★</div>
                  <p>{t.quote}</p>
                  <div className="who-meta">
                    <div className="nm">{t.name}</div>
                    <div className="rl">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: 'center',
              fontSize: 12,
              color: 'var(--muted)',
              marginTop: 20,
            }}
          >
            Situazioni tipiche dei nostri studenti, costruite a partire da feedback ricorrenti di
            chi ha completato il percorso. Recensioni reali Trustpilot e Google in arrivo.
          </p>
          <div className="sec-cta" style={{ justifyContent: 'center' }}>
            <a className="btn btn-primary btn-lg" href="#lead">
              Scopri il tuo percorso
            </a>
          </div>
        </div>
      </section>

      {/* ── NON PROMETTIAMO SCORCIATOIE ─────────────────────────── */}
      <section className="section notmill">
        <div className="wrap">
          <div className="head">
            <span className="bro-eyebrow">Fiducia</span>
            <h2 className="sec-h2">
              Non promettiamo scorciatoie.{' '}
              <span className="grad-text">Ti prepariamo davvero</span>.
            </h2>
            <p className="sec-lead">
              Il diploma non si compra: si prepara. {brand.name} ti aiuta a recuperare anni scolastici
              con un percorso serio, organizzato e sostenibile, fatto di studio, tutor, materiali,
              verifiche e supporto fino agli esami.
            </p>
          </div>
          <div className="pts">
            <div className="pt bro-pt">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx={11} cy={11} r={8} />
                  <line x1={21} y1={21} x2={16.65} y2={16.65} />
                </svg>
              </div>
              <h4>Ti diciamo quale percorso puoi fare davvero</h4>
            </div>
            <div className="pt bro-pt alt">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
              </div>
              <h4>Ti aiutiamo a organizzare lo studio</h4>
            </div>
            <div className="pt bro-pt">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
              </div>
              <h4>Ti prepariamo con tutor e materiali</h4>
            </div>
            <div className="pt bro-pt alt">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10L12 5 2 10l10 5 10-5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
              </div>
              <h4>Ti accompagniamo fino agli esami</h4>
            </div>
            <div className="pt bro-pt">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x={2} y={5} width={20} height={14} rx={2} />
                  <line x1={2} y1={10} x2={22} y2={10} />
                </svg>
              </div>
              <h4>Ti spieghiamo in chiaro costi, tempi e passaggi</h4>
            </div>
          </div>
          <div className="sec-cta" style={{ justifyContent: 'center', marginTop: 32 }}>
            <a className="btn btn-primary btn-lg" href="#lead">
              Parla con un consulente
            </a>
          </div>
        </div>
      </section>

      {/* ── TRASPARENZA (E se cambi idea?) ──────────────────────── */}
      <section
        className="section"
        style={{
          background: 'var(--surface-soft)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="wrap">
          <div className="sec-head">
            <span className="bro-eyebrow">Trasparenza totale</span>
            <h2 className="sec-h2">
              E se <span className="grad-text">cambi idea</span>?
            </h2>
            <p className="sec-lead">
              Ci ha chiesto spesso un genitore: «ok, ma cosa succede se mio figlio molla a
              dicembre?». Risposta in chiaro: trasparenza piena su sospensioni, disdetta, recupero
              soldi.
            </p>
          </div>
          <div className="molli-band">
            <h3>
              <span className="tag">Le 3 cose da sapere</span>
            </h3>
            <ul>
              <li>
                <b>Puoi sospendere</b>Per motivi seri (salute, lavoro, famiglia) si può sospendere
                il percorso fino a 6 mesi senza penali. Lo riprendi quando vuoi.
              </li>
              <li>
                <b>Disdetta entro 14 giorni</b>Diritto di recesso pieno entro 14 giorni dalla
                firma, senza dover motivare nulla. Restituiamo tutto.
              </li>
              <li>
                <b>Garanzia esame</b>Nei piani Plus e Max, se non passi l&apos;esame ti
                ripreparariamo.{' '}
                <a href="/garanzia" style={{ color: 'var(--coral-dk)', fontWeight: 600 }}>
                  Condizioni complete →
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── PER CHI ─────────────────────────────────────────────── */}
      <section className="section perchi-tz">
        <div className="wrap">
          <div className="sec-head center">
            <span className="bro-eyebrow">Per chi</span>
            <h2 className="sec-h2">
              Un percorso diverso, <span className="grad-text">per ogni situazione</span>.
            </h2>
            <p className="sec-lead">
              Costruiamo il percorso intorno alla tua storia: che tu lavori, faccia sport, viaggi,
              abbia avuto problemi di salute, DSA/BES o anni da recuperare in fretta.
            </p>
          </div>
          <div className="grid-5">
            <a className="pc" href="/come-funziona">
              <div className="ic" style={{ background: 'var(--coral-lt)', color: 'var(--coral-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <rect x={2} y={7} width={20} height={14} rx={2} />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <h4>Per chi lavora</h4>
              <p>Studia online senza lasciare il lavoro, con orari flessibili.</p>
              <span className="arr">Scopri come →</span>
            </a>
            <a className="pc" href="/come-funziona">
              <div className="ic" style={{ background: 'var(--rosa-lt)', color: 'var(--rosa-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="13 17 18 12 13 7" />
                  <polyline points="6 17 11 12 6 7" />
                </svg>
              </div>
              <h4>Per chi ha perso anni</h4>
              <p>Recupera il tempo perso e torna verso il diploma in un solo percorso.</p>
              <span className="arr">Scopri come →</span>
            </a>
            <a className="pc" href="#lead">
              <div className="ic" style={{ background: 'var(--amber-lt)', color: 'var(--amber-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx={12} cy={7} r={4} />
                </svg>
              </div>
              <h4>Per i genitori</h4>
              <p>Aiuta tuo figlio a ritrovare metodo, motivazione e obiettivo.</p>
              <span className="arr">Scopri come →</span>
            </a>
            <a className="pc" href="/come-funziona#accessibilita">
              <div className="ic" style={{ background: 'var(--ai-lt)', color: 'var(--ai-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h4>Per DSA e BES</h4>
              <p>Un percorso più guidato, ordinato e flessibile.</p>
              <span className="arr">Scopri come →</span>
            </a>
            <a className="pc" href="/come-funziona">
              <div className="ic" style={{ background: 'var(--green-lt)', color: 'var(--green-dk)' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx={12} cy={12} r={10} />
                  <path d="M2 12h20M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10c-2.5-3-4-6.5-4-10s1.5-7 4-10z" />
                </svg>
              </div>
              <h4>Per sportivi</h4>
              <p>Studia senza rinunciare ad allenamenti, trasferte e gare.</p>
              <span className="arr">Scopri come →</span>
            </a>
          </div>
          <div className="sec-cta" style={{ justifyContent: 'center', marginTop: 28 }}>
            <a className="btn btn-primary btn-lg" href="#lead">
              Trova il percorso giusto per te
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Dubbi frequenti</span>
            <h2 className="sec-h2">
              Le domande <span className="grad-text">più comuni</span>.
            </h2>
          </div>
          <FaqAccordion />
        </div>
      </section>

      {/* ── PREZZI ──────────────────────────────────────────────── */}
      <section className="section" id="prezzi">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Sostenibile e flessibile</span>
            <h2 className="sec-h2">
              Un percorso per diplomarti, <span className="grad-text">anche a rate</span>.
            </h2>
            <p className="sec-lead">
              I piani {brand.name} partono da 72,68€/mese. In consulenza gratuita ti aiutiamo a
              capire quale piano è più adatto alla tua situazione, in base agli anni da recuperare,
              al supporto di cui hai bisogno e al tempo che puoi dedicare allo studio.
            </p>
          </div>
          <div className="price-teaser">
            <div className="pt-lbl">A partire da</div>
            <div className="pt-amount">
              72,68€<span>/mese</span>
            </div>
            <div className="pt-sub">
              in 24 rate mensili (da 1.500€ totali). Nessun preventivo misterioso: i prezzi di
              Basic, Plus e Max sono qui sul sito, in chiaro.
            </div>
            <div className="pt-cta">
              <a className="btn btn-primary btn-lg" href="#lead">
                Scopri il piano più adatto a te
              </a>
              <a className="btn btn-out btn-lg" href="/prezzi">
                Vedi tutti i prezzi
              </a>
            </div>
            <div className="pt-note">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              Garanzia &ldquo;Promosso o Ripreparato&rdquo; inclusa nei piani Plus e Max
            </div>
          </div>
        </div>
      </section>

      {/* ── ASSISTENZA BUROCRATICA ───────────────────────────────── */}
      <section className="italia-sec" id="assistenza">
        <div className="wrap">
          <div className="hd">
            <span className="eb">Assistenza burocratica</span>
            <h2>
              Della burocrazia <span className="hl">ci pensiamo noi</span>.
            </h2>
            <p className="sub">
              Dall&rsquo;idoneità all&rsquo;esame di Stato ti diciamo esattamente cosa fare, quando
              e come — nella sede convenzionata più vicina a te, ovunque tu sia in Italia.
            </p>
          </div>
          <div className="italia-wrap">
            <div className="buroc-visual">
              <Image
                src="/assets-vetrina/coordinatrice.jpg"
                alt="Una coordinatrice del percorso segue lo studente passo passo"
                width={820}
                height={546}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div className="buroc-map">
                <svg
                  className="mini-it"
                  viewBox="0 0 440 580"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="itg2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#E3815A" />
                      <stop offset="1" stopColor="#EC89C0" />
                    </linearGradient>
                  </defs>
                  <path d="M95,150 C95,118 130,100 165,104 C210,96 260,108 300,128 C308,140 302,158 292,168 C300,198 306,230 318,264 C324,286 332,302 342,302 C360,298 376,302 384,314 C376,326 360,326 346,330 C354,352 364,370 376,390 C394,408 406,424 400,436 C393,446 379,438 369,428 C357,418 347,412 339,404 C331,396 323,390 317,386 C327,402 333,416 331,430 C323,456 309,490 291,500 C281,506 270,498 272,486 C276,468 268,452 256,440 C238,420 224,400 214,382 C204,368 198,356 190,344 C180,326 174,310 168,292 C160,270 150,252 136,236 C124,222 106,198 95,150 Z" />
                  <path d="M210,516 C228,510 270,516 288,528 C294,532 290,542 280,544 C252,552 218,546 204,534 C198,528 202,520 210,516 Z" />
                  <path d="M104,356 C118,352 130,360 130,378 C132,408 128,434 122,448 C116,458 102,456 98,444 C90,424 90,382 96,366 C98,360 100,358 104,356 Z" />
                </svg>
                <b>
                  Sedi convenzionate
                  <br />
                  in tutta Italia
                </b>
              </div>
            </div>
            <ul className="buroc-list">
              <li>
                <span className="n">01</span>
                <div>
                  <h4>Idoneità e iscrizione</h4>
                  <p>
                    Ti diciamo a quale sede iscriverti e ti seguiamo nei moduli, nei documenti e
                    nei bollettini — senza che tu debba diventare esperto di burocrazia.
                  </p>
                </div>
              </li>
              <li>
                <span className="n">02</span>
                <div>
                  <h4>Scadenze sempre sotto controllo</h4>
                  <p>
                    Ti ricordiamo ogni scadenza ministeriale prima che arrivi: non devi tenere a
                    mente nulla.
                  </p>
                </div>
              </li>
              <li>
                <span className="n">03</span>
                <div>
                  <h4>Una coordinatrice dedicata</h4>
                  <p>
                    Ti accompagna passo passo fino al giorno dell&apos;esame, nella sede
                    convenzionata più vicina a casa tua.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── TRUST ECOSYSTEM ─────────────────────────────────────── */}
      <section className="trust-eco">
        <div className="wrap">
          <div className="eco-band">
            <div className="eco-lead">
              <span className="eb">Chi c&apos;è dietro</span>
              <h2>
                {brand.name} è il percorso verso il Diploma di Stato di{' '}
                <span className="hl">LaScuola360</span>.
              </h2>
              <p className="sub">
                Non siamo nati ieri: facciamo parte di <b>Classme S.r.l.</b>, che da anni si occupa
                di formazione e tecnologia per la scuola. Dietro la piattaforma ci sono insegnanti,
                tutor e coordinatori veri — non un call center.
              </p>
            </div>
            <div className="eco-facts">
              <div className="eco-fact">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10L12 5 2 10l10 5 10-5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div>
                  <b>Diploma di Stato</b>
                  <span>Riconosciuto a tutti gli effetti di legge</span>
                </div>
              </div>
              <div className="eco-fact">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx={12} cy={10} r={3} />
                  </svg>
                </div>
                <div>
                  <b>Sedi d&apos;esame in tutta Italia</b>
                  <span>Nella provincia convenzionata più vicina a te</span>
                </div>
              </div>
              <div className="eco-fact">
                <div className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <b>Garanzia esame</b>
                  <span>Ti riprepariamo senza costi aggiuntivi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARTNER CAROUSEL ────────────────────────────────────── */}
      <PartnerCarousel />

      {/* ── SIGIL BAND ──────────────────────────────────────────── */}
      <section className="section" style={{ padding: '30px 0' }}>
        <div className="wrap">
          <div className="sigil-band">
            <span>
              <svg viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {brand.name} è il marchio di <strong>Classme S.r.l.</strong>
            </span>
            <span>
              <svg viewBox="0 0 24 24">
                <circle cx={12} cy={12} r={10} />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Attivi nell&apos;istruzione online dal <strong>2018</strong>
            </span>
            <span>
              <svg viewBox="0 0 24 24">
                <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
              </svg>
              Sede legale: <strong>Roma</strong> · P.IVA 15441141007
            </span>
            <span>
              <svg viewBox="0 0 24 24">
                <path d="M22 10L12 5 2 10l10 5 10-5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              Convenzionati con <strong>sedi paritarie</strong> in tutta Italia
            </span>
          </div>
        </div>
      </section>

      {/* ── CTA BAND 2 ──────────────────────────────────────────── */}
      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Pronto a scoprire il tuo percorso?</h2>
              <p>
                Lascia i tuoi dati: ti diciamo in una consulenza gratuita quanti anni puoi
                recuperare, quale indirizzo scegliere e quanto costa. Senza impegno, anche su
                WhatsApp.
              </p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="#lead">
                Scopri il tuo percorso
              </a>
              <a
                className="btn btn-glass btn-lg"
                href="https://wa.me/393517214644"
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
      </section>

      {/* ── FAB WhatsApp ─────────────────────────────────────────── */}
      <a
        className="fab-wa"
        href="https://wa.me/393517214644"
        target="_blank"
        rel="noopener"
        aria-label="Scrivici su WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
        </svg>
      </a>

      {/* ── MOBILE CTA (sticky bottom bar) ──────────────────────── */}
      <div className="mobile-cta">
        <a className="btn btn-primary" href="tel:0684280999">
          Chiama ora
        </a>
        <a
          className="btn btn-out wa-btn"
          href="https://wa.me/393517214644"
          target="_blank"
          rel="noopener"
          aria-label="Scrivici su WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
            <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
          </svg>
        </a>
      </div>
    </>
  )
}
