import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, beforeEach, it, expect } from 'vitest'
import { LeadForm } from './LeadForm'

vi.mock('@/lib/analytics', () => ({ pushLead: vi.fn() }))
import { pushLead } from '@/lib/analytics'

beforeEach(() => {
  vi.clearAllMocks()
  vi.stubGlobal('fetch', vi.fn(async () => new Response('{"ok":true}', { status: 200 })))
})

it('submits and fires lead_submit on success', async () => {
  render(<LeadForm origine="vetrina" />)
  fireEvent.change(screen.getByLabelText(/telefono/i), { target: { value: '333' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.it' } })
  fireEvent.click(screen.getByLabelText(/privacy|consenso|acconsento/i))
  fireEvent.submit(screen.getByRole('button', { name: /invia|richiedi/i }).closest('form')!)
  await waitFor(() => expect(pushLead).toHaveBeenCalledWith({ origine: 'vetrina', pagina: '/' }))
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
