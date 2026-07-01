import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import './recuperare-due-anni-in-uno.css'

export const metadata = buildMetadata({
  title: 'Recuperare due anni in uno: come funziona e quanto costa',
  description:
    "Recuperare due anni in uno: le regole 2025/26, come funziona l'esame di idoneità, requisiti, tempi e costi. Studi online con Diploma360 ed esame in sede vicino a te.",
  path: '/recuperare-due-anni-in-uno',
})

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Si possono recuperare tre anni in uno?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Dall'anno scolastico 2025/26 no: il limite è di massimo due anni per sessione d'esame. Per recuperarne di più si pianifica il percorso in più passaggi.",
      },
    },
    {
      '@type': 'Question',
      name: "Quando si svolge l'esame di idoneità?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "In genere in un'unica sessione nella prima settimana di settembre, prima dell'inizio delle lezioni. Le date esatte si confermano con la sede d'esame.",
      },
    },
    {
      '@type': 'Question',
      name: "Dove si sostiene l'esame di idoneità?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Presso una scuola statale come candidato esterno o un istituto paritario convenzionato. Diploma360 assegna la sede più comoda nella provincia dello studente.',
      },
    },
    {
      '@type': 'Question',
      name: 'Il diploma ottenuto recuperando due anni in uno è valido?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì: al termine del percorso si consegue un Diploma di Stato riconosciuto, valido per università e concorsi pubblici.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto costa recuperare due anni in uno?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La preparazione con Diploma360 parte da 72,68€/mese in 24 rate; le tasse d\'esame sono a parte e variano per sede. In consulenza gratuita si riceve il costo esatto su misura.',
      },
    },
  ],
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Recuperare due anni in uno: come funziona, requisiti e costi',
  datePublished: '2026-06-10',
  dateModified: '2026-06-10',
  author: { '@type': 'Organization', name: 'Diploma360' },
  publisher: {
    '@type': 'Organization',
    name: 'Diploma360',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.diploma360.it/wp-content/uploads/2025/04/Diploma360.png',
    },
  },
  mainEntityOfPage: 'https://www.diploma360.it/blog/recuperare-due-anni-in-uno/',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.diploma360.it/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.diploma360.it/blog/' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Recuperare due anni in uno',
      item: 'https://www.diploma360.it/blog/recuperare-due-anni-in-uno/',
    },
  ],
}

