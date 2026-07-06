import { buildMetadata } from '@/lib/seo'
import { brand } from '@/lib/brand'
import { IubendaPolicy } from '@/components/legal/IubendaPolicy'
import './privacy.css'

export const metadata = buildMetadata({
  title: `Privacy Policy | ${brand.name}`,
  description: `Informativa privacy di ${brand.name} (Classme S.r.l.): quali dati raccogliamo, perché e i tuoi diritti GDPR.`,
  path: '/privacy',
})

export default function Privacy() {
  return (
    <main className="section">
      <div className="wrap">
        <div className="legal">
          <h1>Privacy Policy</h1>
          <IubendaPolicy type="privacy" />
        </div>
      </div>
    </main>
  )
}
