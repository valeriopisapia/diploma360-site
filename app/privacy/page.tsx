import { buildMetadata } from '@/lib/seo'
import './privacy.css'

export const metadata = buildMetadata({
  title: 'Privacy Policy | Diploma360',
  description:
    'Informativa privacy di Diploma360 (Classme S.r.l.): quali dati raccogliamo, perché e i tuoi diritti GDPR.',
  path: '/privacy',
})

export default function Privacy() {
  return (
    <main className="section">
      <div className="wrap">
        <div className="legal">
          <div className="draft">
            Bozza tecnica — il testo legale va validato da un consulente prima
            della pubblicazione.
          </div>
          <h1>Privacy Policy</h1>
          <p className="upd">Ultimo aggiornamento: maggio 2026</p>
          <div className="card">
            <h2>Titolare del trattamento</h2>
            <p>
              Classme S.r.l., con sede in Viale Castrense 5, 00182 Roma, P.IVA
              IT15441141007. Per qualsiasi richiesta:{' '}
              <a href="mailto:info@diploma360.it">info@diploma360.it</a>.
            </p>
            <h2>Quali dati raccogliamo</h2>
            <ul>
              <li>
                <strong>Dati che ci fornisci</strong> tramite il modulo di
                contatto: nome, telefono, email ed eventuale messaggio.
              </li>
              <li>
                <strong>Dati di navigazione</strong> raccolti, previo tuo
                consenso, tramite cookie di statistica (vedi{' '}
                <a href="/cookie">Cookie Policy</a>).
              </li>
            </ul>
            <h2>Perché trattiamo i tuoi dati</h2>
            <ul>
              <li>
                Rispondere alle tue richieste e fornirti informazioni sui
                percorsi di studio.
              </li>
              <li>
                Con il tuo consenso, analizzare in forma aggregata l&apos;uso del
                sito per migliorarlo.
              </li>
            </ul>
            <h2>Base giuridica</h2>
            <p>
              Consenso dell&apos;interessato e misure precontrattuali adottate su tua
              richiesta.
            </p>
            <h2>Conservazione</h2>
            <p>
              Conserviamo i dati per il tempo necessario a gestire la tua
              richiesta e, ove previsto, per gli obblighi di legge.
            </p>
            <h2>I tuoi diritti</h2>
            <p>
              Puoi richiedere accesso, rettifica, cancellazione, limitazione e
              opposizione al trattamento, oltre alla portabilità dei dati,
              scrivendo a{' '}
              <a href="mailto:info@diploma360.it">info@diploma360.it</a>. Hai
              inoltre diritto di reclamo al Garante per la protezione dei dati
              personali.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
