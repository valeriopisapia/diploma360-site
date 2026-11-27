// @vitest-environment node
import { it, expect, beforeEach } from 'vitest'
import { checkRateLimit, clientIp, isValidPhone, resetRateLimit, validateLead } from './leadGuard'

beforeEach(() => {
  delete process.env.LEAD_RATE_LIMIT_MAX
  resetRateLimit()
})

it('phone check is a superset of the client rule ^\\+?\\d{6,15}$', () => {
  for (const ok of ['123456', '+123456', '123456789012345', '+39 333 123 4567', '(06) 8428-0999', '06.8428.0999']) {
    expect(isValidPhone(ok), ok).toBe(true)
  }
  for (const bad of ['12345', '1234567890123456', 'abc1234567', '++3331234567', '']) {
    expect(isValidPhone(bad), bad).toBe(false)
  }
})

it('validateLead trims, keeps optional fields optional and defaults prodotto', () => {
  const r = validateLead({ email: ' a@b.it ', telefono: '3331234567' })
  expect(r).toEqual({
    ok: true,
    lead: expect.objectContaining({ email: 'a@b.it', telefono: '3331234567', prodotto: 'Diploma', nome: undefined }),
  })
})

it('validateLead treats null optional fields as absent', () => {
  expect(validateLead({ email: 'a@b.it', telefono: '3331234567', nome: null, per_chi: null }).ok).toBe(true)
})

it('validateLead rejects over-long identity fields', () => {
  expect(validateLead({ email: 'a@b.it', telefono: '3331234567', nome: 'x'.repeat(201) }).ok).toBe(false)
  expect(validateLead({ email: `${'x'.repeat(250)}@b.it`, telefono: '3331234567' }).ok).toBe(false)
})

it('rate limit resets after the window', () => {
  process.env.LEAD_RATE_LIMIT_MAX = '1'
  const t0 = 1_000_000
  expect(checkRateLimit('1.2.3.4', t0)).toBe(true)
  expect(checkRateLimit('1.2.3.4', t0 + 1000)).toBe(false)
  expect(checkRateLimit('1.2.3.4', t0 + 11 * 60 * 1000)).toBe(true)
})

it('rate limit is skipped for unknown IPs and when disabled (0)', () => {
  process.env.LEAD_RATE_LIMIT_MAX = '0'
  for (let i = 0; i < 50; i++) expect(checkRateLimit('1.2.3.4')).toBe(true)
  delete process.env.LEAD_RATE_LIMIT_MAX
  for (let i = 0; i < 50; i++) expect(checkRateLimit(null)).toBe(true)
})

it('clientIp takes the left-most X-Forwarded-For entry', () => {
  const req = new Request('http://x/', { headers: { 'x-forwarded-for': '203.0.113.7, 10.0.0.1' } })
  expect(clientIp(req)).toBe('203.0.113.7')
  expect(clientIp(new Request('http://x/'))).toBeNull()
})
