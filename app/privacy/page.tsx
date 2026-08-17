import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import { IubendaPolicy } from '@/components/legal/IubendaPolicy'
import { LegalHtml } from '@/components/legal/LegalHtml'
import './privacy.css'

export const metadata = buildMetadata({
  title: `Privacy Policy | ${brand.name}`,
  description: `Informativa privacy di ${brand.name} (Classme S.r.l.): quali dati raccogliamo, perché e i tuoi diritti GDPR.`,
  path: '/privacy',
})

export default function Privacy() {
  const inHouse = brand.id === 'lascuola360'
  return (
    <main className="section">
      <div className="wrap">
        {inHouse ? (
          <LegalHtml doc="privacy" />
        ) : (
          <div className="legal">
            <h1>Privacy Policy</h1>
            <IubendaPolicy type="privacy" />
          </div>
        )}
      </div>
    </main>
  )
}
