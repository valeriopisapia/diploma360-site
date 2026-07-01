import { buildMetadata } from '@/lib/seo'
import './not-found.css'

export const metadata = buildMetadata({
  title: 'Pagina non trovata | Diploma360',
  description: 'La pagina che cerchi non esiste o è stata spostata.',
  path: '/404',
  noindex: true,
})

export default function NotFound() {
  return (
    <main className="section">
      <div className="wrap">
        <div className="legal" style={{ textAlign: 'center', padding: '40px 0' }}>
          <h1
            style={{
              fontSize: '64px',
              background: 'var(--grad)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            404
          </h1>
          <h2 style={{ fontSize: '24px' }}>Pagina non trovata</h2>
          <p style={{ margin: '10px 0 24px' }}>
            La pagina che cerchi non esiste o è stata spostata.
          </p>
          <div
            style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <a className="btn btn-primary btn-lg" href="/">
              Torna alla home
            </a>
            <a className="btn btn-out btn-lg" href="tel:0684280999">
              Chiama ora
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
