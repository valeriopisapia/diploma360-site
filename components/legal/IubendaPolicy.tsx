import Script from 'next/script'

/**
 * Embeds an Iubenda legal document (full text, inline) into the page.
 * One Iubenda policy id (43474147, Classme S.r.l. — shared with schoolr.net)
 * with sub-documents for privacy, cookie and terms.
 *
 * `iub-body-embed` tells iubenda.js to inject the full policy text directly
 * into the page (no button, no iframe). The <a> stays as a graceful fallback
 * link if JS is unavailable. Always reflects the current Iubenda version.
 */
const IUBENDA_ID = '43474147'

const POLICIES = {
  privacy: {
    href: `https://www.iubenda.com/privacy-policy/${IUBENDA_ID}/full-legal`,
    title: 'Privacy Policy',
  },
  cookie: {
    href: `https://www.iubenda.com/privacy-policy/${IUBENDA_ID}/cookie-policy`,
    title: 'Cookie Policy',
  },
  termini: {
    href: `https://www.iubenda.com/terms-and-conditions/${IUBENDA_ID}`,
    title: 'Termini e Condizioni',
  },
} as const

export function IubendaPolicy({ type }: { type: keyof typeof POLICIES }) {
  const policy = POLICIES[type]
  return (
    <>
      <a
        href={policy.href}
        className="iubenda-white no-brand iubenda-noiframe iub-body-embed iubenda-embed"
        title={policy.title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {policy.title}
      </a>
      <Script id="iubenda-embed-loader" strategy="afterInteractive" src="https://cdn.iubenda.com/iubenda.js" />
    </>
  )
}
