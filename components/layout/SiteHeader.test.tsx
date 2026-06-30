import { render, screen } from '@testing-library/react'
import { it, expect } from 'vitest'
import { SiteHeader } from './SiteHeader'

it('shows the primary call CTA', () => {
  render(<SiteHeader />)
  const cta = screen.getByRole('link', { name: /chiama ora/i })
  expect(cta).toHaveAttribute('href', 'tel:0684280999')
})

it('renders the brand logo', () => {
  render(<SiteHeader />)
  const logo = screen.getByAltText(/diploma360/i)
  expect(logo).toBeInTheDocument()
})
