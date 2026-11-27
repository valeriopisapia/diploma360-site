/**
 * Browser side of reCAPTCHA Enterprise (score-based, invisible — no challenge).
 *
 * Enabled only when NEXT_PUBLIC_RECAPTCHA_SITE_KEY is set at build time; otherwise
 * every function is a no-op and the lead form behaves exactly as before.
 *
 * The Google script is NOT loaded on page view: LeadForm calls `loadRecaptcha()` on the
 * first focus/input inside the form (and, as a fallback, at submit time). Getting a
 * token never blocks the lead: on any failure (blocked script, timeout, invalid domain
 * for the key) `getRecaptchaToken()` resolves to undefined and the form submits anyway.
 */

type GrecaptchaEnterprise = {
  ready: (cb: () => void) => void
  execute: (siteKey: string, opts: { action: string }) => Promise<string>
}

declare global {
  interface Window {
    grecaptcha?: { enterprise?: GrecaptchaEnterprise }
  }
}

const SCRIPT_ID = 'recaptcha-enterprise-js'
const TOKEN_TIMEOUT_MS = 4000

export function recaptchaSiteKey(): string {
  // Literal access → inlined by Next at build time.
  return (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? '').trim()
}

export function isRecaptchaEnabled(): boolean {
  return recaptchaSiteKey() !== ''
}

let loading: Promise<void> | null = null

/** Test helper. */
export function resetRecaptchaClient(): void {
  loading = null
}

/** Inject the Enterprise script once. Safe to call repeatedly. */
export function loadRecaptcha(): Promise<void> {
  const key = recaptchaSiteKey()
  if (!key || typeof document === 'undefined') return Promise.resolve()
  if (loading) return loading
  loading = new Promise<void>((resolve, reject) => {
    const s = document.createElement('script')
    s.id = SCRIPT_ID
    s.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(key)}`
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => {
      s.remove()
      loading = null // allow a retry on the next interaction
      reject(new Error('recaptcha script failed to load'))
    }
    document.head.appendChild(s)
  })
  return loading
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('recaptcha timeout')), ms)
    p.then(
      v => { clearTimeout(t); resolve(v) },
      e => { clearTimeout(t); reject(e) },
    )
  })
}

/** Token for `action`, or undefined if disabled or anything goes wrong. Never throws. */
export async function getRecaptchaToken(
  action: string,
  timeoutMs: number = TOKEN_TIMEOUT_MS,
): Promise<string | undefined> {
  const key = recaptchaSiteKey()
  if (!key) return undefined
  try {
    return await withTimeout(
      (async () => {
        await loadRecaptcha()
        const g = window.grecaptcha?.enterprise
        if (!g) return undefined
        await new Promise<void>(resolve => g.ready(resolve))
        const token = await g.execute(key, { action })
        return typeof token === 'string' && token ? token : undefined
      })(),
      timeoutMs,
    )
  } catch {
    return undefined
  }
}
