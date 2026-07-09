import { it, expect, beforeEach, vi } from 'vitest'

vi.mock('./attribution', () => ({ getAttribution: vi.fn(() => ({})) }))
import { getAttribution } from './attribution'
import { pushLead, grantConsent } from './analytics'

beforeEach(() => {
  (window as any).dataLayer = []
  ;(window as any).gtag = (...a: any[]) => (window as any).dataLayer.push(a)
  vi.mocked(getAttribution).mockReturnValue({})
})

it('pushes a lead_submit event with brand', () => {
  pushLead({ origine: 'vetrina', pagina: '/prezzi' })
  expect((window as any).dataLayer).toContainEqual({
    event: 'lead_submit', origine: 'vetrina', pagina: '/prezzi', brand: 'diploma360',
  })
})

it('merges attribution and user_data, dropping empty user_data keys', () => {
  vi.mocked(getAttribution).mockReturnValue({ gclid: 'X1' })
  pushLead({
    origine: 'landing-ads', pagina: '/lp',
    user_data: { email: 'a@b.it', phone_number: '', name: 'Ada' },
  })
  expect((window as any).dataLayer).toContainEqual({
    event: 'lead_submit', origine: 'landing-ads', pagina: '/lp', brand: 'diploma360',
    gclid: 'X1', user_data: { email: 'a@b.it', name: 'Ada' },
  })
})

it('omits user_data entirely when all keys are empty', () => {
  pushLead({ origine: 'vetrina', pagina: '/', user_data: { email: '', phone_number: '' } })
  const pushed = (window as any).dataLayer.at(-1)
  expect(pushed).not.toHaveProperty('user_data')
})

it('grants all consent signals', () => {
  grantConsent()
  expect((window as any).dataLayer).toContainEqual(['consent','update',{ ad_storage:'granted', analytics_storage:'granted', ad_user_data:'granted', ad_personalization:'granted' }])
})
