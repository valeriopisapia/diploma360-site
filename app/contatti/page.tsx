import Image from 'next/image'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import './contatti.css'

export const metadata = buildMetadata({
  title: `Contatti | ${brand.name}`,
  description:
    'Parla con la coordinatrice del percorso: telefono, WhatsApp ed email per scoprire gratis il tuo percorso verso il diploma.',
  path: '/contatti',
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

export default function Contatti() {
  return (
    <>
      <JsonLd data={orgJsonLd} />

      {/* Hero */}
      <section className="ahero">
        <div className="wrap chero-grid">
          <div className="chero-copy">
            <span className="eyebrow-b">Contatti</span>
            <h1>Parla con una <span className="hl">coordinatrice del percorso</span>.</h1>
            <p className="lead">
              Tre modi per metterti in contatto con noi. La prima consulenza con una coordinatrice del percorso è sempre{' '}
              <strong>gratuita e senza impegno</strong>: in 30 minuti capiamo la tua situazione e ti proponiamo un percorso su misura.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary btn-lg" href="/#lead">Scopri il tuo percorso</a>
              <a className="btn btn-out btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">WhatsApp</a>
            </div>
          </div>
          <div className="chero-photo">
            <Image
              src="/assets-vetrina/coordinatrice.jpg"
              alt={`Marcella M., coordinatrice del percorso ${brand.name}`}
              fill
              style={{ objectFit: 'cover', objectPosition: 'center top' }}
            />
            <span className="tag">La tua coordinatrice</span>
            <div className="info">
              <h4>Una delle nostre coordinatrici</h4>
              <h3>Marcella M.</h3>
              <div className="rolex">Coordinatrice del percorso &middot; 12 anni di esperienza</div>
              <p>&laquo;Quando mi chiami, ascolto la tua situazione e ti dico in chiaro se possiamo aiutarti, quanto tempo serve e quanto costa. Senza fretta e senza impegno.&raquo;</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
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

      {/* 3 canali di contatto */}
      <section className="section asec">
        <div className="wrap">
          <div className="ahd">
            <span className="eb">Contattaci</span>
            <h2>3 canali, <span className="hl">rispondiamo entro 24h</span>.</h2>
            <p>Scegli il canale che preferisci: ti rispondiamo nello stesso giorno (entro 24h lavorative).</p>
          </div>
          <div className="contact-grid">
            <div className="contact-card">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <h3>Telefono</h3>
              <a className="val" href="tel:0684280999">06 84 280 999</a>
              <p className="sub">Lun-Ven 9:00 - 19:00<br />Sab 9:00 - 13:00</p>
              <a className="btn-go" href="tel:0684280999">Chiama ora</a>
            </div>
            <div className="contact-card wa">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.5 14.4c-.3-.2-1.8-.9-2-1-.3-.1-.5-.2-.7.1s-.8 1-.9 1.2c-.2.2-.3.2-.6.1-1.8-.9-3-1.6-4.2-3.6-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.6s-.7-1.6-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z" />
                  <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
                </svg>
              </span>
              <h3>WhatsApp</h3>
              <a className="val" href="https://wa.me/393517214644" target="_blank" rel="noopener">351 721 4644</a>
              <p className="sub">Tutti i giorni 9:00 - 21:00<br />Risposta in pochi minuti</p>
              <a className="btn-go" href="https://wa.me/393517214644" target="_blank" rel="noopener">Scrivici su WhatsApp</a>
            </div>
            <div className="contact-card em">
              <span className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22 6 12 13 2 6" />
                </svg>
              </span>
              <h3>Email</h3>
              <a className="val" href="mailto:info@diploma360.it">info@diploma360.it</a>
              <p className="sub">Risposta entro 24h<br />Per richieste articolate</p>
              <a className="btn-go" href="mailto:info@diploma360.it">Scrivici una mail</a>
            </div>
          </div>
          <div className="legal-info">
            <div className="item"><h4>Sede legale</h4><p>Classme S.r.l. &middot; Viale Castrense 5, 00182 Roma</p></div>
            <div className="item"><h4>P.IVA &amp; informazioni fiscali</h4><p>P.IVA 15441141007 &middot; C.F. 15441141007</p></div>
            <div className="item"><h4>Sito web</h4><p>{brand.domain.replace('https://', '')} &middot; Powered by LaScuola360</p></div>
            <div className="item"><h4>Lavora con noi</h4><p>Vuoi candidarti come tutor? Scrivici a info@diploma360.it con CV.</p></div>
          </div>
        </div>
      </section>

      {/* Consulenza gratuita / form link */}
      <section className="section asec alt">
        <div className="wrap">
          <div className="ahd center">
            <span className="eb">Consulenza gratuita</span>
            <h2>O lascia <span className="hl">qui i tuoi dati</span>.</h2>
            <p>Compila il form sulla Home: ti ricontattiamo entro 24h con una proposta di percorso. Gratis e senza impegno.</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a className="btn btn-primary btn-lg" href="/#lead">Vai al form di richiesta</a>
          </div>
        </div>
      </section>
    </>
  )
}
