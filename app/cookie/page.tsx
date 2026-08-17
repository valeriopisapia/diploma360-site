import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import { IubendaPolicy } from '@/components/legal/IubendaPolicy'
import { LegalHtml } from '@/components/legal/LegalHtml'
import './cookie.css'

export const metadata = buildMetadata({
  title: `Cookie Policy | ${brand.name}`,
  description: `Cookie Policy di ${brand.name}: cookie tecnici necessari e cookie di statistica Google Analytics previo consenso.`,
  path: '/cookie',
})

export default function Cookie() {
  const inHouse = brand.id === 'lascuola360'
  return (
    <main className="section">
      <div className="wrap">
        {inHouse ? (
          <LegalHtml doc="cookie" />
        ) : (
          <div className="legal">
            <h1>Cookie Policy</h1>
            <IubendaPolicy type="cookie" />
          </div>
        )}
      </div>
    </main>
  )
}
