import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, beforeEach, it, expect } from 'vitest'
import { LeadForm } from './LeadForm'

vi.mock('@/lib/analytics', () => ({ pushLead: vi.fn() }))
import { pushLead } from '@/lib/analytics'

vi.mock('@/lib/attribution', () => ({ getAttribution: vi.fn(() => ({})) }))
import { getAttribution } from '@/lib/attribution'

const { pushMock } = vi.hoisted(() => ({ pushMock: vi.fn() }))
vi.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }))

beforeEach(() => {
  vi.clearAllMocks()
  vi.mocked(getAttribution).mockReturnValue({})
  vi.stubGlobal('fetch', vi.fn(async () => new Response('{"ok":true}', { status: 200 })))
})

it('submits, fires lead_submit and redirects to the thank-you route', async () => {
  render(<LeadForm origine="vetrina" />)
  fireEvent.change(screen.getByLabelText(/telefono/i), { target: { value: '3331234567' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.it' } })
  fireEvent.click(screen.getByLabelText(/privacy|consenso|acconsento/i))
  fireEvent.submit(screen.getByRole('button', { name: /invia|richiedi/i }).closest('form')!)
  await waitFor(() => expect(pushLead).toHaveBeenCalledWith(expect.objectContaining({ origine: 'vetrina', pagina: '/' })))
  expect(pushMock).toHaveBeenCalledWith('/grazie')
})

it('landing-ads form redirects to /lp-thank-you-page', async () => {
  render(<LeadForm origine="landing-ads" />)
  fireEvent.change(screen.getByLabelText(/telefono/i), { target: { value: '3331234567' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.it' } })
  fireEvent.click(screen.getByLabelText(/privacy|consenso|acconsento/i))
  fireEvent.submit(screen.getByRole('button', { name: /invia|richiedi/i }).closest('form')!)
  await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/lp-thank-you-page'))
})

it('passes user_data to pushLead on submit', async () => {
  render(<LeadForm origine="vetrina" />)
  fireEvent.change(screen.getByLabelText(/nome/i), { target: { value: 'Ada' } })
  fireEvent.change(screen.getByLabelText(/telefono/i), { target: { value: '3331234567' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.it' } })
  fireEvent.click(screen.getByLabelText(/privacy|consenso|acconsento/i))
  fireEvent.submit(screen.getByRole('button', { name: /invia|richiedi/i }).closest('form')!)
  await waitFor(() => expect(pushLead).toHaveBeenCalledWith(
    expect.objectContaining({
      origine: 'vetrina',
      user_data: { email: 'a@b.it', phone_number: '3331234567', name: 'Ada' },
    }),
  ))
})

it('appends stored click ids to the thank-you redirect', async () => {
  vi.mocked(getAttribution).mockReturnValue({ gclid: 'G1', wbraid: 'W1', utm_source: 'google' })
  render(<LeadForm origine="landing-ads" />)
  fireEvent.change(screen.getByLabelText(/telefono/i), { target: { value: '3331234567' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.it' } })
  fireEvent.click(screen.getByLabelText(/privacy|consenso|acconsento/i))
  fireEvent.submit(screen.getByRole('button', { name: /invia|richiedi/i }).closest('form')!)
  await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/lp-thank-you-page?gclid=G1&wbraid=W1'))
})

it('phone field strips non-numeric characters and caps the length', () => {
  render(<LeadForm origine="vetrina" />)
  const tel = screen.getByLabelText(/telefono/i) as HTMLInputElement
  fireEvent.input(tel, { target: { value: '+39 (333) abc 12-34' } })
  expect(tel.value).toBe('+393331234') // + kept, spaces/letters/symbols dropped
  fireEvent.input(tel, { target: { value: '1234567890123456789' } })
  expect(tel.value).toBe('123456789012345') // capped at 15 digits
})

it('blocks submit when the phone number is too short', async () => {
  render(<LeadForm origine="vetrina" />)
  fireEvent.input(screen.getByLabelText(/telefono/i), { target: { value: '333' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.it' } })
  fireEvent.click(screen.getByLabelText(/privacy|consenso|acconsento/i))
  fireEvent.submit(screen.getByRole('button', { name: /invia|richiedi/i }).closest('form')!)
  await waitFor(() => expect(fetch).not.toHaveBeenCalled())
  expect(pushMock).not.toHaveBeenCalled()
})

it('honeypot filled: skips fetch and shows success', async () => {
  const { container } = render(<LeadForm origine="vetrina" />)
  const hp = container.querySelector<HTMLInputElement>('[name="website"]')!
  fireEvent.change(hp, { target: { value: 'bot@spam.com' } })
  fireEvent.submit(container.querySelector('form')!)
  await waitFor(() =>
    expect(container.querySelector('.lf-status')).not.toHaveAttribute('hidden'),
  )
  expect(fetch).not.toHaveBeenCalled()
})
