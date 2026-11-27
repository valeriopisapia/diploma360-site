/**
 * Server-side guards for POST /api/lead: payload validation, Origin allowlist and
 * a best-effort in-memory rate limit.
 *
 * Design rule: be CONSERVATIVE — never reject a lead that the real LeadForm can send.
 * Every check here is a superset of what LeadForm.tsx already enforces client-side:
 *   - telefono: the client allows only `^\+?\d{6,15}$`; here we also tolerate common
 *     separators (spaces, dots, dashes, parentheses, slashes) before applying the same
 *     digit-count rule, so an older cached client can never be rejected.
 *   - email: the client only checks "non-empty" (the form is `noValidate`), so the
 *     server uses a deliberately loose `x@y.z` shape — anything failing it would be
 *     refused by Brevo anyway ("Invalid email address").
 *   - prodotto: only the values the forms actually send ('Diploma' default,
 *     'Ripetizioni' from RipForm); absent → 'Diploma' as before.
 *   - optional free text (messaggio, pagina) is TRUNCATED rather than rejected, so a
 *     long message never loses the lead.
 */

import { resolveBrand, type BrandId } from './brand'

const ALL_BRAND_IDS: BrandId[] = ['diploma360', 'lascuola360', 'schoolr']

export type ValidLead = {
  nome?: string
  telefono: string
  email: string
  per_chi?: string
  messaggio?: string
  pagina?: string
  origine?: string
  ts?: string
  prodotto: string
  recaptchaToken?: string
}

export type ValidationResult = { ok: true; lead: ValidLead } | { ok: false; error: string }

/** Values sent by the forms in this codebase (LeadForm default + RipForm). */
export const ALLOWED_PRODOTTI = ['Diploma', 'Ripetizioni'] as const

const MAX = {
  nome: 200,
  email: 254, // RFC 5321 practical ceiling
  telefono: 32, // raw, before stripping separators
  per_chi: 64,
  origine: 64,
  ts: 64,
  prodotto: 64,
  recaptchaToken: 4096,
  // truncated, never rejected:
  messaggio: 5000,
  pagina: 1000,
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_SEPARATORS_RE = /[\s().\-/]/g
const PHONE_RE = /^\+?\d{6,15}$/

const ERR_REQUIRED = 'Email e telefono sono obbligatori'
const ERR_INVALID = 'Dati del modulo non validi'

/** Accepts undefined/null (→ undefined) or a string (→ trimmed). Anything else → error. */
function optString(v: unknown): { ok: true; value?: string } | { ok: false } {
  if (v === undefined || v === null) return { ok: true, value: undefined }
  if (typeof v !== 'string') return { ok: false }
  return { ok: true, value: v.trim() }
}

export function isValidPhone(raw: string): boolean {
  return PHONE_RE.test(raw.replace(PHONE_SEPARATORS_RE, ''))
}

export function validateLead(body: unknown): ValidationResult {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { ok: false, error: ERR_INVALID }
  }
  const b = body as Record<string, unknown>

  const fields = {} as Record<string, string | undefined>
  for (const key of [
    'nome', 'telefono', 'email', 'per_chi', 'messaggio', 'pagina', 'origine', 'ts', 'prodotto', 'recaptcha_token',
  ]) {
    const r = optString(b[key])
    if (!r.ok) return { ok: false, error: ERR_INVALID }
    fields[key] = r.value
  }

  const email = fields.email
  const telefono = fields.telefono
  if (!email || !telefono) return { ok: false, error: ERR_REQUIRED }

  if (email.length > MAX.email || !EMAIL_RE.test(email)) return { ok: false, error: ERR_INVALID }
  if (telefono.length > MAX.telefono || !isValidPhone(telefono)) return { ok: false, error: ERR_INVALID }

  for (const key of ['nome', 'per_chi', 'origine', 'ts', 'prodotto'] as const) {
    const v = fields[key]
    if (v !== undefined && v.length > MAX[key]) return { ok: false, error: ERR_INVALID }
  }
  const token = fields.recaptcha_token
  if (token !== undefined && token.length > MAX.recaptchaToken) return { ok: false, error: ERR_INVALID }

  // Absent/empty prodotto keeps the historical default.
  const prodotto = fields.prodotto || 'Diploma'
  if (!(ALLOWED_PRODOTTI as readonly string[]).includes(prodotto)) {
    return { ok: false, error: ERR_INVALID }
  }

  return {
    ok: true,
    lead: {
      nome: fields.nome,
      telefono,
      email,
      per_chi: fields.per_chi,
      messaggio: fields.messaggio?.slice(0, MAX.messaggio),
      pagina: fields.pagina?.slice(0, MAX.pagina),
      origine: fields.origine,
      ts: fields.ts,
      prodotto,
      recaptchaToken: token || undefined,
    },
  }
}

