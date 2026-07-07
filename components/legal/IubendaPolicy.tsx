import './IubendaPolicy.css'
import { brand } from '@/lib/brand'

/**
 * Embeds an Iubenda legal document directly via iframe — the full policy text
 * shows immediately, no click/CTA step. The per-brand Iubenda policy id
 * (brand.legal.iubendaPolicyId) has sub-documents for privacy, cookie and terms.
 * Always reflects the current Iubenda version.
 */
const IUBENDA_ID = brand.legal.iubendaPolicyId

const POLICIES = {
  privacy: {
    src: `https://www.iubenda.com/privacy-policy/${IUBENDA_ID}`,
    title: 'Privacy Policy',
  },
  cookie: {
    src: `https://www.iubenda.com/privacy-policy/${IUBENDA_ID}/cookie-policy`,
    title: 'Cookie Policy',
  },
  termini: {
    src: `https://www.iubenda.com/termini-e-condizioni/${IUBENDA_ID}`,
    title: 'Termini e Condizioni',
  },
} as const

export function IubendaPolicy({ type }: { type: keyof typeof POLICIES }) {
  const policy = POLICIES[type]
  return (
    <iframe
      src={policy.src}
      title={policy.title}
      className="iubenda-frame"
      loading="lazy"
    />
  )
}
