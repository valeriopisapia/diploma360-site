import Image from 'next/image'
import { JsonLd } from '@/components/seo/JsonLd'
import { brand } from '@/lib/brand'
import { Reveal, Counter } from '@/components/motion/Reveal'
import { LeadSection } from '@/components/forms/LeadSection'
import './chi-siamo-lascuola.css'

/**
 * ChiSiamoLaScuola — unified "Chi siamo" for La Scuola360, ported 1:1 from
 * `materiale/consegna-valerio 2/Chi-Siamo.dc.html`. Unlike ChiSiamoDiploma
 * (single-vertical), this page merges chi-siamo + "perché fidarti" + partner
 * carousel + contatti into one page, since La Scuola360 is the umbrella brand
 * covering both Diploma and Ripetizioni.
 */

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

const REASONS = [
  'Recuperi più anni scolastici in uno solo, dove e quando vuoi.',
  'Piano di studio su misura, non un corso uguale per tutti.',
  'Basta una connessione e un dispositivo: pc, tablet o smartphone.',
  'Adattabile alle tue capacità e ai tuoi impegni, qualunque sia la tua situazione.',
  'Materiali didattici accessibili in qualsiasi momento, anche di notte e di domenica.',
  "Assistenza dei tutor tutto l'anno, non solo nei giorni di lezione.",
  'Confronti online con tutor e docenti qualificati, selezionati con cura.',
  `Il Metodo ${brand.name}, per un apprendimento davvero efficace.`,
  'Costi competitivi e niente spostamenti per arrivare a scuola.',
  'Lezioni live per migliorare le tue abilità e personalizzare lo studio.',
]

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export function ChiSiamoLaScuola() {
  return (
    <>
      <JsonLd data={orgJsonLd} />

      {/* Hero */}
      <Reveal as="section" className="chero">
        <div className="wrap">
          <div>
            <span className="eb">Chi siamo</span>
            <h1>Persone vere, <span className="hl">non un&apos;app anonima</span>.</h1>
            <p className="lead">{brand.name} è la scuola online di Classme: diploma e ripetizioni, con tutor e docenti reali potenziati dai migliori strumenti. Da anni accompagniamo studenti, adulti, professionisti e sportivi a raggiungere i loro obiettivi &mdash; non un corso uguale per tutti, ma il percorso giusto per ciascuno.</p>
          </div>
          <div className="hvis">
            <Image
              src="/lascuola360/sede-vetrina.png"
              alt={`La sede ${brand.name} a Roma`}
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </Reveal>

      {/* Numeri */}
      <section className="section tight">
        <div className="wrap">
          <div className="cstats">
            <Reveal as="div" className="s"><div className="v">dal 2018</div><div className="l">nell&apos;istruzione online</div></Reveal>
            <Reveal as="div" className="s"><div className="v"><Counter value="+5.000" /></div><div className="l">studenti seguiti</div></Reveal>
            <Reveal as="div" className="s"><div className="v"><Counter value="+3.000" /></div><div className="l">tutor e docenti</div></Reveal>
            <Reveal as="div" className="s"><div className="v">Roma</div><div className="l">sede fisica reale</div></Reveal>
          </div>
        </div>
      </section>

      {/* Cosa facciamo / chi accompagniamo */}
      <Reveal as="section" className="section csec">
        <div className="wrap">
          <div className="chd">
            <span className="eb">Cosa facciamo</span>
            <h2>Una scuola pensata <span className="hl">per la vita reale</span>.</h2>
            <p>La nostra esperienza viene dal lavoro quotidiano con studenti di ogni età. Ogni storia è diversa, e il nostro lavoro è costruire il percorso giusto per ciascuna &mdash; con programmi personalizzati e la flessibilità dell&apos;apprendimento online.</p>
          </div>
          <div className="values">
            <div className="vc"><h3>Ragazzi che hanno perso anni</h3><p>Per rientrare in carreggiata e recuperare fiducia.</p></div>
            <div className="vc r"><h3>Lavoratori e adulti</h3><p>Che vogliono diplomarsi o rafforzarsi, ai propri ritmi.</p></div>
            <div className="vc"><h3>Atleti e famiglie expat</h3><p>Chi studia tra trasferte, viaggi o percorsi particolari.</p></div>
          </div>
        </div>
      </Reveal>

      {/* 10 motivi */}
      <Reveal as="section" className="section csec alt">
        <div className="wrap">
          <div className="chd">
            <span className="eb">Perché sceglierci</span>
            <h2>Quello che ci rende diversi, <span className="hl">in 10 punti</span>.</h2>
          </div>
          <div className="ls-reasons">
            {REASONS.map((text, i) => (
              <div className="r" key={i}>
                <span className="n">{String(i + 1).padStart(2, '0')}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Valori */}
      <Reveal as="section" className="section csec">
        <div className="wrap">
          <div className="chd">
            <span className="eb">Quello in cui crediamo</span>
            <h2>Non vendiamo corsi. <span className="hl">Portiamo le persone al risultato.</span></h2>
          </div>
          <div className="values">
            <div className="vc">
              <h3>Le persone prima della tecnologia</h3>
              <p>La piattaforma organizza lo studio, ma sono i tutor a fare la differenza. Niente automatismo cieco: relazione umana, sempre.</p>
            </div>
            <div className="vc r">
              <h3>Trasparenza prima di tutto</h3>
              <p>Prezzi in chiaro, niente preventivi misteriosi, niente promesse magiche. Prepariamo davvero, non vendiamo scorciatoie.</p>
            </div>
            <div className="vc">
              <h3>Un obiettivo concreto</h3>
              <p>Non vendiamo &laquo;esperienze formative&raquo;: accompagniamo gli studenti fino al risultato, preparati. È per questo che lavoriamo.</p>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Perché fidarti */}
      <Reveal as="section" className="section csec alt">
        <div className="wrap">
          <div className="ls-trust">
            <div className="chd">
              <span className="eb">Perché fidarti</span>
              <h2>Una realtà strutturata, <span className="hl">non un sito improvvisato</span>.</h2>
              <p>{brand.name} è un marchio di Classme S.r.l. Dietro la piattaforma ci sono persone vere.</p>
            </div>
            <div className="ls-trust-grid">
              <div className="c">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </span>
                <h3>Insegnanti e tutor reali</h3>
                <p>Tutor per materia e coordinatori didattici selezionati con cura. Non un call center.</p>
              </div>
              <div className="c">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                </span>
                <h3>Attivi dal 2018</h3>
                <p>Anni di esperienza in formazione e tecnologia per la scuola, con sede legale a Roma e P.IVA verificabile.</p>
              </div>
              <div className="c">
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M3 21h18" /><path d="M5 21V7l8-4v18" /><path d="M19 21V11l-6-4" /></svg>
                </span>
                <h3>Convenzioni reali</h3>
                <p>Rete di sedi statali e paritarie in tutta Italia dove sostenere gli esami, nel rispetto della normativa.</p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Garanzie */}
      <Reveal as="section" className="section csec">
        <div className="wrap">
          <div className="chd">
            <span className="eb">Nero su bianco</span>
            <h2>Cosa ti garantiamo, <span className="hl">per iscritto</span>.</h2>
          </div>
          <div className="ls-guarantees">
            <div className="g"><h3>Recesso entro 14 giorni</h3><p>Diritto di ripensamento pieno entro 14 giorni dalla firma, senza dover motivare.</p></div>
            <div className="g"><h3>Sospensione fino a 6 mesi</h3><p>Per motivi seri (salute, lavoro, famiglia) sospendi senza penali e riprendi quando vuoi.</p></div>
            <div className="g"><h3>Garanzia esame</h3><p>Nei piani Plus e Max del diploma, se non superi l&apos;esame ti ripreparariamo, secondo le condizioni previste.</p></div>
          </div>
        </div>
      </Reveal>

      {/* Come riconoscere una scuola seria */}
      <Reveal as="section" className="section csec alt">
        <div className="wrap">
          <div className="chd">
            <h2>Come riconoscere <span className="hl">una scuola seria</span>.</h2>
            <p>Prima di affidarti a chiunque &mdash; noi compresi &mdash; verifica questi punti. È il modo migliore per non finire nella giungla dei diplomifici.</p>
          </div>
          <div className="ls-compare">
            <div className="p ok">
              <div className="p-head">Una scuola seria&hellip;</div>
              <ul>
                <li><CheckIcon />Ti dice costi, tempi e cosa è incluso prima di firmare</li>
                <li><CheckIcon />Ti mostra la piattaforma e i materiali di studio</li>
                <li><CheckIcon />Fa sostenere l&apos;esame in una sede ufficiale vicino a te</li>
                <li><CheckIcon />Ti fa parlare con insegnanti e tutor veri</li>
                <li><CheckIcon />Mette tutele e recesso nero su bianco</li>
              </ul>
            </div>
            <div className="p warn">
              <div className="p-head">Diffida se&hellip;</div>
              <ul>
                <li><XIcon />Non ti dice il prezzo al telefono o è evasiva</li>
                <li><XIcon />Promette il diploma &laquo;facile&raquo; o &laquo;tutti promossi&raquo;</li>
                <li><XIcon />Ti propone l&apos;esame a centinaia di km da casa</li>
                <li><XIcon />Ti manda solo una dispensa di poche pagine</li>
                <li><XIcon />Non ti mostra piattaforma, docenti o sedi</li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Promesse */}
      <Reveal as="section" className="section csec">
        <div className="wrap">
          <div className="chd">
            <span className="eb">Onestà</span>
            <h2>Le nostre promesse <span className="hl">(e cosa non promettiamo)</span>.</h2>
          </div>
          <div className="ls-compare">
            <div className="p ok">
              <div className="p-head">Ti promettiamo</div>
              <ul>
                <li><CheckIcon />Di dirti cosa puoi recuperare davvero, e in quanto tempo</li>
                <li><CheckIcon />Di prepararti con tutor, materiali e verifiche fino agli esami</li>
                <li><CheckIcon />Di spiegarti in chiaro costi, rate e passaggi</li>
                <li><CheckIcon />Di accompagnarti nelle pratiche e nella scelta della sede</li>
                <li><CheckIcon />Di esserci quando rallenti o perdi il filo</li>
              </ul>
            </div>
            <div className="p warn">
              <div className="p-head">Non ti promettiamo</div>
              <ul>
                <li><XIcon />&laquo;Tutti promossi&raquo;: sarebbe irrealistico e scorretto</li>
                <li><XIcon />Il diploma senza studiare o senza esame</li>
                <li><XIcon />Scorciatoie fuori dalla normativa</li>
                <li><XIcon />Tempi miracolosi non sostenibili per la tua situazione</li>
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {/* La nostra sede */}
      <Reveal as="section" className="section csec alt">
        <div className="wrap">
          <div className="ls-sede">
            <div>
              <span className="eb">La nostra sede</span>
              <h2>Una scuola con una sede vera, <span className="hl">a Roma</span>.</h2>
              <p>Non un&apos;app anonima: dietro {brand.name} c&apos;è una sede fisica <strong>nel cuore di Roma</strong>, in Viale Castrense, a pochi passi da San Giovanni. Un posto reale dove studiare, incontrare i tutor di persona e fare due chiacchiere con una coordinatrice del percorso. Le porte sono aperte: la stessa cura che mettiamo online la trovi anche qui, guardando negli occhi le persone che ti seguiranno.</p>
              <p className="addr"><strong>Classme S.r.l.</strong><br />Viale Castrense 5, 00182 Roma<br />P.IVA / C.F. 15441141007</p>
            </div>
            <div className="ls-photoframe">
              <Image
                src="/lascuola360/sede-classe.png"
                alt={`Un'aula della sede ${brand.name} a Roma`}
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Gallery sede */}
      <section className="section tight">
        <div className="wrap">
          <div className="ls-gallery">
            <Reveal as="div" className="ph">
              <Image src="/lascuola360/sede-aula.png" alt={`Aula della sede ${brand.name}`} fill style={{ objectFit: 'cover' }} />
            </Reveal>
            <Reveal as="div" className="ph">
              <Image src="/lascuola360/sede-interni.png" alt={`Interni della sede ${brand.name}`} fill style={{ objectFit: 'cover' }} />
            </Reveal>
            <Reveal as="div" className="ph">
              <Image src="/lascuola360/sede-vetrina.png" alt={`La vetrina ${brand.name} a Roma`} fill style={{ objectFit: 'cover' }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Partner */}
      <Reveal as="section" className="partner-mq" id="partner" aria-label="Partner">
        <div className="wrap">
          <div className="chd center">
            <span className="eb">Partner</span>
            <h2>Una rete di <span className="hl">collaborazioni qualificate</span>.</h2>
            <p>Lavoriamo con istituti convenzionati, enti formativi e partner che condividono i nostri valori.</p>
          </div>
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

      {/* Contatti */}
      <Reveal as="section" className="section csec" id="contatti">
        <div className="wrap">
          <div className="chd center">
            <span className="eb">Parliamone</span>
            <h2>3 canali, <span className="hl">rispondiamo entro 24h</span>.</h2>
            <p>La prima consulenza con una coordinatrice del percorso è sempre gratuita e senza impegno.</p>
          </div>

          <div className="ls-quotebar">
            <Image src="/lascuola360/testimonial-marta.jpg" alt="Marcella, coordinatrice del percorso" width={66} height={66} style={{ borderRadius: '50%', objectFit: 'cover' }} />
            <blockquote>
              &laquo;Quando mi chiami, ascolto la tua situazione e ti dico in chiaro se possiamo aiutarti, quanto tempo serve e quanto costa. Senza fretta e senza impegno.&raquo;
              <cite>Marcella M. <span>&middot; coordinatrice del percorso</span></cite>
            </blockquote>
          </div>

          <div className="ls-contact-cards">
            <a href={brand.contacts.telHref}>
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              </span>
              <h3>Telefono</h3>
              <div className="detail">{brand.contacts.telDisplay}</div>
              <div className="hours">Lun-Ven 9-19 &middot; Sab 9-13</div>
            </a>
            <a href={brand.contacts.whatsappUrl}>
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
              </span>
              <h3>WhatsApp</h3>
              <div className="detail">351 721 4644</div>
              <div className="hours">Tutti i giorni 9-21</div>
            </a>
            <a href={`mailto:${brand.contacts.email}`}>
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg>
              </span>
              <h3>Email</h3>
              <div className="detail">{brand.contacts.email}</div>
              <div className="hours">Risposta entro 24h</div>
            </a>
          </div>

          <div className="ls-workbanner">
            <div>
              <h3>Lavora con noi</h3>
              <p>Vuoi candidarti come tutor? Scrivici con il tuo CV.</p>
            </div>
            <a className="btn btn-primary" href={`mailto:${brand.contacts.email}`}>Invia candidatura</a>
          </div>
        </div>
      </Reveal>

      {/* Chiusura */}
      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Vuoi conoscerci meglio?</h2>
              <p>In consulenza gratuita ti raccontiamo chi siamo e come possiamo aiutarti. Senza impegno.</p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="#lead">Percorso Diploma</a>
              <a className="btn btn-glass btn-lg" href="/ripetizioni">Ripetizioni</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM IN FONDO ───────────────────────────────────────── */}
      <LeadSection />
    </>
  )
}
