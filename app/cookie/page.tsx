import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import { IubendaPolicy } from '@/components/legal/IubendaPolicy'
import './cookie.css'

export const metadata = buildMetadata({
  title: `Cookie Policy | ${brand.name}`,
  description: `Cookie Policy di ${brand.name}: cookie tecnici necessari e cookie di statistica Google Analytics previo consenso.`,
  path: '/cookie',
})

export default function Cookie() {
  return (
    <main className="section">
      <div className="wrap">
        <div className="legal">
          <h1>Cookie Policy</h1>
          <IubendaPolicy type="cookie" />
        </div>
      </div>
    </main>
  )
}
