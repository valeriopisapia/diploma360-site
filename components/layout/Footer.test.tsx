import { render, screen } from '@testing-library/react'
import { it, expect } from 'vitest'
import { Footer } from './Footer'

it('renders company legal name', () => {
  render(<Footer />)
  expect(screen.getByText(/Classme S\.r\.l\./i)).toBeInTheDocument()
})

it('renders VAT number', () => {
  render(<Footer />)
  expect(screen.getByText(/P\.IVA 15441141007/i)).toBeInTheDocument()
})

it('renders address', () => {
  render(<Footer />)
  expect(screen.getByText(/Viale Castrense 5/i)).toBeInTheDocument()
})

it('has a link to /privacy', () => {
  render(<Footer />)
  const link = screen.getByRole('link', { name: /privacy/i })
  expect(link).toHaveAttribute('href', '/privacy')
})

it('has a link to /cookie', () => {
  render(<Footer />)
  const link = screen.getByRole('link', { name: /cookie/i })
  expect(link).toHaveAttribute('href', '/cookie')
})

it('has a link to /termini', () => {
  render(<Footer />)
  const link = screen.getByRole('link', { name: /termini/i })
  expect(link).toHaveAttribute('href', '/termini')
})
