import './IubendaPolicy.css'

/**
 * Embeds an Iubenda legal document directly via iframe — the full policy text
 * shows immediately, no click/CTA step. One Iubenda policy id (43474147,
 * Classme S.r.l. — shared with schoolr.net) with sub-documents for privacy,
 * cookie and terms. Always reflects the current Iubenda version.
 */
const IUBENDA_ID = '43474147'

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
