import Image from 'next/image'
import { buildMetadata } from '@/lib/seo'
import { LeadForm } from '@/components/forms/LeadForm'
import { JsonLd } from '@/components/seo/JsonLd'
import { LpHeader } from './LpHeader'
import { LpFooter } from './LpFooter'
import { LpFloatActions } from './LpFloatActions'

export const metadata = buildMetadata({
  title: 'Diploma360 — Recupera gli anni persi e preparati al diploma senza stress',
  description:
    'Recupera gli anni persi e preparati al diploma valido e riconosciuto dallo Stato italiano, online. Tutor per materia, materiali già organizzati e supporto fino agli esami. 97% promossi. Da 72,68€/mese in 24 rate.',
  path: '/lp',
  noindex: true,
})

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Diploma360',
  url: 'https://www.diploma360.it/',
  logo: 'https://www.diploma360.it/foto/logo-diploma360.png',
  description:
    'Preparazione al diploma di Stato riconosciuto, online. Recupero anni scolastici con tutor per materia e accompagnamento fino agli esami.',
  telephone: '+39 06 84 280 999',
  email: 'info@diploma360.it',
  legalName: 'Classme S.r.l.',
  vatID: 'IT15441141007',
  taxID: '15441141007',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Giovanni Antonelli 41',
    postalCode: '00197',
    addressLocality: 'Roma',
    addressRegion: 'RM',
    addressCountry: 'IT',
  },
  areaServed: 'IT',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    bestRating: '5',
    ratingCount: '120',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Posso recuperare più anni in uno?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, dove la normativa lo consente è possibile recuperare fino a 2 annualità in un anno.',
      },
    },
    {
      '@type': 'Question',
      name: 'Il diploma è riconosciuto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Sì: Diploma360 ti accompagna nella preparazione agli esami necessari per conseguire un diploma valido e riconosciuto dallo Stato italiano. Diploma360 non rilascia direttamente il diploma: l'esame si sostiene presso scuole paritarie o statali.",
      },
    },
    {
      '@type': 'Question',
      name: 'Come posso seguire il percorso di mio figlio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Hai accesso a un profilo genitore dedicato, ricevi report periodici sui progressi e puoi parlare con l'esperto didattico.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto costa Diploma360?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si parte da 72,68€/mese in 24 rate.',
      },
    },
    {
      '@type': 'Question',
      name: "Cosa succede se non passo l'esame?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Nei piani Plus e Max è inclusa la garanzia Promosso o Ripreparato, secondo condizioni: se non passi, ti riprepariamo gratis.',
      },
    },
  ],
}

// ─── SVG helpers ─────────────────────────────────────────────────────────────

function PhoneIcon({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  )
}

