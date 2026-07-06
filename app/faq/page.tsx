import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import './faq.css'

export const metadata = buildMetadata({
  title: `Domande frequenti | ${brand.name}`,
  description:
    'Risposte alle domande più comuni su recupero anni, esami, costi, sedi e Diploma di Stato riconosciuto.',
  path: '/faq',
})

const orgJsonLd = {
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
    address: { '@type': 'PostalAddress', addressLocality: 'Roma', addressCountry: 'IT' },
  },
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: `Come ci si iscrive a ${brand.name} e cosa serve?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Per iscriversi è necessario aver definito il percorso scolastico che si desidera seguire. Sono richiesti: indirizzo di studio, piano di assistenza (Basic, Plus o Max), seconda lingua straniera, percorso già effettuato, modalità di recupero, informazioni personali, modalità di pagamento, indirizzo di residenza, documento d'identità e codice fiscale.",
      },
    },
    {
      '@type': 'Question',
      name: 'Cosa succede se mi bocciano?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Con i piani Plus e Max hai la Garanzia 'Promosso o Ripreparato' gratuita. Con il piano Basic, la stessa garanzia è disponibile a 500€. La percentuale di promozione di ${brand.name} è stata del 97% nel 2023/2024.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Quale corso di studi scegliere?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${brand.name} offre una consulenza personalizzata gratuita per aiutarti a scegliere il percorso più adatto. Gli indirizzi disponibili includono licei (Scienze Umane, Economico Sociale, Linguistico, Scientifico, Scienze Applicate, Sportivo) e indirizzi tecnici e professionali.`,
      },
    },
    {
      '@type': 'Question',
      name: "Quali sono le sedi in cui svolgerò l'esame?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${brand.name} collabora con numerosi istituti paritari presenti in varie regioni. La sede d'esame viene assegnata in base alla tua provincia.`,
      },
    },
    {
      '@type': 'Question',
      name: 'Il Diploma è valido e riconosciuto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Sì: al termine del percorso si ottiene un Diploma di Stato riconosciuto dallo Stato, con pieno valore legale per università e concorsi pubblici.",
      },
    },
    {
      '@type': 'Question',
      name: "E' possibile diplomarsi in un anno?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "È possibile, ma impegnativo: bisogna presentare in un'unica sessione d'esame il programma di tutte le materie per gli anni mancanti. Si consiglia di valutare attentamente la situazione con un consulente.",
      },
    },
    {
      '@type': 'Question',
      name: "Fino a quando è possibile iscriversi?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Le iscrizioni sono possibili durante tutto l'anno, ma i termini di presentazione delle domande seguono le scadenze del Ministero. Si consiglia di fissare al più presto un incontro informativo gratuito.",
      },
    },
    {
      '@type': 'Question',
      name: `Il Diploma che rilascia ${brand.name} è legalmente riconosciuto?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `Sì. ${brand.name} collabora unicamente con istituti paritari accreditati. I diplomi emessi hanno lo stesso valore legale di quelli delle scuole pubbliche.`,
      },
    },
    {
      '@type': 'Question',
      name: `Posso iscrivermi all'università con il diploma di ${brand.name}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Sì, i diplomi ottenuti presso istituti paritari accreditati permettono l'accesso all'università e a qualsiasi concorso pubblico.",
      },
    },
    {
      '@type': 'Question',
      name: 'Posso pagare a rate?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Sì: tutti e 3 i piani sono rateizzabili in 24 rate mensili.",
      },
    },
    {
      '@type': 'Question',
      name: "Cosa succede se non passo l'esame?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Nei piani Plus e Max è inclusa la garanzia 'Promosso o Ripreparato': se non passi l'esame finale ti riprepariamo secondo le condizioni previste dal contratto.",
      },
    },
    {
      '@type': 'Question',
      name: "Il prezzo include la tassa d'esame?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No. Le tasse esterne (esame di idoneità ~600€ e bollettino di maturità ~12€ + contributo sede paritaria 10-300€) non sono incluse nei piani.",
      },
    },
    {
      '@type': 'Question',
      name: 'Posso passare a un piano superiore strada facendo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Sì. Se durante il percorso hai bisogno di più supporto (es. dal Basic al Plus), puoi fare l'upgrade pagando solo la differenza.",
      },
    },
    {
      '@type': 'Question',
      name: "C'è un costo per la consulenza iniziale?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "No: la consulenza con un esperto didattico è gratuita e senza impegno.",
      },
    },
  ],
}

