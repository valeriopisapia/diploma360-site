import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'

const PAGES = [
  { doc: 'termini', importPage: () => import('./termini/page') },
  { doc: 'privacy', importPage: () => import('./privacy/page') },
  { doc: 'cookie', importPage: () => import('./cookie/page') },
] as const

afterEach(() => {
  // Se un expect fallisce a metà test, il mock del brand non deve restare attivo per il
  // test successivo (che si aspetta il brand di default, diploma360).
  vi.doUnmock('@/lib/brand')
  vi.resetModules()
})

describe('pagine legali per brand', () => {
  describe.each(PAGES)('$doc', ({ doc, importPage }) => {
    it('lascuola360 rende il testo in-house con un solo h1 e senza iframe', async () => {
      vi.doMock('@/lib/brand', async () => {
        const real = await vi.importActual<typeof import('@/lib/brand')>('@/lib/brand')
        return { ...real, brand: real.resolveBrand('lascuola360') }
      })
      vi.resetModules()
      const { default: Page } = await importPage()
      render(<Page />)
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
      expect(document.querySelector('iframe')).toBeNull()
      expect(document.body.textContent).toContain('ClassMe')
    })

    it('gli altri brand restano su Iubenda (iframe presente, h1 della pagina presente)', async () => {
      const { default: Page } = await importPage()
      render(<Page />)
      expect(document.querySelector('iframe.iubenda-frame')).not.toBeNull()
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    })
  })

  // Klarna: il sorgente vieta la pubblicazione del blocco 9.4 (termini) e del destinatario
  // Klarna Bank AB (privacy) finché il contratto non è firmato. Il committente non ha oggi
  // evidenza di contratto firmato: questi assert tengono la regola in piedi come test rosso,
  // così una riattivazione futura (PUBLISH_GATED_BLOCKS=1 nello script di generazione) sarà
  // un atto deliberato che fa fallire questo test, non una svista silenziosa.
  describe.each([{ doc: 'termini', importPage: () => import('./termini/page') } as const,
    { doc: 'privacy', importPage: () => import('./privacy/page') } as const])(
    'blocco Klarna gated a contratto — $doc',
    ({ importPage }) => {
      it('non compare nel testo renderizzato per lascuola360', async () => {
        vi.doMock('@/lib/brand', async () => {
          const real = await vi.importActual<typeof import('@/lib/brand')>('@/lib/brand')
          return { ...real, brand: real.resolveBrand('lascuola360') }
        })
        vi.resetModules()
        const { default: Page } = await importPage()
        render(<Page />)
        expect(document.body.textContent).not.toContain('Klarna')
      })
    },
  )
})
