import Image from 'next/image'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { LeadSection } from '@/components/forms/LeadSection'
import { brand } from '@/lib/brand'
import './garanzia.css'

export const metadata = buildMetadata({
  title: `Garanzia Promosso o Ripreparato | ${brand.name}`,
  description:
    `Se non passi l'esame ti ripreparariamo gratis. Scopri le condizioni della garanzia ${brand.name}: quando vale, quando non vale e cosa facciamo.`,
  path: '/garanzia',
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

export default function Garanzia() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <section className="gh">
        <div className="wrap">
          <div>
            <span className="eb">Garanzia Promosso o Ripreparato</span>
            <h1>Se non passi l&apos;esame, <span className="hl">ti ripreparariamo gratis</span>.</h1>
            <p className="lead">Nei piani Plus e Max, includiamo la garanzia ufficiale: se al primo tentativo non passi l&apos;esame finale, riprepariamo gratuitamente lo studente per la sessione successiva. Qui sotto trovi le condizioni esplicite, in chiaro, senza asterischi nascosti.</p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="#lead">Voglio sapere di più</a>
              <a className="btn btn-out btn-lg" href="/prezzi">Vai ai prezzi</a>
            </div>
          </div>
          <div className="vis">
            <Image src="/assets-vetrina/chi.jpg" alt={`Garanzia esame ${brand.name}`} fill style={{objectFit:'cover',objectPosition:'center'}} />
            <div className="qbox">
              <span className="qlbl">Trasparenza</span>
              <p>Niente promesse vuote: condizioni esplicite, scritte in chiaro, valide solo se rispettate da entrambe le parti.</p>
              <span>— La nostra promessa</span>
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            1 su 7 tutor supera la selezione
          </span>
        </div>
      </section>

      <section className="section gsec">
        <div className="wrap">
          <div className="ghd">
            <span className="eb">Come funziona</span>
            <h2>Quando <span className="hl">vale la garanzia</span>.</h2>
            <p>La garanzia «Promosso o Ripreparato» è inclusa nei piani Plus e Max. Si attiva automaticamente al momento della firma del contratto, non c&apos;è nulla da richiedere.</p>
          </div>
          <div className="controls">
            <div className="control">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <div>
                <h4>Studente ha completato il percorso</h4>
                <p>Lo studente deve aver completato almeno l&apos;<strong>80% delle attività</strong> previste dal piano di studio (videolezioni, esercizi, materiali).</p>
              </div>
            </div>
            <div className="control r">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <div>
                <h4>Studente ha partecipato alle lezioni</h4>
                <p>Almeno il <strong>70% delle lezioni 1:1</strong> prenotate (Plus) o l&apos;<strong>80%</strong> (Max). Non vale se lo studente non si presenta.</p>
              </div>
            </div>
            <div className="control">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <div>
                <h4>Studente ha rispettato il calendario</h4>
                <p>Lo studente deve aver rispettato il piano di studio concordato, con eventuali aggiustamenti documentati dal coordinatore.</p>
              </div>
            </div>
            <div className="control r">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <div>
                <h4>Esame sostenuto nella sede consigliata</h4>
                <p>L&apos;esame deve essere sostenuto nella sede convenzionata indicata da {brand.name} (oppure documentato motivo per cambio).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section gsec alt">
        <div className="wrap">
          <div className="ghd">
            <span className="eb">Per onestà</span>
            <h2>Quando <span className="hl">NON vale</span>.</h2>
            <p>Per trasparenza, qui sotto i casi in cui la garanzia non si attiva. Vogliamo che sia chiaro fin dall&apos;inizio, senza sorprese.</p>
          </div>
          <div className="molli-band">
            <h3>Casi di esclusione</h3>
            <p>La garanzia non si attiva (anche solo parzialmente) in questi casi:</p>
            <ul>
              <li style={{background:'#F8DDE7',padding:'14px 18px',borderRadius:'10px'}}>
                <b>Abbandono del percorso</b>
                Se lo studente smette di studiare per più di 8 settimane senza giustificato motivo, la garanzia decade.
              </li>
              <li style={{background:'#F8DDE7',padding:'14px 18px',borderRadius:'10px'}}>
                <b>Rifiuto del piano</b>
                Se lo studente rifiuta sistematicamente i suggerimenti del coordinatore senza motivazione, il piano non è più «nostro» e la garanzia decade.
              </li>
              <li style={{background:'#F8DDE7',padding:'14px 18px',borderRadius:'10px'}}>
                <b>Esame fuori protocollo</b>
                Se lo studente sceglie autonomamente una sede d&apos;esame non convenzionata o non consigliata da {brand.name}.
              </li>
              <li style={{background:'#F8DDE7',padding:'14px 18px',borderRadius:'10px'}}>
                <b>Frode o uso improprio</b>
                Se viene rilevato uso improprio della piattaforma (account condivisi, copia in esame, ecc.).
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section gsec">
        <div className="wrap">
          <div className="ghd">
            <span className="eb">Cosa succede in pratica</span>
            <h2>Se non passi, <span className="hl">cosa facciamo</span>.</h2>
            <p>Se la garanzia si attiva, il processo è semplice e trasparente.</p>
          </div>
          <div className="iter-steps-g">
            <div className="iter-step" style={{background:'#FBD9C2',borderRadius:'18px',padding:'28px 22px'}}>
              <div className="n" style={{fontFamily:'Poppins,sans-serif',fontSize:'36px',fontWeight:800,color:'var(--coral-dk)',lineHeight:1,marginBottom:'10px'}}>01</div>
              <div className="k" style={{fontSize:'11px',letterSpacing:'.16em',textTransform:'uppercase',color:'#993556',fontWeight:700,marginBottom:'8px'}}>Comunicazione</div>
              <h4 style={{fontSize:'16px',fontWeight:700,margin:'0 0 6px',color:'#1F1F1F'}}>Ci avvisi entro 30 giorni</h4>
              <p style={{fontSize:'13.5px',color:'#3F2A2A',lineHeight:1.55,margin:0}}>Ci comunichi l&apos;esito negativo entro 30 giorni dalla pubblicazione del risultato.</p>
            </div>
            <div className="iter-step" style={{background:'#F8DDE7',borderRadius:'18px',padding:'28px 22px'}}>
              <div className="n" style={{fontFamily:'Poppins,sans-serif',fontSize:'36px',fontWeight:800,color:'#A8366D',lineHeight:1,marginBottom:'10px'}}>02</div>
              <div className="k" style={{fontSize:'11px',letterSpacing:'.16em',textTransform:'uppercase',color:'#A8366D',fontWeight:700,marginBottom:'8px'}}>Verifica</div>
              <h4 style={{fontSize:'16px',fontWeight:700,margin:'0 0 6px',color:'#1F1F1F'}}>Verifichiamo le condizioni</h4>
              <p style={{fontSize:'13.5px',color:'#3F2A2A',lineHeight:1.55,margin:0}}>In 7 giorni il coordinatore verifica che siano state rispettate le condizioni di attivazione.</p>
            </div>
            <div className="iter-step" style={{background:'#FBD9C2',borderRadius:'18px',padding:'28px 22px'}}>
              <div className="n" style={{fontFamily:'Poppins,sans-serif',fontSize:'36px',fontWeight:800,color:'var(--coral-dk)',lineHeight:1,marginBottom:'10px'}}>03</div>
              <div className="k" style={{fontSize:'11px',letterSpacing:'.16em',textTransform:'uppercase',color:'#993556',fontWeight:700,marginBottom:'8px'}}>Nuovo piano</div>
              <h4 style={{fontSize:'16px',fontWeight:700,margin:'0 0 6px',color:'#1F1F1F'}}>Riprepariamo gratis</h4>
              <p style={{fontSize:'13.5px',color:'#3F2A2A',lineHeight:1.55,margin:0}}>Definiamo insieme un nuovo piano di ripreparazione per la sessione successiva, gratuitamente.</p>
            </div>
            <div className="iter-step" style={{background:'#F8DDE7',borderRadius:'18px',padding:'28px 22px'}}>
              <div className="n" style={{fontFamily:'Poppins,sans-serif',fontSize:'36px',fontWeight:800,color:'#A8366D',lineHeight:1,marginBottom:'10px'}}>04</div>
              <div className="k" style={{fontSize:'11px',letterSpacing:'.16em',textTransform:'uppercase',color:'#A8366D',fontWeight:700,marginBottom:'8px'}}>Nuovo esame</div>
              <h4 style={{fontSize:'16px',fontWeight:700,margin:'0 0 6px',color:'#1F1F1F'}}>Esame successivo</h4>
              <p style={{fontSize:'13.5px',color:'#3F2A2A',lineHeight:1.55,margin:0}}>Lo studente sostiene il nuovo esame nella sessione successiva (estate o autunno, secondo calendario).</p>
            </div>
          </div>
          <div className="molli-band" style={{marginTop:'30px',borderLeftColor:'var(--coral)'}}>
            <h3><span className="tag">Cosa NON copre</span></h3>
            <p>La garanzia copre il <strong>nuovo percorso di preparazione</strong>: tutor, materiali, lezioni 1:1 (nei limiti dei piani). <strong>NON copre</strong> le tasse esterne (esame di idoneità, bollettino statale, contributo sede) che restano a carico dello studente. La garanzia copre la ripreparazione per <strong>un secondo tentativo</strong>. Per casi eccezionali (motivi gravi documentati), il coordinatore valuta uno a uno e propone un percorso dedicato.</p>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Vuoi parlare con un coordinatore?</h2>
              <p>30 minuti, gratis, senza impegno. Capiamo insieme la situazione e ti diciamo se possiamo aiutarti davvero.</p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="#lead">Parla con un coordinatore</a>
              <a className="btn btn-glass btn-lg" href="tel:0684280999">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></svg>
                Chiama 06 84 280 999
              </a>
            </div>
          </div>
        </div>
      </section>

      <LeadSection />
    </>
  )
}
