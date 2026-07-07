import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import './esami-diploma.css'

export const metadata = buildMetadata({
  title: `Il valore del diploma | Diploma di Stato riconosciuto — ${brand.name}`,
  description:
    `Il Diploma di Stato che ottieni con ${brand.name} è valido ovunque: università, concorsi, lavoro. Spieghiamo perché conta e cosa cambia nella tua vita.`,
  path: '/esami-diploma',
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

export default function EsamiDiploma() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <section className="ahero">
        <div className="wrap ehero-grid">
          <div className="ehero-copy">
            <span className="eyebrow-b">Il valore del diploma</span>
            <h1>Un <span className="hl">Diploma di Stato riconosciuto</span>. Valido davvero, ovunque.</h1>
            <p className="lead">Il diploma che ottieni con {brand.name} è un Diploma di Stato: lo stesso titolo di una scuola statale, con lo stesso valore legale. Noi ti prepariamo all&apos;esame, il diploma lo rilascia la scuola in sede ufficiale. Qui ti spieghiamo perché conta e a cosa ti serve davvero.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="/#lead">Scopri il tuo percorso</a>
              <a className="btn btn-out btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>
          <div className="etimeline">
            <div className="elbl">Cosa ti apre un diploma</div>
            <h3>Quattro porte che senza non si aprono</h3>
            <div className="etl-step">
              <span className="etl-dot">01</span>
              <h4>Università e ITS</h4>
              <div className="who">Iscrizione a qualsiasi corso</div>
              <p>È il requisito d&apos;accesso a ogni corso di laurea e ai percorsi ITS, in Italia e all&apos;estero.</p>
            </div>
            <div className="etl-step">
              <span className="etl-dot">02</span>
              <h4>Concorsi pubblici</h4>
              <div className="who">Requisito minimo</div>
              <p>Serve per la maggior parte dei concorsi e dei bandi della pubblica amministrazione.</p>
            </div>
            <div className="etl-step">
              <span className="etl-dot">03</span>
              <h4>Lavoro qualificato</h4>
              <div className="who">Più opportunità</div>
              <p>Apre ruoli e carriere che senza un diploma restano semplicemente fuori portata.</p>
            </div>
            <div className="etl-step last">
              <span className="etl-dot">04</span>
              <h4>Crescita personale</h4>
              <div className="who">Un percorso che si chiude</div>
              <p>Chiudere un percorso lasciato a metà è un obiettivo che vale di per sé.</p>
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
            <span className="eb">Nessun equivoco</span>
            <h2>È un diploma vero, <span className="hl">non un attestato</span>.</h2>
            <p>Online non vuol dire &ldquo;di serie B&rdquo;. La validità di un diploma non dipende da come studi, ma dal fatto che l&apos;esame sia sostenuto dentro il sistema scolastico riconosciuto. Tu studi con noi, in modo flessibile; l&apos;esame lo sostieni in una scuola statale o paritaria, davanti a una commissione ufficiale, sugli stessi programmi ministeriali.</p>
          </div>
          <div className="callout">
            <span className="tag">In una riga</span>
            <p>{brand.name} <strong>prepara, non rilascia</strong>: il titolo che ottieni è identico a quello di chi ha frequentato in classe — <em>stesso valore legale, stessa spendibilità</em>.</p>
          </div>
        </div>
      </section>

      <section className="section asec alt" id="a-cosa-serve">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">A cosa serve il diploma</span>
            <h2>Senza diploma <span className="hl">molte porte restano chiuse</span>.</h2>
            <p>Il diploma di scuola superiore è la chiave d&apos;accesso a studio, concorsi e lavoro qualificato. Ecco, in concreto, dove fa la differenza.</p>
          </div>
          <div className="iter-steps">
            <div className="iter-step">
              <div className="n">A</div>
              <div className="k">Università</div>
              <h4>Iscrizione</h4>
              <p>Necessario per iscriversi a qualsiasi corso di laurea, italiano e straniero.</p>
            </div>
            <div className="iter-step r">
              <div className="n">B</div>
              <div className="k">Concorsi</div>
              <h4>Pubblica amministrazione</h4>
              <p>Requisito minimo per la maggior parte dei concorsi e bandi pubblici.</p>
            </div>
            <div className="iter-step">
              <div className="n">C</div>
              <div className="k">Lavoro</div>
              <h4>Percorsi qualificati</h4>
              <p>Necessario per ITS, formazione tecnica e ruoli più qualificati.</p>
            </div>
            <div className="iter-step r">
              <div className="n">D</div>
              <div className="k">Crescita</div>
              <h4>Continuità personale</h4>
              <p>Un percorso interrotto che finalmente si chiude.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Cosa cambia davvero</span>
            <h2>Con un diploma in mano, <span className="hl">cambiano le possibilità</span>.</h2>
            <p>Non è solo un pezzo di carta: è ciò che ti permette di candidarti, iscriverti, provarci. Ecco cosa sblocca, in pratica.</p>
          </div>
          <div className="buroc-promise">
            <div className="top">
              <span className="pic"><svg viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg></span>
              <div>
                <h3>Da &ldquo;non posso&rdquo; a &ldquo;posso provarci&rdquo;.</h3>
                <p>La maggior parte delle persone che si rivolge a noi non vuole un titolo qualunque: vuole sbloccare una possibilità concreta, spesso rimandata da anni.</p>
              </div>
            </div>
            <ul className="blist">
              <li>Iscriverti all&apos;università o a un ITS</li>
              <li>Partecipare a concorsi pubblici</li>
              <li>Accedere a ruoli e contratti che richiedono il diploma</li>
              <li>Avanzare nel lavoro che già fai</li>
              <li>Continuare a studiare con una base riconosciuta</li>
              <li>Chiudere un percorso lasciato a metà</li>
              <li>Dare l&apos;esempio in famiglia</li>
              <li>Toglierti un peso che ti porti dietro da tempo</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section asec alt" id="serieta">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Serietà, non scorciatoie</span>
            <h2>Non siamo <span className="hl">un diplomificio</span>.</h2>
            <p>La cronaca è piena di scuole chiuse e diplomi annullati. Un titolo si può ottenere solo studiando e sostenendo un vero esame: chi promette il contrario ti sta mettendo a rischio. Ecco come riconoscere chi lavora seriamente — e cosa facciamo noi.</p>
          </div>
          <div className="iter-steps">
            <div className="iter-step">
              <div className="n">01</div>
              <div className="k">Trasparenza</div>
              <h4>Prezzi e tempi chiari</h4>
              <p>Ti diciamo costi, durata e cosa è incluso prima di firmare. Niente preventivi nascosti.</p>
            </div>
            <div className="iter-step r">
              <div className="n">02</div>
              <div className="k">Esame vero</div>
              <h4>In sede ufficiale</h4>
              <p>L&apos;esame si sostiene in una scuola statale o paritaria, con commissione e programmi ministeriali.</p>
            </div>
            <div className="iter-step">
              <div className="n">03</div>
              <div className="k">Persone</div>
              <h4>Tutor selezionati</h4>
              <p>1 tutor su 7 supera la selezione. Insegnanti veri, non dispense da 15 pagine.</p>
            </div>
            <div className="iter-step r">
              <div className="n">04</div>
              <div className="k">Onestà</div>
              <h4>Nessuna promessa impossibile</h4>
              <p>Non garantiamo &ldquo;tutti promossi&rdquo;: ti prepariamo bene e ti diciamo la verità sul tuo caso.</p>
            </div>
          </div>
          <div className="callout">
            <span className="tag">Come scegliere</span>
            <p>Diffida di chi non ti mostra la piattaforma, non ti dice il prezzo al telefono o ti propone l&apos;esame a centinaia di km da casa. <em>Una scuola seria non ha niente da nascondere.</em></p>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Vuoi capire se il tuo diploma è a portata di mano?</h2>
              <p>In consulenza gratuita ti diciamo in chiaro quanti anni puoi recuperare, in quanto tempo e con quale valore. Senza impegno.</p>
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
