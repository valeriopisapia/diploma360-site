// lib/attribution.ts
/**
 * Marketing attribution capture. Reads ad click identifiers + utm from the
 * landing URL and persists them in a brand-neutral first-party cookie so they
 * survive intra-site navigation and the client-side thank-you redirect.
 * Cookies are domain-scoped, so diploma360.it / lascuola360.it never share this.
 */

const COOKIE = 'mkt_attr'
const MAX_AGE = 60 * 60 * 24 * 90 // 90 days (Google Ads conversion window)

export const ATTR_PARAMS = [
  'gclid', 'gbraid', 'wbraid', 'msclkid', 'fbclid',
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
] as const

type Attr = Record<string, string>

function readCookie(): Attr {
  if (typeof document === 'undefined') return {}
  const m = document.cookie.match(/(?:^|;\s*)mkt_attr=([^;]*)/)
  if (!m) return {}
  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(m[1]))
    return parsed && typeof parsed === 'object' ? (parsed as Attr) : {}
  } catch {
    return {}
  }
}

export function getAttribution(): Attr {
  return readCookie()
}

export function captureAttribution(search?: string): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(search ?? window.location.search)
  const merged = readCookie()
  let changed = false
  for (const key of ATTR_PARAMS) {
    const val = params.get(key)
    if (val) { merged[key] = val; changed = true } // last-click-wins
  }
  if (!changed) return
  const secure = typeof location !== 'undefined' && location.protocol === 'https:' ? '; Secure' : ''
  document.cookie =
    `${COOKIE}=${encodeURIComponent(JSON.stringify(merged))}; max-age=${MAX_AGE}; path=/; SameSite=Lax${secure}`
}
