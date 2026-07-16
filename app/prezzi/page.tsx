import Image from 'next/image'
import { JsonLd } from '@/components/seo/JsonLd'
import { LeadSection } from '@/components/forms/LeadSection'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import './prezzi.css'

export const metadata = buildMetadata({
  title: `Prezzi e piani | ${brand.name}`,
  description:
    'Tre piani, tre percorsi. Basic 1.500 €, Plus 1.900 €, Max 2.900 €. Prezzi in chiaro, tutto incluso. Scopri quale piano fa per te.',
  path: '/prezzi',
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

export default function Prezzi() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <section className="ahero">
        <div className="wrap ahero-grid">
          <div className="ahero-copy">
            <span className="eyebrow-b">Prezzi</span>
            <h1>Tre piani, <span className="hl">tre percorsi</span>.</h1>
            <p className="lead">In {brand.name} hai tre piani — cambia quanto vuoi essere seguito. Stessa preparazione di base, stesso Diploma di Stato riconosciuto. Cambia il livello di accompagnamento, la garanzia esame e la profondità del supporto 1:1.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="#piani">Scopri i tre piani</a>
              <a className="btn btn-out btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">Parla con noi su WhatsApp</a>
            </div>
          </div>
          <div className="ahero-photo">
            <Image src="/assets-vetrina/studio.jpg" alt={`Studente ${brand.name}`} fill style={{objectFit:'cover',objectPosition:'center'}} />
            <span className="ptag">Studente {brand.name}</span>
            <div className="pquoteBox">
              <span className="ql">Trasparenza prima di tutto</span>
              <p>«Niente preventivi misteriosi. I tre piani sono pubblici, in chiaro: scegli quanto vuoi essere accompagnato.»</p>
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
        </div>
      </section>

      <section className="section asec" id="piani">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">3 piani</span>
            <h2>Trasparenza prima di tutto: <span className="hl">i prezzi sono qui</span>.</h2>
            <p>I prezzi qui sotto sono per recuperare <strong>fino a due anni in uno</strong>. I tre piani {brand.name} nascono da tre situazioni reali che incontriamo ogni mese. Sotto trovi cosa includono, in cosa si differenziano e quanto costano — tutto in chiaro.</p>
          </div>
          <div className="total-band">
            <div className="plans">
              <div className="plan basic">
                <div className="plan-tag">
                  <span className="pnum">01</span>
                  <span className="pname-new">Piano Basic</span>
                </div>
                <h3 className="pnarr">Mi organizzo da solo — mi servono solo gli strumenti.</h3>
                <p className="desc">Per chi vuole l&apos;essenziale: piattaforma, materiali e tutor di base. Ha già un metodo di studio, vuole organizzarsi da solo.</p>
                <p className="pquote">«Ho già un metodo, mi servono i contenuti pronti e un piano chiaro. Studio quando posso.»</p>
                <div className="price">
                  <div className="tot-big">1.500 €<small> totale</small></div>
                  <div className="rate-small">in 24 rate da <strong>72,68 €/mese</strong></div>
                </div>
                <ul>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Accesso completo alla piattaforma</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Videolezioni e materiali H24</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Tutor per le materie principali</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Quiz, flashcard e podcast</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Webinar e live tematici</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Supporto WhatsApp e email</li>
                  <li className="x"><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Lezioni 1:1 individuali</li>
                  <li className="x"><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Garanzia Promosso o Ripreparato</li>
                  <li className="x"><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Tutor dedicato 24/7</li>
                </ul>
                <a className="cta" href="#lead">Inizia con Basic</a>
              </div>

              <div className="plan plus">
                <div className="ribbon">Più scelto</div>
                <div className="plan-tag">
                  <span className="pnum">02</span>
                  <span className="pname-new">Piano Plus</span>
                </div>
                <h3 className="pnarr">Voglio essere seguito — lezioni 1:1 e garanzia esame.</h3>
                <p className="desc">Il piano più scelto. Tutto del Basic + lezioni 1:1 con tutor di materia, coordinatrice dedicata e la garanzia «Promosso o Ripreparato».</p>
                <p className="pquote">«Da solo mi blocco. Voglio qualcuno che mi spiega, che mi richiama quando rallento, che mi dice quando sono pronto.»</p>
                <div className="price">
                  <div className="tot-big">1.900 €<small> totale</small></div>
                  <div className="rate-small">in 24 rate da <strong>92,06 €/mese</strong></div>
                </div>
                <ul>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Tutto del piano Basic</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Lezioni 1:1 con tutor di materia</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Pacchetto di 40 ore individuali 1:1</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Garanzia Promosso o Ripreparato</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Esperto didattico dedicato</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Webinar live tematici</li>
                  <li className="x"><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Tutor dedicato 24/7</li>
                  <li className="x"><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Profilo genitore avanzato</li>
                </ul>
                <a className="cta" href="#lead">Scegli Plus</a>
              </div>

              <div className="plan max">
                <div className="plan-tag">
                  <span className="pnum">03</span>
                  <span className="pname-new">Piano Max</span>
                </div>
                <h3 className="pnarr">Voglio il massimo — tutto il supporto 1:1, fino all&apos;esame.</h3>
                <p className="desc">Il pacchetto più ampio di lezioni 1:1: <strong>90 ore</strong> individuali, monitoraggio costante e tutor dedicato. Per chi ha bisogno del massimo supporto.</p>
                <p className="pquote">«Tempi stretti o situazione complessa. Voglio un pacchetto ampio di lezioni 1:1, fino all&apos;esame.»</p>
                <div className="price">
                  <div className="tot-big">2.900 €<small> totale</small></div>
                  <div className="rate-small">in 24 rate da <strong>140,52 €/mese</strong></div>
                </div>
                <ul>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Tutto del piano Plus</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Tutor dedicato 24/7</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Pacchetto di 90 ore individuali 1:1</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Monitoraggio settimanale</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Profilo genitore avanzato</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Priorità nelle prenotazioni</li>
                  <li><span className="ck"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>Esami e sedi: gestione completa</li>
                </ul>
                <a className="cta" href="#lead">Scegli Max</a>
              </div>
            </div>

            <div className="fees-pro">
              <div className="fhd">
                <span className="fic">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </span>
                <div>
                  <h3>Le tasse esterne per l&apos;esame</h3>
                  <p className="fsub">I prezzi sopra riguardano il percorso di preparazione con {brand.name} (piattaforma, materiali, tutor, supporto). Per <strong>sostenere gli esami</strong> sono previste due tasse esterne, dovute alle sedi convenzionate e allo Stato, non incluse nei piani.</p>
                </div>
              </div>
              <div className="fees-rows">
                <div className="fees-row">
                  <div className="ftag">Sede paritaria</div>
                  <h4>Tassa esame di idoneità</h4>
                  <div className="famt">~ 600 €</div>
                  <p>Da versare alla sede convenzionata che ospita l&apos;esame. Si paga quando recuperi più anni in uno o devi sostenere l&apos;idoneità per l&apos;accesso a un anno superiore.</p>
                </div>
                <div className="fees-row">
                  <div className="ftag">Statale + contributo sede</div>
                  <h4>Tassa esame di Stato</h4>
                  <div className="famt">~ 12 € + 10-300 €</div>
                  <p>12,09 € di bollettino statale obbligatorio per tutti i candidati, più un eventuale contributo alla sede d&apos;esame (paritaria, indicativamente tra 10 e 300 € a seconda della scuola).</p>
                </div>
              </div>
              <div className="fees-cta">
                <span className="fic2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div>
                  <b>La tassa di idoneità la incassiamo noi</b>
                  <p>Per renderti tutto più semplice, la tassa di idoneità (~600 €) puoi versarla direttamente a {brand.name}: la <strong>rateizziamo insieme al corso</strong>, senza dover gestire un pagamento separato alla scuola. Te lo confermiamo nella consulenza gratuita, in base alla tua situazione e alla sede d&apos;esame scelta.</p>
                </div>
              </div>
            </div>

            <div className="disd-band">
              <h3>E se cambi idea o devi fermarti?</h3>
              <p>Tre cose da sapere prima di firmare, scritte in chiaro:</p>
              <ul>
                <li><b>Recesso 14 giorni</b>Diritto di recesso pieno entro 14 giorni dalla firma, senza dover motivare. Restituiamo tutto.</li>
                <li><b>Sospensione fino a 6 mesi</b>Per motivi seri (salute, lavoro, famiglia) si può sospendere senza penali e riprendere dopo.</li>
                <li><b>Garanzia esame</b>Plus e Max: se non passi, ti riprepariamo secondo le condizioni previste.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section asec alt">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Domande comuni sui prezzi</span>
            <h2>Tutto quello che vuoi <span className="hl">sapere sui costi</span>.</h2>
            <p>Le domande che ci fanno più spesso su rate, garanzia esame e tasse esterne — con risposte chiare, senza sorprese.</p>
          </div>
          <div className="faq-block">
            <details open>
              <summary>Posso pagare a rate?<span className="chev">+</span></summary>
              <div className="a">Sì: tutti e 3 i piani sono rateizzabili in <strong>24 rate</strong>. La rata mensile è semplicemente il totale diviso 24.</div>
            </details>
            <details>
              <summary>Cosa succede se non passo l&apos;esame?<span className="chev">+</span></summary>
              <div className="a">Nei piani <strong>Plus e Max</strong> è inclusa la garanzia <strong>«Promosso o Ripreparato»</strong>: se non passi l&apos;esame finale ti riprepariamo, secondo le condizioni previste dal contratto.</div>
            </details>
            <details>
              <summary>Il prezzo include la tassa d&apos;esame?<span className="chev">+</span></summary>
              <div className="a">No. Le tasse esterne (esame di idoneità ~600 € e bollettino di maturità ~12 € + contributo sede paritaria 10-300 €) <strong>non sono incluse</strong> nei piani. Le abbiamo dettagliate qui sopra per trasparenza.</div>
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
              <h2>Vuoi capire quale piano fa per te?</h2>
              <p>In 20 minuti di consulenza gratuita ti diciamo il piano adatto alla tua situazione. Senza impegno.</p>
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
