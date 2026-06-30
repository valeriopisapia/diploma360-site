import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect, describe } from 'vitest'
import { MegaMenu } from './MegaMenu'

describe('MegaMenu accessibility', () => {
  it('trigger starts with aria-expanded="false"', () => {
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /come funziona/i })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('clicking a parent trigger sets aria-expanded to true', () => {
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /come funziona/i })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('clicking the same trigger again closes it (aria-expanded false)', () => {
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /come funziona/i })
    fireEvent.click(trigger)
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('clicking one trigger closes another', () => {
    render(<MegaMenu />)
    const come = screen.getByRole('button', { name: /come funziona/i })
    const chi = screen.getByRole('button', { name: /chi siamo/i })
    fireEvent.click(come)
    fireEvent.click(chi)
    expect(come).toHaveAttribute('aria-expanded', 'false')
    expect(chi).toHaveAttribute('aria-expanded', 'true')
  })

  it('Escape key closes the open mega panel', () => {
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /come funziona/i })
    fireEvent.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    fireEvent.keyDown(trigger, { key: 'Escape' })
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('trigger has aria-haspopup and aria-controls', () => {
    render(<MegaMenu />)
    const trigger = screen.getByRole('button', { name: /come funziona/i })
    expect(trigger).toHaveAttribute('aria-haspopup', 'true')
    expect(trigger).toHaveAttribute('aria-controls')
  })
})
