import { buildMetadata } from '@/lib/seo'
import './termini.css'

export const metadata = buildMetadata({
  title: 'Termini di servizio | Diploma360',
  description: 'Termini di servizio del sito Diploma360 (Classme S.r.l.).',
  path: '/termini',
})

export default function Termini() {
  return (
    <main className="section">
      <div className="wrap">
        <div className="legal">
          <div className="draft">
            Bozza tecnica — il testo legale va validato da un consulente prima
            della pubblicazione.
          </div>
          <h1>Termini di servizio</h1>
          <p className="upd">Ultimo aggiornamento: maggio 2026</p>
          <div className="card">
            <h2>Oggetto</h2>
            <p>
              Questo sito ha finalità informativa sui percorsi di preparazione
              offerti da Diploma360 (Classme S.r.l.).
            </p>
            <h2>Come funziona il diploma</h2>
            <p>
              <strong>Diploma360 prepara, non rilascia il diploma.</strong> Il
              Diploma è di Stato e si consegue sostenendo l&apos;esame presso una
              sede convenzionata paritaria. Diploma360 ti accompagna nella
              preparazione e nelle istruzioni amministrative.
            </p>
            <h2>Prezzi e pagamenti</h2>
            <p>
              I prezzi indicati nella pagina <a href="/prezzi">Prezzi</a> sono
              comprensivi di quanto specificato per ciascun piano. È disponibile
              il pagamento in 24 rate mensili. Eventuali tasse esterne
              (idoneità, esame di Stato, contributo sede) sono indicate
              separatamente.
            </p>
            <h2>Proprietà intellettuale</h2>
            <p>
              Marchi, testi, immagini e materiali del sito sono di proprietà dei
              rispettivi titolari e non possono essere riprodotti senza
              autorizzazione.
            </p>
            <h2>Legge applicabile</h2>
            <p>
              I presenti termini sono regolati dalla legge italiana. Per ogni
              controversia è competente il Foro di Roma.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
