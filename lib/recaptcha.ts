/**
 * Server-side verification of Google reCAPTCHA Enterprise (score-based) tokens.
 *
 * Feature flags (all optional — with none set, nothing here runs):
 *   NEXT_PUBLIC_RECAPTCHA_SITE_KEY  public site key; empty → disabled (client + server)
 *   RECAPTCHA_PROJECT_ID            GCP project of the key (schoolrcloud); empty → server skips
 *   RECAPTCHA_ENFORCE               "true" → reject failed assessments; anything else
 *                                   (default) → observe only: assess + log, never reject
 *   RECAPTCHA_SCORE_THRESHOLD       minimum score, default 0.3
 *
 * Auth: Application Default Credentials from the Cloud Run metadata server (the App
 * Hosting runtime service account, which needs roles/recaptchaenterprise.agent). No API
 * key, no secret, no extra dependency.
 *
 * Fail-open policy: if Google can't give us an answer (metadata server unreachable,
 * timeout, any non-200 from the assessments API — including 403 for a missing IAM role)
 * the outcome is `unavailable` and the lead goes through. Only a real assessment that
 * says "invalid token / wrong action / low score", or a missing token, is a `fail`.
 */

export const RECAPTCHA_ACTION = 'lead_submit'
const DEFAULT_THRESHOLD = 0.3
const TIMEOUT_MS = 3000
const METADATA_TOKEN_URL =
  'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token'

export type RecaptchaOutcome =
  | { status: 'disabled' }
  | { status: 'pass'; score: number }
  | {
      status: 'fail'
      reason: 'missing_token' | 'invalid_token' | 'wrong_action' | 'low_score'
      score?: number
      detail?: string
    }
  | { status: 'unavailable'; detail: string }

export type RecaptchaConfig = {
  siteKey: string
  projectId: string
  enforce: boolean
  threshold: number
}

export function recaptchaConfig(env: NodeJS.ProcessEnv = process.env): RecaptchaConfig {
  const raw = env.RECAPTCHA_SCORE_THRESHOLD
  const n = raw === undefined || raw.trim() === '' ? NaN : Number(raw)
  // Literal `process.env.NEXT_PUBLIC_…` access for the default env, so Next can inline
  // the build-time value even if the runtime env lacks it.
  const siteKey =
    env === process.env ? process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY : env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  return {
    siteKey: siteKey?.trim() ?? '',
    projectId: env.RECAPTCHA_PROJECT_ID?.trim() ?? '',
    enforce: env.RECAPTCHA_ENFORCE?.trim().toLowerCase() === 'true',
    threshold: Number.isFinite(n) && n >= 0 && n <= 1 ? n : DEFAULT_THRESHOLD,
  }
}

// Access token cache (per instance). The metadata server already caches, this just
// saves a local round trip per lead.
let cachedToken: { value: string; expiresAt: number } | null = null

/** Test helper. */
export function resetRecaptchaTokenCache(): void {
  cachedToken = null
}

async function getAccessToken(fetchImpl: typeof fetch, signal: AbortSignal): Promise<string> {
  const now = Date.now()
  if (cachedToken && cachedToken.expiresAt > now) return cachedToken.value
  const r = await fetchImpl(METADATA_TOKEN_URL, { headers: { 'Metadata-Flavor': 'Google' }, signal })
  if (!r.ok) throw new Error(`metadata status ${r.status}`)
  const j = (await r.json()) as { access_token?: string; expires_in?: number }
  if (!j.access_token) throw new Error('metadata: no access_token')
  const ttl = typeof j.expires_in === 'number' ? j.expires_in : 300
  cachedToken = { value: j.access_token, expiresAt: now + Math.max(0, ttl - 60) * 1000 }
  return j.access_token
}

type Assessment = {
  tokenProperties?: { valid?: boolean; invalidReason?: string; action?: string }
  riskAnalysis?: { score?: number }
}

export async function verifyRecaptcha(
  token: string | undefined,
  opts: { fetchImpl?: typeof fetch; config?: RecaptchaConfig; timeoutMs?: number } = {},
): Promise<RecaptchaOutcome> {
  const cfg = opts.config ?? recaptchaConfig()
  if (!cfg.siteKey || !cfg.projectId) return { status: 'disabled' }
  if (!token) return { status: 'fail', reason: 'missing_token' }

  const fetchImpl = opts.fetchImpl ?? globalThis.fetch
  const signal = AbortSignal.timeout(opts.timeoutMs ?? TIMEOUT_MS)

  let assessment: Assessment
  try {
    const accessToken = await getAccessToken(fetchImpl, signal)
    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(cfg.projectId)}/assessments`
    const r = await fetchImpl(url, {
      method: 'POST',
      headers: { authorization: `Bearer ${accessToken}`, 'content-type': 'application/json' },
      body: JSON.stringify({ event: { token, siteKey: cfg.siteKey, expectedAction: RECAPTCHA_ACTION } }),
      signal,
    })
    if (!r.ok) {
      await r.text().catch(() => {})
      if (r.status === 401) cachedToken = null
      // 403 (missing IAM role), 429, 5xx… → Google can't answer: fail open.
      return { status: 'unavailable', detail: `assessments status ${r.status}` }
    }
    assessment = (await r.json()) as Assessment
  } catch (e) {
    const name = e instanceof Error ? e.name : ''
    return {
      status: 'unavailable',
      detail: name === 'TimeoutError' || name === 'AbortError' ? 'timeout' : `error ${e instanceof Error ? e.message : String(e)}`,
    }
  }

  const tp = assessment.tokenProperties ?? {}
  const score = assessment.riskAnalysis?.score
  if (tp.valid !== true) {
    // e.g. MALFORMED, EXPIRED, DUPE, BROWSER_ERROR, or a token generated on a hostname
    // that isn't in the key's domain list (*.hosted.app preview hosts).
    return { status: 'fail', reason: 'invalid_token', detail: tp.invalidReason ?? 'unknown' }
  }
  if (tp.action !== RECAPTCHA_ACTION) {
    return { status: 'fail', reason: 'wrong_action', score, detail: String(tp.action ?? '') }
  }
  if (typeof score !== 'number') {
    // A valid token with no score is unexpected — treat as Google not answering.
    return { status: 'unavailable', detail: 'no score in assessment' }
  }
  if (score < cfg.threshold) return { status: 'fail', reason: 'low_score', score }
  return { status: 'pass', score }
}

/** Single log line, no personal data (no token, IP, email or phone). */
export function describeOutcome(o: RecaptchaOutcome, cfg: RecaptchaConfig): string {
  const parts = [`reCAPTCHA: result=${o.status}`]
  if (o.status === 'fail') parts.push(`reason=${o.reason}`)
  if ((o.status === 'pass' || o.status === 'fail') && typeof o.score === 'number') parts.push(`score=${o.score}`)
  if ((o.status === 'fail' || o.status === 'unavailable') && o.detail) parts.push(`detail=${o.detail}`)
  parts.push(`threshold=${cfg.threshold}`, `enforce=${cfg.enforce}`)
  if (o.status === 'unavailable') parts.push('(fail-open)')
  return parts.join(' ')
}

/** Reject only when enforcement is ON and the assessment actually failed. */
export function shouldReject(o: RecaptchaOutcome, cfg: RecaptchaConfig): boolean {
  return cfg.enforce && o.status === 'fail'
}
