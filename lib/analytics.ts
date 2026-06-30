declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

export function grantConsent(): void {
  if (typeof window === 'undefined') return
  window.gtag('consent', 'update', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  })
}

export function pushLead(p: { origine: string; pagina: string }): void {
  if (typeof window === 'undefined') return
  window.dataLayer.push({ event: 'lead_submit', ...p })
}
