import Image from 'next/image'
import { JsonLd } from '@/components/seo/JsonLd'
import { brand } from '@/lib/brand'
import { Reveal, Counter } from '@/components/motion/Reveal'
import './home-lascuola.css'

/**
 * HomeLaScuola — umbrella narrative home for La Scuola360, ported 1:1 from
 * `materiale/consegna-valerio 2/Home Scuola360.dc.html`. Unlike HomeDiploma
 * (single-vertical, lead-form hero), this is a two-service umbrella page:
 * it introduces both the Diploma and Ripetizioni products and routes to
 * `/diplomi`, `/ripetizioni`, `/chi-siamo` rather than capturing a lead
 * itself. Header/footer are rendered by the root layout, not here.
 */

// Decorative short form of the brand name for the umbrella badge/eyebrow
// (e.g. "La Scuola360" -> "Scuola360"), derived rather than hardcoded.
const shortName = brand.name.replace(/^La\s+/, '')

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: brand.name,
  url: `${brand.domain}/`,
  logo: `${brand.domain}${brand.logo.header}`,
  telephone: brand.contacts.telHref.replace('tel:', '+39'),
  email: brand.contacts.email,
  parentOrganization: {
    '@type': 'Organization',
    name: 'Classme S.r.l.',
    vatID: 'IT15441141007',
    address: { '@type': 'PostalAddress', addressLocality: 'Roma', addressCountry: 'IT' },
  },
}

const PARTNERS = [
  { src: '/lascuola360/partner/cdp.png', alt: 'CDP' },
  { src: '/lascuola360/partner/coop.png', alt: 'Coop' },
  { src: '/lascuola360/partner/edenred.png', alt: 'Edenred' },
  { src: '/lascuola360/partner/edison.png', alt: 'Edison' },
  { src: '/lascuola360/partner/epassi.png', alt: 'Epassi' },
  { src: '/lascuola360/partner/jointly.png', alt: 'Jointly' },
  { src: '/lascuola360/partner/marsh.png', alt: 'Marsh' },
  { src: '/lascuola360/partner/nana_bianca.png', alt: 'Nana Bianca' },
]

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

