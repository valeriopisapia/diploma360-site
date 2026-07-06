import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import './piattaforma.css'

export const metadata = buildMetadata({
  title: `La piattaforma | ${brand.name}`,
  description:
    `La piattaforma ${brand.name}: piano di studio, lezioni live, classi, ore con i tutor, materiali di ripasso e i tuoi avanzamenti, tutto in un posto.`,
  path: '/piattaforma',
})

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: brand.name,
  url: `${brand.domain}/`,
  logo: `${brand.domain}${brand.logo.header}`,
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

export default function Piattaforma() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <section className="pphero">
        <div className="wrap">
          <div className="htxt">
            <span className="pill">La piattaforma di studio</span>
            <h1>Il tuo <span className="grad-text">piano di studio</span>, materia per materia.</h1>
            <p className="lead">Dalla tua area personale vedi tutte le materie del tuo indirizzo: cosa hai già completato, cosa devi ancora fare, le prossime lezioni e le ore residue del pacchetto. Sai sempre cosa studiare dopo.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="/#lead">Scopri il tuo percorso</a>
              <a className="btn btn-out btn-lg" href="/come-funziona">Scopri il metodo</a>
            </div>
          </div>
          <div className="heroshot">
            <div className="bf-bar">
              <span className="r"></span><span></span><span></span>
              <span className="url">app.diploma360.it/diploma</span>
            </div>
            <img src="/assets-vetrina/mocks/diploma.png" alt="Il mio diploma — piano di studio personalizzato" loading="lazy" />
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
          <div className="sec-head center">
            <span className="eyebrow">Dentro la piattaforma</span>
            <h2 className="sec-h2">Tre momenti, <span className="grad-text">una piattaforma</span>.</h2>
            <p className="sec-lead">Dal piano di studio alla lezione live, fino alle ore individuali con il tuo tutor: ecco i tre momenti chiave della tua giornata su {brand.name}.</p>
          </div>
          <div className="ptour">
            <div className="row">
              <div className="txt">
                <div className="kicker"><span className="n">01</span>Home</div>
                <h2>La tua giornata di studio, appena entri.</h2>
                <p className="lead">Appena accedi vedi la prossima lezione col conto alla rovescia, il punto esatto da cui riprendere e le ore che ti restano con i tutor. Da qui salti dove ti serve in un click.</p>
                <div className="feats">
                  <span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Prossima lezione con timer e &ldquo;Entra in aula&rdquo;</span>
                  <span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>&ldquo;Riprendi da dove avevi lasciato&rdquo;</span>
                  <span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Scorciatoie a diploma, ore 1:1 e classi</span>
                </div>
              </div>
              <div className="shotw">
                <div className="shotcard">
                  <div className="bf-bar"><span className="r"></span><span></span><span></span><span className="url">app.diploma360.it/home</span></div>
                  <img src="/assets-vetrina/mocks/home.png" alt="Home: prossima lezione, ripresa e scorciatoie" loading="lazy" />
                </div>
              </div>
            </div>

            <div className="row reverse">
              <div className="txt">
                <div className="kicker"><span className="n">02</span>Ambiente lezione</div>
                <h2>L&apos;aula della lezione, dentro al browser.</h2>
                <p className="lead">Durante la lezione live segui il video del tutor e le slide, mentre a lato hai tutto il contenuto della materia diviso in capitoli. Quiz, riassunti e PDF sono già lì, pronti.</p>
                <div className="feats">
                  <span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Video del tutor + slide condivise</span>
                  <span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Contenuto della materia in capitoli</span>
                  <span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Quiz, riassunto e PDF di ogni lezione</span>
                </div>
              </div>
              <div className="shotw">
                <div className="shotcard">
                  <div className="bf-bar"><span className="r"></span><span></span><span></span><span className="url">app.diploma360.it/lezione</span></div>
                  <img src="/assets-vetrina/mocks/lezione.png" alt="Ambiente lezione live nel browser" loading="lazy" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="txt">
                <div className="kicker"><span className="n">03</span>Tutoraggio 1:1</div>
                <h2>Le tue ore individuali con il tutor di materia.</h2>
                <p className="lead">La pagina dedicata al tuo tutor 1:1: la prossima lezione confermata, quelle in attesa, le registrazioni recenti e i materiali caricati. A lato, le ore che ti restano e il pulsante per prenotare.</p>
                <div className="feats">
                  <span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Prossima lezione 1:1 con timer</span>
                  <span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Agenda con lezioni confermate e in attesa</span>
                  <span><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>Ore residue e prenotazione rapida</span>
                </div>
              </div>
              <div className="shotw">
                <div className="shotcard">
                  <div className="bf-bar"><span className="r"></span><span></span><span></span><span className="url">app.diploma360.it/tutoraggio</span></div>
                  <img src="/assets-vetrina/mocks/1to1.png" alt="Tutoraggio 1:1: agenda, ore residue e prenotazione" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
          <div className="sec-cta" style={{justifyContent:'center',marginTop:'46px'}}>
            <a className="btn btn-out btn-lg" href="/nostra-piattaforma">Vedi tutte le schermate &rarr;</a>
          </div>
        </div>
      </section>

      <section className="section libreria">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">La libreria di contenuti</span>
            <h2 className="sec-h2">Oltre <span className="grad-text">7.000 ore</span> di lezioni a portata di click.</h2>
            <p className="sec-lead">Tutto il programma del tuo indirizzo, organizzato per materia e argomento. Videolezioni, appunti, esercizi e quiz sempre disponibili — anche di notte, anche di domenica.</p>
          </div>
          <div className="lib-stats">
            <div className="lib-stat">
              <span className="ic" style={{background:'var(--coral-lt)',color:'var(--coral-dk)'}}>
                <svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
              </span>
              <div className="v">+7.000</div>
              <div className="l">videolezioni nelle materie del tuo indirizzo</div>
            </div>
            <div className="lib-stat">
              <span className="ic" style={{background:'var(--rosa-lt)',color:'var(--rosa-dk)'}}>
                <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </span>
              <div className="v">+3.000</div>
              <div className="l">appunti, schemi e mappe concettuali</div>
            </div>
            <div className="lib-stat">
              <span className="ic" style={{background:'var(--amber-lt)',color:'var(--amber-dk)'}}>
                <svg viewBox="0 0 24 24"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </span>
              <div className="v">18+</div>
              <div className="l">indirizzi tra Licei, Tecnici e Professionali</div>
            </div>
            <div className="lib-stat">
              <span className="ic" style={{background:'var(--green-lt)',color:'var(--green-dk)'}}>
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </span>
              <div className="v">H24</div>
              <div className="l">accessibili sempre, da pc e da telefono</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Da pc e da telefono</span>
            <h2 className="sec-h2">Studi <span className="grad-text">dove sei</span>.</h2>
            <p className="sec-lead">Piattaforma responsive: stessa esperienza dal computer, dal portatile o dal telefono in pausa pranzo.</p>
          </div>
          <div className="devices">
            <div className="dc">
              <span className="ic" style={{background:'var(--coral-lt)',color:'var(--coral-dk)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="12" rx="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>
              </span>
              <h3>Da computer</h3>
              <p>L&apos;esperienza piena: lezioni live, verifiche e prenotazione delle ore con il tutor.</p>
            </div>
            <div className="dc">
              <span className="ic" style={{background:'var(--rosa-lt)',color:'var(--rosa-dk)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
              </span>
              <h3>Da smartphone</h3>
              <p>Materiali, podcast, chat con i tutor e notifiche sempre con te, anche fuori casa.</p>
            </div>
            <div className="dc">
              <span className="ic" style={{background:'var(--ai-lt)',color:'var(--ai-dk)'}}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </span>
              <h3>H24, 7 giorni su 7</h3>
              <p>Accedi quando hai tempo: la sera tardi, di domenica, dalla pausa lavoro.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Pronto a scoprire il tuo percorso?</h2>
              <p>Lascia i tuoi dati: ti diciamo in una consulenza gratuita quanti anni puoi recuperare, quale indirizzo scegliere e quanto costa. Senza impegno, anche su WhatsApp.</p>
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
