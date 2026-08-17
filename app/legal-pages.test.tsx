import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('pagine legali per brand', () => {
  it('lascuola360 rende il testo in-house con un solo h1 e senza iframe', async () => {
    vi.doMock('@/lib/brand', async () => {
      const real = await vi.importActual<typeof import('@/lib/brand')>('@/lib/brand')
      return { ...real, brand: real.resolveBrand('lascuola360') }
    })
    vi.resetModules()
    const { default: Privacy } = await import('./privacy/page')
    render(<Privacy />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(document.querySelector('iframe')).toBeNull()
    expect(document.body.textContent).toContain('ClassMe')
    vi.doUnmock('@/lib/brand')
    vi.resetModules()
  })

  it('gli altri brand restano su Iubenda (iframe presente, h1 della pagina presente)', async () => {
    const { default: Privacy } = await import('./privacy/page')
    render(<Privacy />)
    expect(document.querySelector('iframe.iubenda-frame')).not.toBeNull()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })
})