export function HomeLaScuola() {
  return (
    <>
      <JsonLd data={orgJsonLd} />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <Reveal as="section" className="hero" id="top">
        <div className="wrap">
          <div className="hero-copy">
            <span className="hero-eyebrow">
              <span className="pill">{shortName}</span> Diploma e Ripetizioni online
            </span>
            <h1>
              La scuola online che <span className="grad-text">ripensa il modo di studiare</span>.
            </h1>
            <p className="hero-lead">
              Tutor e docenti reali, potenziati dai migliori strumenti.{' '}
              <strong>Il calore delle persone, la potenza della tecnologia</strong> — mai uno
              senza l&apos;altro.
            </p>
            <div className="hero-chip-row">
              <span className="ch">
                <CheckIcon />
                Diploma di Stato riconosciuto
              </span>
              <span className="ch">
                <CheckIcon />
                Tutor per ogni materia
              </span>
            </div>
            <div className="av-cluster">
              <div className="avs">
                <Image src="/lascuola360/testimonial-marta.jpg" alt="" width={42} height={42} />
                <Image src="/lascuola360/p_male.jpg" alt="" width={42} height={42} />
                <Image src="/lascuola360/testimonial-giulia.jpg" alt="" width={42} height={42} />
              </div>
              <div className="avtxt">
                <b>+5.000 studenti seguiti</b>
                <br />
                <span className="stars">★★★★★</span> 4,8 su Google
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hv-photo">
              <Image
                src="/lascuola360/studentessa.jpg"
                alt={`Studentessa ${shortName}`}
                fill
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              <div className="hv-live">
                <span className="dot" />
                Lezione live in corso
              </div>
            </div>
            <div className="hv-stat">
              <div className="big">97%</div>
              <div className="lbl">promossi all&apos;esame*</div>
            </div>
            <div className="hv-card">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
              </span>
              <div>
                <div className="t">Tutor per materia</div>
                <div className="s">+ un coordinatore dedicato</div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── TRUSTBAR ────────────────────────────────────────────── */}
      <section className="trustbar">
        <div className="wrap">
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10L12 5 2 10l10 5 10-5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Diploma di Stato riconosciuto
          </span>
          <span className="tb-item">
            <span className="stars">★★★★★</span> 4,8 su Google
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path d="M20 6L9 17l-5-5" />
            </svg>
            97% promossi all&apos;esame<span className="tb-star">*</span>
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx={9} cy={7} r={4} />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            </svg>
            +3.000 tutor qualificati
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            Consulenza gratuita entro 24h
          </span>
        </div>
      </section>

      {/* ── SCEGLI DA DOVE INIZIARE ─────────────────────────────── */}
      <Reveal as="section" className="section" id="percorsi">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Due servizi, una sola scuola</span>
            <h2 className="sec-h2">
              Scegli da dove <span className="grad-text">iniziare</span>.
            </h2>
          </div>
          <div className="lsh-picks">
            <a className="lsh-pick lsh-pick-a" href="/diplomi">
              <span className="lsh-pick-tag">Servizio principale</span>
              <h3>Recupero anni &amp; Diploma</h3>
              <p>
                Il percorso completo fino all&apos;esame di Stato. Recuperi più anni in uno,
                seguito da tutor reali e da una piattaforma che ti dice sempre cosa fare dopo.
              </p>
              <div className="lsh-pick-foot">
                <span className="lsh-pick-cta">
                  Scopri il percorso <span className="arr">→</span>
                </span>
                <span>Diploma riconosciuto · da 72,68€/mese</span>
              </div>
            </a>
            <a className="lsh-pick lsh-pick-b" href="/ripetizioni">
              <span className="lsh-pick-tag">Secondo servizio</span>
              <h3>Ripetizioni online</h3>
              <p>
                Una mano su una materia, con un tutor reale. Per ogni materia, ogni livello —
                dalle medie all&apos;università.
              </p>
              <span className="lsh-pick-cta">
                Trova la tua materia <span className="arr">→</span>
              </span>
            </a>
          </div>
        </div>
      </Reveal>

      {/* ── IL METODO ───────────────────────────────────────────── */}
      <Reveal as="section" className="section" id="metodo">
        <div className="wrap">
          <div className="sec-head" style={{ maxWidth: '62ch' }}>
            <span className="eyebrow">Il metodo {shortName}</span>
            <h2 className="sec-h2">
              La tecnologia organizza lo studio.{' '}
              <span className="grad-text">Le persone fanno la differenza</span>.
            </h2>
            <p className="sec-lead">
              Non ti lasciamo mai davanti a una piattaforma vuota. Ogni percorso nasce
              dall&apos;incontro tra strumenti che tengono l&apos;ordine e persone che tengono la
              rotta.
            </p>
          </div>
          <div className="lsh-flow-box">
            <div className="lsh-flow">
              <div className="lsh-flow-item">
                <div className="top">
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9h18M9 3v18" />
                      <rect x={3} y={3} width={18} height={18} rx={3} />
                    </svg>
                  </span>
                  <span className="step">01 · Su misura</span>
                </div>
                <h3>Piano di studio personale</h3>
                <p>
                  Costruito sui tuoi anni reali e sul tempo che hai. Sai sempre cosa studiare, in
                  che ordine e con quali strumenti.
                </p>
              </div>
              <div className="lsh-flow-item alt">
                <div className="top">
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx={9} cy={7} r={4} />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <span className="step">02 · Le persone</span>
                </div>
                <h3>Tutor per materia + coordinatore</h3>
                <p>
                  Un tutor che chiarisce i dubbi materia per materia, e un coordinatore che tiene
                  insieme il percorso e lo orienta verso l&apos;obiettivo.
                </p>
              </div>
              <div className="lsh-flow-item">
                <div className="top">
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 11l3 3L22 4" />
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                    </svg>
                  </span>
                  <span className="step">03 · La tecnologia</span>
                </div>
                <h3>Verifiche e simulazioni</h3>
                <p>
                  Quiz, test e simulazioni ti dicono cosa hai capito davvero e dove rinforzare,
                  fino al giorno dell&apos;esame.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── STRUMENTI / PIATTAFORMA ─────────────────────────────── */}
      <Reveal as="section" className="section" id="strumenti">
        <div className="wrap">
          <div className="support">
            <div>
              <span className="eyebrow">Strumenti innovativi</span>
              <h2 className="sec-h2" style={{ fontSize: 36 }}>
                Una piattaforma che ti dice sempre{' '}
                <span className="grad-text">cosa studiare dopo</span>.
              </h2>
              <p className="sec-lead" style={{ marginBottom: 8 }}>
                Lezioni, materiali, quiz e avanzamento in un unico posto. Non devi organizzarti da
                solo: hai un percorso chiaro, materia per materia.
              </p>
              <div className="srow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                </span>
                <div>
                  <h3>Piano di studio personale</h3>
                  <p>Vedi materie, argomenti e attività. Sai sempre cosa fare dopo.</p>
                </div>
              </div>
              <div className="srow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </span>
                <div>
                  <h3>Materiali già pronti</h3>
                  <p>Video, appunti, esercizi e quiz organizzati per il tuo indirizzo.</p>
                </div>
              </div>
              <div className="srow">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M18 20V10M12 20V4M6 20v-6" />
                  </svg>
                </span>
                <div>
                  <h3>Avanzamento del percorso</h3>
                  <p>Sai sempre quanto hai completato e cosa manca, senza perdere il filo.</p>
                </div>
              </div>
            </div>
            <div className="browser-frame">
              <div className="bf-bar">
                <span className="r" />
                <span />
                <span />
              </div>
              <Image
                src="/lascuola360/piattaforma.png"
                alt={`La piattaforma di studio ${shortName}`}
                width={820}
                height={525}
                style={{ width: '100%', display: 'block' }}
              />
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
                flashcard. Niente appunti da scrivere, niente materiale da preparare — tutto già
                al tuo posto.
              </p>
            </div>
            <div className="r360-grid">
              <article className="r360-card arancio">
                <div className="r360-num">01</div>
                <div className="r360-label">Riassunto</div>
                <h3>Una lezione di un&apos;ora, riassunta in 3 minuti.</h3>
                <p>
                  I concetti chiave vengono estratti e ordinati per importanza, pronti da
                  rileggere prima di una verifica.
                </p>
              </article>
              <article className="r360-card rosa">
                <div className="r360-num">02</div>
                <div className="r360-label">Podcast</div>
                <h3>Riascolti la lezione mentre cammini.</h3>
                <p>
                  Versione audio della tua lezione con voce naturale. Ottima per i tempi morti —
                  in macchina, sui mezzi, mentre fai sport.
                </p>
              </article>
              <article className="r360-card rosa">
                <div className="r360-num">03</div>
                <div className="r360-label">Quiz</div>
                <h3>Ti verifichi prima della verifica.</h3>
                <p>
                  10 domande generate sui punti chiave della lezione. Scopri cosa hai capito
                  davvero e dove tornare a ripassare.
                </p>
              </article>
              <article className="r360-card arancio">
                <div className="r360-num">04</div>
                <div className="r360-label">Flashcard</div>
                <h3>I concetti chiave in 5 minuti al giorno.</h3>
                <p>
                  Carte digitali con domanda e risposta, a ripetizione spaziata. Già pronte, senza
                  doverle creare a mano.
                </p>
              </article>
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── LE PERSONE ──────────────────────────────────────────── */}
      <Reveal as="section" className="section" id="chi-siamo">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Le persone</span>
            <h2 className="sec-h2">
              Studi online, ma <span className="grad-text">non sei mai lasciato solo</span>.
            </h2>
            <p className="sec-lead">
              Dietro la piattaforma ci sono insegnanti, tutor e coordinatori veri — non un call
              center. Ecco alcuni dei nostri tutor.
            </p>
          </div>
          <div className="tutors">
            {[
              { img: 'p_female2.jpg', name: 'Prof.ssa Bianchi', subj: 'Matematica' },
              { img: 'p_blonde.jpg', name: 'Prof.ssa Conti', subj: 'Diritto' },
              { img: 'p_male.jpg', name: 'Prof. Rossi', subj: 'Economia' },
              { img: 'p_maleglasses.jpg', name: 'Prof. Greco', subj: 'Inglese' },
            ].map((t) => (
              <div key={t.name} className="tutorc">
                <Image
                  src={`/lascuola360/${t.img}`}
                  alt={t.name}
                  width={192}
                  height={192}
                  className="ph"
                />
                <h3>{t.name}</h3>
                <div className="subj">{t.subj}</div>
                <div className="vfy">
                  <CheckIcon />
                  Tutor verificato
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── NUMERI ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="numbers">
            <div className="stat">
              <div className="v">
                <Counter value="+5.000" />
              </div>
              <div className="l">studenti seguiti</div>
            </div>
            <div className="stat">
              <div className="v">
                <Counter value="+3.000" />
              </div>
              <div className="l">tutor qualificati</div>
            </div>
            <div className="stat">
              <div className="v">
                <Counter value="97%" />
              </div>
              <div className="l">promossi all&apos;esame*</div>
            </div>
            <div className="stat">
              <div className="v">
                <Counter value="+7.000" />
              </div>
              <div className="l">lezioni disponibili</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIANZE ───────────────────────────────────────── */}
      <Reveal as="section" className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Esperienze</span>
            <h2 className="sec-h2">Storie reali che seguiamo ogni giorno.</h2>
          </div>
          <div className="grid grid-3">
            {[
              {
                img: 'testimonial-marta.jpg',
                name: 'Marta C.',
                role: 'Mamma di Luca, 17 anni',
                quote:
                  "All'inizio eravamo preoccupati, ma il tutor ci ha aiutato a organizzare lo studio. La cosa più utile è stata non sentirci soli.",
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
            ].map((t) => (
              <div key={t.name} className="testi v6-photo">
                <Image
                  src={`/lascuola360/${t.img}`}
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
        </div>
      </Reveal>

      {/* ── CHI C'È DIETRO ──────────────────────────────────────── */}
      <section className="trust-eco">
        <div className="wrap">
          <div className="eco-band">
            <div className="eco-lead">
              <span className="eb">Chi c&apos;è dietro</span>
              <h2>
                {shortName} è la scuola online di <span className="hl">Classme S.r.l.</span>
              </h2>
              <p className="sub">
                Non siamo nati ieri: <b>attivi nell&apos;istruzione online dal 2018</b>, ci
                occupiamo di formazione e tecnologia per la scuola. Dietro la piattaforma ci sono
                insegnanti, tutor e coordinatori veri — non un call center.
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

      {/* ── PARTNER ─────────────────────────────────────────────── */}
      <Reveal as="section" className="partner-mq" id="partner" aria-label="Partner">
        <div className="wrap">
          <p className="lead">Aziende e realtà che collaborano con noi</p>
          <div className="marquee">
            <div className="marquee-track">
              {PARTNERS.map((p) => (
                <img key={p.alt} className="p-logo" src={p.src} alt={p.alt} loading="lazy" width={600} height={300} />
              ))}
              {PARTNERS.map((p) => (
                <img key={`${p.alt}-dup`} className="p-logo" src={p.src} alt="" aria-hidden="true" loading="lazy" width={600} height={300} />
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* ── CHIUSURA MORBIDA ────────────────────────────────────── */}
      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Scopri il tuo percorso.</h2>
              <p>
                Che ti serva il diploma o una mano su una materia, partiamo da una consulenza
                gratuita. Ti diciamo in chiaro cosa puoi fare, come e in quanto tempo.
              </p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="/diplomi">
                Percorso Diploma
              </a>
              <a className="btn btn-glass btn-lg" href="/ripetizioni">
                Ripetizioni online
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
