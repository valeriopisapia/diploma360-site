import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import { IubendaPolicy } from '@/components/legal/IubendaPolicy'
import './termini.css'

export const metadata = buildMetadata({
  title: `Termini di servizio | ${brand.name}`,
  description: `Termini di servizio del sito ${brand.name} (Classme S.r.l.).`,
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
