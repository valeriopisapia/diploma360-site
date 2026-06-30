import { describe, it, expect, beforeEach, vi } from 'vitest'
import { pushLead, grantConsent } from './analytics'

beforeEach(() => { (window as any).dataLayer = []; (window as any).gtag = (...a: any[]) => (window as any).dataLayer.push(a) })

it('pushes a lead_submit event', () => {
  pushLead({ origine: 'vetrina', pagina: '/prezzi' })
  expect((window as any).dataLayer).toContainEqual({ event: 'lead_submit', origine: 'vetrina', pagina: '/prezzi' })
})
it('grants all consent signals', () => {
  grantConsent()
  expect((window as any).dataLayer).toContainEqual(['consent','update',{ ad_storage:'granted', analytics_storage:'granted', ad_user_data:'granted', ad_personalization:'granted' }])
})
