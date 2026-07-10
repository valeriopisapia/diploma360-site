import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { LeadSection } from '@/components/forms/LeadSection'
import { brand } from '@/lib/brand'
import './iscrizioni.css'

export const metadata = buildMetadata({
  title: `Iscrizioni 2026/2027 | ${brand.name}`,
  description:
    `Come iscriverti a ${brand.name}: consulenza gratuita, scelta del piano, firma online. Iscrizioni aperte tutto l'anno. Inizia oggi.`,
  path: '/iscrizioni',
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

export default function Iscrizioni() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <section className="ahero">
        <div className="wrap ihero-grid">
          <div className="ihero-copy">
            <span className="eyebrow-b">Iscrizioni 2026 / 2027</span>
            <h1>Iscrizioni aperte. <span className="hl">Inizia oggi, parti quando vuoi</span>.</h1>
            <p className="lead">Le iscrizioni a {brand.name} sono sempre aperte: non c&apos;è una finestra rigida. Decidi tu quando partire con il percorso, dopo aver fatto la consulenza gratuita con una coordinatrice del percorso.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="#lead">Scopri il tuo percorso</a>
              <a className="btn btn-out btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>
          <div className="itimeline">
            <div className="ilbl">Il processo di iscrizione</div>
            <h3>Dai primi 30 minuti al primo giorno di lezione</h3>
            <div className="itl-step">
              <span className="itl-dot">01</span>
              <div>
                <h4>Consulenza gratuita</h4>
                <div className="who">30 minuti · al telefono o WhatsApp</div>
                <p>Una coordinatrice ascolta la tua situazione, ti dice in chiaro se possiamo aiutarti, quanti anni puoi recuperare e in quanto tempo.</p>
              </div>
            </div>
            <div className="itl-step">
              <span className="itl-dot">02</span>
              <div>
                <h4>Scelta del piano</h4>
                <div className="who">Dopo la consulenza</div>
                <p>Ti proponiamo il piano più adatto (Basic, Plus o Max) e ti spieghiamo cosa include, costi e tempi. Decidi tu, senza fretta.</p>
              </div>
            </div>
            <div className="itl-step">
              <span className="itl-dot">03</span>
              <div>
                <h4>Firma e attivazione</h4>
                <div className="who">100% online</div>
                <p>Firmi il contratto digitalmente, paghi la prima rata. Hai 14 giorni di recesso se cambi idea, senza dover motivare.</p>
              </div>
            </div>
            <div className="itl-step last">
              <span className="itl-dot">04</span>
              <div>
                <h4>Primo giorno di lezione</h4>
                <div className="who">Entro 7 giorni dalla firma</div>
                <p>Ti consegniamo il tuo piano di studio, ti presentiamo i tutor e parti. Da qui in poi ti accompagniamo fino all&apos;esame.</p>
              </div>
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
            <span className="eb">Come funziona</span>
            <h2>4 passi per <span className="hl">iniziare con noi</span>.</h2>
            <p>L&apos;iscrizione è un percorso semplice e guidato. Niente burocrazia opprimente: ti aiutiamo a ogni passaggio.</p>
          </div>
          <div className="iter-steps">
            <div className="iter-step">
              <div className="n">01</div>
              <div className="k">Contatto</div>
              <h4>Lascia i tuoi dati</h4>
              <p>Compila il form o scrivici su WhatsApp. Ti ricontattiamo entro 24h per fissare la consulenza.</p>
            </div>
            <div className="iter-step r">
              <div className="n">02</div>
              <div className="k">Consulenza</div>
              <h4>Parli con un esperto</h4>
              <p>In 30 minuti analizziamo la tua situazione: anni da recuperare, indirizzo, tempi, disponibilità.</p>
            </div>
            <div className="iter-step">
              <div className="n">03</div>
              <div className="k">Scelta</div>
              <h4>Scegli il piano</h4>
              <p>Ti proponiamo il piano (Basic, Plus o Max) adatto al tuo caso, con prezzo chiaro e tempistiche.</p>
            </div>
            <div className="iter-step r">
              <div className="n">04</div>
              <div className="k">Partenza</div>
              <h4>Inizi a studiare</h4>
              <p>Firmiamo il contratto online, attiviamo l&apos;account, ti assegniamo i tutor. Parti subito.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section asec alt">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Documenti necessari</span>
            <h2>Cosa <span className="hl">ti serve avere</span> sotto mano.</h2>
            <p>Per attivare l&apos;iscrizione servono pochi documenti standard. Te li chiediamo solo al momento della firma del contratto.</p>
          </div>
          <div className="sedi-grid">
            <div className="sede-card">
              <div className="lbl">Sempre necessari</div>
              <h3>Documenti base</h3>
              <p><strong>Carta d&apos;identità</strong> valida (o passaporto, o permesso di soggiorno).<br /><strong>Codice fiscale</strong> dello studente.<br /><strong>Ultima pagella scolastica</strong> o titolo di studio precedente (licenza media, biennio incompleto, ecc.).</p>
            </div>
            <div className="sede-card alt">
              <div className="lbl">Se applicabili</div>
              <h3>Documenti specifici</h3>
              <p><strong>Certificazione DSA/BES</strong> (se presente, per attivare gli strumenti compensativi).<br /><strong>Documenti del genitore</strong> (se lo studente è minorenne).<br /><strong>Eventuali pagelle di anni già frequentati</strong> per ricostruire il percorso.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Tempistiche</span>
            <h2>Quando partire: <span className="hl">le finestre del 2026/27</span>.</h2>
            <p>Non hai una data fissa per iniziare: il tuo percorso parte quando sei pronto. Ma per arrivare agli esami nei tempi giusti, ci sono alcune finestre d&apos;ingresso consigliate.</p>
          </div>
          <div className="iter-steps">
            <div className="iter-step">
              <div className="n">A</div>
              <div className="k">Da settembre</div>
              <h4>Ingresso autunnale</h4>
              <p>Partenza tradizionale: massimo tempo per arrivare agli esami estivi.</p>
            </div>
            <div className="iter-step r">
              <div className="n">B</div>
              <div className="k">Da gennaio</div>
              <h4>Ingresso invernale</h4>
              <p>Per chi ha avuto un anno di pausa, recupero in 18-20 mesi.</p>
            </div>
            <div className="iter-step">
              <div className="n">C</div>
              <div className="k">Da aprile</div>
              <h4>Ingresso primaverile</h4>
              <p>Per recupero veloce mirato su 1 anno + esame di Stato.</p>
            </div>
            <div className="iter-step r">
              <div className="n">D</div>
              <div className="k">Quando vuoi</div>
              <h4>Ingressi su richiesta</h4>
              <p>Casi particolari: lo definiamo insieme in consulenza.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Senza rischi</span>
            <h2>Iscriverti è <span className="hl">una decisione serena</span>.</h2>
            <p>Vogliamo che tu scelga con calma e con tutte le informazioni in mano. Per questo l&apos;iscrizione è priva di trappole: ecco le garanzie che hai.</p>
          </div>
          <div className="iter-steps">
            <div className="iter-step">
              <div className="n">01</div>
              <div className="k">Gratis</div>
              <h4>Consulenza senza impegno</h4>
              <p>Prima di tutto parli con una coordinatrice: capisci il percorso senza spendere nulla.</p>
            </div>
            <div className="iter-step r">
              <div className="n">02</div>
              <div className="k">Chiaro</div>
              <h4>Prezzo trasparente</h4>
              <p>Costi, rate e cosa è incluso te li diciamo prima di firmare. Nessuna sorpresa.</p>
            </div>
            <div className="iter-step">
              <div className="n">03</div>
              <div className="k">14 giorni</div>
              <h4>Diritto di recesso</h4>
              <p>Dopo la firma hai 14 giorni per ripensarci, senza dover motivare.</p>
            </div>
            <div className="iter-step r">
              <div className="n">04</div>
              <div className="k">Sempre</div>
              <h4>Iscrizioni tutto l&apos;anno</h4>
              <p>Nessuna finestra rigida: parti quando sei pronto, anche subito.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Pronto a iscriverti?</h2>
              <p>Inizia con la consulenza gratuita: in 30 minuti capiamo il tuo percorso e ti diciamo come iscriverti. Senza impegno.</p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="#lead">Scopri il tuo percorso</a>
              <a className="btn btn-glass btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <LeadSection />
    </>
  )
}
