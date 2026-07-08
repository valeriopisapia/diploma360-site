import { brand } from '@/lib/brand'

export type NavGroup = {
  label: string
  items: { label: string; href: string }[]
}

// ── Brand-aware nav data model (consumed by MegaMenu/MobileMenu — Task 2+) ──
export type NavLink = { label: string; href: string }
export type NavColumn = { label: string; items: NavLink[] }
export type NavItem =
  | { kind: 'link'; label: string; href: string }
  | { kind: 'mega'; label: string; columns: NavColumn[] }

const DIPLOMA_NAV: NavItem[] = [
  { kind: 'link', label: 'Home', href: '/' },
  { kind: 'mega', label: 'Come funziona', columns: [
    { label: `Il metodo ${brand.name}`, items: [
      { label: `Il metodo ${brand.name}`, href: '/come-funziona' },
      { label: 'La piattaforma', href: '/piattaforma' },
    ]},
    { label: 'Diploma ed esami', items: [
      { label: 'Il valore del diploma', href: '/esami-diploma' },
      { label: 'Esami e normativa', href: '/esami-normativa' },
      { label: 'Iscrizioni', href: '/iscrizioni' },
      { label: "Sedi d'esame", href: '/sedi-esame' },
    ]},
  ]},
  { kind: 'link', label: 'Diplomi', href: '/diplomi' },
  { kind: 'link', label: 'Prezzi', href: '/prezzi' },
  { kind: 'mega', label: 'Chi siamo', columns: [
    { label: brand.name, items: [
      { label: 'Chi siamo', href: '/chi-siamo' },
      { label: 'Perché fidarti', href: '/credibilita' },
      { label: 'Partner', href: '/chi-siamo#partner' },
      { label: 'Lavora con noi', href: '/contatti' },
    ]},
  ]},
]

const LASCUOLA_NAV: NavItem[] = [
  { kind: 'link', label: 'Home', href: '/' },
  { kind: 'mega', label: 'Diploma', columns: [
    { label: 'Il metodo', items: [
      { label: 'Come funziona', href: '/come-funziona' },
      { label: 'La piattaforma', href: '/piattaforma' },
    ]},
    { label: 'Diploma ed esami', items: [
      { label: 'Il valore del diploma', href: '/esami-diploma' },
      { label: 'Esami e normativa', href: '/esami-normativa' },
      { label: 'Iscrizioni', href: '/iscrizioni' },
      { label: "Sedi d'esame", href: '/sedi-esame' },
    ]},
    { label: 'Percorso e costi', items: [
      { label: 'Diplomi', href: '/diplomi' },
      { label: 'Prezzi', href: '/prezzi' },
      { label: 'Garanzia', href: '/garanzia' },
      { label: 'FAQ', href: '/faq' },
    ]},
  ]},
  { kind: 'mega', label: 'Ripetizioni', columns: [
    { label: 'Il servizio', items: [
      { label: 'Come funziona', href: '/ripetizioni/come-funziona' },
      { label: 'Prezzi', href: '/ripetizioni/prezzi' },
      { label: 'FAQ', href: '/ripetizioni#faq' },
    ]},
    { label: 'Per chi', items: [
      { label: 'Materie e DSA', href: '/ripetizioni/materie' },
      { label: 'Per livello', href: '/ripetizioni/materie#livello' },
      { label: 'Recupero debiti · aiuto compiti', href: '/ripetizioni/materie#esigenza' },
    ]},
  ]},
  { kind: 'link', label: 'Chi siamo', href: '/chi-siamo' },
]

export function getHeaderNav(): NavItem[] {
  return brand.id === 'lascuola360' ? LASCUOLA_NAV : DIPLOMA_NAV
}

/**
 * Mega-menu columns. Each NavGroup represents one visual column in a dropdown.
 * MegaMenu.tsx maps these to top-level nav items via its internal MEGA_NAV constant:
 *   "Come funziona" → columns ['Il metodo', 'Diploma ed esami']
 *   "Chi siamo"     → column  [brand.name]
 */
export const headerNav: NavGroup[] = [
  // ── Come funziona dropdown ────────────────────────────────────────────────
  {
    label: 'Il metodo',
    items: [
      { label: `Il metodo ${brand.name}`, href: '/come-funziona' },
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
    label: `${brand.name}`,
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
 * 'Percorso', brand.name, 'Contatti' → rendered as footer columns.
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
    label: `${brand.name}`,
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
      { label: brand.contacts.email, href: `mailto:${brand.contacts.email}` },
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
