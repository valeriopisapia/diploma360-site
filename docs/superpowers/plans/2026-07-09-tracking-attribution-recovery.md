# Tracking Attribution Recovery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capture ad identifiers (gclid/utm/…) site-wide and pass them + user data into the GTM `lead_submit` event and the thank-you redirect, so GA4 paid attribution and Google Ads conversions work again.

**Architecture:** A pure `lib/attribution.ts` module captures URL params into a brand-neutral first-party cookie on every page (via a no-UI `AttributionCapture` client component mounted in the root layout). `pushLead` is extended to merge the stored attribution, the user's PII (`user_data`, for Enhanced Conversions), and `brand: brand.id` (routing key for the shared GTM container). `LeadForm` passes `user_data` and appends the click ids to the thank-you URL.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Vitest + happy-dom.

## Global Constraints

- Next.js 16 conventions — read `node_modules/next/dist/docs/` before using unfamiliar APIs.
- `npm test` output must be pristine (no new warnings). happy-dom Google-Fonts fetch noise from `layout.test.tsx` is not a failure.
- Do NOT hardcode `Diploma360` or `www.diploma360.it` in `app/`/`components/`/`data/` — use `brand.*`. Guard test `test/no-hardcoded-brand.test.ts` enforces this.
- Verify BOTH brands: `NEXT_PUBLIC_BRAND=diploma360 npm run build` and `NEXT_PUBLIC_BRAND=lascuola360 npm run build`. Diploma360 output must stay unchanged.
- Cookie name is `mkt_attr` (brand-neutral). Attribution params list is fixed (see Task 1).
- Component tests using `next/navigation` MUST `vi.mock('next/navigation', …)`.
- Frequent commits: one per task.

---

### Task 1: `lib/attribution.ts` — capture & read

**Files:**
- Create: `lib/attribution.ts`
- Test: `lib/attribution.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `ATTR_PARAMS: readonly string[]` = `['gclid','gbraid','wbraid','msclkid','fbclid','utm_source','utm_medium','utm_campaign','utm_term','utm_content']`
  - `captureAttribution(search?: string): void` — merges present, non-empty params from `search` (default `window.location.search`) into cookie `mkt_attr` (JSON), last-click-wins, 90-day max-age. No-op if nothing present or non-browser.
  - `getAttribution(): Record<string,string>` — parsed cookie, `{}` if absent/malformed.

- [ ] **Step 1: Write the failing test**

```ts
// lib/attribution.test.ts
import { it, expect, beforeEach } from 'vitest'
import { captureAttribution, getAttribution, ATTR_PARAMS } from './attribution'

// happy-dom: clear cookies between tests
beforeEach(() => {
  for (const c of document.cookie.split(';')) {
    const name = c.split('=')[0].trim()
    if (name) document.cookie = `${name}=; max-age=0; path=/`
  }
})

it('exposes the fixed attribution param list', () => {
  expect(ATTR_PARAMS).toContain('gclid')
  expect(ATTR_PARAMS).toContain('utm_source')
  expect(ATTR_PARAMS).toContain('gbraid')
})

it('captures gclid + utm from a search string into the cookie', () => {
  captureAttribution('?gclid=ABC123&utm_source=google&utm_medium=cpc&foo=bar')
  expect(getAttribution()).toEqual({ gclid: 'ABC123', utm_source: 'google', utm_medium: 'cpc' })
})

it('last-click-wins: a new value overwrites, absent params are preserved', () => {
  captureAttribution('?gclid=OLD&utm_campaign=spring')
  captureAttribution('?gclid=NEW')
  expect(getAttribution()).toEqual({ gclid: 'NEW', utm_campaign: 'spring' })
})

it('is a no-op when no known params are present', () => {
  captureAttribution('?foo=bar&baz=1')
  expect(getAttribution()).toEqual({})
})

it('ignores empty param values', () => {
  captureAttribution('?gclid=')
  expect(getAttribution()).toEqual({})
})