export default function RecuperareDueAnniInUno() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <div className="wrap art breadcrumb">
        <nav aria-label="Percorso">
          <ol>
            <li><a href="/">Home</a></li>
            <li><a href="#">Blog</a></li>
            <li>Recuperare due anni in uno</li>
          </ol>
        </nav>
      </div>

      <article className="section" style={{ paddingTop: '10px' }}>
        <div className="wrap art">
          <div className="art-head">
            <span className="eyebrow">Recupero anni · Guida</span>
            <h1>Recuperare due anni in uno: come funziona, requisiti e costi</h1>
            <div className="art-meta">
              <span>Aggiornato a giugno 2026</span>
              <span className="dot"></span>
              <span>Lettura 7 min</span>
              <span className="dot"></span>
              <span>A cura della redazione Diploma360</span>
            </div>
          </div>

          <div className="tldr">
            <span className="h">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              In breve
            </span>
            <ul>
              <li>Sì, si possono recuperare <strong>due anni in uno</strong> tramite l&apos;<strong>esame di idoneità</strong> come candidato esterno.</li>
              <li>Dall&apos;anno scolastico <strong>2025/26</strong> il limite è di <strong>massimo due anni per sessione</strong> e, in questo caso, la commissione ha un <strong>presidente esterno</strong> nominato dall&apos;Ufficio Scolastico Regionale.</li>
              <li>L&apos;esame verte su <strong>tutte le materie</strong> degli anni che vuoi recuperare e si svolge in <strong>un&apos;unica sessione</strong> (di norma a inizio settembre).</li>
              <li>Con Diploma360 <strong>studi online</strong> e sostieni l&apos;esame in una <strong>sede convenzionata vicino a te</strong>; i percorsi partono da <strong>72,68&euro;/mese</strong>, con le tasse d&apos;esame indicate a parte.</li>
            </ul>
          </div>

          <div className="art-body">
            <p>&laquo;Si possono recuperare due anni in uno?&raquo; è una delle ricerche più frequenti di chi ha perso terreno a scuola e vuole rimettersi in pari senza buttare via altro tempo. La risposta breve è sì, ed è una possibilità prevista dalla legge. Ma dal 2025/26 alcune regole sono cambiate: vale la pena capire bene come funziona, cosa serve e quanto costa, prima di scegliere il percorso giusto.</p>

            <h2>Si possono davvero recuperare due anni in uno?</h2>
            <p>Sì. Lo strumento si chiama <strong>esame di idoneità</strong>: è la prova con cui un <strong>candidato esterno</strong> dimostra di avere la preparazione degli anni che non ha frequentato, per essere ammesso alla classe successiva. Superandolo, &laquo;salti&raquo; gli anni intermedi e ti rimetti nel percorso ordinario.</p>
            <p>C&apos;è però un limite, ed è la novità più importante: <strong>dall&apos;anno scolastico 2025/26 si possono recuperare al massimo due anni in un&apos;unica sessione d&apos;esame</strong>. Non si possono più condensare tre o più anni in un colpo solo come in passato.</p>

            <h2>Cosa cambia con le nuove regole 2025/26?</h2>
            <p>Il decreto ministeriale sugli esami di idoneità in vigore dal 2025/26 ha introdotto due paletti pensati per garantire la serietà del percorso:</p>
            <ul>
              <li><strong>Massimo due anni per sessione.</strong> Se devi recuperarne di più, lo farai in più passaggi, secondo un piano sostenibile.</li>
              <li><strong>Presidente esterno.</strong> Quando l&apos;esame riguarda due anni, la commissione è presieduta da un presidente <strong>esterno</strong> all&apos;istituto, nominato dall&apos;Ufficio Scolastico Regionale. È una garanzia di trasparenza in più.</li>
            </ul>
            <div className="note-box">Le regole sugli esami di idoneità e le relative scadenze possono essere aggiornate ogni anno dal Ministero. Le date e le modalità esatte per la tua situazione vanno sempre confermate con la sede d&apos;esame: in <a href="/recupero-anni-scolastici-roma#lead">consulenza gratuita</a> ti aiutiamo a verificarle.</div>

            <h2>Come funziona l&apos;esame di idoneità per due anni in uno?</h2>
            <p>In pratica funziona così:</p>
            <ul>
              <li>L&apos;esame verte su <strong>tutte le materie</strong> previste dal piano di studi dei due anni che vuoi recuperare.</li>
              <li>Si svolge in <strong>un&apos;unica sessione</strong>, di norma nella prima settimana di settembre, prima dell&apos;inizio delle lezioni dell&apos;anno successivo.</li>
              <li>Si sostiene presso una <strong>scuola statale</strong> (come candidato esterno) o presso un <strong>istituto paritario</strong> convenzionato.</li>
              <li>Superato l&apos;esame, ottieni l&apos;<strong>idoneità</strong> alla classe successiva e prosegui il percorso fino al diploma.</li>
            </ul>
            <p>Non va confuso con l&apos;<strong>abbreviazione per merito</strong>, che è un&apos;altra cosa: riguarda gli studenti molto bravi del quarto anno che accedono in anticipo alla maturità e richiede voti alti (in genere 8/10) negli anni precedenti.</p>

            <div className="inline-cta">
              <div className="t">Quanti anni puoi recuperare nella tua situazione?</div>
              <a className="btn btn-primary btn-lg" href="/recupero-anni-scolastici-roma#lead">Richiedi la consulenza gratuita</a>
            </div>

            <h2>Quali requisiti servono?</h2>
            <p>Per i percorsi di scuola superiore l&apos;esame di idoneità come candidato esterno è pensato per chi non ha frequentato (o non ha concluso) gli anni che vuole recuperare. In linea generale serve avere l&apos;età e i titoli che la normativa prevede per la classe a cui si vuole accedere. Poiché i requisiti dipendono dal tuo percorso passato, il modo più sicuro per sapere da dove parti è far valutare la tua situazione da un esperto.</p>

            <h2>Quanto costa recuperare due anni in uno?</h2>
            <p>Il costo si compone di due voci, ed è giusto vederle separate per non avere sorprese:</p>
            <ul>
              <li><strong>La preparazione</strong> (tutor, materiali, piattaforma): con Diploma360 i percorsi partono da <strong>72,68&euro;/mese</strong> in 24 rate. Il totale dipende da quanti anni recuperi e dall&apos;indirizzo. Trovi tutti i dettagli nella <a href="/prezzi">pagina prezzi</a>.</li>
              <li><strong>Le tasse d&apos;esame</strong>, che <strong>non</strong> sono incluse e variano in base alla sede: te le indichiamo sempre in chiaro fin dall&apos;inizio.</li>
            </ul>
            <p>Diffida di chi promette il recupero &laquo;a poco e in pochissimo tempo&raquo;: la trasparenza sui costi è uno dei segnali per riconoscere un percorso serio. Approfondisci nella nostra guida su <a href="/prezzi">prezzi e piani</a>.</p>

            <h2>Si può fare nella scuola pubblica, al serale o online?</h2>
            <p>Puoi prepararti da solo e presentarti da privatista, frequentare un corso serale, oppure seguire un percorso online. La differenza la fa la <strong>flessibilità</strong>: il serale ha orari e presenza fissi, mentre con Diploma360 <strong>studi quando vuoi</strong>, con un tutor dedicato per ogni materia, e vai in sede solo per l&apos;esame. Per chi lavora o ha avuto un percorso interrotto, online è spesso la soluzione più sostenibile. Vedi <a href="/recupero-anni-scolastici-roma">come funziona il recupero anni</a> passo per passo.</p>

            <h2>In quanto tempo e quanto è difficile?</h2>
            <p>Recuperare due anni in uno è possibile, ma <strong>impegnativo</strong>: stai preparando il programma di due annualità in pochi mesi. Con un piano personalizzato, tutor che ti seguono e costanza, è un obiettivo realistico — ma serve metterci impegno. Per questo il primo passo è capire onestamente da dove parti e costruire un calendario sostenibile.</p>

            <h2>Dove sostengo l&apos;esame?</h2>
            <p>L&apos;esame si svolge in presenza in una <strong>sede convenzionata vicino a te</strong>. Diploma360 collabora con istituti paritari in più città: puoi vedere le sedi nella pagina <a href="/sedi-esame">Sedi d&apos;esame</a> e le pagine dedicate, ad esempio <a href="/recupero-anni-scolastici-roma">recupero anni a Roma</a> o <a href="/recupero-anni-scolastici-milano">a Milano</a>.</p>

            <div className="inline-cta">
              <div className="t">Scopri in 2 minuti il percorso giusto per te, senza impegno.</div>
              <a className="btn btn-primary btn-lg" href="/recupero-anni-scolastici-roma#lead">Parla con un esperto</a>
            </div>
          </div>

          <h2 className="s-title">Domande frequenti</h2>
          <div className="faq" style={{ marginTop: '20px' }}>
            <details open>
              <summary>Si possono recuperare tre anni in uno?<span className="chev">+</span></summary>
              <div className="a">Dall&apos;anno scolastico 2025/26 no: il limite è di <strong>massimo due anni per sessione</strong> d&apos;esame. Se devi recuperarne di più, si pianifica il percorso in più passaggi.</div>
            </details>
            <details>
              <summary>Quando si svolge l&apos;esame di idoneità?<span className="chev">+</span></summary>
              <div className="a">In genere in un&apos;unica sessione nella <strong>prima settimana di settembre</strong>, prima dell&apos;inizio delle lezioni. Le date esatte vanno confermate con la sede d&apos;esame.</div>
            </details>
            <details>
              <summary>Dove si sostiene l&apos;esame?<span className="chev">+</span></summary>
              <div className="a">Presso una <strong>scuola statale</strong> (come candidato esterno) o un <strong>istituto paritario convenzionato</strong>. Con Diploma360 ti assegniamo la sede più comoda nella tua provincia.</div>
            </details>
            <details>
              <summary>Il diploma ottenuto così è valido?<span className="chev">+</span></summary>
              <div className="a">Sì: al termine del percorso consegui un <strong>Diploma di Stato riconosciuto</strong>, con pieno valore legale per università e concorsi pubblici.</div>
            </details>
            <details>
              <summary>Quanto costa recuperare due anni in uno?<span className="chev">+</span></summary>
              <div className="a">La preparazione con Diploma360 parte da <strong>72,68&euro;/mese</strong> in 24 rate; le tasse d&apos;esame sono a parte e variano per sede. In consulenza ti diamo il costo esatto su misura. Vedi la <a href="/prezzi">pagina prezzi</a>.</div>
            </details>
          </div>

          <div className="sources">
            <strong>Fonti:</strong> Ministero dell&apos;Istruzione e del Merito &mdash;{' '}
            <a href="https://www.mim.gov.it/en/-/esami-di-idoneita-nei-percorsi-del-sistema-nazionale-di-istruzione-il-decreto-ministeriale-in-vigore-dall-anno-scolastico-2025-26" target="_blank" rel="noopener">Esami di idoneità, decreto in vigore dall&apos;a.s. 2025/26</a>;{' '}
            <a href="https://www.mim.gov.it/en/esami-integrativi-ed-esami-di-idoneit%C3%A0" target="_blank" rel="noopener">Esami integrativi ed esami di idoneità</a>;{' '}
            <a href="https://www.istruzione.it/domande_candidati_esterni/domande-frequenti.html" target="_blank" rel="noopener">Domande frequenti candidati esterni</a>; D.Lgs. 62/2017.
          </div>
        </div>
      </article>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Vuoi sapere da quali anni puoi ripartire?</h2>
              <p>Una consulenza gratuita per capire anni recuperabili, indirizzo e costi su misura. Senza impegno, anche su WhatsApp.</p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="/recupero-anni-scolastici-roma#lead">Richiedi la consulenza gratuita</a>
              <a className="btn btn-glass btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">Scrivici su WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