function WaIcon({ size = 17 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 16.15h-.01c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.19.84.85-3.11-.2-.32a8.23 8.23 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43-.14-.01-.31-.01-.48-.01-.16 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.57.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/>
    </svg>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LpPage() {
  return (
    <>
      <JsonLd data={orgSchema} />
      <JsonLd data={faqSchema} />

      <LpHeader />

      <main>

        {/* HERO + FORM */}
        <section className="hero" data-screen-label="Hero + Form">
          <div className="wrap">
            <div className="hero-copy">
              {/* Eyebrow badge (2026/2027 · Iscrizioni aperte) hidden for now per request */}
              <h1>
                Recupera gli anni persi e{' '}
                <span className="grad-text">preparati al diploma</span> senza stress.
              </h1>
              <p className="hero-lead">
                Un percorso online costruito sui tuoi anni da recuperare, con materiali già
                organizzati, tutor per materia e supporto fino agli esami. Diploma valido e
                riconosciuto dallo Stato italiano.
              </p>
              <div className="hero-price">
                <span className="hp-label">A partire da</span>
                <div className="hp-line">
                  <span className="hp-amount">72,68€</span>
                  <span className="hp-desc">al mese</span>
                </div>
              </div>
            </div>

            <aside className="form-card" id="form">
              <span className="form-flag">
                <span className="dotpulse" /> Gratis e senza impegno
              </span>
              <h2>Scopri gratis il tuo percorso.</h2>
              <p className="form-sub">
                Lascia i dati: ti aiutiamo a capire anni recuperabili, indirizzo e costi.
              </p>
              <LeadForm origine="landing-ads" />
            </aside>
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="trustbar" data-screen-label="Trust bar">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="ti-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
              </span>
              Recupera più anni in 1
            </div>
            <div className="trust-item">
              <span className="ti-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </span>
              Nessun obbligo di frequenza
            </div>
            <div className="trust-item">
              <span className="ti-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </span>
              Lezioni disponibili H24
            </div>
            <div className="trust-item">
              <span className="ti-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              Oltre 3.000 tutor
            </div>
            <div className="trust-item">
              <span className="ti-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </span>
              Promosso o Ripreparato
            </div>
            <div className="trust-item">
              <span className="ti-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="5" width="20" height="14" rx="2" ry="2"/>
                  <line x1="2" y1="10" x2="22" y2="10"/>
                </svg>
              </span>
              Diploma di Stato riconosciuto
            </div>
          </div>
          <p className="asterisk-note" style={{ textAlign: 'center', padding: '14px 24px 18px', margin: 0 }}>
            <b>*</b>Promosso o Ripreparato: garanzia inclusa nei piani Plus e Max, secondo condizioni.
            Se non passi l'esame, ti riprepariamo gratis.{' '}
            <b style={{ marginLeft: '10px' }}>*</b>97% promossi: dati interni Diploma360; i risultati
            possono variare in base alla situazione di partenza e all'impegno dello studente.
          </p>
        </section>

        {/* PER CHI */}
        <section className="section" data-screen-label="Per chi è">
          <div className="wrap">
            <div className="perchi">
              <div className="perchi-media">
                <div className="perchi-photo">
                  <Image
                    src="/foto/chi.jpg"
                    alt="Studente che riprende il percorso verso il diploma"
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1000px) 50vw, 560px"
                    style={{ objectFit: 'cover', objectPosition: 'center 16%' }}
                    loading="lazy"
                  />
                </div>
                <a className="perchi-parent" href="#famiglia">
                  <span className="pf-illo">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="7" r="3"/>
                      <circle cx="17" cy="9" r="2.4"/>
                      <path d="M3 20v-1.5A4.5 4.5 0 0 1 7.5 14h3A4.5 4.5 0 0 1 15 18.5V20"/>
                      <path d="M16 20v-1a3.5 3.5 0 0 1 5-3.16"/>
                    </svg>
                  </span>
                  <span className="pf-body">
                    <b>Sei un genitore preoccupato per tuo figlio?</b>
                    <span className="pf-sub">Ti aiutiamo a capire se Diploma360 può funzionare nella sua situazione.</span>
                  </span>
                  <span className="pf-arrow">→</span>
                </a>
              </div>
              <div className="perchi-copy">
                <div className="tag">Per chi è</div>
                <h2>Quando la scuola tradizionale non basta.</h2>
                <p>
                  Capita più spesso di quanto si pensi. La soluzione non è studiare di più, ma
                  sapere cosa studiare, in che ordine e con quali strumenti — con qualcuno che ti
                  accompagna fino agli esami.
                </p>
                <div className="perchi-list">
                  <div className="perchi-item"><span className="check">✓</span> Hai lasciato la scuola e vuoi rientrare</div>
                  <div className="perchi-item"><span className="check">✓</span> Sei stato bocciato uno o più anni</div>
                  <div className="perchi-item"><span className="check">✓</span> Lavori o hai poco tempo per studiare</div>
                  <div className="perchi-item"><span className="check">✓</span> Cerchi un percorso flessibile, online</div>
                  <div className="perchi-item"><span className="check">✓</span> Vuoi essere seguito, non solo iscritto</div>
                  <div className="perchi-item"><span className="check">✓</span> Hai DSA, BES o difficoltà nello studio</div>
                </div>
              </div>
            </div>
            <div className="cta-rail cta-rail-soft">
              <div className="cr-text">
                <b>Non sai se fa al caso tuo o di tuo figlio?</b>
                <span>Te lo diciamo in una consulenza gratuita, senza impegno: bastano due minuti.</span>
              </div>
              <div className="cr-actions">
                <a className="btn btn-primary btn-lg" href="#form">Richiedi la consulenza gratuita</a>
                <a className="cr-phone" href="tel:+390684280999">
                  <PhoneIcon size={18} /> 06 84 280 999
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* METODO 4 PILLARS */}
        <section className="section white" id="metodo" data-screen-label="Cos'è Diploma360">
          <div className="wrap">
            <div className="metodo-top">
              <div className="sec-head">
                <div className="tag">Cos'è Diploma360</div>
                <h2>Perché Diploma360 è diverso.</h2>
                <p className="sec-lead">
                  Non ti diamo solo contenuti da studiare. Organizziamo un percorso: partiamo dagli
                  anni da recuperare, costruiamo un piano, mettiamo a disposizione materiali e tutor,
                  e ti accompagniamo fino agli esami.
                </p>
              </div>
              <div className="metodo-photo">
                <Image
                  src="/foto/studio.jpg"
                  alt="Studente che segue le lezioni online sulla piattaforma Diploma360"
                  fill
                  sizes="(max-width:640px) 100vw, (max-width:1000px) 100vw, 480px"
                  style={{ objectFit: 'cover', objectPosition: 'center 28%' }}
                  loading="lazy"
                />
              </div>
            </div>
            <div className="pillars">
              <div className="pillar">
                <span className="step"><span className="num">01</span> Persone</span>
                <h3>Tutor + esperto didattico</h3>
                <p>Un tutor per ogni materia e un referente che costruisce il piano insieme a te. Online non significa da solo.</p>
              </div>
              <div className="pillar">
                <span className="step"><span className="num">02</span> Metodo</span>
                <h3>Personalizzato sui tuoi anni</h3>
                <p>Si parte dagli anni reali da recuperare, non da un programma standard. Materie e tempi calibrati su di te.</p>
              </div>
              <div className="pillar">
                <span className="step"><span className="num">03</span> Strumenti</span>
                <h3>Piattaforma + risorse digitali</h3>
                <p>Videolezioni, materiali, quiz, Tutore.AI e Riepilogo360: ogni lezione diventa riassunto, podcast e flashcard.</p>
              </div>
              <div className="pillar">
                <span className="step"><span className="num">04</span> Esami</span>
                <h3>Fino al diploma</h3>
                <p>Candidatura, fascicolo, PCTO, tesina e sede d'esame: ti seguiamo anche sui passaggi organizzativi.</p>
              </div>
            </div>
          </div>
        </section>

        {/* INDIRIZZI */}
        <section className="section" id="indirizzi" data-screen-label="Indirizzi">
          <div className="wrap">
            <div className="sec-head">
              <div className="tag">I diplomi</div>
              <h2>18 indirizzi tra cui scegliere.</h2>
              <p className="sec-lead">
                Ti prepariamo agli esami per il diploma di Stato riconosciuto su licei, istituti
                tecnici e professionali. In consulenza valutiamo l'indirizzo più adatto in base alla
                storia scolastica, agli anni da recuperare e all'esame da sostenere.
              </p>
            </div>
            <div className="indirizzi">
              <div className="indir-card">
                <div className="ic-head">
                  <span className="ic-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10L12 5 2 10l10 5 10-5z"/>
                      <path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"/>
                    </svg>
                  </span>
                  <span>
                    <span className="ic-title">Licei</span>
                    <span className="ic-count">6 indirizzi</span>
                  </span>
                </div>
                <ul className="indir-list">
                  <li><span className="dot">✓</span> Scientifico</li>
                  <li><span className="dot">✓</span> Scienze Applicate</li>
                  <li><span className="dot">✓</span> Linguistico</li>
                  <li><span className="dot">✓</span> Classico</li>
                  <li><span className="dot">✓</span> Scienze Umane</li>
                  <li><span className="dot">✓</span> Artistico</li>
                </ul>
              </div>
              <div className="indir-card">
                <div className="ic-head">
                  <span className="ic-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                  </span>
                  <span>
                    <span className="ic-title">Istituti Tecnici</span>
                    <span className="ic-count">6 indirizzi</span>
                  </span>
                </div>
                <ul className="indir-list">
                  <li><span className="dot">✓</span> Amministrazione, Finanza e Marketing</li>
                  <li><span className="dot">✓</span> Turismo</li>
                  <li><span className="dot">✓</span> Informatica e Telecomunicazioni</li>
                  <li><span className="dot">✓</span> Costruzioni, Ambiente e Territorio</li>
                  <li><span className="dot">✓</span> Meccanica e Meccatronica</li>
                  <li><span className="dot">✓</span> Elettronica ed Elettrotecnica</li>
                </ul>
              </div>
              <div className="indir-card">
                <div className="ic-head">
                  <span className="ic-ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                    </svg>
                  </span>
                  <span>
                    <span className="ic-title">Istituti Professionali</span>
                    <span className="ic-count">6 indirizzi</span>
                  </span>
                </div>
                <ul className="indir-list">
                  <li><span className="dot">✓</span> Servizi per la Sanità e l&apos;Assistenza Sociale</li>
                  <li><span className="dot">✓</span> Enogastronomia e Ospitalità Alberghiera</li>
                  <li><span className="dot">✓</span> Servizi Commerciali</li>
                  <li><span className="dot">✓</span> Manutenzione e Assistenza Tecnica</li>
                  <li><span className="dot">✓</span> Servizi per l&apos;Agricoltura</li>
                  <li><span className="dot">✓</span> Industria e Artigianato Made in Italy</li>
                </ul>
              </div>
            </div>
            <p className="asterisk-note" style={{ textAlign: 'center' }}>
              <b>*</b>Indirizzi attivabili in base alla normativa e alla disponibilità.
              In consulenza verifichiamo l&apos;indirizzo più adatto al tuo percorso.
            </p>
          </div>
        </section>

        {/* PARTNER */}
        <section className="partner-wrap" data-screen-label="Partner">
          <div className="wrap">
            <div className="partner-label">Con il supporto e la fiducia di</div>
          </div>
          <div className="partner-track">
            <div className="partner-item"><img src="/foto/partner/cdp.png" alt="Cassa Depositi e Prestiti" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/edenred.png" alt="Edenred" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/jointly.png" alt="Jointly" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/coop.png" alt="Coop" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/edison.png" alt="Edison" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/epassi.png" alt="Epassi" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/marsh.png" alt="Marsh" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/nana_bianca.png" alt="Nana Bianca" loading="lazy" /></div>
            {/* Duplicate set for seamless loop */}
            <div className="partner-item"><img src="/foto/partner/cdp.png" alt="" aria-hidden="true" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/edenred.png" alt="" aria-hidden="true" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/jointly.png" alt="" aria-hidden="true" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/coop.png" alt="" aria-hidden="true" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/edison.png" alt="" aria-hidden="true" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/epassi.png" alt="" aria-hidden="true" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/marsh.png" alt="" aria-hidden="true" loading="lazy" /></div>
            <div className="partner-item"><img src="/foto/partner/nana_bianca.png" alt="" aria-hidden="true" loading="lazy" /></div>
          </div>
        </section>

        {/* LE PERSONE + FAMIGLIA */}
        <section className="section airy" id="famiglia" data-screen-label="Le persone e la famiglia">
          <div className="wrap">
            <div className="family-box persone">
              <div className="family-text">
                <div className="tag">Le persone</div>
                <h2 className="persone-h">
                  Online non significa da soli. Né per chi studia, né per chi gli sta vicino.
                </h2>
                <p>
                  Un tutor per ogni materia e un esperto didattico costruiscono il percorso insieme
                  allo studente — e una famiglia che resta informata a ogni passo. La tecnologia
                  organizza lo studio. Le persone fanno la differenza.
                </p>
                <ul className="family-bullets">
                  <li>
                    <span className="fb-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="4"/>
                        <path d="M4 21v-1a6 6 0 0 1 12 0v1"/>
                        <path d="M18 8h4M20 6v4"/>
                      </svg>
                    </span>
                    <span>
                      <b>Profilo genitore</b>
                      <small>Accesso dedicato per vedere materie, progressi e prossimi passi.</small>
                    </span>
                  </li>
                  <li>
                    <span className="fb-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="8" y1="13" x2="14" y2="13"/>
                        <line x1="8" y1="17" x2="12" y2="17"/>
                      </svg>
                    </span>
                    <span>
                      <b>Report periodici</b>
                      <small>Aggiornamenti sui risultati delle verifiche e sugli obiettivi della settimana.</small>
                    </span>
                  </li>
                  <li>
                    <span className="fb-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>
                      </svg>
                    </span>
                    <span>
                      <b>Tutor raggiungibile</b>
                      <small>Puoi parlare con l&apos;esperto didattico che segue tuo figlio.</small>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="family-media">
                <div className="family-photo">
                  <Image
                    src="/foto/p_male.jpg"
                    alt="Tutor Diploma360 — laureato e abilitato"
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1000px) 100vw, 520px"
                    style={{ objectFit: 'cover', objectPosition: 'center top' }}
                    loading="lazy"
                  />
                </div>
                <div className="family-float">
                  <span className="ff-ic">✓</span>
                  <div>
                    <div className="ff-t">Tutor verificato</div>
                    <div className="ff-s">Laureato e abilitato</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GARANZIA */}
        <section className="section tight" data-screen-label="Garanzia">
          <div className="wrap">
            <div className="guarantee">
              <div className="seal"><span>♥</span></div>
              <div>
                <span className="guarantee-badge">♥ Garanzia Diploma360</span>
                <h2>Promosso o Ripreparato.</h2>
                <p>
                  Non promettiamo scorciatoie: il diploma non si compra, si prepara. Nei piani Plus
                  e Max, se non passi l&apos;esame ti riprepariamo gratis, secondo condizioni. Studio,
                  tutor, materiali e supporto fino agli esami.
                </p>
              </div>
              <a className="btn btn-primary btn-lg" href="#form">Voglio una consulenza</a>
            </div>
          </div>
        </section>

        {/* PREZZO */}
        <section className="section white airy" id="prezzi" data-screen-label="Prezzo">
          <div className="wrap">
            <div className="price-row">
              <div className="price-text">
                <div className="tag">Prezzi trasparenti</div>
                <h2>Un percorso accessibile, costruito su misura.</h2>
                <p>
                  Il prezzo del tuo percorso dipende dagli anni da recuperare e dal livello di
                  supporto. Pagamento rateizzabile in 24 mensilità. Durante la consulenza gratuita
                  ti spieghiamo il piano più adatto e quanto costa esattamente — senza sorprese.
                </p>
                <ul className="price-bullets">
                  <li><span className="check">✓</span> 24 rate</li>
                  <li><span className="check">✓</span> Consulenza gratuita prima di scegliere</li>
                  <li><span className="check">✓</span> Garanzia Promosso o Ripreparato disponibile</li>
                </ul>
              </div>
              <div className="price-box">
                <span className="pb-label">A partire da</span>
                <div className="price-big">72,68€<span className="pb-month">/mese</span></div>
                <span className="pb-sub">in 24 rate</span>
                <div className="pb-pills">
                  <span>24 rate</span>
                  <span>Senza sorprese</span>
                </div>
                <a className="btn btn-primary btn-lg" href="#form">Scopri il tuo piano</a>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIAL */}
        <section className="section tight" data-screen-label="Testimonial">
          <div className="wrap">
            <div className="sec-head" style={{ marginBottom: '24px' }}>
              <div className="tag">Esperienze</div>
              <h2>Chi era nella tua situazione, ce l&apos;ha fatta.</h2>
            </div>
            <div className="testi-track">
              <div className="testi-card is-parent">
                <div className="t-head">
                  <div className="tavatar">
                    <img src="/foto/contatti.jpg" alt="Marta C." />
                  </div>
                  <div>
                    <span className="t-name">Marta C. <span className="t-badge">Genitore</span></span>
                    <span className="t-meta">Mamma di Luca, 17</span>
                  </div>
                </div>
                <span className="stars">★★★★★</span>
                <p>&ldquo;All'inizio eravamo preoccupati, ma il tutor ci ha aiutato a capire il percorso e a organizzare lo studio. Non sentirci soli è stata la cosa più utile.&rdquo;</p>
              </div>
              <div className="testi-card">
                <div className="t-head">
                  <div className="tavatar">
                    <img src="/foto/chi.jpg" alt="Davide L." />
                  </div>
                  <div>
                    <span className="t-name">Davide L.</span>
                    <span className="t-meta">Studente, 22 anni</span>
                  </div>
                </div>
                <span className="stars">★★★★★</span>
                <p>&ldquo;Dovevo recuperare in fretta. Mi hanno costruito un piano serrato ma sostenibile e sono arrivato all&apos;esame preparato.&rdquo;</p>
              </div>
              <div className="testi-card">
                <div className="t-head">
                  <div className="tavatar">
                    <img src="/foto/studio.jpg" alt="Andrea R." />
                  </div>
                  <div>
                    <span className="t-name">Andrea R.</span>
                    <span className="t-meta">Studente lavoratore, 24</span>
                  </div>
                </div>
                <span className="stars">★★★★★</span>
                <p>&ldquo;Lavoro otto ore al giorno. Podcast e riassunti pronti mi hanno fatto risparmiare un sacco di tempo.&rdquo;</p>
              </div>
              <div className="testi-card">
                <div className="t-head">
                  <div className="tavatar">
                    <img src="/foto/quando.jpg" alt="Giulia P." />
                  </div>
                  <div>
                    <span className="t-name">Giulia P.</span>
                    <span className="t-meta">Studentessa, 19 anni</span>
                  </div>
                </div>
                <span className="stars">★★★★★</span>
                <p>&ldquo;Il piano di studi era costruito sulla mia situazione. Mi seguivano materia per materia. Mi sono diplomata.&rdquo;</p>
              </div>
            </div>
            <p className="testi-hint">← scorri per vedere altre esperienze →</p>
            <div className="cta-rail">
              <div className="cr-text">
                <b>Anche tu puoi arrivare al diploma.</b>
                <span>Parti da una consulenza gratuita: capiamo insieme anni recuperabili, indirizzo e costi.</span>
              </div>
              <div className="cr-actions">
                <a className="btn btn-primary btn-lg" href="#form">Richiedi la consulenza gratuita</a>
                <a className="cr-phone" href="tel:+390684280999">
                  <PhoneIcon size={18} /> 06 84 280 999
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section white" id="faq" data-screen-label="FAQ">
          <div className="wrap">
            <div className="sec-head">
              <div className="tag">Domande frequenti</div>
              <h2>Le risposte prima di iniziare.</h2>
            </div>
            <div className="faq">
              <details open>
                <summary>Posso recuperare più anni in uno?</summary>
                <div className="answer">Sì, dove la normativa lo consente è possibile recuperare fino a 2 annualità in un anno.</div>
              </details>
              <details>
                <summary>Il diploma è riconosciuto?</summary>
                <div className="answer">Sì: Diploma360 ti accompagna nella preparazione agli esami necessari per conseguire un diploma valido e riconosciuto dallo Stato italiano. Diploma360 non rilascia direttamente il diploma: l&apos;esame si sostiene presso scuole paritarie o statali.</div>
              </details>
              <details>
                <summary>Come posso seguire il percorso di mio figlio?</summary>
                <div className="answer">Hai accesso a un profilo genitore dedicato, ricevi report periodici sui progressi e puoi parlare con l&apos;esperto didattico.</div>
              </details>
              <details>
                <summary>Cosa succede se mio figlio non studia abbastanza?</summary>
                <div className="answer">Il tutor si accorge subito dei rallentamenti e interviene. Riceverai un alert dal profilo genitore.</div>
              </details>
              <details>
                <summary>Quanto costa Diploma360?</summary>
                <div className="answer">Si parte da 72,68€/mese in 24 rate.</div>
              </details>
              <details>
                <summary>Cosa succede se non passo l&apos;esame?</summary>
                <div className="answer">Nei piani Plus e Max è inclusa la garanzia &ldquo;Promosso o Ripreparato&rdquo;, secondo condizioni: se non passi, ti riprepariamo gratis.</div>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL */}
        <section className="final" data-screen-label="Final CTA">
          <div className="wrap">
            <div className="final-box">
              <div>
                <span className="final-eyebrow">Consulenza gratuita</span>
                <h2>Pronto a scoprire il tuo percorso?</h2>
                <p>Consulenza gratuita e senza impegno. Risposta entro 24h anche su WhatsApp.</p>
              </div>
              <a className="btn btn-lg" href="#form">Scopri gratis il tuo percorso</a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <LpFooter />

      {/* MOBILE STICKY CTA */}
      <div className="mobile-cta">
        <a className="btn btn-outline" href="tel:+390684280999">
          <PhoneIcon size={17} /> 06 84 280 999
        </a>
        <a className="btn btn-wa" href="https://wa.me/393517214644">
          <WaIcon /> Scrivici su WA
        </a>
      </div>

      {/* FLOATING ACTIONS */}
      <LpFloatActions />
    </>
  )
}
