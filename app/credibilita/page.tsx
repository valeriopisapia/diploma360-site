import Image from 'next/image'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import './credibilita.css'

export const metadata = buildMetadata({
  title: `Perché fidarti di ${brand.name} — Serietà e garanzie`,
  description:
    'Non siamo un diplomificio. Scopri chi siamo, la nostra sede a Roma, le tutele per iscritto e come riconoscere una scuola seria.',
  path: '/credibilita',
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

export default function Credibilita() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <section className="nhero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Trasparenza e serietà</span>
            <h1>Non siamo un diplomificio. <span className="grad-text">Ti prepariamo davvero.</span></h1>
            <p className="lead">Il diploma non si compra: si prepara. La cronaca è piena di scuole chiuse e titoli annullati. Qui ti spieghiamo chi siamo, quali tutele hai per iscritto e come riconoscere una scuola seria — così scegli con gli occhi aperti.</p>
            <div className="ph-cta">
              <a className="btn btn-primary btn-lg" href="/#lead">Parla con un consulente</a>
              <a className="btn btn-out btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">Chiedi su WhatsApp</a>
            </div>
          </div>
          <div className="nhero-vis">
            <Image src="/assets-vetrina/studentessa.jpg" alt={`Studentessa ${brand.name} soddisfatta del percorso`} fill style={{objectFit:'cover',objectPosition:'center 30%'}} />
          </div>
        </div>
      </section>

      <section className="trustbar">
        <div className="wrap">
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            Diploma di Stato riconosciuto
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
            Insegnanti e tutor veri
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Recesso 14 giorni
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Garanzia esame (Plus/Max)
          </span>
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Chi c&apos;è dietro</span>
            <h2 className="sec-h2">Una realtà strutturata, <span className="grad-text">non un sito improvvisato</span>.</h2>
            <p className="sec-lead">{brand.name} è il percorso verso il Diploma di Stato di LaScuola360, marchio di Classme S.r.l. Dietro la piattaforma ci sono persone vere.</p>
          </div>
          <div className="who-grid">
            <div className="tut-card">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>
              </div>
              <h4>Insegnanti e tutor reali</h4>
              <p>Tutor per materia e coordinatori didattici selezionati: 1 su 7 supera la selezione. Non un call center.</p>
            </div>
            <div className="tut-card">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              </div>
              <h4>Attivi dal 2018</h4>
              <p>Anni di esperienza in formazione e tecnologia per la scuola, con sede legale a Roma e P.IVA verificabile.</p>
            </div>
            <div className="tut-card">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <h4>Convenzioni reali</h4>
              <p>Rete di sedi statali e paritarie in tutta Italia dove sostenere gli esami, nel rispetto della normativa.</p>
            </div>
          </div>
          <p className="note-soft">Spazio riservato a certificazioni e accreditamenti ufficiali (da inserire quando disponibili).</p>
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">La nostra sede</span>
            <h2 className="sec-h2">Una scuola con una <span className="grad-text">sede vera, a Roma</span>.</h2>
            <p className="sec-lead">Dietro {brand.name} c&apos;è LaScuola360, il network di cui facciamo parte: una sede fisica in Viale Castrense 5E, a Roma. Non un&apos;app anonima — un posto reale dove studiare, incontrare i tutor e fare due chiacchiere.</p>
          </div>
          <div className="sede-split">
            <div className="sede-photo">
              <Image src="/assets-vetrina/sede-vetrina.png" alt="La nostra sede LaScuola360 — Viale Castrense 5E, Roma" fill style={{objectFit:'cover'}} />
              <span className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Viale Castrense 5E · Roma
              </span>
            </div>
            <div className="sede-map">
              <iframe
                src="https://maps.google.com/maps?q=Viale%20Castrense%205E%2C%2000182%20Roma&z=15&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mappa della sede ${brand.name} — Viale Castrense 5E, Roma`}
              />
            </div>
          </div>
          <div className="sede-cta">
            <a className="btn btn-primary" href="https://www.google.com/maps/search/?api=1&query=Viale%20Castrense%205E%2C%2000182%20Roma" target="_blank" rel="noopener">Apri su Google Maps</a>
            <a className="btn btn-out" href="https://wa.me/393517214644" target="_blank" rel="noopener">Prenota una visita</a>
          </div>
        </div>
      </section>

      <section className="section asec alt">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Le tutele, per iscritto</span>
            <h2 className="sec-h2">Cosa ti garantiamo <span className="grad-text">nero su bianco</span>.</h2>
            <p className="sec-lead">Non promesse a voce: tutele concrete, scritte nel contratto.</p>
          </div>
          <div className="who-grid">
            <div className="tut-card">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <h4>Recesso entro 14 giorni</h4>
              <p>Diritto di ripensamento pieno entro 14 giorni dalla firma, senza dover motivare. Ti restituiamo tutto.</p>
            </div>
            <div className="tut-card">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              </div>
              <h4>Sospensione fino a 6 mesi</h4>
              <p>Per motivi seri (salute, lavoro, famiglia) puoi sospendere il percorso senza penali e riprenderlo quando vuoi.</p>
            </div>
            <div className="tut-card">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h4>Garanzia esame</h4>
              <p>Nei piani Plus e Max, se non superi l&apos;esame ti riprepariamo, secondo le condizioni previste.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Come scegliere</span>
            <h2 className="sec-h2">Come riconoscere <span className="grad-text">una scuola seria</span>.</h2>
            <p className="sec-lead">Prima di affidarti a chiunque — noi compresi — verifica questi punti. È il modo migliore per non finire nella giungla dei diplomifici.</p>
          </div>
          <div className="cmp">
            <div className="cmp-col good">
              <h3>
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                Una scuola seria…
              </h3>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>Ti dice costi, tempi e cosa è incluso <strong>prima</strong> di firmare</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>Ti mostra la piattaforma e i materiali di studio</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>Fa sostenere l&apos;esame in una sede ufficiale vicino a te</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>Ti fa parlare con insegnanti e tutor veri</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>Ti permette di verificare l&apos;avanzamento dello studio</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                  <span>Mette tutele e recesso nero su bianco</span>
                </li>
              </ul>
            </div>
            <div className="cmp-col bad">
              <h3>
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
                </span>
                Diffida se…
              </h3>
              <ul>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
                  <span>Non ti dice il prezzo al telefono o è evasiva</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
                  <span>Promette il diploma «facile» o «tutti promossi»</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
                  <span>Ti propone l&apos;esame a centinaia di km da casa</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
                  <span>Ti manda solo una dispensa di poche pagine</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
                  <span>Ha un insegnante ogni 100 studenti</span>
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="M6 6l12 12"/></svg>
                  <span>Non ti mostra piattaforma, docenti o sedi</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="callout">
            <span className="tag">In una riga</span>
            <p>Una scuola seria <strong>non ha niente da nascondere</strong>: prezzi, persone, piattaforma e sedi sono tutti verificabili. <em>Se qualcosa non ti viene mostrato, chiediti perché.</em></p>
          </div>
        </div>
      </section>

      <section className="section asec alt">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Onestà prima di tutto</span>
            <h2 className="sec-h2">Le nostre promesse <span className="grad-text">(e cosa non promettiamo)</span>.</h2>
          </div>
          <div className="promise">
            <div className="promise-card yes">
              <div className="lab">Cosa promettiamo</div>
              <ul>
                <li>Di dirti quali anni puoi recuperare davvero e in quanto tempo</li>
                <li>Di prepararti con tutor, materiali e verifiche fino agli esami</li>
                <li>Di spiegarti in chiaro costi, rate e passaggi</li>
                <li>Di accompagnarti nelle pratiche e nella scelta della sede</li>
                <li>Di esserci quando rallenti o perdi il filo</li>
              </ul>
            </div>
            <div className="promise-card no">
              <div className="lab">Cosa non promettiamo</div>
              <ul>
                <li>«Tutti promossi»: sarebbe irrealistico e scorretto</li>
                <li>Il diploma senza studiare o senza esame</li>
                <li>Scorciatoie fuori dalla normativa</li>
                <li>Tempi miracolosi non sostenibili per la tua situazione</li>
                <li>Risultati che dipendono solo da te e non solo da noi</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Vuoi capire se fa davvero al caso tuo?</h2>
              <p>In consulenza gratuita ti spieghiamo in chiaro percorso, tempi, costi e garanzie. Senza promesse impossibili e senza impegno.</p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="/#lead">Parla con un consulente</a>
              <a className="btn btn-glass btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">Scrivici su WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
