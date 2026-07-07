import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { diplomi } from '@/data/diplomi'
import { brand } from '@/lib/brand'
import './diplomi.css'

export const metadata = buildMetadata({
  title: `Diplomi e indirizzi online | ${brand.name}`,
  description:
    'Tutti gli indirizzi: licei, istituti tecnici e professionali. Trova il percorso giusto per recuperare gli anni e diplomarti.',
  path: '/diplomi',
})

const jsonLdData = {
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
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Roma',
      addressCountry: 'IT',
    },
  },
}

const licei = diplomi.filter((d) => d.categoria === 'liceo')
const tecnici = diplomi.filter((d) => d.categoria === 'tecnico')
const professionali = diplomi.filter((d) => d.categoria === 'professionale')

export default function Diplomi() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <section className="dhero">
        <div className="wrap dhero-grid">
          <div className="dhero-copy">
            <span className="eb">Indirizzi di studio</span>
            <h1>18+ indirizzi di studio. <span className="hl">Quello giusto è uno solo: il tuo</span>.</h1>
            <p className="lead">Licei, Tecnici, Professionali: in {brand.name} prepariamo tutti gli indirizzi di Stato. Durante la consulenza valutiamo insieme quale è il più adatto alla tua storia scolastica, agli anni da recuperare e a quello che vuoi fare dopo.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="/#lead">Scopri quale fa per te</a>
              <Link className="btn btn-out btn-lg" href="/come-funziona">Scopri il metodo</Link>
            </div>
          </div>
          <div className="dhero-photo">
            <Image src="/assets-vetrina/p_group.jpg" alt={`Studenti ${brand.name}`} fill style={{objectFit:'cover',objectPosition:'center'}} />
            <span className="tag">Diploma di Stato riconosciuto</span>
            <div className="quote">
              <span className="ql">Il punto d&apos;arrivo</span>
              <p>«Un Diploma di Stato vero, conseguito presso sedi convenzionate — lo stesso che otterresti in qualsiasi scuola pubblica.»</p>
              <span>— {brand.name}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trustbar">
        <div className="wrap">
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            Diploma di Stato riconosciuto
          </span>
          <span className="tb-item"><span className="stars">★★★★★</span> 4,8 su Google</span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
            97% promossi all&apos;esame
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
            +3.000 tutor
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
            24 rate mensili
          </span>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="bro-head center">
            <span className="eyebrow-b">Tre macro-categorie</span>
            <h2>Tre famiglie di indirizzi, <span className="hl">ognuna con una direzione</span>.</h2>
            <p>La prima scelta è tra Liceo, Istituto Tecnico e Istituto Professionale. Ognuna apre porte diverse e prepara a sbocchi diversi.</p>
          </div>
          <div className="macro-grid">
            <a className="macro licei" href="#licei">
              <div className="mhd">
                <span className="mnum">01</span>
                <span className="mic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg></span>
              </div>
              <h3>Licei</h3>
              <div className="count">8 indirizzi · impronta culturale</div>
              <p className="mdesc">Formazione generale solida: lingue, scienze, arte, scienze umane, sport. Aprono naturalmente le porte all&apos;università.</p>
              <div className="mexamples">
                <span className="mex">Scientifico</span>
                <span className="mex">Classico</span>
                <span className="mex">Linguistico</span>
                <span className="mex">Sc. Umane</span>
                <span className="mex">+ 4</span>
              </div>
              <div className="mafter"><b>Dove portano</b>Università (umanistica, scientifica, sanitaria, giuridica), percorsi accademici e di ricerca.</div>
              <span className="mcta">Vedi tutti gli 8 indirizzi</span>
            </a>
            <a className="macro tecnici" href="#tecnici">
              <div className="mhd">
                <span className="mnum">02</span>
                <span className="mic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg></span>
              </div>
              <h3>Istituti Tecnici</h3>
              <div className="count">8 indirizzi · competenze pratiche</div>
              <p className="mdesc">Equilibrio tra teoria e applicazione: economia, informatica, meccanica, chimica, grafica. Preparano sia al lavoro sia all&apos;università tecnica.</p>
              <div className="mexamples">
                <span className="mex">AFM</span>
                <span className="mex">Turismo</span>
                <span className="mex">Informatica</span>
                <span className="mex">Meccanica</span>
                <span className="mex">+ 4</span>
              </div>
              <div className="mafter"><b>Dove portano</b>Lavoro qualificato in azienda, ITS, lauree tecniche (Ingegneria, Economia, Informatica).</div>
              <span className="mcta">Vedi tutti gli 8 indirizzi</span>
            </a>
            <a className="macro prof" href="#professionali">
              <div className="mhd">
                <span className="mnum">03</span>
                <span className="mic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg></span>
              </div>
              <h3>Istituti Professionali</h3>
              <div className="count">4+ indirizzi · mestiere e servizio</div>
              <p className="mdesc">Più orientati al lavoro diretto: servizi commerciali, enogastronomia, sanità, agricoltura. Forte componente di laboratorio e tirocinio.</p>
              <div className="mexamples">
                <span className="mex">Servizi comm.</span>
                <span className="mex">Enogastronomia</span>
                <span className="mex">Sanità</span>
                <span className="mex">Agricoltura</span>
              </div>
              <div className="mafter"><b>Dove portano</b>Inserimento immediato nel mondo del lavoro o accesso a percorsi formativi specialistici.</div>
              <span className="mcta">Vedi tutti gli indirizzi</span>
            </a>
          </div>
        </div>
      </section>

      <nav className="dnav" aria-label="Vai a sezione">
        <div className="wrap">
          <span className="lbl">Vai a:</span>
          <a href="#licei">Licei (8)</a>
          <a href="#tecnici">Tecnici (8+)</a>
          <a href="#professionali">Professionali (5+)</a>
          <a href="/#lead">Consulenza gratuita</a>
        </div>
      </nav>

      <section className="section dsec licei" id="licei">
        <div className="wrap">
          <div className="dhd">
            <div className="badge">01</div>
            <div className="tx">
              <span className="eb">Licei</span>
              <h2>8 indirizzi <span className="hl">a impronta culturale</span>.</h2>
              <p>I licei sono pensati per chi vuole costruire una solida formazione generale: lingue, scienze, arte, scienze umane, sport. Aprono naturalmente le porte all&apos;università.</p>
            </div>
          </div>
          <div className="icards">
            {licei.map((d) => (
              <Link key={d.slug} className="icard" href={`/diplomi/${d.slug}`}>
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </span>
                <div>
                  <h3>{d.nome}</h3>
                  <p className="desc">{d.descSeo}</p>
                  <span className="icard-open">
                    Apri scheda
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section dsec alt tecnici" id="tecnici">
        <div className="wrap">
          <div className="dhd">
            <div className="badge">02</div>
            <div className="tx">
              <span className="eb">Istituti Tecnici</span>
              <h2>Diplomi più <span className="hl">orientati al lavoro</span> e all&apos;università tecnica.</h2>
              <p>I tecnici uniscono cultura generale a competenze tecniche specifiche. Aprono al lavoro immediato, alle lauree tecniche e agli ITS.</p>
            </div>
          </div>
          <div className="icards">
            {tecnici.map((d) => (
              <Link key={d.slug} className="icard" href={`/diplomi/${d.slug}`}>
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </span>
                <div>
                  <h3>{d.nome}</h3>
                  <p className="desc">{d.descSeo}</p>
                  <span className="icard-open">
                    Apri scheda
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p style={{textAlign:'center',fontSize:'13px',color:'#5A626D',marginTop:'18px'}}>Vedi anche: Costruzioni Ambiente e Territorio, Trasporti e Logistica, Sistema Moda, Agraria e altri. Chiedici l&apos;indirizzo che cerchi.</p>
        </div>
      </section>

      <section className="section dsec prof" id="professionali">
        <div className="wrap">
          <div className="dhd">
            <div className="badge">03</div>
            <div className="tx">
              <span className="eb">Istituti Professionali</span>
              <h2>Per chi vuole entrare <span className="hl">subito nel mondo del lavoro</span>.</h2>
              <p>I professionali sono i più orientati al mestiere: più ore di pratica, laboratorio e PCTO. Diploma di Stato come gli altri, ma con un mestiere già in tasca.</p>
            </div>
          </div>
          <div className="icards">
            {professionali.map((d) => (
              <Link key={d.slug} className="icard" href={`/diplomi/${d.slug}`}>
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
                </span>
                <div>
                  <h3>{d.nome}</h3>
                  <p className="desc">{d.descSeo}</p>
                  <span className="icard-open">
                    Apri scheda
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Non sai quale indirizzo scegliere?</h2>
              <p>In consulenza gratuita ti aiutiamo a capire qual è il diploma più adatto al tuo percorso, alla tua storia scolastica e ai tuoi obiettivi.</p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="/#lead">Scopri il tuo percorso</a>
              <a className="btn btn-glass btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
