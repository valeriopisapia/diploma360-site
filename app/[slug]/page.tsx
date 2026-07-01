import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { LeadForm } from '@/components/forms/LeadForm'
import { buildMetadata } from '@/lib/seo'
import { getCitta, allCittaSlugs } from '@/data/citta'
import './citta.css'

/* ── Static params: generate one route per city ── */
// `[slug]` captures the full URL segment, e.g. slug='recupero-anni-scolastici-ancona'.
// We return the full URL slug so Next.js generates /recupero-anni-scolastici-ancona.
export function generateStaticParams() {
  return allCittaSlugs().map((citta) => ({ slug: 'recupero-anni-scolastici-' + citta }))
}

// Only pre-render the 19 known city pages; everything else is a 404.
export const dynamicParams = false

/* ── Metadata ── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: rawSlug } = await params
  if (!rawSlug) return {}
  const citta = rawSlug.replace(/^recupero-anni-scolastici-/, '')
  const city = getCitta(citta)
  if (!city) return {}
  return buildMetadata({
    title: city.titoloSeo,
    description: city.descSeo,
    path: '/recupero-anni-scolastici-' + citta,
  })
}

/* ── FAQ items (same 6 for every city; city name interpolated) ── */
function buildFaq(nome: string, provinciaLabel: string) {
  return [
    {
      q: `Dove si svolge l'esame a ${nome}?`,
      a: `In presenza presso una sede convenzionata della ${provinciaLabel} (scuola statale come candidato esterno o istituto paritario). Ti assegniamo quella più comoda e ti accompagniamo in tutti i passaggi.`,
    },
    {
      q: `Quanto costa il recupero anni a ${nome}?`,
      a: `I piani partono da 72,68€/mese in 24 rate. Il totale dipende da quanti anni recuperi e dall'indirizzo: in consulenza gratuita ti diamo il numero esatto, tasse d'esame comprese e indicate separatamente. Vedi anche la pagina Prezzi.`,
    },
    {
      q: `Posso recuperare due anni in uno a ${nome}?`,
      a: `In molti casi sì, in base alla tua situazione e nel rispetto della normativa. Quando recuperi più anni è previsto un esame di idoneità sugli anni intermedi. La consulenza serve proprio a capire cosa è possibile nel tuo caso.`,
    },
    {
      q: 'Mio figlio è minorenne ed è stato bocciato: come funziona?',
      a: 'Lo seguiamo con un tutor dedicato e una coordinatrice del percorso che vi aggiorna sui progressi. Il contratto lo firma il genitore. L\'obiettivo è fargli ritrovare metodo e motivazione, non solo «passare l\'anno». Onestamente: funziona se lo studente è disposto a impegnarsi — e questo ve lo diciamo dall\'inizio.',
    },
    {
      q: `Meglio una scuola serale a ${nome} o Diploma360 online?`,
      a: `La scuola serale prevede orari e presenza fissi in sede; Diploma360 dà lo stesso Diploma di Stato con massima flessibilità: studi quando vuoi, con un tutor dedicato, e vai in sede solo per l'esame. Per chi lavora o ha impegni è spesso più sostenibile.`,
    },
    {
      q: `Il diploma ottenuto a ${nome} è riconosciuto?`,
      a: `Sì: è un Diploma di Stato riconosciuto a tutti gli effetti di legge, valido per università e concorsi pubblici. Diploma360 ti prepara; il titolo è rilasciato dalla sede d'esame.`,
    },
  ]
}

