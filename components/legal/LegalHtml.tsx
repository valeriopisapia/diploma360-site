import * as termini from '@/data/legal/lascuola360/termini'
import * as privacy from '@/data/legal/lascuola360/privacy'
import * as cookie from '@/data/legal/lascuola360/cookie'

const DOCS = { termini, privacy, cookie } as const

/**
 * Testi legali in-house (solo brand lascuola360; gli altri brand usano IubendaPolicy).
 * Il frammento porta il proprio <h1>: la pagina che usa questo componente NON deve
 * avere un h1 proprio, o ne finiscono due (vietato dalle istruzioni di pubblicazione).
 */
export function LegalHtml({ doc }: { doc: keyof typeof DOCS }) {
  return <div className="legal" dangerouslySetInnerHTML={{ __html: DOCS[doc].html }} />
}
