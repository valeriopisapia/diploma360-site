import Image from 'next/image'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildMetadata } from '@/lib/seo'
import { LeadSection } from '@/components/forms/LeadSection'
import { brand } from '@/lib/brand'
import './sedi-esame.css'

export const metadata = buildMetadata({
  title: `Sedi d'esame in tutta Italia — ${brand.name}`,
  description:
    "Studi online, l'esame lo fai vicino a te. Sedi convenzionate in tutta Italia: Milano, Roma, Napoli, Torino e molte altre province.",
  path: '/sedi-esame',
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

const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
  </svg>
)

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

function SedeCard({ city, href }: { city: string; href: string }) {
  return (
    <Link className="sede-card" href={href}>
      <span className="city"><PinIcon />{city}</span>
      <span className="meta">Istituto statale / paritario convenzionato</span>
      <span className="go">Verifica la sede <ArrowIcon /></span>
    </Link>
  )
}

export default function SediEsame() {
  return (
    <>
      <JsonLd data={jsonLdData} />

      <section className="nhero">
        <div className="wrap">
          <div>
            <span className="eyebrow">Sedi d&apos;esame</span>
            <h1>Studi da casa. <span className="grad-text">L&apos;esame lo fai vicino a te.</span></h1>
            <p className="lead">Con {brand.name} prepari il diploma online, in totale flessibilità. Ti sposti una sola volta: per sostenere l&apos;esame, in una scuola statale o paritaria convenzionata nella provincia più vicina a te. Alla burocrazia della candidatura pensiamo noi.</p>
            <div className="ph-cta">
              <a className="btn btn-primary btn-lg" href="#lead">Scopri il tuo percorso</a>
              <a className="btn btn-out btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">Chiedi su WhatsApp</a>
            </div>
          </div>
          <div className="nhero-vis">
            <Image src="/assets-vetrina/studio.jpg" alt="Studente che prepara il diploma online da casa" fill style={{objectFit:'cover',objectPosition:'center 30%'}} />
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
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 12-9 12s-9-5-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Sedi in tutta Italia
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            97% promossi all&apos;esame*
          </span>
          <span className="tb-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            +3.000 tutor
          </span>
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Come funziona</span>
            <h2 className="sec-h2">Dall&apos;iscrizione all&apos;esame, <span className="grad-text">senza pensieri</span>.</h2>
            <p className="sec-lead">Tutto online, tranne il giorno dell&apos;esame. Ecco i quattro passaggi.</p>
          </div>
          <div className="step-row">
            <div className="step-c">
              <div className="sn">01</div>
              <h4>Studi online</h4>
              <p>Materiali, video, tutor per materia e piano di studio: tutto da casa, sui tuoi orari.</p>
            </div>
            <div className="step-c">
              <div className="sn">02</div>
              <h4>Ti candidiamo noi</h4>
              <p>La nostra segreteria gestisce la domanda d&apos;esame e le pratiche presso la sede, nei tempi previsti dalla normativa.</p>
            </div>
            <div className="step-c">
              <div className="sn">03</div>
              <h4>Esame in sede</h4>
              <p>Sostieni l&apos;esame in presenza in una scuola convenzionata vicino a te, davanti alla commissione ufficiale.</p>
            </div>
            <div className="step-c">
              <div className="sn">04</div>
              <h4>Diploma di Stato</h4>
              <p>Superato l&apos;esame ottieni un Diploma di Stato, con lo stesso valore legale di una scuola in presenza.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section asec alt">
        <div className="wrap">
          <div className="mapwrap">
            <div className="map-ph">
              <svg viewBox="0 0 380 454" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{width:'100%',height:'auto',maxHeight:'340px'}}>
                <path d="M121.8,15.3 L140.9,21.3 L144.5,13.3 L175.5,6.0 L182.5,20.7 L227.4,31.5 L224.0,52.3 L231.5,70.2 L206.5,64.1 L181.0,79.0 L182.7,99.9 L178.9,111.9 L189.2,133.4 L218.6,154.6 L234.4,189.4 L269.3,223.4 L293.9,223.1 L301.5,232.4 L292.7,240.8 L320.8,256.1 L343.8,268.8 L370.8,290.8 L374.0,298.6 L368.1,313.7 L350.7,294.1 L323.5,287.1 L310.3,314.4 L332.9,330.0 L329.2,352.0 L316.1,354.5 L299.4,390.6 L286.3,393.8 L286.4,381.0 L292.8,358.4 L299.6,349.4 L287.4,325.0 L277.8,303.7 L264.8,298.5 L255.5,280.3 L235.4,272.6 L221.8,255.7 L198.6,253.0 L174.1,233.9 L145.4,206.5 L124.0,182.3 L114.2,140.6 L98.6,135.7 L73.1,121.8 L58.7,127.5 L40.5,147.1 L27.5,150.1 L31.1,131.9 L14.1,126.5 L6.0,93.9 L16.9,81.1 L7.6,65.3 L8.9,53.4 L22.4,62.4 L37.6,60.4 L55.1,46.1 L60.6,52.8 L75.5,51.4 L82.3,34.4 L105.5,39.7 L119.4,32.6 L121.8,15.3 Z" fill="#FCE6DE" stroke="#2A2540" strokeWidth="1.4" strokeLinejoin="round"/>
                <path d="M257.3,383.9 L281.1,380.3 L269.8,413.4 L274.5,426.5 L268.0,448.1 L244.0,432.3 L228.0,427.7 L184.2,406.3 L188.6,384.7 L225.3,388.5 L257.3,383.9 Z" fill="#FCE6DE" stroke="#2A2540" strokeWidth="1.4" strokeLinejoin="round"/>
                <path d="M67.5,267.8 L83.2,254.8 L102.0,284.7 L97.6,340.4 L83.3,337.7 L70.5,351.8 L58.7,340.6 L57.4,289.8 L50.2,265.7 L67.5,267.8 Z" fill="#FCE6DE" stroke="#2A2540" strokeWidth="1.4" strokeLinejoin="round"/>
                <circle cx="82.5" cy="75.7" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Milano</title></circle>
                <circle cx="35.5" cy="92.2" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Torino</title></circle>
                <circle cx="97.6" cy="65.6" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Bergamo</title></circle>
                <circle cx="139.0" cy="76.6" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Verona</title></circle>
                <circle cx="150.0" cy="116.6" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Bologna</title></circle>
                <circle cx="186.4" cy="225.7" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Roma</title></circle>
                <circle cx="147.2" cy="146.9" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Firenze</title></circle>
                <circle cx="182.9" cy="174.7" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Perugia</title></circle>
                <circle cx="218.4" cy="153.3" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Ancona</title></circle>
                <circle cx="241.9" cy="269.9" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Napoli</title></circle>
                <circle cx="258.2" cy="277.1" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Salerno</title></circle>
                <circle cx="323.5" cy="258.1" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Bari</title></circle>
                <circle cx="267.6" cy="411.1" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Catania</title></circle>
                <circle cx="213.4" cy="385.0" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Palermo</title></circle>
                <circle cx="80.0" cy="338.6" r="3.4" fill="#C7674E" stroke="#fff" strokeWidth="1.2"><title>Cagliari</title></circle>
              </svg>
            </div>
            <div>
              <span className="eyebrow">Una rete nazionale</span>
              <h2 className="sec-h2">Sedi convenzionate <span className="grad-text">in tutta Italia</span>.</h2>
              <p className="sec-lead" style={{marginBottom:'18px'}}>Collaboriamo con istituti statali e paritari da Nord a Sud, isole comprese. Così non devi affrontare l&apos;esame a centinaia di chilometri da casa: troviamo la soluzione più comoda per te.</p>
              <div className="feat-strip" style={{justifyContent:'flex-start'}}>
                <span className="feat-chip"><CheckIcon />Esame in presenza vicino a te</span>
                <span className="feat-chip"><CheckIcon />Istituti statali e paritari</span>
                <span className="feat-chip"><CheckIcon />Pratiche gestite da noi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section asec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Dove puoi sostenere l&apos;esame</span>
            <h2 className="sec-h2">Trova la zona <span className="grad-text">più vicina a te</span>.</h2>
            <p className="sec-lead">Alcune delle province in cui i nostri studenti sostengono più spesso gli esami. La rete è in continua crescita: in consulenza verifichiamo la sede esatta per il tuo caso.</p>
          </div>

          <div className="area-h">Nord</div>
          <div className="sede-grid">
            <SedeCard city="Milano" href="/recupero-anni-scolastici-milano" />
            <SedeCard city="Torino" href="/recupero-anni-scolastici-torino" />
            <SedeCard city="Bergamo" href="/recupero-anni-scolastici-bergamo" />
            <SedeCard city="Verona" href="/recupero-anni-scolastici-verona" />
            <SedeCard city="Bologna" href="/recupero-anni-scolastici-bologna" />
            <SedeCard city="Genova" href="/recupero-anni-scolastici-genova" />
            <SedeCard city="Padova" href="/recupero-anni-scolastici-padova" />
            <Link className="sede-card" href="#lead">
              <span className="city"><PinIcon />Brescia</span>
              <span className="meta">Istituto statale / paritario convenzionato</span>
              <span className="go">Verifica la sede <ArrowIcon /></span>
            </Link>
          </div>

          <div className="area-h">Centro</div>
          <div className="sede-grid">
            <SedeCard city="Roma" href="/recupero-anni-scolastici-roma" />
            <SedeCard city="Firenze" href="/recupero-anni-scolastici-firenze" />
            <SedeCard city="Perugia" href="/recupero-anni-scolastici-perugia" />
            <SedeCard city="Ancona" href="/recupero-anni-scolastici-ancona" />
            <SedeCard city="Latina" href="/recupero-anni-scolastici-latina" />
            <SedeCard city="Pescara" href="/recupero-anni-scolastici-pescara" />
          </div>

          <div className="area-h">Sud e Isole</div>
          <div className="sede-grid">
            <SedeCard city="Napoli" href="/recupero-anni-scolastici-napoli" />
            <SedeCard city="Salerno" href="/recupero-anni-scolastici-salerno" />
            <SedeCard city="Bari" href="/recupero-anni-scolastici-bari" />
            <SedeCard city="Catania" href="/recupero-anni-scolastici-catania" />
            <SedeCard city="Palermo" href="/recupero-anni-scolastici-palermo" />
            <SedeCard city="Cagliari" href="/recupero-anni-scolastici-cagliari" />
          </div>

          <div className="callout">
            <span className="tag">Non vedi la tua città?</span>
            <p>La rete delle sedi è in continuo aggiornamento. <em>In consulenza gratuita troviamo l&apos;istituto convenzionato più vicino a te</em> — ovunque tu sia, anche all&apos;estero.</p>
          </div>
        </div>
      </section>

      <section className="section asec alt">
        <div className="wrap">
          <div className="sec-head center">
            <span className="eyebrow">Le domande più comuni</span>
            <h2 className="sec-h2">Tre cose da sapere sulle sedi</h2>
          </div>
          <div className="grid-3">
            <div className="sit">
              <h3>Mi sposto solo per l&apos;esame?</h3>
              <p>Sì. Tutta la preparazione è online: ti sposti solo il giorno dell&apos;esame, nella sede convenzionata indicata.</p>
            </div>
            <div className="sit">
              <h3>Chi presenta la domanda?</h3>
              <p>La nostra segreteria studenti gestisce candidatura e pratiche presso la scuola, nei tempi previsti dalla normativa.</p>
            </div>
            <div className="sit">
              <h3>L&apos;esame è come quello della statale?</h3>
              <p>Sì: stessa commissione, stessi programmi ministeriali. Cambia solo come ti sei preparato — con noi, online.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="cta-band">
            <div className="cta-band-txt">
              <h2>Vuoi sapere qual è la sede più vicina a te?</h2>
              <p>In consulenza gratuita verifichiamo la tua situazione e ti diciamo dove potrai sostenere l&apos;esame, in chiaro e senza impegno.</p>
            </div>
            <div className="cta-band-btns">
              <a className="btn btn-white btn-lg" href="#lead">Scopri il tuo percorso</a>
              <a className="btn btn-glass btn-lg" href="https://wa.me/393517214644" target="_blank" rel="noopener">Scrivici su WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <LeadSection />
    </>
  )
}
