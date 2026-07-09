import { brand } from '@/lib/brand'
import { getAttribution } from '@/lib/attribution'

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

export interface UserData {
  email?: string
  phone_number?: string
  name?: string
}

export function pushLead(p: {
  origine: string
  pagina: string
  user_data?: UserData
}): void {
  if (typeof window === 'undefined') return
  const cleaned = p.user_data
    ? Object.fromEntries(Object.entries(p.user_data).filter(([, v]) => v))
    : {}
  window.dataLayer.push({
    event: 'lead_submit',
    origine: p.origine,
    pagina: p.pagina,
    brand: brand.id,
    ...getAttribution(),
    ...(Object.keys(cleaned).length ? { user_data: cleaned } : {}),
  })
}
