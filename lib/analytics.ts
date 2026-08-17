import { brand } from '@/lib/brand'
import { getAttribution } from '@/lib/attribution'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

/**
 * Applies a consent choice to Consent Mode v2. Mirrors the co-founder's snippet mapping
 * exactly: `statistics` drives `analytics_storage`; `marketing` drives the three ad signals
 * (`ad_storage`, `ad_user_data`, `ad_personalization`) together. Called both from the
 * banner's own click handlers and — every page load, for returning visitors — from the
 * inline script rendered by ConsentFromStorage.
 *
 * That inline script (components/gtm/ConsentFromStorage.tsx) duplicates this exact
 * category -> keys map as a dependency-free string — it cannot import this function, it has
 * to stay inlineable. The two are kept from drifting apart by an anti-divergence test
 * (components/gtm/ConsentFromStorage.test.tsx) that runs both for the same input and
 * compares the resulting gtag calls: edit one map without the other and that test goes red.
 */
export function applyConsent(statistics: boolean, marketing: boolean): void {
  if (typeof window === 'undefined') return
  window.gtag('consent', 'update', {
    analytics_storage: statistics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
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
