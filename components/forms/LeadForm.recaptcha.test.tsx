import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, beforeEach, it, expect } from 'vitest'
import { LeadForm } from './LeadForm'

vi.mock('@/lib/analytics', () => ({ pushLead: vi.fn() }))
vi.mock('@/lib/attribution', () => ({ getAttribution: vi.fn(() => ({})) }))
const { pushMock, rc } = vi.hoisted(() => ({
  pushMock: vi.fn(),
  rc: {
    enabled: false,
    loadRecaptcha: vi.fn(async () => {}),
    getRecaptchaToken: vi.fn(async (): Promise<string | undefined> => 'tok-123'),
  },
}))
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }))
vi.mock('@/lib/recaptchaClient', () => ({
  isRecaptchaEnabled: () => rc.enabled,
  loadRecaptcha: rc.loadRecaptcha,
  getRecaptchaToken: rc.getRecaptchaToken,
}))

beforeEach(() => {
  vi.clearAllMocks()
  rc.enabled = false
  rc.getRecaptchaToken.mockResolvedValue('tok-123')
  vi.stubGlobal('fetch', vi.fn(async () => new Response('{"ok":true}', { status: 200 })))
})

function fillAndSubmit() {
  fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Ada' } })
  fireEvent.change(screen.getByLabelText(/telefono/i), { target: { value: '3331234567' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.it' } })
  fireEvent.click(screen.getByLabelText(/privacy|consenso|acconsento/i))
  fireEvent.submit(screen.getByRole('button', { name: /invia/i }).closest('form')!)
}
const sentPayload = () => JSON.parse((vi.mocked(fetch).mock.calls[0][1] as RequestInit).body as string)

it('disabled: no script load on interaction, no token, no notice (unchanged behaviour)', async () => {
  const { container } = render(<LeadForm origine="vetrina" />)
  fireEvent.focus(screen.getByLabelText(/nome/i))
  expect(container.textContent).not.toContain('reCAPTCHA')
  expect(container.querySelector('style')).toBeNull()
  fillAndSubmit()
  await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/grazie'))
  expect(rc.loadRecaptcha).not.toHaveBeenCalled()
  expect(rc.getRecaptchaToken).not.toHaveBeenCalled()
  expect(sentPayload()).not.toHaveProperty('recaptcha_token')
})

it('enabled: nothing loads on render; first focus loads the script', () => {
  rc.enabled = true
  render(<LeadForm origine="vetrina" />)
  expect(rc.loadRecaptcha).not.toHaveBeenCalled()
  fireEvent.focus(screen.getByLabelText(/email/i))
  expect(rc.loadRecaptcha).toHaveBeenCalled()
})

it('enabled: sends the lead_submit token and shows the Google notice', async () => {
  rc.enabled = true
  const { container } = render(<LeadForm origine="vetrina" />)
  expect(container.textContent).toContain('protetto da reCAPTCHA')
  fillAndSubmit()
  await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/grazie'))
  expect(rc.getRecaptchaToken).toHaveBeenCalledWith('lead_submit')
  expect(sentPayload().recaptcha_token).toBe('tok-123')
})

it('enabled but no token (blocked/failed): still submits, without the field', async () => {
  rc.enabled = true
  rc.getRecaptchaToken.mockResolvedValue(undefined)
  render(<LeadForm origine="vetrina" />)
  fillAndSubmit()
  await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/grazie'))
  expect(sentPayload()).not.toHaveProperty('recaptcha_token')
})
