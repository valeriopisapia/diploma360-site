import Image from 'next/image'
import { JsonLd } from '@/components/seo/JsonLd'
import { brand } from '@/lib/brand'
import './chi-siamo.css'

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: brand.name,
  url: `${brand.domain}/`,
  logo: `${brand.domain}${brand.logo.header}`,
  telephone: '+390684280999',
  email: brand.contacts.email,
  parentOrganization: {
    '@type': 'Organization',
    name: 'Classme S.r.l.',
    vatID: 'IT15441141007',
    address: { '@type': 'PostalAddress', addressLocality: 'Roma', addressCountry: 'IT' },
  },
}

export function ChiSiamoDiploma() {
  return (
    <>
      <JsonLd data={orgJsonLd} />

      {/* Hero */}
      <section className="chero">
        <div className="wrap">
          <div>
            <span className="eb">Chi siamo</span>
            <h1>{brand.name} ti aiuta a <span className="hl">diventare ciò che vuoi essere</span>.</h1>
            <p className="lead">Da anni accompagniamo giovani studenti, adulti, professionisti e sportivi a conseguire il diploma. Programmi personalizzati, tutor selezionati e una piattaforma costruita intorno alla vita reale: non un corso uguale per tutti, ma il percorso che apre nuove opportunità di lavoro e di vita.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="/#lead">Scopri il tuo percorso</a>
              <a className="btn btn-out btn-lg" href="/come-funziona">Scopri il metodo</a>
            </div>
          </div>
          <div className="hvis">
            <Image
              src="/assets-vetrina/sede-vetrina.png"
              alt="La nostra sede a Roma — Viale Castrense 5E"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="trustbar">
        <div className="wrap">
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
            Diploma di Stato riconosciuto
          </span>
          <span className="tb-item"><span className="stars">★★★★★</span> 4,8 su Google</span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
            97% promossi all&apos;esame
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            </svg>
            +3.000 tutor
          </span>
        </div>
      </section>

      {/* Cosa facciamo */}
      <section className="section csec">
        <div className="wrap">
          <div className="chd">
            <span className="eb">Cosa facciamo</span>
            <h2>Una scuola pensata <span className="hl">per la vita reale</span>.</h2>
            <p>{brand.name} offre supporto a giovani studenti, adulti, professionisti e sportivi per conseguire il diploma, fornendo gli strumenti per raggiungere obiettivi professionali e personali. Grazie ai programmi personalizzati e alla flessibilità dell&apos;apprendimento online, ogni persona può progredire nel proprio percorso educativo e di vita.</p>
            <p style={{ marginTop: '10px' }}><strong style={{ color: '#1F1F1F' }}>10 motivi per sceglierci</strong> &mdash; quello che ci rende diversi, in dieci punti concreti.</p>
          </div>
          <div className="cvant">
            <div className="v"><div className="n">1</div><p>Recuperi <strong>più anni scolastici in uno solo</strong> e ottieni il diploma dove e quando vuoi.</p></div>
            <div className="v r"><div className="n">2</div><p>Piano di studio <strong>su misura per le tue esigenze</strong>, non un corso uguale per tutti.</p></div>
            <div className="v"><div className="n">3</div><p>Basta una <strong>connessione internet e un dispositivo</strong>: pc, tablet o smartphone.</p></div>
            <div className="v r"><div className="n">4</div><p>Adattabile alle <strong>tue capacità e impegni</strong>, qualsiasi sia la tua situazione.</p></div>
            <div className="v"><div className="n">5</div><p>Accesso ai <strong>materiali didattici in qualsiasi momento</strong>, anche di notte, anche di domenica.</p></div>
            <div className="v r"><div className="n">6</div><p>Assistenza dei <strong>tutor tutto l&apos;anno</strong>, non solo nei giorni di lezione.</p></div>
            <div className="v"><div className="n">7</div><p>Confronti online con <strong>tutor e docenti qualificati</strong>, selezionati con cura.</p></div>
            <div className="v r"><div className="n">8</div><p>Approccio e <strong>Metodo {brand.name}</strong> per un apprendimento davvero efficace.</p></div>
            <div className="v"><div className="n">9</div><p><strong>Costi competitivi</strong> e niente spostamenti per arrivare a scuola.</p></div>
            <div className="v r"><div className="n">10</div><p>Lezioni live per <strong>migliorare le tue abilità</strong> e personalizzare il tuo studio.</p></div>
          </div>
        </div>
      </section>

      {/* Powered by LaScuola360 */}
      <section className="section csec alt">
        <div className="wrap">
          <div className="lasc">
            <div className="ph">
              <Image
                src="/assets-vetrina/studio.jpg"
                alt={`LaScuola360 — il network dietro ${brand.name}`}
                width={700}
                height={525}
                style={{ width: '100%', borderRadius: '14px', display: 'block', aspectRatio: '4/3', objectFit: 'cover', boxShadow: '0 16px 36px rgba(0,0,0,.10)' }}
              />
            </div>
            <div>
              <h3>Powered by LaScuola360.</h3>
              <p>{brand.name} fa parte di <strong>LaScuola360</strong>, network di servizi educativi che ogni anno accompagna migliaia di studenti tra recupero anni, ripetizioni e preparazione esami. Una squadra che mette al primo posto la qualità del rapporto umano: dietro la piattaforma ci sono persone vere, non un&apos;app anonima.</p>
              <p>La nostra esperienza viene dal lavoro quotidiano con studenti di tutte le età: ragazzi che hanno perso anni, lavoratori che vogliono diplomarsi, atleti, persone in percorsi clinici, famiglie expat. Ogni storia è diversa, e il nostro lavoro è costruire il percorso giusto per ciascuna.</p>
            </div>
          </div>
        </div>
      </section>

      {/* La nostra sede */}
      <section className="sede sedeB">
        <div className="wrap split">
          <div className="photo-lg">
            <Image
              src="/assets-vetrina/sede-classe.png"
              alt="Un'aula della nostra sede a Roma"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <span className="badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              Viale Castrense 5E &middot; Roma
            </span>
          </div>
          <div className="copy">
            <span className="eb">La nostra sede</span>
            <h2>Una scuola con le <span className="hl">porte aperte</span>.</h2>
            <p className="lead">Dietro {brand.name} c&apos;è <strong>LaScuola360</strong>, il network di cui facciamo parte, con una sede fisica a Roma. Non un&apos;app anonima: un posto reale dove studiare, incontrare i tutor e venire a conoscerci.</p>
            <ul className="proofs">
              <li>
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span><strong>Sede fisica a Roma</strong> &mdash; vieni a trovarci in Viale Castrense.</span>
              </li>
              <li>
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 10h18M8 20h8" />
                  </svg>
                </span>
                <span><strong>Aule attrezzate</strong> per studio e preparazione agli esami.</span>
              </li>
              <li>
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.11 6.47L12 17.4l-5.81 3.06 1.11-6.47L2.6 9.35l6.5-.95z" />
                  </svg>
                </span>
                <span><strong>4,8 su Google</strong> &mdash; recensioni reali di studenti.</span>
              </li>
              <li>
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 10L12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </span>
                <span><strong>Diploma di Stato</strong> presso sedi d&apos;esame convenzionate.</span>
              </li>
            </ul>
            <div className="cta-row">
              <a className="btn btn-primary" href="https://www.google.com/maps/search/?api=1&query=Viale%20Castrense%205E%2C%2000182%20Roma" target="_blank" rel="noopener">Indicazioni &rarr;</a>
              <span className="chip"><span className="star">★</span> 4,8 su Google</span>
            </div>
          </div>
        </div>
        <div className="wrap two">
          <figure>
            <Image
              src="/assets-vetrina/sede-aula.png"
              alt="Aula studio attrezzata"
              width={600}
              height={300}
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', display: 'block' }}
            />
            <figcaption>Aula studio attrezzata</figcaption>
          </figure>
          <figure>
            <Image
              src="/assets-vetrina/sede-interni.png"
              alt="Gli spazi interni"
              width={600}
              height={300}
              style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', display: 'block' }}
            />
            <figcaption>Gli spazi interni</figcaption>
          </figure>
        </div>
        <div className="wrap">
          <p className="legal">{brand.name} è un marchio di <strong>Classme S.r.l.</strong> &middot; P.IVA IT15441141007 &middot; Sede: Viale Castrense 5E, 00182 Roma</p>
        </div>
      </section>

      {/* I numeri */}
      <section className="section csec">
        <div className="wrap">
          <div className="chd center">
            <span className="eb">I numeri di {brand.name}</span>
            <h2>Quello che facciamo, <span className="hl">in cifre</span>.</h2>
          </div>
          <div className="cstats">
            <div className="s"><div className="v">97%</div><div className="l">studenti promossi all&apos;esame finale*</div></div>
            <div className="s"><div className="v">+1.000</div><div className="l">studenti seguiti negli ultimi anni</div></div>
            <div className="s"><div className="v">+3.000</div><div className="l">tutor qualificati nel network</div></div>
            <div className="s"><div className="v">+7.000</div><div className="l">videolezioni disponibili in piattaforma</div></div>
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginTop: '18px', maxWidth: '760px', marginLeft: 'auto', marginRight: 'auto' }}>*Dati interni {brand.name}. I risultati possono variare in base alla situazione di partenza, al percorso scelto e all&apos;impegno dello studente.</p>
        </div>
      </section>

      {/* Valori */}
      <section className="section csec alt">
        <div className="wrap">
          <div className="chd">
            <span className="eb">I nostri valori</span>
            <h2>Quello in cui <span className="hl">crediamo</span>.</h2>
            <p>Non un&apos;azienda che vende corsi: una squadra di persone che lavora ogni giorno con studenti che hanno una storia.</p>
          </div>
          <div className="values">
            <div className="vc">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                </svg>
              </span>
              <h3>Le persone prima della tecnologia</h3>
              <p>La piattaforma organizza lo studio, ma sono i tutor a fare la differenza. Niente automatismo cieco: relazione umana, sempre.</p>
            </div>
            <div className="vc r">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </span>
              <h3>Trasparenza prima di tutto</h3>
              <p>Prezzi in chiaro, niente preventivi misteriosi, niente promesse magiche. <strong>{brand.name} prepara, non rilascia</strong>: il diploma è di Stato.</p>
            </div>
            <div className="vc">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                </svg>
              </span>
              <h3>Un obiettivo concreto</h3>
              <p>Non vendiamo &laquo;esperienze formative&raquo;: portiamo studenti all&apos;esame finale, preparati. È per questo che lavoriamo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner */}
      <section className="section csec" id="partner">
        <div className="wrap">
          <div className="chd center">
            <span className="eb">Partner</span>
            <h2>Una rete di <span className="hl">collaborazioni qualificate</span>.</h2>
            <p>Lavoriamo con istituti convenzionati, enti formativi e partner che condividono i nostri valori. La rete cresce: i nuovi loghi arrivano qui appena confermati.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: '18px 40px', padding: '18px 24px 4px', marginTop: '14px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} style={{ width: '120px', height: '42px', borderRadius: '10px', background: 'rgba(0,0,0,.04)', border: '1px dashed rgba(0,0,0,.1)', display: 'inline-block' }} />
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--muted)', marginTop: '14px' }}>Loghi dei partner in arrivo</p>
        </div>
      </section>

      {/* CTA band */}
      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Vuoi conoscerci meglio?</h2>
              <p>In consulenza gratuita ti raccontiamo chi siamo e come possiamo aiutarti. Senza impegno.</p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="/#lead">Scopri il tuo percorso</a>
              <a className="btn btn-glass btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">
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
    </>
  )
}
