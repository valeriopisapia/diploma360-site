/**
 * Cookie consent storage.
 *
 * Historically the banner (components/consent/CookieBanner.tsx) stored the choice in
 * localStorage under `d360_consent`, with no expiry and no distinction between statistics
 * and marketing. The cookie policy published for lascuola360 (Task 1) declares a real,
 * named cookie with a 6-month lifetime — this module is the implementation that makes that
 * declaration true.
 *
 * Cookie value format: `v1.<s|_>.<m|_>` — deliberately not JSON, so it stays parsable by a
 * tiny inline `<script>` (Task 3) that runs before any JS bundle loads, with no dependency
 * on this file.
 */

import { brand } from '@/lib/brand'

export interface ConsentChoice {
  statistics: boolean
  marketing: boolean
}

export const CONSENT_MAX_AGE_DAYS = 180
const MAX_AGE_SECONDS = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60 // 15552000

/** Historical localStorage key written by the pre-cookie CookieBanner. Migrated once, then
 *  removed. Not brand-specific — the old banner never was either. */
const LEGACY_LOCALSTORAGE_KEY = 'd360_consent'

const VALUE_RE = /^v1\.([s_])\.([m_])$/

function cookieName(): string {
  return brand.legal.consentCookieName
}

/** Builds the full `Set-Cookie`-style string written to `document.cookie`. Exported so its
 *  attributes (Max-Age, Path, SameSite) are testable without inspecting the live jar. */
export function serializeConsentCookie(c: ConsentChoice): string {
  const value = `v1.${c.statistics ? 's' : '_'}.${c.marketing ? 'm' : '_'}`
  return `${cookieName()}=${value}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax`
}

export function writeConsent(c: ConsentChoice): void {
  if (typeof document === 'undefined') return
  document.cookie = serializeConsentCookie(c)
}

function parseCookieValue(value: string): ConsentChoice | null {
  const match = VALUE_RE.exec(value)
  if (!match) return null
  return { statistics: match[1] === 's', marketing: match[2] === 'm' }
}

function readRawCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  for (const part of document.cookie.split(';')) {
    const idx = part.indexOf('=')
    if (idx === -1) continue
    const key = part.slice(0, idx).trim()
    if (key !== name) continue
    try {
      return decodeURIComponent(part.slice(idx + 1).trim())
    } catch {
      return null
    }
  }
  return null
}

function migrateFromLegacyLocalStorage(): ConsentChoice | null {
  if (typeof window === 'undefined') return null

  let legacy: string | null = null
  try {
    legacy = window.localStorage.getItem(LEGACY_LOCALSTORAGE_KEY)
  } catch {
    return null
  }

  if (legacy !== 'all' && legacy !== 'necessary') return null

  // 'all' migrates to statistics ONLY, never to marketing. The banner that wrote this value
  // asked about one thing — "cookie di statistica per migliorare il sito" — and never
  // mentioned profiling or advertising. Mapping 'all' to marketing:true would manufacture a
  // consent the user was never asked for and could not have refused: not a valid consent, and
  // it would silently switch the ad signals to granted for every returning visitor.
  // Whoever wants marketing gets asked properly, via the banner's three categories.
  const migrated: ConsentChoice =
    legacy === 'all'
      ? { statistics: true, marketing: false }
      : { statistics: false, marketing: false }

  writeConsent(migrated)
  try {
    window.localStorage.removeItem(LEGACY_LOCALSTORAGE_KEY)
  } catch {
    // best-effort cleanup — the cookie is already the source of truth either way
  }

  return migrated
}

/**
 * Reads the current consent choice from the cookie. If the cookie is absent, migrates the
 * historical localStorage value (writing the cookie and clearing the old key). Never throws:
 * a missing or corrupted value resolves to `null`.
 */
export function readConsent(): ConsentChoice | null {
  const raw = readRawCookie(cookieName())
  if (raw !== null) return parseCookieValue(raw)

  return migrateFromLegacyLocalStorage()
}
