import { buildMetadata } from '@/lib/seo'
import { IubendaPolicy } from '@/components/legal/IubendaPolicy'
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
          <h1>Cookie Policy</h1>
          <div className="card">
            <IubendaPolicy type="cookie" />
          </div>
        </div>
      </div>
    </main>
  )
}
