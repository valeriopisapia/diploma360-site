import { buildMetadata } from '@/lib/seo'
import './cookie.css'

export const metadata = buildMetadata({
  title: 'Cookie Policy | Diploma360',
  description:
    'Cookie Policy di Diploma360: cookie tecnici necessari e cookie di statistica Google Analytics previo consenso.',
  path: '/cookie',
})

export default function Cookie() {
  return (
    <main className="section">
      <div className="wrap">
        <div className="legal">
          <div className="draft">
            Bozza tecnica — il testo legale va validato da un consulente prima
            della pubblicazione.
          </div>
          <h1>Cookie Policy</h1>
          <p className="upd">Ultimo aggiornamento: maggio 2026</p>
          <div className="card">
            <h2>Cosa sono i cookie</h2>
            <p>
              I cookie sono piccoli file salvati sul tuo dispositivo che
              permettono al sito di funzionare e, con il tuo consenso, di
              raccogliere statistiche d&apos;uso.
            </p>
            <h2>Cookie tecnici necessari</h2>
            <p>
              Sempre attivi: servono al funzionamento del sito e a ricordare le
              tue preferenze sui cookie. Non richiedono consenso.
            </p>
            <h2>Cookie di statistica</h2>
            <p>
              Utilizziamo Google Analytics 4 per capire come viene usato il
              sito, <strong>solo se acconsenti</strong>. I dati sono trattati in
              forma aggregata con IP anonimizzato.
            </p>
            <h2>Gestire il consenso</h2>
            <p>
              Alla prima visita puoi scegliere &laquo;Solo necessari&raquo; o
              &laquo;Accetta tutti&raquo;. Puoi revocare il consenso in ogni
              momento cancellando i cookie dal browser; al ripristino ti verrà
              richiesto di nuovo.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