export default function Faq() {
  return (
    <>
      <JsonLd data={orgJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="ahero">
        <div className="wrap fhero-grid">
          <div className="fhero-copy">
            <span className="eyebrow-b">Domande frequenti</span>
            <h1>Tutto quello che vuoi <span className="hl">sapere su {brand.name}</span>.</h1>
            <p className="lead">Le risposte alle domande più comuni su percorso, esami, costi e modalità. Se non trovi quello che cerchi, scrivici su WhatsApp: rispondiamo entro 24h.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="/#lead">Scopri il tuo percorso</a>
              <a className="btn btn-out btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>
          <div className="fbox">
            <div className="flbl">Cosa vuoi sapere?</div>
            <label className="fsearch">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input type="search" placeholder="Cerca una domanda… (es. quanto costa, garanzia, esame)" />
            </label>
            <div className="fchips-title">Domande più cercate</div>
            <div className="fchips">
              <a className="fchip" href="#iscrizione">Come ci si iscrive?</a>
              <a className="fchip" href="#bocciatura">Cosa succede se mi bocciano?</a>
              <a className="fchip" href="#riconoscimento">Il diploma è riconosciuto?</a>
              <a className="fchip" href="#sedi">Dove si fa l&apos;esame?</a>
            </div>
          </div>
        </div>
      </section>

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

      <section className="section asec">
        <div className="wrap">
          <div className="faq-block">
            <details id="iscrizione">
              <summary>Come ci si iscrive a {brand.name} e cosa serve?<span className="chev">+</span></summary>
              <div className="a">
                <p>Per iscriversi, è necessario aver definito il percorso scolastico che si desidera seguire e i dettagli da includere nel modulo di iscrizione. Ecco le informazioni richieste: Informazioni relative al piano di studi</p>
                <ol>
                  <li>Indirizzo di studio scelto</li>
                  <li>Piano di assistenza allo studio selezionato: Basic, Plus o Max</li>
                  <li>Seconda lingua straniera prevista dal piano di studi: la prima lingua è sempre inglese, la seconda può essere francese o spagnolo</li>
                  <li>Percorso di studi già effettuato, se sono stati completati anni di scuola superiore</li>
                  <li>Modalità di recupero e classi da conseguire: ad esempio, recupero classi 1ª+2ª o recupero 2ª+3ª+4ª classe</li>
                </ol>
                <p><strong>Informazioni personali</strong><br />Nome e cognome, recapito telefonico e indirizzo email</p>
                <p><strong>Modalità di pagamento:</strong> soluzione unica, rate semestrali o pagamento rateale</p>
                <p><strong>Indirizzo di residenza</strong>, se diverso da quello riportato sulla carta d&apos;identità</p>
                <p><strong>Indirizzo e nominativo</strong> per la spedizione del kit didattico, se diverso da quello di residenza</p>
                <p>Eventuali note utili per i tutor e il percorso didattico.<br />Oltre a queste informazioni, sarà necessario fornire una copia di un documento d&apos;identità e il codice fiscale. Questi dettagli permetteranno di completare l&apos;iscrizione in modo accurato e veloce, garantendo che tutte le necessità dell&apos;alunno siano prese in considerazione.</p>
              </div>
            </details>

            <details id="bocciatura">
              <summary>Cosa succede se mi bocciano?<span className="chev">+</span></summary>
              <div className="a">
                <p>I percorsi offerti da {brand.name} sono il risultato di anni di esperienza nel settore, innovazione continua e un impegno totale per garantire la soddisfazione di tutti a fine anno. Tuttavia, può succedere che le cose non vadano per il verso giusto se non si seguono i consigli di tutor e docenti, se non ci si affida ai nostri consulenti, se si tenta di fare troppo in fretta o se non ci si applica con un minimo di costanza. Le scuole che promettono percentuali di promozione del 100% non sono trasparenti e probabilmente ti stanno dicendo il falso. Nel 2023/2024, la percentuale nazionale di promozioni è stata:</p>
                <ul>
                  <li>Istituti Tecnici: 79,9%</li>
                  <li>Licei: 81,2%</li>
                  <li>Istituti Professionali: 79%</li>
                  <li>{brand.name}: 97%</li>
                </ul>
                <p>Se, per uno dei motivi sopra citati, le cose non dovessero andare come previsto e dovesse arrivare una non promozione, offriamo diverse formule e garanzie di qualità a seconda del percorso scelto:</p>
                <ul>
                  <li>Con {brand.name} Plus e Max hai la Garanzia PROMOSSO o RIPREPARATO gratuita, ciò significa che se dovessi essere bocciato ti riprepariamo gratuitamente e senza nessun tipo di spesa extra.</li>
                  <li>Con {brand.name} Basic hai la Garanzia PROMOSSO o RIPREPARATO a soli 500€, ciò significa che se dovessi essere bocciato ti riprepariamo con la sola spesa di 500€. In questo modo, siamo certi di offrire ai nostri studenti le migliori opportunità per completare il loro percorso di studi con successo.</li>
                </ul>
              </div>
            </details>

            <details>
              <summary>Quale corso di studi scegliere?<span className="chev">+</span></summary>
              <div className="a">
                <p>Definire il percorso più adatto alle esigenze di ogni studente è un servizio che offriamo gratuitamente attraverso la nostra consulenza personalizzata. Se non hai ancora prenotato la tua consulenza, fallo subito!</p>
                <p>La scelta dell&apos;indirizzo scolastico è una parte cruciale di questo processo. Livello di difficoltà, attitudini personali, esperienze precedenti e obiettivi del diploma sono tutti fattori che consideriamo per aiutarti a fare la scelta migliore. Quali sono gli indirizzi di studio disponibili? Non tutti gli indirizzi scolastici sono adatti all&apos;insegnamento online, e noi di {brand.name} lo sappiamo bene. Abbiamo selezionato percorsi che siano compatibili con le risorse offerte dalla scuola digitale. Qui di seguito trovi tutti gli indirizzi disponibili. Cliccando su ciascuno, potrai visualizzare una pagina dedicata che contenente un approfondimento del percorso di studio scelto:</p>
                <p><strong>I licei:</strong></p>
                <p>
                  Liceo Scienze Umane (Difficoltà 8/10)<br />
                  Liceo opzione Economico Sociale (Difficoltà 8/10)<br />
                  Liceo Linguistico (Difficoltà 9/10)<br />
                  Liceo Scientifico (Difficoltà 10/10)<br />
                  Liceo opzione Scienze Applicate (Difficoltà 9/10)<br />
                  Liceo Sportivo (Difficoltà 7/10)
                </p>
                <p><strong>Gli indirizzi tecnici:</strong></p>
                <p>
                  I.T.E. Turistico (Difficoltà 7/10)<br />
                  I.T.E. AFM Amministrazione Finanza e Marketing (Difficoltà 7/10)<br />
                  I.T.E. SIA Sistemi Informativi Aziendali (Difficoltà 7/10)<br />
                  IPSSAS Servizi Sanità e Assistenza Sociale (Difficoltà 6/10)<br />
                  I.P.S.E.O.A. Enogastronomia e Osp. Alberghiera (Difficoltà 6/10)<br />
                  I.P.S. Commerciali (Difficoltà 7/10)
                </p>
                <p>Tuttavia, ognuno di noi ha predisposizioni naturali verso determinate materie (dominanza cerebrale), quindi un percorso apparentemente più difficile potrebbe risultare più facile per qualcuno.</p>
              </div>
            </details>

            <details id="sedi">
              <summary>Quali sono le sedi in cui svolgerò l&apos;esame?<span className="chev">+</span></summary>
              <div className="a">
                <p>Il nostro centro studi ha instaurato collaborazioni con numerosi istituti paritari presenti in varie regioni del paese.</p>
              </div>
            </details>

            <details id="riconoscimento">
              <summary>Il Diploma è valido e riconosciuto?<span className="chev">+</span></summary>
              <div className="a">
                <p>Assolutamente sì! Al termine del percorso, otterrai un diploma di scuola superiore riconosciuto dallo Stato, emesso da una scuola statale secondo le normative vigenti sugli esami.</p>
                <p><strong>Questo titolo di studio è valido per partecipare a tutti i concorsi pubblici in Italia</strong>, iscriversi all&apos;università e per le selezioni lavorative che richiedono un diploma di scuola superiore.</p>
                <p>È fondamentale essere consapevoli del fatto che molte persone sono state truffate da istituti poco seri, con diplomi annullati e scuole chiuse, che promettevano percorsi troppo facili e a basso costo.</p>
                <p>Per evitare queste trappole e ottenere il tuo diploma in modo sicuro e affidabile, contatta subito uno dei nostri consulenti.</p>
              </div>
            </details>

            <details>
              <summary>E&apos; possibile diplomarsi in un anno?<span className="chev">+</span></summary>
              <div className="a">
                <p>Una delle domande che ci viene posta più spesso riguarda la possibilità di sostenere l&apos;esame di maturità in anticipo. La risposta è che sì, è possibile, ma non sempre è la soluzione più pratica. Non voglio scoraggiarti, ma è importante capire il processo e valutare le alternative più sostenibili e intelligenti.</p>
                <p>Se decidi di affrontare il primo esame di maturità disponibile, dobbiamo presentare la tua domanda al provveditorato agli studi della tua Regione. Saranno loro a decidere e ad assegnarti a una scuola per sostenere gli esami finali di Stato.</p>
                <p>A maggio, dovrai presentare, in un&apos;unica sessione d&apos;esame, il programma di tutte le materie per gli anni che ti mancano. Questo approccio può essere molto impegnativo e stressante.</p>
                <p>Se qualcuno ti dice che c&apos;è un modo più semplice o veloce, fai attenzione: potrebbe non essere sincero o operare illegalmente. Meglio valutare bene e prendere decisioni informate. Per un percorso più sicuro e pratico verso il tuo diploma, contatta uno dei nostri consulenti. Siamo qui per aiutarti a raggiungere il tuo obiettivo in modo efficace e senza complicazioni.</p>
              </div>
            </details>

            <details>
              <summary>Fino a quando è possibile iscriversi?<span className="chev">+</span></summary>
              <div className="a">
                <p>Le iscrizioni per il recupero degli anni scolastici e l&apos;ottenimento del Diploma di Maturità sono possibili durante tutto l&apos;anno. Tuttavia, i termini di presentazione delle domande sono soggetti alle scadenze stabilite dal Ministero per tutte le scuole, sia pubbliche che private. Per questo motivo, ti consigliamo di fissare quanto prima un incontro informativo gratuito, per poter organizzare al meglio l&apos;iter burocratico necessario.</p>
              </div>
            </details>

            <details>
              <summary>Il Diploma che rilascia {brand.name} è legalmente riconosciuto?<span className="chev">+</span></summary>
              <div className="a">
                <p>Sì. Collaboriamo unicamente con istituti paritari accreditati dal Ministero della Pubblica Istruzione. I Diplomi che questi istituti rilasciano possiedono lo stesso valore legale di quelli emessi dalle scuole pubbliche.</p>
              </div>
            </details>

            <details>
              <summary>Posso iscrivermi all&apos;università con il diploma di {brand.name}?<span className="chev">+</span></summary>
              <div className="a">
                <p>Sì, poiché i diplomi ottenuti presso istituti paritari accreditati dal Ministero della Pubblica Istruzione hanno lo stesso valore legale di quelli rilasciati dalle scuole pubbliche. Pertanto, questi diplomi permettono l&apos;accesso all&apos;università e a qualsiasi concorso pubblico.</p>
              </div>
            </details>

            <details>
              <summary>Posso pagare a rate?<span className="chev">+</span></summary>
              <div className="a">Sì: tutti e 3 i piani sono rateizzabili in <strong>24 rate</strong>. La rata mensile è semplicemente il totale diviso 24.</div>
            </details>

            <details>
              <summary>Cosa succede se non passo l&apos;esame?<span className="chev">+</span></summary>
              <div className="a">Nei piani <strong>Plus e Max</strong> è inclusa la garanzia <strong>&laquo;Promosso o Ripreparato&raquo;</strong>: se non passi l&apos;esame finale ti riprepariamo, secondo le condizioni previste dal contratto.</div>
            </details>

            <details>
              <summary>Il prezzo include la tassa d&apos;esame?<span className="chev">+</span></summary>
              <div className="a">No. Le tasse esterne (esame di idoneità ~600&euro; e bollettino di maturità ~12&euro; + contributo sede paritaria 10-300&euro;) <strong>non sono incluse</strong> nei piani. Le abbiamo dettagliate qui sopra per trasparenza.</div>
            </details>

            <details>
              <summary>Posso passare a un piano superiore strada facendo?<span className="chev">+</span></summary>
              <div className="a">Sì. Se durante il percorso ti accorgi di aver bisogno di più supporto (es. dal Basic al Plus), puoi fare l&apos;upgrade pagando solo la differenza.</div>
            </details>

            <details>
              <summary>C&apos;è un costo per la consulenza iniziale?<span className="chev">+</span></summary>
              <div className="a">No: la <strong>consulenza con un esperto didattico è gratuita e senza impegno</strong>. La usiamo per capire la tua situazione e proporti il piano giusto.</div>
            </details>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Non hai trovato risposta?</h2>
              <p>Scrivici: rispondiamo entro 24h, anche su WhatsApp. La prima consulenza con un esperto didattico è sempre gratuita.</p>
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
