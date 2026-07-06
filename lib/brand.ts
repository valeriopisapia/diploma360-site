/**
 * Brand config — single source of truth for everything that differs per brand.
 *
 * The active brand is selected at BUILD time by `NEXT_PUBLIC_BRAND` (Next inlines
 * `NEXT_PUBLIC_*`), defaulting to `diploma360`. Both Firebase App Hosting backends
 * build the same `main`; the La Scuola360 backend sets NEXT_PUBLIC_BRAND=lascuola360.
 *
 * Secrets (BREVO_API_KEY, BREVO_LIST_ID) are NOT here — they stay runtime env per project.
 */

export type BrandId = 'diploma360' | 'lascuola360'

export type Brand = {
  id: BrandId
  name: string
  domain: string
  logo: { header: string; lp: string; alt: string; ogImage: string }
  contacts: { telDisplay: string; telHref: string; whatsappUrl: string; email: string }
  gtmId: string
  legal: { entity: string; iubendaPolicyId: string }
  /** Decorative host shown in the fake browser URL bars on the piattaforma mockups
   *  (e.g. "app.diploma360.it"). Not a real subdomain — display text only. */
  platformHost: string
}

// Contacts are shared across brands today, but modelled per-brand for a future split.
const SHARED_CONTACTS = {
  telDisplay: '06 84 280 999',
  telHref: 'tel:0684280999',
  whatsappUrl: 'https://wa.me/393517214644',
  email: 'info@diploma360.it',
}

const BRANDS: Record<BrandId, Brand> = {
  diploma360: {
    id: 'diploma360',
    name: 'Diploma360',
    domain: 'https://www.diploma360.it',
    logo: {
      header: '/assets-vetrina/logo-diploma360.png',
      lp: '/foto/logo-diploma360.png',
      alt: 'Diploma360 — Powered by LaScuola360',
      ogImage: '/og-image.png',
    },
    contacts: SHARED_CONTACTS,
    gtmId: 'GTM-K5VMGM8C',
    legal: { entity: 'Classme S.r.l.', iubendaPolicyId: '43474147' },
    platformHost: 'app.diploma360.it',
  },
  lascuola360: {
    id: 'lascuola360',
    name: 'La Scuola360',
    domain: 'https://www.lascuola360.it',
    logo: {
      // PLACEHOLDER assets — added in Phase 3. Paths are final; files land then.
      header: '/assets-vetrina/logo-lascuola360.png',
      lp: '/foto/logo-lascuola360.png',
      alt: 'La Scuola360',
      ogImage: '/og-image-lascuola360.png',
    },
    contacts: SHARED_CONTACTS,
    gtmId: 'GTM-K5VMGM8C', // shared with Diploma360 (same GTM container / GA4 / Meta)
    legal: { entity: 'Classme S.r.l.', iubendaPolicyId: '43474147' }, // same Iubenda policy (Classme)
    platformHost: 'app.lascuola360.it',
  },
}

export function resolveBrand(raw: string | undefined): Brand {
  const id = (raw ?? 'diploma360') as BrandId
  const found = BRANDS[id]
  if (!found) {
    throw new Error(
      `Unknown brand "${raw}". Set NEXT_PUBLIC_BRAND to one of: ${Object.keys(BRANDS).join(', ')}`,
    )
  }
  return found
}

export const brand: Brand = resolveBrand(process.env.NEXT_PUBLIC_BRAND)