// ---------------------------------------------------------------------------
// Origin allowlist
// ---------------------------------------------------------------------------

/** Firebase App Hosting backend hosts of the `schoolrcloud` project, e.g.
 *  https://diploma360-site--schoolrcloud.us-east4.hosted.app */
const HOSTED_APP_RE = /^https:\/\/[a-z0-9-]+--schoolrcloud\.[a-z0-9-]+\.hosted\.app$/
const LOCALHOST_RE = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/

function allowedBrandOrigins(): Set<string> {
  const set = new Set<string>()
  for (const b of ALL_BRAND_IDS.map(resolveBrand)) {
    const host = new URL(b.domain).host.replace(/^www\./, '')
    set.add(`https://${host}`)
    set.add(`https://www.${host}`)
  }
  // Optional comma-separated extras (e.g. a temporary preview domain).
  for (const o of (process.env.LEAD_ALLOWED_ORIGINS ?? '').split(',')) {
    const t = o.trim().replace(/\/$/, '')
    if (t) set.add(t)
  }
  return set
}

/**
 * True when the request may proceed. Only rejects when an `Origin` header is PRESENT
 * and is neither a brand domain (apex/www), a schoolrcloud *.hosted.app backend,
 * localhost, nor the request's own host (same-origin). Requests without Origin
 * (server-to-server, some older browsers on same-origin) are allowed as before.
 */
export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin')
  if (origin === null) return true
  const o = origin.trim().replace(/\/$/, '')
  if (allowedBrandOrigins().has(o)) return true
  if (HOSTED_APP_RE.test(o) || LOCALHOST_RE.test(o)) return true
  // Same-origin: the browser sets Host to the site it is talking to, so a
  // cross-site page can't make Origin match it.
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host')
  if (host) {
    try {
      if (new URL(o).host === host.split(',')[0].trim()) return true
    } catch {
      return false
    }
  }
  return false
}

// ---------------------------------------------------------------------------
// Best-effort per-IP rate limit (in memory)
// ---------------------------------------------------------------------------
// App Hosting / Cloud Run scales 0..N instances and each keeps its own map, so this
// is only a speed bump against floods from one IP, not a hard quota. Limits are
// generous so shared IPs (offices, schools, mobile CGNAT) are never affected in
// practice.

const DEFAULT_MAX = 15
const WINDOW_MS = 10 * 60 * 1000
const MAX_TRACKED_IPS = 10_000

const hits = new Map<string, { count: number; resetAt: number }>()

function rateLimitMax(): number {
  const raw = process.env.LEAD_RATE_LIMIT_MAX
  if (raw === undefined || raw.trim() === '') return DEFAULT_MAX
  const n = Number(raw)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : DEFAULT_MAX
}

/** Client IP from the left-most X-Forwarded-For entry (set by Google's front end). */
export function clientIp(req: Request): string | null {
  const xff = req.headers.get('x-forwarded-for')
  const first = xff?.split(',')[0]?.trim()
  if (first) return first
  return req.headers.get('x-real-ip')?.trim() || null
}

/** Returns true when the request is within the limit. Unknown IP → never limited. */
export function checkRateLimit(ip: string | null, now: number = Date.now()): boolean {
  const max = rateLimitMax()
  if (!ip || max === 0) return true

  const entry = hits.get(ip)
  if (!entry || entry.resetAt <= now) {
    if (hits.size >= MAX_TRACKED_IPS) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k)
      // Still full of live entries: drop the oldest insertion to bound memory.
      if (hits.size >= MAX_TRACKED_IPS) {
        const oldest = hits.keys().next().value
        if (oldest !== undefined) hits.delete(oldest)
      }
    }
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  entry.count += 1
  return entry.count <= max
}

/** Test helper. */
export function resetRateLimit(): void {
  hits.clear()
}
