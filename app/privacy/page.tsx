import { buildMetadata } from '@/lib/seo'
import { IubendaPolicy } from '@/components/legal/IubendaPolicy'
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
          <h1>Privacy Policy</h1>
          <div className="card">
            <IubendaPolicy type="privacy" />
          </div>
        </div>
      </div>
    </main>
  )
}
