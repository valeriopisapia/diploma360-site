import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import './esami-normativa.css'

export const metadata = buildMetadata({
  title: `Esami e normativa | Come funzionano gli esami — ${brand.name}`,
  description:
    'I quattro esami possibili, candidato esterno o interno, tempi e cornice normativa spiegati in modo semplice.',
  path: '/esami-normativa',
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

export default function EsamiNormativa() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <section className="ahero">
        <div className="wrap ehero-grid">
          <div className="ehero-copy">
            <span className="eyebrow-b">Esami e normativa</span>
            <h1>Esami, regole e tempi: <span className="hl">tutto chiaro fin dall&apos;inizio</span>.</h1>
            <p className="lead">La parte d&apos;esame ha le sue regole — candidato esterno, idoneità, maturità, scadenze. Sembra complicata, ma non lo è se qualcuno te la spiega bene. Qui trovi tutto: come funziona, quanto tempo serve, dove si svolge e cosa facciamo noi per te.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="/#lead">Parla con una coordinatrice</a>
              <a className="btn btn-out btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>
          <div className="etimeline">
            <div className="elbl">Il percorso d&apos;esame</div>
            <h3>Dal primo passo al diploma in mano</h3>
            <div className="etl-step">
              <span className="etl-dot">01</span>
              <h4>Esame di idoneità</h4>
              <div className="who">Sede convenzionata &middot; se recuperi più anni</div>
              <p>Se recuperi più anni in uno, sostieni l&apos;idoneità per essere ammesso all&apos;anno corretto.</p>
            </div>
            <div className="etl-step">
              <span className="etl-dot">02</span>
              <h4>Preparazione con {brand.name}</h4>
              <div className="who">Online &middot; tutor + materiali + piattaforma</div>
              <p>Studi sulla piattaforma, segui i tutor, ripassi con i materiali già pronti. Ti accompagniamo fino al giorno dell&apos;esame.</p>
            </div>
            <div className="etl-step">
              <span className="etl-dot">03</span>
              <h4>Esame di Stato</h4>
              <div className="who">Sede d&apos;esame paritaria &middot; ufficiale</div>
              <p>Tre prove scritte + colloquio orale, come in qualsiasi scuola statale. Commissione ufficiale, programmi ministeriali.</p>
            </div>
            <div className="etl-step last">
              <span className="etl-dot">04</span>
              <h4>Diploma in mano</h4>
              <div className="who">Stesso titolo di una scuola statale</div>
              <p>Diploma di Stato valido per università, concorsi e lavoro — identico a quello di qualsiasi scuola.</p>
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
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Il tuo ruolo</span>
            <h2>Studi con noi, l&apos;esame lo dai <span className="hl">in una scuola statale o paritaria</span>.</h2>
            <p>{brand.name} è il tuo <strong>centro di preparazione</strong>: ti segue, ti organizza lo studio e ti porta pronto all&apos;esame. L&apos;esame vero e proprio lo sostieni come <strong>candidato esterno</strong> (privatista) presso una scuola del sistema nazionale d&apos;istruzione — <strong>statale o paritaria</strong> — indipendente da noi. È la strada prevista dalla legge per chi non frequenta in classe: la stessa di sportivi, lavoratori e di chi recupera anni.</p>
          </div>
          <div className="callout">
            <span className="tag">Una garanzia, per legge</span>
            <p>La normativa <strong>vieta a una scuola paritaria di esaminare chi è stato preparato dallo stesso gestore</strong>. Per questo il tuo esame si tiene sempre in un istituto <em>indipendente</em>: è proprio ciò che rende il titolo solido e inattaccabile. Noi prepariamo, una scuola terza esamina.</p>
          </div>
        </div>
      </section>

      <section className="section asec alt">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Quali esami incontrerai</span>
            <h2>I <span className="hl">quattro esami</span> che puoi incontrare.</h2>
            <p>A seconda del tuo punto di partenza, il percorso prevede uno o più di questi esami. Quali ti riguardano te lo diciamo con precisione in consulenza.</p>
          </div>
          <div className="iter-steps">
            <div className="iter-step">
              <div className="n">1</div>
              <div className="k">Recupero anni</div>
              <h4>Esame di idoneità</h4>
              <p>Serve per essere ammessi a una classe successiva quando salti uno o più anni. Scritto e orale sulle materie ministeriali.</p>
            </div>
            <div className="iter-step r">
              <div className="n">2</div>
              <div className="k">Cambio indirizzo</div>
              <h4>Esami integrativi</h4>
              <p>Si sostengono quando passi a un indirizzo diverso: riguardano le materie del nuovo percorso non ancora studiate.</p>
            </div>
            <div className="iter-step">
              <div className="n">3</div>
              <div className="k">Accesso alla maturità</div>
              <h4>Esami preliminari (di ammissione)</h4>
              <p>Per il candidato esterno privo dei requisiti formali: precedono l&apos;esame di Stato e danno l&apos;ammissione a sostenerlo.</p>
            </div>
            <div className="iter-step r">
              <div className="n">4</div>
              <div className="k">Maturità</div>
              <h4>Esame di Stato</h4>
              <p>L&apos;esame finale del 5º anno: tre prove scritte e un colloquio. Al superamento ottieni il Diploma di Stato.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Da privatista o da interno</span>
            <h2>Candidato <span className="hl">esterno o interno</span>: cosa cambia.</h2>
            <p>La normativa distingue due posizioni. Chi studia con noi rientra quasi sempre nella prima.</p>
          </div>
          <div className="iter-steps">
            <div className="iter-step">
              <div className="n">A</div>
              <div className="k">Chi studia con noi</div>
              <h4>Candidato esterno (privatista)</h4>
              <p>Non frequenti in classe: presenti domanda e sostieni gli esami in una scuola del sistema nazionale. Di norma in una sede della tua provincia o regione di residenza; spostamenti in altra regione solo per casi di comprovata gravità ed eccezionalità.</p>
            </div>
            <div className="iter-step r">
              <div className="n">B</div>
              <div className="k">Chi frequenta in classe</div>
              <h4>Candidato interno</h4>
              <p>È ammesso all&apos;esame chi ha frequentato almeno i 3/4 (75%) del monte ore annuale e ha la sufficienza nelle discipline. È il caso della scuola tradizionale in presenza.</p>
            </div>
          </div>
          <div className="callout">
            <span className="tag">Nota</span>
            <p>La maggior parte dei nostri studenti è <strong>candidato esterno</strong>. In consulenza ti diciamo quale procedura ti riguarda e in quale sede, in base alla tua residenza. <em>Alle domande e alle pratiche pensiamo noi.</em></p>
          </div>
        </div>
      </section>

      <section className="section asec alt">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Le norme di riferimento</span>
            <h2>La <span className="hl">cornice normativa</span>, in chiaro.</h2>
            <p>Gli esami da privatista non sono una zona grigia: seguono regole precise. Ecco le principali.</p>
          </div>
          <div className="iter-steps">
            <div className="iter-step">
              <div className="n">01</div>
              <div className="k">Valutazione ed esami</div>
              <h4>D.Lgs 62/2017</h4>
              <p>Disciplina la valutazione e gli esami di Stato del secondo ciclo, compresi i candidati esterni.</p>
            </div>
            <div className="iter-step r">
              <div className="n">02</div>
              <div className="k">Esame di Stato</div>
              <h4>Legge 1/2007</h4>
              <p>Ha riformato l&apos;esame di Stato e regolato l&apos;ammissione dei candidati esterni.</p>
            </div>
            <div className="iter-step">
              <div className="n">03</div>
              <div className="k">Frequenza</div>
              <h4>DPR 122/2009</h4>
              <p>Fissa per i candidati interni l&apos;obbligo di frequenza di almeno 3/4 dell&apos;orario annuale.</p>
            </div>
            <div className="iter-step r">
              <div className="n">04</div>
              <div className="k">Date e modalità</div>
              <h4>O.M. annuale ministeriale</h4>
              <p>Ogni anno il Ministero pubblica l&apos;ordinanza con le scadenze (di norma il 30 novembre) e le regole operative.</p>
            </div>
          </div>
          <div className="callout">
            <span className="tag">Importante</span>
            <p>Date e alcune regole cambiano ogni anno con l&apos;ordinanza ministeriale e non costituiscono una consulenza legale: <em>verifichiamo insieme la normativa aggiornata sul tuo caso specifico.</em></p>
          </div>
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Tempi e scadenze</span>
            <h2>Quanti anni in uno e <span className="hl">le date che contano</span>.</h2>
            <p>Dal 2025/26 si possono recuperare fino a <strong>due anni scolastici con un solo esame</strong> (entro il limite del pari età). Le iscrizioni a {brand.name} sono aperte tutto l&apos;anno, ma le candidature agli esami hanno scadenze fisse: ce ne occupiamo noi, tu devi solo saperle.</p>
          </div>
          <div className="iter-steps">
            <div className="iter-step">
              <div className="n">A</div>
              <div className="k">Fino a 2 in 1</div>
              <h4>Recupero accelerato</h4>
              <p>Con un solo esame puoi recuperare fino a due anni, secondo la normativa vigente.</p>
            </div>
            <div className="iter-step r">
              <div className="n">B</div>
              <div className="k">30 novembre</div>
              <h4>Candidatura maturità</h4>
              <p>Domanda per l&apos;esame di Stato di giugno: entro il 30 novembre dell&apos;anno precedente.</p>
            </div>
            <div className="iter-step">
              <div className="n">C</div>
              <div className="k">31 gennaio</div>
              <h4>Anni inferiori</h4>
              <p>Candidatura agli esami di idoneità per le classi precedenti alla quinta.</p>
            </div>
            <div className="iter-step r">
              <div className="n">D</div>
              <div className="k">15 marzo</div>
              <h4>Ritiro da scuola</h4>
              <p>Chi frequenta può ritirarsi entro il 15 marzo per presentarsi da esterno nello stesso anno.</p>
            </div>
          </div>
          <div className="callout">
            <span className="tag">Riferimenti normativi</span>
            <p>Il recupero anni tramite esame di idoneità è regolato dal <strong>D.Lgs. 297/1994, art. 193</strong> e dall&apos;<strong>O.M. 90/2001, art. 19</strong>. Le date esatte sono confermate ogni anno dalle circolari del Ministero. <em>Sono dispensati da alcuni requisiti chi ha compiuto 18 o 23 anni: te lo verifichiamo sul tuo caso.</em></p>
          </div>
        </div>
      </section>

      <section className="section asec alt" id="burocrazia">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">La burocrazia esame</span>
            <h2>Non sei mai solo: <span className="hl">ti accompagniamo passo passo</span>.</h2>
            <p>La parte burocratica ha le sue regole. La buona notizia: ti diciamo esattamente cosa fare, quando e come — senza che tu debba diventare esperto di moduli e bollettini.</p>
          </div>
          <div className="buroc-promise">
            <div className="top">
              <span className="pic">
                <svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
              </span>
              <div>
                <h3>Una coordinatrice ti segue dall&apos;inizio alla fine.</h3>
                <p>Ti dà tutte le istruzioni, ti ricorda le scadenze e ti accompagna in ogni passaggio. Tu non perdi tempo con le procedure: le gestiamo noi con te.</p>
              </div>
            </div>
            <ul className="blist">
              <li>Istruzioni chiare su come iscriversi all&apos;esame</li>
              <li>Lista documenti pronti per ogni passaggio</li>
              <li>Calendario scadenze sempre aggiornato</li>
              <li>Modulistica spiegata punto per punto</li>
              <li>Indicazioni su tasse e bollettini da versare</li>
              <li>Contatti diretti con la sede d&apos;esame</li>
              <li>Simulazioni esame e prove orali coi tutor</li>
              <li>Coordinatrice raggiungibile il giorno X</li>
            </ul>
          </div>
          <div className="buroc-steps">
            <article className="buroc-card">
              <div className="num">01</div>
              <h4>Esame di idoneità</h4>
              <span className="when">Se recuperi più anni in uno</span>
              <p>Quando salti uno o più anni, la sede paritaria richiede un esame d&apos;idoneità (scritto + orale) sulle materie ministeriali per ammetterti all&apos;anno corretto.</p>
              <div className="support"><b>Cosa facciamo per te</b>Ti diciamo a quale sede iscriverti, ti prepariamo con tutor mirato sulle materie d&apos;idoneità, ti seguiamo nella raccolta documenti.</div>
            </article>
            <article className="buroc-card">
              <div className="num">02</div>
              <h4>Iscrizione esame di Stato</h4>
              <span className="when">Entro novembre dell&apos;anno precedente</span>
              <p>Per sostenere l&apos;esame di Stato a giugno devi essere iscritto entro la scadenza ministeriale, presentando moduli, documenti e bollettini alla sede d&apos;esame.</p>
              <div className="support"><b>Cosa facciamo per te</b>Ti spieghiamo modulistica e bollettini con esempi, ti ricordiamo le scadenze prima che arrivino, ti diciamo come e dove inviare ogni cosa.</div>
            </article>
            <article className="buroc-card">
              <div className="num">03</div>
              <h4>Sostenere l&apos;esame</h4>
              <span className="when">Giugno-luglio &middot; sede paritaria</span>
              <p>L&apos;esame è identico al pubblico: tre prove scritte ministeriali, colloquio orale, commissione mista con membri esterni. Stessi programmi ministeriali, stessa data nazionale.</p>
              <div className="support"><b>Cosa facciamo per te</b>Simulazioni con tracce ministeriali reali, prove orali con i tutor, calendario assistito, una coordinatrice sempre raggiungibile nei giorni d&apos;esame.</div>
            </article>
            <article className="buroc-card">
              <div className="num">04</div>
              <h4>Diploma in mano</h4>
              <span className="when">Subito dopo l&apos;esame</span>
              <p>A esame superato, la sede paritaria emette il tuo Diploma di Stato — titolo identico a quello di una scuola pubblica. Valido per università, concorsi, lavoro.</p>
              <div className="support"><b>Cosa facciamo per te</b>Ti spieghiamo come ritirare il diploma, come richiedere certificati per università o lavoro, ti orientiamo sui passi successivi.</div>
            </article>
          </div>
        </div>
      </section>

      <section className="section asec" id="sedi">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Dove si svolge</span>
            <h2>Dove <span className="hl">farai l&apos;esame</span>: statale o paritaria.</h2>
            <p>L&apos;esame si sostiene <strong>in presenza</strong>, in una scuola del sistema nazionale: può essere <strong>statale</strong> o <strong>paritaria</strong>. In entrambi i casi il diploma che ottieni è un Diploma di Stato con lo stesso valore legale. Tutta la preparazione resta online; solo l&apos;esame richiede la presenza.</p>
          </div>
          <div className="sedi-grid">
            <div className="sede-card">
              <div className="lbl">Per la maturità</div>
              <h3>La sede la assegna l&apos;USR</h3>
              <p>Per l&apos;<strong>esame di Stato</strong> presenti domanda all&apos;Ufficio Scolastico Regionale indicando <strong>fino a 3 scuole preferite</strong> (statali o paritarie) della tua provincia. L&apos;USR assegna poi la sede definitiva, di norma vicino a te.</p>
            </div>
            <div className="sede-card alt">
              <div className="lbl">Per il recupero anni</div>
              <h3>Ti iscrivi a una scuola abilitata</h3>
              <p>Per l&apos;<strong>esame di idoneità</strong> ci si iscrive direttamente a una scuola statale o paritaria abilitata: qui c&apos;è più margine nella scelta della sede, e ti orientiamo noi su quella giusta.</p>
            </div>
          </div>
          <div className="callout">
            <span className="tag">Statale o paritaria?</span>
            <p>Per te <strong>cambia poco</strong>: la scuola paritaria fa parte del sistema nazionale d&apos;istruzione e rilascia un <strong>Diploma di Stato identico</strong> a quello di una statale. Ti orientiamo sempre verso la sede <em>più comoda da raggiungere</em> — diffida di chi ti manda all&apos;esame a centinaia di km da casa.</p>
          </div>
        </div>
      </section>

      <section className="section asec alt" id="garanzia">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Garanzia Promosso o Ripreparato</span>
            <h2>Se non passi, <span className="hl">ti riprepariamo gratis</span>.</h2>
            <p>Nei piani Plus e Max è inclusa la garanzia ufficiale: se al primo tentativo non superi l&apos;esame finale, ti riprepariamo gratuitamente per la sessione successiva. Condizioni esplicite, senza asterischi nascosti.</p>
          </div>
          <div className="iter-steps">
            <div className="iter-step">
              <div className="n">01</div>
              <div className="k">Comunicazione</div>
              <h4>Ci avvisi entro 30 giorni</h4>
              <p>Ci comunichi l&apos;esito negativo entro 30 giorni dalla pubblicazione del risultato.</p>
            </div>
            <div className="iter-step r">
              <div className="n">02</div>
              <div className="k">Verifica</div>
              <h4>Verifichiamo le condizioni</h4>
              <p>In 7 giorni la coordinatrice controlla che le condizioni di attivazione siano rispettate.</p>
            </div>
            <div className="iter-step">
              <div className="n">03</div>
              <div className="k">Nuovo piano</div>
              <h4>Riprepariamo gratis</h4>
              <p>Definiamo insieme un nuovo piano di ripreparazione per la sessione successiva, senza costi aggiuntivi.</p>
            </div>
            <div className="iter-step r">
              <div className="n">04</div>
              <div className="k">Nuovo esame</div>
              <h4>Sessione successiva</h4>
              <p>Lo studente sostiene di nuovo l&apos;esame nella sessione utile più vicina.</p>
            </div>
          </div>
          <div className="callout">
            <span className="tag">In chiaro</span>
            <p>La garanzia vale se lo studente ha seguito il percorso (attività e lezioni) e ha sostenuto l&apos;esame nella sede consigliata. Copre la ripreparazione, <strong>non</strong> le tasse esterne d&apos;esame. Te la spieghiamo nel dettaglio prima della firma.</p>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Hai un dubbio sul tuo caso specifico?</h2>
              <p>Ogni situazione è diversa: anni, età, sede, tempi. In consulenza gratuita ti diciamo esattamente quale percorso d&apos;esame ti aspetta. Senza impegno.</p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="/#lead">Parla con una coordinatrice</a>
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
