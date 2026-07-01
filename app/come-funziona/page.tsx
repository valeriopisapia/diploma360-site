import Image from 'next/image'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import './come-funziona.css'

export const metadata = buildMetadata({
  title: 'Come funziona | Diploma360',
  description:
    'Il metodo Diploma360: piano personalizzato, lezioni live e tutor che ti seguono passo passo fino al Diploma di Stato.',
  path: '/come-funziona',
})

const jsonLdData = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Diploma360',
  url: 'https://www.diploma360.it/',
  logo: 'https://www.diploma360.it/assets-vetrina/logo-diploma360.png',
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

export default function ComeFunziona() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <section className="mhero">
        <div className="wrap mhero-grid">
          <div className="mhero-copy">
            <span className="eyebrow-b">Cos&apos;è Diploma360</span>
            <h1>Perché Diploma360 <span className="hl">è diverso</span>.</h1>
            <p className="lead">Non ti diamo solo contenuti da studiare. Organizziamo un percorso: partiamo dagli anni da recuperare, costruiamo un piano, mettiamo a disposizione materiali e tutor, e ti accompagniamo fino agli esami.</p>
            <p className="diff"><em>La differenza è questa:</em> non devi capire da solo cosa studiare. Il percorso viene organizzato intorno alla tua situazione, ai tuoi tempi e all&apos;esame da sostenere.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="/#lead">Scopri il tuo percorso</a>
              <a className="btn btn-out btn-lg" href="/piattaforma">Vai alla piattaforma</a>
            </div>
          </div>
          <div className="mhero-photo">
            <Image src="/assets-vetrina/lezione-live.jpg" alt="Tutor Diploma360 in lezione live" fill style={{objectFit:'cover',objectPosition:'center top'}} />
            <span className="live">Lezione live in corso</span>
            <div className="quote">
              <span className="qlbl">Il nostro obiettivo</span>
              <p>«Far sentire ogni studente seguito: con qualcuno che spiega, corregge e accompagna fino agli esami.»</p>
              <span>— Diploma360</span>
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

      <section className="section bro-sec">
        <div className="wrap">
          <div className="pillars-bro">
            <div className="pillar-bro c1">
              <div className="n">01</div>
              <div>
                <div className="k">Persone</div>
                <p>Un <strong>tutor per ogni materia</strong> e un <strong>esperto didattico</strong> che costruisce il piano insieme allo studente. Spiegano, chiariscono i dubbi, monitorano i progressi e adattano il percorso quando serve. Non sei uno studente da solo davanti a una piattaforma.</p>
              </div>
            </div>
            <div className="pillar-bro c2">
              <div className="n">02</div>
              <div>
                <div className="k">Metodo</div>
                <p>Si parte dagli <strong>anni reali da recuperare</strong>, non da un programma standard. Il piano viene calibrato su materie, tempo disponibile, indirizzo e difficoltà specifiche. Quiz, esercizi e monitoraggio mostrano cosa funziona e dove serve rafforzare.</p>
              </div>
            </div>
            <div className="pillar-bro c3">
              <div className="n">03</div>
              <div>
                <div className="k">Strumenti</div>
                <p>Piattaforma con <strong>tutto già organizzato</strong>: videolezioni, podcast, riassunti, schemi e flashcard, sempre accessibili da computer o telefono. Niente ricerche online, niente appunti sparsi, niente dispersione tra fonti diverse.</p>
              </div>
            </div>
            <div className="pillar-bro c4">
              <div className="n">04</div>
              <div>
                <div className="k">Obiettivo</div>
                <p>Non solo studio: anche <strong>organizzazione pratica</strong> degli esami — candidatura, fascicolo, PCTO online, aiuto tesina, sede e calendario. Si arriva preparati al Diploma di Stato riconosciuto.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bro-sec alt">
        <div className="wrap">
          <div className="bro-head">
            <span className="eyebrow-b">Prima capiamo, poi costruiamo</span>
            <h2>Prima <span className="hl">capiamo la situazione</span>. Poi costruiamo il percorso.</h2>
            <p>Partiamo da anni persi, indirizzo, materie da recuperare, tempo disponibile, difficoltà e budget. Solo dopo definiamo piano di studio, materiali, tutor e livello di supporto.</p>
          </div>
          <div className="prima-poi">
            <div className="pp-card prima">
              <div className="n">01</div>
              <div className="lbl">Prima</div>
              <h3>Analizziamo la situazione.</h3>
              <p className="sub">Capiamo da dove parte lo studente, cosa serve davvero e cosa influisce sui tempi reali per arrivare al diploma.</p>
              <ul>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Anni da recuperare</li>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Indirizzo di studio</li>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Materie più critiche</li>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Tempo disponibile</li>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Eventuali DSA/BES o difficoltà</li>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Esigenze economiche</li>
              </ul>
            </div>
            <div className="pp-card poi">
              <div className="n">02</div>
              <div className="lbl">Poi</div>
              <h3>Costruiamo il percorso.</h3>
              <p className="sub">Definiamo strumenti, persone e tempi del percorso. Non un corso uguale per tutti, ma un piano costruito sulla situazione reale.</p>
              <ul>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Piano di studio</li>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Materiali e piattaforma</li>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Tutor e supporto</li>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Preparazione agli esami</li>
                <li><span className="ck"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></span>Soluzione economica adatta</li>
              </ul>
            </div>
          </div>
          <div className="subnotes">
            <div className="subnote">
              <h4>Personalizzato davvero</h4>
              <p>Costruito su anni, indirizzo, materie e difficoltà — non un corso uguale per tutti.</p>
            </div>
            <div className="subnote r">
              <h4>Flessibile, sul serio</h4>
              <p>Accessibile online da computer o telefono — compatibile con lavoro, famiglia, sport o salute.</p>
            </div>
          </div>
          <div className="bottom-claim">Più la situazione è particolare, <span className="hl">più conta avere un percorso pensato su misura</span>.</div>
        </div>
      </section>

      <section className="section bro-sec">
        <div className="wrap">
          <div className="bro-head">
            <span className="eyebrow-b">Studia meglio, perdi meno tempo</span>
            <h2>Non solo libri: <span className="hl">meno tempo perso</span>, più studio utile.</h2>
            <p>Lo studente non deve ricostruire tutto da zero tra libri, appunti sparsi e ricerche online. Trova materiali già organizzati, strumenti di ripasso e test per capire cosa studiare, cosa ripetere e dove migliorare.</p>
          </div>
          <div className="crt">
            <div className="crt-card">
              <span className="badge"><span className="n">01</span>Capisci</span>
              <h3>Affronti l&apos;argomento con guida.</h3>
              <p className="s">Videolezioni, webinar e tutor aiutano lo studente ad affrontare gli argomenti con spiegazioni chiare, senza dover partire da zero.</p>
              <ul>
                <li><span className="ic"><svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg></span>Videolezioni</li>
                <li><span className="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>Webinar live</li>
                <li><span className="ic"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></span>Tutor per materia</li>
                <li><span className="ic"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>Spiegazioni guidate</li>
              </ul>
            </div>
            <div className="crt-card">
              <span className="badge"><span className="n">02</span>Ripassi</span>
              <h3>Fissi i concetti, nei momenti giusti.</h3>
              <p className="s">Riassunti, appunti, schemi, podcast e flashcard aiutano a rivedere i concetti anche quando il tempo è poco.</p>
              <ul>
                <li><span className="ic"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>Riassunti</li>
                <li><span className="ic"><svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>Appunti e schemi</li>
                <li><span className="ic"><svg viewBox="0 0 24 24"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3z"/><path d="M3 19a2 2 0 0 0 2 2h1v-6H3z"/></svg></span>Podcast</li>
                <li><span className="ic"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="14" rx="2"/><path d="M7 2v4M17 2v4"/></svg></span>Flashcard</li>
              </ul>
            </div>
            <div className="crt-card">
              <span className="badge"><span className="n">03</span>Ti alleni</span>
              <h3>Capisci dove migliorare davvero.</h3>
              <p className="s">Quiz, esercizi e test aiutano a capire cosa è stato compreso, cosa va ripassato e quali argomenti richiedono più attenzione.</p>
              <ul>
                <li><span className="ic"><svg viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>Quiz</li>
                <li><span className="ic"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></span>Esercizi mirati</li>
                <li><span className="ic"><svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></span>Test</li>
                <li><span className="ic"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>Analisi performance</li>
              </ul>
            </div>
          </div>
          <div className="subnotes" style={{marginTop:'20px'}}>
            <div className="subnote">
              <h4>Meno dispersione, più metodo.</h4>
              <p>Ogni strumento ha una funzione: capire, ripassare, esercitarsi e arrivare più preparato agli esami.</p>
            </div>
            <div className="subnote r">
              <h4>Tecnologia e AI a supporto dello studio.</h4>
              <p>Tecnologia e AI possono aiutare a rendere i materiali più chiari, sintetici e personalizzati. Il tutor resta il riferimento umano del percorso.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section bro-sec alt">
        <div className="wrap">
          <div className="bro-head">
            <span className="eyebrow-b">Le persone che ti seguono</span>
            <h2>Online <span className="hl">non significa da soli</span>.</h2>
            <p>La piattaforma organizza lo studio, ma sono le persone a fare la differenza: tutor di materia che spiegano, un coordinatore che ti segue dal primo giorno fino all&apos;esame.</p>
          </div>
          <div className="coord-block">
            <div className="coord-photo">
              <Image src="/assets-vetrina/coordinatrice.jpg" alt="Marcella M., coordinatrice didattica Diploma360" fill style={{objectFit:'cover',objectPosition:'center top'}} />
              <span className="tag">La tua coordinatrice</span>
              <div className="info">
                <h4>Una delle nostre coordinatrici</h4>
                <h3>Marcella M.</h3>
                <div className="rolex">Coordinatrice didattica · 12 anni di esperienza</div>
                <p>Segue ogni anno 15-20 studenti. Ha lavorato 8 anni in licei pubblici prima di passare a Diploma360. Risponde personalmente in chat, al telefono o in videocall — sia agli studenti che ai genitori.</p>
              </div>
            </div>
            <div className="coord-rows">
              <div className="row">
                <span className="ic"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg></span>
                <div>
                  <h4>Tutor per materia</h4>
                  <p>Spiegano gli argomenti, chiariscono i dubbi e guidano il ripasso, materia per materia.</p>
                </div>
              </div>
              <div className="row">
                <span className="ic"><svg viewBox="0 0 24 24"><path d="M3 3v18h18"/><path d="M7 14l4-4 3 3 5-6"/></svg></span>
                <div>
                  <h4>Coordinatrice del percorso</h4>
                  <p>Costruisce il piano, sceglie il livello di supporto e tiene rotta sull&apos;esame.</p>
                </div>
              </div>
              <div className="row">
                <span className="ic"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span>
                <div>
                  <h4>Supporto continuo</h4>
                  <p>Quando lo studente rallenta o si blocca, il team aiuta a rimettere ordine prima che diventi un problema.</p>
                </div>
              </div>
              <div className="row">
                <span className="ic"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
                <div>
                  <h4>Monitoraggio costante</h4>
                  <p>Quiz, test e check periodici aiutano a vedere cosa funziona e cosa va rinforzato.</p>
                </div>
              </div>
              <div className="row">
                <span className="ic"><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>
                <div>
                  <h4>Famiglia informata</h4>
                  <p>Nei piani che lo prevedono, report e profilo genitore aiutano la famiglia a seguire senza intromettersi.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bro-sec">
        <div className="wrap">
          <div className="bro-head center">
            <span className="eyebrow-b">Esami &amp; diploma</span>
            <h2>Un percorso serio verso un <span className="hl">Diploma di Stato riconosciuto</span>.</h2>
            <p>Diploma360 ti accompagna nella preparazione agli esami necessari per conseguire un Diploma di Stato riconosciuto. Non solo nello studio, ma anche nei passaggi pratici che portano agli esami.</p>
          </div>
          <div className="steps-row">
            <div className="step">
              <span className="nm">1</span>
              <div className="k">Step 1</div>
              <h4>Orientamento</h4>
              <p>Capiamo insieme da dove ripartire e quale diploma è il più adatto al tuo percorso.</p>
            </div>
            <div className="step">
              <span className="nm">2</span>
              <div className="k">Step 2</div>
              <h4>Preparazione</h4>
              <p>Studio guidato sulle materie e sugli argomenti d&apos;esame, con tutor e materiali pronti.</p>
            </div>
            <div className="step">
              <span className="nm">3</span>
              <div className="k">Step 3</div>
              <h4>Supporto organizzativo</h4>
              <p>Aiuto su documenti, candidatura, fascicolo, PCTO e tutti i passaggi pratici.</p>
            </div>
            <div className="step">
              <span className="nm">4</span>
              <div className="k">Step 4</div>
              <h4>Esami finali</h4>
              <p>Si arriva pronti al momento dell&apos;esame, accompagnati fino in fondo — con ripassi pre-esame.</p>
            </div>
          </div>
          <div className="disclaim">
            <span className="tag">Trasparenza</span>
            <strong>Diploma360 prepara, non rilascia.</strong> Ti prepariamo agli esami necessari per conseguire un Diploma di Stato riconosciuto: l&apos;esame si sostiene in una sede convenzionata, secondo le modalità previste dalla normativa vigente.
          </div>
        </div>
      </section>

      <section className="section bro-sec alt" id="tutor">
        <div className="wrap">
          <div className="bro-head">
            <span className="eyebrow-b">Come selezioniamo i tutor</span>
            <h2>Solo <span className="hl">1 candidato su 7</span> diventa tutor Diploma360.</h2>
            <p>Riceviamo centinaia di candidature ogni mese. Selezioniamo solo chi ha le competenze didattiche, l&apos;esperienza e l&apos;empatia per accompagnare uno studente che spesso riparte da zero.</p>
          </div>
          <div className="tut-selez">
            <div className="tut-proof">
              <div className="lbl">Il nostro filtro</div>
              <div className="main">
                <div className="big">1<small>/7</small></div>
                <div className="ring">
                  <svg viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#F5E0D5" strokeWidth="10" />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#E3815A" strokeWidth="10" strokeDasharray="264" strokeDashoffset="227" strokeLinecap="round" />
                  </svg>
                  <div className="pct">14%</div>
                </div>
              </div>
              <p className="desc">Non basta sapere la materia — serve saper insegnare e tenere viva la motivazione. Per questo guardiamo:</p>
              <ul className="cri">
                <li>Esperienza concreta di insegnamento</li>
                <li>Conoscenza dei programmi ministeriali</li>
                <li>Capacità di spiegare con chiarezza</li>
                <li>Empatia e ascolto di chi riparte da zero</li>
              </ul>
            </div>
            <div className="tut-steps">
              <div className="tut-step">
                <span className="n">01</span>
                <div>
                  <h4>Candidatura</h4>
                  <p>Verifichiamo titoli di studio, esperienza di insegnamento e specializzazione sulle materie di Diploma360.</p>
                </div>
              </div>
              <div className="tut-step">
                <span className="n">02</span>
                <div>
                  <h4>Colloquio didattico</h4>
                  <p>Valutiamo capacità di spiegazione, metodo, empatia. Simuliamo casi reali di studenti che ripartono da zero.</p>
                </div>
              </div>
              <div className="tut-step">
                <span className="n">03</span>
                <div>
                  <h4>Lezione di prova</h4>
                  <p>Una lezione reale con uno studente, valutata da un coordinatore didattico. È qui che si vede chi sa davvero insegnare.</p>
                </div>
              </div>
              <div className="tut-step">
                <span className="n">04</span>
                <div>
                  <h4>Affiancamento continuo</h4>
                  <p>Anche dopo l&apos;ingresso, ogni tutor è affiancato e monitorato — per garantire qualità costante nel tempo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bro-sec" id="accessibilita">
        <div className="wrap">
          <div className="bro-head">
            <span className="eyebrow-b">Accessibilità · DSA e BES</span>
            <h2>Strumenti compensativi <span className="hl">di serie, non a richiesta</span>.</h2>
            <p>Ogni materiale di Diploma360 esiste in più formati — video, audio, schema, mappa, flashcard. Lo studente sceglie quello che funziona meglio per lui: niente da chiedere, niente da spiegare.</p>
          </div>
          <div className="acc-chips">
            <span>Video lezioni</span>
            <span>Audio lezioni</span>
            <span>Mappe concettuali</span>
            <span>Flashcard</span>
            <span>Tempi extra</span>
            <span>Tutor formati su DSA/BES</span>
          </div>
          <div className="acc-compare">
            <div className="acc-card neg">
              <div className="acc-tag">Scuola tradizionale</div>
              <ul>
                <li>Strumenti compensativi spesso negoziabili</li>
                <li>Materiali non sempre nei formati adatti</li>
                <li>Insegnanti non sempre formati</li>
                <li>Tempi rigidi che amplificano la difficoltà</li>
              </ul>
            </div>
            <div className="acc-vs">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </div>
            <div className="acc-card pos">
              <div className="acc-tag">Con Diploma360</div>
              <ul>
                <li>Mappe, schemi e audio inclusi di default</li>
                <li>Tempi più flessibili nelle lezioni 1:1</li>
                <li>Tutor formati su DSA/BES</li>
                <li>Esami con strumenti compensativi già previsti</li>
              </ul>
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