it('returns {} for a malformed cookie without throwing', () => {
  document.cookie = 'mkt_attr=%7Bnot-json; path=/'
  expect(() => getAttribution()).not.toThrow()
  expect(getAttribution()).toEqual({})
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/attribution.test.ts`
Expected: FAIL — cannot resolve `./attribution`.

- [ ] **Step 3: Write minimal implementation**

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/attribution.test.ts`
Expected: PASS (6 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/attribution.ts lib/attribution.test.ts
git commit -m "feat(attribution): capture gclid/utm into first-party cookie"
```

---

### Task 2: Extend `pushLead` with attribution, user_data, brand

**Files:**
- Modify: `lib/analytics.ts:18-21`
- Test: `lib/analytics.test.ts` (modify existing assertion + add cases)

**Interfaces:**
- Consumes: `getAttribution()` from Task 1; `brand` from `lib/brand.ts`.
- Produces:
  - `interface UserData { email?: string; phone_number?: string; name?: string }`
  - `pushLead(p: { origine: string; pagina: string; user_data?: UserData }): void` — pushes `{ event:'lead_submit', origine, pagina, brand: brand.id, ...getAttribution(), user_data? }`. Empty `user_data` keys are dropped; `user_data` omitted entirely if it ends up empty.

- [ ] **Step 1: Update the existing test and add new cases**

Replace the body of `lib/analytics.test.ts` with:

```ts
import { it, expect, beforeEach, vi } from 'vitest'

vi.mock('./attribution', () => ({ getAttribution: vi.fn(() => ({})) }))
import { getAttribution } from './attribution'
import { pushLead, grantConsent } from './analytics'

beforeEach(() => {
  (window as any).dataLayer = []
  ;(window as any).gtag = (...a: any[]) => (window as any).dataLayer.push(a)
  vi.mocked(getAttribution).mockReturnValue({})
})

it('pushes a lead_submit event with brand', () => {
  pushLead({ origine: 'vetrina', pagina: '/prezzi' })
  expect((window as any).dataLayer).toContainEqual({
    event: 'lead_submit', origine: 'vetrina', pagina: '/prezzi', brand: 'diploma360',
  })
})

it('merges attribution and user_data, dropping empty user_data keys', () => {
  vi.mocked(getAttribution).mockReturnValue({ gclid: 'X1' })
  pushLead({
    origine: 'landing-ads', pagina: '/lp',
    user_data: { email: 'a@b.it', phone_number: '', name: 'Ada' },
  })
  expect((window as any).dataLayer).toContainEqual({
    event: 'lead_submit', origine: 'landing-ads', pagina: '/lp', brand: 'diploma360',
    gclid: 'X1', user_data: { email: 'a@b.it', name: 'Ada' },
  })
})

it('omits user_data entirely when all keys are empty', () => {
  pushLead({ origine: 'vetrina', pagina: '/', user_data: { email: '', phone_number: '' } })
  const pushed = (window as any).dataLayer.at(-1)
  expect(pushed).not.toHaveProperty('user_data')
})

it('grants all consent signals', () => {
  grantConsent()
  expect((window as any).dataLayer).toContainEqual(['consent','update',{ ad_storage:'granted', analytics_storage:'granted', ad_user_data:'granted', ad_personalization:'granted' }])
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/analytics.test.ts`
Expected: FAIL — pushed object lacks `brand` / `user_data` handling.

- [ ] **Step 3: Implement**

Replace `pushLead` in `lib/analytics.ts` (keep `grantConsent` and the `declare global` block). Add imports at the top:

```ts
import { brand } from '@/lib/brand'
import { getAttribution } from '@/lib/attribution'
```

Replace lines 18-21 with:

```ts
export interface UserData {
  email?: string
  phone_number?: string
  name?: string
}

export function pushLead(p: {
  origine: string
  pagina: string
  user_data?: UserData
}): void {
  if (typeof window === 'undefined') return
  const cleaned = p.user_data
    ? Object.fromEntries(Object.entries(p.user_data).filter(([, v]) => v))
    : {}
  window.dataLayer.push({
    event: 'lead_submit',
    origine: p.origine,
    pagina: p.pagina,
    brand: brand.id,
    ...getAttribution(),
    ...(Object.keys(cleaned).length ? { user_data: cleaned } : {}),
  })
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/analytics.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/analytics.ts lib/analytics.test.ts
git commit -m "feat(analytics): pushLead carries brand, attribution, user_data"
```

---

### Task 3: `AttributionCapture` component + mount in root layout

**Files:**
- Create: `components/analytics/AttributionCapture.tsx`
- Modify: `app/layout.tsx:57` (mount after `<GtmScript />`)

**Interfaces:**
- Consumes: `captureAttribution()` from Task 1.
- Produces: `<AttributionCapture />` — renders `null`, runs capture once on mount.

- [ ] **Step 1: Create the component**

```tsx
// components/analytics/AttributionCapture.tsx
'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/lib/attribution'

/**
 * Runs once per page load, on every route, to persist ad-click identifiers
 * (gclid/utm/…) from the landing URL into the mkt_attr cookie before the user
 * navigates or submits a lead. No UI.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution()
  }, [])
  return null
}
```

- [ ] **Step 2: Mount in the layout**

In `app/layout.tsx`, add the import next to the other component imports (after line 4):

```tsx
import { AttributionCapture } from '@/components/analytics/AttributionCapture'
```

Then in `<body>`, add it immediately after `<GtmScript />` (line 57):

```tsx
      <body>
        <GtmScript />
        <AttributionCapture />
        <ChromeGate><SiteHeader /></ChromeGate>
```

- [ ] **Step 3: Verify build compiles**

Run: `NEXT_PUBLIC_BRAND=diploma360 npm run build`
Expected: build succeeds; no type errors.

- [ ] **Step 4: Commit**

```bash
git add components/analytics/AttributionCapture.tsx app/layout.tsx
git commit -m "feat(analytics): mount AttributionCapture site-wide in root layout"
```

---

### Task 4: `LeadForm` — pass user_data & propagate click ids to the redirect

**Files:**
- Modify: `components/forms/LeadForm.tsx` (imports; the `pushLead`/`router.push` block at lines 136-141)
- Test: `components/forms/LeadForm.test.tsx`

**Interfaces:**
- Consumes: `pushLead` (Task 2, new `user_data` param), `getAttribution` (Task 1).
- Produces: no new exports. Behavior: on success, `pushLead({ origine, pagina, user_data:{ email, phone_number: telefono, name: nome } })` fires, THEN `router.push(<thankYouUrl with ?gclid/&gbraid/&wbraid>)`.
- Note: `RipForm.tsx` is a thin `LeadForm` wrapper — no separate change needed.

- [ ] **Step 1: Read the current test to preserve its mocks**

Run: `sed -n '1,40p' components/forms/LeadForm.test.tsx` — note the existing `vi.mock('next/navigation', …)` and `vi.mock('@/lib/analytics', …)`.

- [ ] **Step 2: Add/extend the tests**

Ensure the top of `components/forms/LeadForm.test.tsx` mocks attribution and captures the router:

```ts
vi.mock('@/lib/analytics', () => ({ pushLead: vi.fn() }))
vi.mock('@/lib/attribution', () => ({ getAttribution: vi.fn(() => ({})) }))
const push = vi.fn()
vi.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))

import { pushLead } from '@/lib/analytics'
import { getAttribution } from '@/lib/attribution'
```

Add these two tests (adapt the existing fill-and-submit helper already used in the file; it fills nome/email/telefono/consenso and submits):

```ts
it('passes user_data to pushLead on submit', async () => {
  // ...render a vetrina LeadForm, fill email=a@b.it, telefono=3331234567, nome=Ada, check consenso, submit...
  await waitFor(() => expect(pushLead).toHaveBeenCalledWith(
    expect.objectContaining({
      origine: 'vetrina',
      user_data: { email: 'a@b.it', phone_number: '3331234567', name: 'Ada' },
    }),
  ))
})

it('appends stored click ids to the thank-you redirect', async () => {
  vi.mocked(getAttribution).mockReturnValue({ gclid: 'G1', wbraid: 'W1', utm_source: 'google' })
  // ...render a landing-ads LeadForm, fill + submit...
  await waitFor(() => expect(push).toHaveBeenCalledWith('/lp-thank-you-page?gclid=G1&wbraid=W1'))
})
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npx vitest run components/forms/LeadForm.test.tsx`
Expected: FAIL — `pushLead` called without `user_data`; `push` called without query string.

- [ ] **Step 4: Implement**

In `components/forms/LeadForm.tsx` add the import (after line 17):

```tsx
import { getAttribution } from '@/lib/attribution'
```

Add this helper above the component (after `sanitizePhone`, ~line 53):

```tsx
// Carry the click identifiers Google Ads needs onto the thank-you URL, so a
// conversion tag firing on that page still sees them after the SPA redirect.
const CLICK_IDS = ['gclid', 'gbraid', 'wbraid'] as const

function withClickIds(route: string): string {
  const attr = getAttribution()
  const qs = new URLSearchParams()
  for (const k of CLICK_IDS) if (attr[k]) qs.set(k, attr[k])
  const s = qs.toString()
  return s ? `${route}?${s}` : route
}
```

Replace the success block (lines 136-141) with:

```tsx
      // Fire the GTM event first, then client-side navigate to the thank-you
      // page. router.push keeps the SPA context alive so the dataLayer event
      // isn't cut off by a full reload. Stay in 'loading' so the button remains
      // disabled during the redirect.
      pushLead({
        origine,
        pagina,
        user_data: { email, phone_number: telefono, name: nome },
      })
      router.push(withClickIds(THANK_YOU_ROUTE[origine]))
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npx vitest run components/forms/LeadForm.test.tsx`
Expected: PASS (all cases, including the pre-existing redirect tests).

- [ ] **Step 6: Commit**

```bash
git add components/forms/LeadForm.tsx components/forms/LeadForm.test.tsx
git commit -m "feat(leadform): send user_data for Enhanced Conversions; carry click ids to thank-you"
```

---

### Task 5: Full verification (both brands, whole suite)

**Files:** none (verification only).

- [ ] **Step 1: Full test suite is pristine**

Run: `npm test`
Expected: all pass, no new warnings (layout.test.tsx Google-Fonts fetch noise is expected).

- [ ] **Step 2: Build Diploma360**

Run: `NEXT_PUBLIC_BRAND=diploma360 npm run build`
Expected: success.

- [ ] **Step 3: Build La Scuola360**

Run: `NEXT_PUBLIC_BRAND=lascuola360 npm run build`
Expected: success.

- [ ] **Step 4: Confirm no hardcoded-brand regression**

Run: `npx vitest run test/no-hardcoded-brand.test.ts`
Expected: PASS.

---

## Self-Review

**Spec coverage:**
- Pillar A1 `lib/attribution.ts` → Task 1 ✓
- Pillar A2 `AttributionCapture` + layout mount → Task 3 ✓
- Pillar A3 URL passthrough → GTM runbook (non-code, out of this plan) ✓
- Pillar B1 Enhanced Conversions → data (`user_data`) provided in Tasks 2 & 4; tag config in runbook ✓
- Pillar B2 `pushLead` extended (user_data + attribution + brand) → Task 2 ✓
- Pillar B3 query propagation in redirect → Task 4 ✓
- Multi-brand: neutral cookie (Task 1), `brand` in dataLayer (Task 2) ✓
- Testing + both-brand builds → Task 5 ✓
- RipForm: thin wrapper, covered by Task 4 (noted) ✓

**Placeholder scan:** Test bodies in Task 4 reference "the existing fill-and-submit helper" — this is a real instruction to reuse the file's existing pattern, not a code placeholder; the assertions are concrete. All code steps show full code.

**Type consistency:** `captureAttribution`/`getAttribution`/`ATTR_PARAMS` names match across Tasks 1→2→4. `UserData` shape `{email, phone_number, name}` consistent in Tasks 2 & 4. `pushLead` signature identical in Tasks 2 & 4. Cookie `mkt_attr` consistent.