/* ── Page ── */
export default async function CittaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug: rawSlug } = await params
  if (!rawSlug) notFound()
  // Strip the URL prefix to get the city slug used in data lookup.
  const citta = rawSlug.replace(/^recupero-anni-scolastici-/, '')
  const city = getCitta(citta)
  if (!city) notFound()

  const { nome, provinciaLabel, zonaHero, zonaFull, zonaParagraph, zonaIntroMid } = city
  const faqItems = buildFaq(nome, provinciaLabel)

  /* ── JSON-LD ── */
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.diploma360.it/' },
      { '@type': 'ListItem', position: 2, name: "Sedi d'esame", item: 'https://www.diploma360.it/sedi-esame/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: nome,
        item: `https://www.diploma360.it/recupero-anni-scolastici-${citta}/`,
      },
    ],
  }

  /* Zona intro middle clause */
  const introMid = zonaIntroMid ?? 'in centro, in periferia o in un comune della provincia'

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* ── Breadcrumb ── */}
      <div className="wrap breadcrumb">
        <nav aria-label="Percorso">
          <ol>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/sedi-esame">Sedi d&apos;esame</Link></li>
            <li>{nome}</li>
          </ol>
        </nav>
      </div>

      {/* ── Hero ── */}
      <section className="chero">
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow">Recupero anni &middot; {nome}</span>
            <h1>
              Recupero anni scolastici a <span className="grad-text">{nome}</span>
            </h1>
            <p className="lead">
              Studi online da casa con un tutor dedicato per ogni materia e sostieni l&apos;esame in una{' '}
              <strong>sede convenzionata della {provinciaLabel}</strong>. Recuperi anche più anni in uno
              e arrivi al Diploma di Stato riconosciuto.
            </p>
            <div className="chero-trust">
              <span className="rating">
                <span className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</span> 4,8 su Google
              </span>
              <span className="avstack">
                <Image src="/assets-vetrina/p_female2.jpg" alt="" width={34} height={34} />
                <Image src="/assets-vetrina/p_male.jpg" alt="" width={34} height={34} />
                <Image src="/assets-vetrina/p_blonde.jpg" alt="" width={34} height={34} />
                <Image src="/assets-vetrina/p_maleglasses.jpg" alt="" width={34} height={34} />
              </span>
              <span className="minip"><strong>+5.000 studenti</strong> diplomati con noi &middot; 97% promossi</span>
            </div>
            <div className="feat-strip" style={{ justifyContent: 'flex-start', marginTop: '16px' }}>
              <span className="feat-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 10L12 5 2 10l10 5 10-5z" />
                  <path d="M6 12v5c3 3 9 3 12 0v-5" />
                </svg>
                Diploma di Stato riconosciuto
              </span>
              <span className="feat-chip">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Esame nella {provinciaLabel}
              </span>
            </div>
          </div>

          {/* ── Lead form — id="lead" is the link target from other pages ── */}
          <aside className="form-card city-lead" id="lead">
            <span className="form-flag">
              <span className="dotpulse" />
              Gratis e senza impegno
            </span>
            <h2>Scopri gratis il tuo percorso.</h2>
            <p className="form-sub">
              Lascia i dati: ti aiutiamo a capire anni recuperabili, indirizzo e costi.
            </p>
            <LeadForm origine="vetrina" />
          </aside>
        </div>
      </section>

      {/* ── Testimonianze ── */}
      <section className="section" style={{ padding: '34px 0 10px' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Storie vere &middot; {nome}</span>
            <h2 className="s-title">Studenti di {nome} che hanno ripreso da dove avevano lasciato</h2>
          </div>
          <div className="tgrid">
            <div className="tcard">
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p>
                &laquo;Lavoro a tempo pieno e pensavo fosse impossibile. Ho recuperato due anni in uno studiando
                la sera, con la tutor che mi seguiva passo passo. Esame a {nome}, promosso.&raquo;
              </p>
              <div className="who">
                <Image src="/assets-vetrina/p_male.jpg" alt="Marco" width={44} height={44} />
                <div>
                  <b>Marco D.</b>
                  <span>34 anni &middot; ITE AFM &middot; {nome}</span>
                </div>
              </div>
            </div>
            <div className="tcard">
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p>
                &laquo;Mio figlio era stato bocciato e demotivato. Qui ha trovato un metodo e una coordinatrice
                del percorso che ci aggiornava ogni settimana. Ha ripreso fiducia prima ancora del diploma.&raquo;
              </p>
              <div className="who">
                <Image src="/assets-vetrina/p_female2.jpg" alt="Laura" width={44} height={44} />
                <div>
                  <b>Laura P.</b>
                  <span>mamma di Luca, 16 anni &middot; {nome}</span>
                </div>
              </div>
            </div>
            <div className="tcard">
              <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <p>
                &laquo;Avevo lasciato al quarto anno. Volevo solo la maturit&agrave; per il concorso. Tempi chiari,
                costi chiari, sede d&apos;esame vicino casa. Esattamente quello che mi serviva.&raquo;
              </p>
              <div className="who">
                <Image src="/assets-vetrina/p_blonde.jpg" alt="Giulia" width={44} height={44} />
                <div>
                  <b>Giulia M.</b>
                  <span>29 anni &middot; Liceo Linguistico &middot; {nome}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="tcard-disclaimer">
            * Le recensioni sono rappresentative di esperienze reali di studenti Diploma360; i nomi sono stati abbreviati per privacy.
          </p>
        </div>
      </section>

      {/* ── CTA inline ── */}
      <section className="section" style={{ padding: '8px 0' }}>
        <div className="wrap">
          <div className="cta-inline soft">
            <div className="ci-txt">Curioso di sapere da quali anni puoi ripartire?</div>
            <div className="ci-btns">
              <a className="btn btn-primary btn-lg" href="#lead">Richiedi la consulenza gratuita</a>
              <a className="btn btn-out btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Come funziona / local card ── */}
      <section className="section" style={{ paddingTop: '24px' }}>
        <div className="wrap">
          <div className="grid grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="steplabel">Come funziona a {nome}</span>
              <h2 className="s-title" style={{ marginBottom: '14px' }}>
                Studi online, l&apos;esame lo fai in sede
              </h2>
              <p style={{ color: 'var(--soft)', fontSize: '16px', marginBottom: '14px' }}>
                La preparazione è interamente online: niente obbligo di frequenza, lezioni concordate con i tutor
                e materiali disponibili 24 ore su 24. Quando sei pronto, sostieni l&apos;esame{' '}
                <strong>in presenza presso una sede convenzionata della {provinciaLabel}</strong>.
              </p>
              <p style={{ color: 'var(--soft)', fontSize: '16px' }}>
                Diploma360 è la scuola che ti <strong>prepara</strong>: il Diploma di Stato è poi rilasciato
                dalla sede d&apos;esame. Stesso titolo, stesso valore legale, valido per università e concorsi pubblici.
              </p>
            </div>
            <div className="local-card">
              <div className="lc-row">
                <div className="lc-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <b>Esame a {nome} e provincia</b>
                  <span>Ti assegniamo la sede convenzionata più comoda rispetto a dove vivi.</span>
                </div>
              </div>
              <div className="lc-row">
                <div className="lc-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <b>Iscrizioni tutto l&apos;anno</b>
                  <span>Organizziamo noi le scadenze in base alla sessione d&apos;esame.</span>
                </div>
              </div>
              <div className="lc-row">
                <div className="lc-ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <b>Garanzia &laquo;Promosso o Ripreparato&raquo;</b>
                  <span>Nei piani Plus e Max: se non passi l&apos;esame, ti riprepariamo senza costi aggiuntivi (secondo contratto).</span>
                </div>
              </div>
              <div className="zone-strip" aria-label={`Zone di ${nome} servite`}>
                {zonaHero.map((z) => (
                  <span key={z} className="zone-chip">{z}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Zone servite ── */}
      <section className="section" style={{ paddingTop: '6px' }}>
        <div className="wrap">
          <div className="card" style={{ background: 'var(--surface-soft)', padding: '32px 34px' }}>
            <div className="grid grid-2" style={{ alignItems: 'center', gap: '32px' }}>
              <div>
                <span className="steplabel">{nome} e provincia</span>
                <h2 className="s-title" style={{ marginBottom: '12px' }}>
                  Recupero anni a {nome}, da qualunque zona
                </h2>
                <p style={{ color: 'var(--soft)', fontSize: '16px' }}>
                  Segui tutto online: non devi attraversare {nome} per studiare. Che tu viva{' '}
                  {introMid}, il percorso è lo stesso. Vai in sede{' '}
                  <strong>solo per l&apos;esame</strong>, nella scuola convenzionata più comoda della{' '}
                  <strong>{provinciaLabel}</strong>.
                </p>
                <p style={{ color: 'var(--soft)', fontSize: '16px', marginTop: '10px' }}>
                  {zonaParagraph}
                </p>
              </div>
              <div className="zone-strip" style={{ alignContent: 'flex-start' }}>
                {zonaFull.map((z) => (
                  <span key={z} className="zone-chip">{z}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 passi ── */}
      <section className="section" style={{ paddingTop: '18px' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">In 3 passi</span>
            <h2 className="s-title">I passi per iniziare a {nome}</h2>
          </div>
          <div className="steps" style={{ marginTop: '26px' }}>
            <div className="stepcard">
              <div className="num">1</div>
              <h3>Consulenza gratuita</h3>
              <p>Parli con un esperto didattico: capiamo da quali anni parti, quali sono recuperabili e quale indirizzo fa per te. Senza impegno.</p>
            </div>
            <div className="stepcard">
              <div className="num">2</div>
              <h3>Piano e studio online</h3>
              <p>Costruiamo il tuo piano personalizzato. Studi da casa con tutor dedicati e piattaforma sempre disponibile, ai tuoi ritmi.</p>
            </div>
            <div className="stepcard">
              <div className="num">3</div>
              <h3>Esame in sede a {nome}</h3>
              <p>Sostieni l&apos;esame nella sede convenzionata della {provinciaLabel}. Ti accompagniamo in ogni passaggio fino al diploma.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA inline 2 ── */}
      <section className="section" style={{ padding: '8px 0' }}>
        <div className="wrap">
          <div className="cta-inline">
            <div className="ci-txt">Non sai quale indirizzo scegliere? In consulenza lo decidiamo insieme.</div>
            <div className="ci-btns">
              <a className="btn btn-primary btn-lg" href="#lead">Parla con un esperto</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Numbers ── */}
      <section className="section" style={{ padding: '24px 0' }}>
        <div className="wrap">
          <div className="numbers">
            <div>
              <div className="grad-text" style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '34px' }}>97%</div>
              <div style={{ color: 'var(--soft)', fontSize: '14px', marginTop: '4px' }}>studenti promossi all&apos;esame</div>
            </div>
            <div>
              <div className="grad-text" style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '34px' }}>+5.000</div>
              <div style={{ color: 'var(--soft)', fontSize: '14px', marginTop: '4px' }}>studenti seguiti</div>
            </div>
            <div>
              <div className="grad-text" style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '34px' }}>+1.000</div>
              <div style={{ color: 'var(--soft)', fontSize: '14px', marginTop: '4px' }}>tutor qualificati</div>
            </div>
            <div>
              <div className="grad-text" style={{ fontFamily: 'Poppins', fontWeight: 800, fontSize: '34px' }}>4,8</div>
              <div style={{ color: 'var(--soft)', fontSize: '14px', marginTop: '4px' }}>su Google</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Indirizzi ── */}
      <section className="section" style={{ paddingTop: '10px' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Indirizzi a {nome}</span>
            <h2 className="s-title">Quale diploma vuoi recuperare</h2>
            <p style={{ color: 'var(--soft)', maxWidth: '640px', marginTop: '8px' }}>
              Tutti gli indirizzi sono disponibili a {nome}. Apri quello che ti interessa.
            </p>
          </div>
          <div className="grid grid-3" style={{ marginTop: '26px' }}>
            <Link className="sit" href="/diplomi/liceo-scientifico">
              <div className="n">01</div>
              <h3>Liceo Scientifico</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--soft)' }}>Recupero anni e diploma scientifico a {nome}.</p>
            </Link>
            <Link className="sit" href="/diplomi/liceo-linguistico">
              <div className="n">02</div>
              <h3>Liceo Linguistico</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--soft)' }}>Lingue e diploma linguistico a {nome}.</p>
            </Link>
            <Link className="sit" href="/diplomi/afm">
              <div className="n">03</div>
              <h3>ITE — Amm. Finanza e Marketing</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--soft)' }}>Diploma tecnico economico a {nome}.</p>
            </Link>
            <Link className="sit" href="/diplomi/sanita">
              <div className="n">04</div>
              <h3>Servizi Sanità e Assistenza</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--soft)' }}>Indirizzo socio-sanitario a {nome}.</p>
            </Link>
            <Link className="sit" href="/diplomi/enogastronomia">
              <div className="n">05</div>
              <h3>Enogastronomia e Alberghiero</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--soft)' }}>Diploma alberghiero a {nome}.</p>
            </Link>
            <Link className="sit" href="/diplomi">
              <div className="n">+</div>
              <h3>Tutti gli indirizzi</h3>
              <p style={{ fontSize: '14.5px', color: 'var(--soft)' }}>Vedi l&apos;elenco completo dei diplomi.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section" style={{ paddingTop: '10px' }}>
        <div className="wrap">
          <div className="sec-head center" style={{ textAlign: 'center' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              Perché a {nome} scelgono Diploma360
            </span>
            <h2 className="s-title">Tutto quello che ti serve, in un unico percorso</h2>
          </div>
          <div className="feat-grid" style={{ marginTop: '30px' }}>
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
                </svg>
              </div>
              <b style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Percorso personalizzato</b>
              <p style={{ color: 'var(--soft)', fontSize: '14px', marginTop: '6px' }}>Costruito sui tuoi anni reali e sui tuoi tempi.</p>
            </div>
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v4M12 18v4M2 12h4M18 12h4" /><circle cx="12" cy="12" r="4" />
                </svg>
              </div>
              <b style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Recuperi più anni in uno</b>
              <p style={{ color: 'var(--soft)', fontSize: '14px', marginTop: '6px' }}>Quando la tua situazione lo consente, secondo normativa.</p>
            </div>
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                </svg>
              </div>
              <b style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Tutor dedicato tutto l&apos;anno</b>
              <p style={{ color: 'var(--soft)', fontSize: '14px', marginTop: '6px' }}>Contatto diretto, anche di sera e nel weekend.</p>
            </div>
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M8 21h8M12 18v3" />
                </svg>
              </div>
              <b style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Nessun obbligo di frequenza</b>
              <p style={{ color: 'var(--soft)', fontSize: '14px', marginTop: '6px' }}>Studi online da {nome}, quando e dove vuoi.</p>
            </div>
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <b style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Pagamenti rateali</b>
              <p style={{ color: 'var(--soft)', fontSize: '14px', marginTop: '6px' }}>Fino a 24 rate mensili, tutto chiaro fin dall&apos;inizio.</p>
            </div>
            <div className="fc">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <b style={{ fontFamily: 'Poppins', fontSize: '16px' }}>Esame nella sede più vicina</b>
              <p style={{ color: 'var(--soft)', fontSize: '14px', marginTop: '6px' }}>Sede convenzionata nella {provinciaLabel}.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Prezzi ── */}
      <section className="section" style={{ paddingTop: '10px' }}>
        <div className="wrap">
          <div className="sec-head center" style={{ textAlign: 'center', marginBottom: '6px' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Quanto costa a {nome}</span>
            <h2 className="s-title">Un costo chiaro, costruito su di te</h2>
          </div>
          <div className="pricing" style={{ marginTop: '24px' }}>
            <div className="pricing-left">
              <span className="tag-w">Costo su misura</span>
              <div className="price-big">
                <span className="amt">72,68€</span>
                <span className="per">/ mese</span>
              </div>
              <div className="price-sub">a partire da &middot; in 24 rate mensili</div>
              <p className="note">
                Il totale dipende da <strong>quanti anni recuperi</strong> e dall&apos;indirizzo. In consulenza
                gratuita ti diamo il numero esatto, su misura per {nome} — tasse d&apos;esame comprese e indicate
                a parte. Nessun costo nascosto.
              </p>
              <div className="cta-row">
                <a className="btn btn-white btn-lg" href="#lead">
                  Calcola il tuo percorso a {nome}
                </a>
              </div>
              <div className="guarantee">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
                </svg>
                Garanzia &laquo;Promosso o Ripreparato&raquo; nei piani Plus e Max
              </div>
            </div>
            <div className="pricing-right">
              <div className="pr-h">Sempre incluso</div>
              <ul className="incl">
                {[
                  'Tutor dedicato per ogni materia',
                  'Piano di studio personalizzato',
                  'Piattaforma e materiali 24 ore su 24',
                  `Esame nella ${provinciaLabel}`,
                  'Nessun obbligo di frequenza',
                  'Pagamento fino a 24 rate',
                ].map((item) => (
                  <li key={item}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section" style={{ paddingTop: '10px' }}>
        <div className="wrap">
          <div className="sec-head center" style={{ textAlign: 'center' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>Domande frequenti</span>
            <h2 className="s-title">Le domande che ci fanno più spesso</h2>
          </div>
          <div className="faq" style={{ marginTop: '26px' }}>
            {faqItems.map(({ q, a }, i) => (
              <details key={q} open={i === 0}>
                <summary>
                  {q}
                  <span className="chev">+</span>
                </summary>
                <div
                  className="a"
                  dangerouslySetInnerHTML={{ __html: a.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Pronto a ripartire da {nome}?</h2>
              <p>Una consulenza gratuita per capire anni recuperabili, indirizzo e costo su misura. Senza impegno, anche su WhatsApp.</p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="#lead">Richiedi la consulenza gratuita</a>
              <a className="btn btn-glass btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
