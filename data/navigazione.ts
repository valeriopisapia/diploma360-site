export type NavGroup = {
  label: string
  items: { label: string; href: string }[]
}

/**
 * Mega-menu columns. Each NavGroup represents one visual column in a dropdown.
 * MegaMenu.tsx maps these to top-level nav items via its internal MEGA_NAV constant:
 *   "Come funziona" → columns ['Il metodo', 'Diploma ed esami']
 *   "Chi siamo"     → column  ['Diploma360']
 */
export const headerNav: NavGroup[] = [
  // ── Come funziona dropdown ────────────────────────────────────────────────
  {
    label: 'Il metodo',
    items: [
      { label: 'Il metodo Diploma360', href: '/come-funziona' },
      { label: 'La piattaforma', href: '/piattaforma' },
    ],
  },
  {
    label: 'Diploma ed esami',
    items: [
      { label: 'Il valore del diploma', href: '/esami-diploma' },
      { label: 'Esami e normativa', href: '/esami-normativa' },
      { label: 'Iscrizioni', href: '/iscrizioni' },
      { label: "Sedi d'esame", href: '/sedi-esame' },
    ],
  },
  // ── Chi siamo dropdown ────────────────────────────────────────────────────
  {
    label: 'Diploma360',
    items: [
      { label: 'Chi siamo', href: '/chi-siamo' },
      { label: 'Perché fidarti', href: '/credibilita' },
      { label: 'Partner', href: '/chi-siamo#partner' },
      { label: 'Lavora con noi', href: '/contatti' },
    ],
  },
]

/**
 * Footer column groups.
 * 'Percorso', 'Diploma360', 'Contatti' → rendered as footer columns.
 * 'Legale' → rendered in footer-bottom legal row; contains /privacy, /cookie, /termini.
 */
export const footerNav: NavGroup[] = [
  {
    label: 'Percorso',
    items: [
      { label: 'Come funziona', href: '/come-funziona' },
      { label: 'Diplomi e indirizzi', href: '/diplomi' },
      { label: 'Esami e diploma', href: '/esami-diploma' },
      { label: "Sedi d'esame", href: '/sedi-esame' },
      { label: 'Prezzi e piani', href: '/prezzi' },
    ],
  },
  {
    label: 'Diploma360',
    items: [
      { label: 'Chi siamo', href: '/chi-siamo' },
      { label: 'Perché fidarti', href: '/credibilita' },
      { label: 'Iscrizioni', href: '/iscrizioni' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contatti', href: '/contatti' },
    ],
  },
  {
    label: 'Contatti',
    items: [
      { label: '06 84 280 999', href: 'tel:0684280999' },
      { label: 'WhatsApp 351 721 4644', href: 'https://wa.me/393517214644' },
      { label: 'info@diploma360.it', href: 'mailto:info@diploma360.it' },
    ],
  },
  {
    label: 'Legale',
    items: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Cookie', href: '/cookie' },
      { label: 'Termini', href: '/termini' },
    ],
  },
]
