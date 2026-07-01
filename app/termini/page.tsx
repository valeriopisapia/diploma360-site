import { buildMetadata } from '@/lib/seo'
import { IubendaPolicy } from '@/components/legal/IubendaPolicy'
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
          <h1>Termini e Condizioni</h1>
          <IubendaPolicy type="termini" />
        </div>
      </div>
    </main>
  )
}
