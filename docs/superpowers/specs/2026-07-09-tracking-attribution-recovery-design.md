# Tracking Attribution Recovery — Design

**Date:** 2026-07-09
**Status:** Approved (design), pending implementation
**Branch:** `fix/tracking-attribution`

## Problem

Since the new Next.js landing went live (~3–4 Jul 2026), tracking is incoherent across three
surfaces at once:

1. **GTM:** triggers fire correctly (client-side debug looks green).
2. **GA4:** total users — and especially the **Paid Search / Cross-network** channels — collapse
   from ~3 Jul and never recover; yet GA4 **conversions rise**.
3. **Google Ads:** **conversions disappear** while click/traffic volume stays coherent.

### Root cause (evidenced in code)

The new site preserves **no ad identifiers**. A repo-wide grep for
`gclid|gbraid|wbraid|utm_|searchParams|URLSearchParams|location.search` returns **zero** matches.
On lead submit, `LeadForm.tsx:141` does a client-side `router.push(THANK_YOU_ROUTE[origine])` which
**drops the query string**. Combined with Consent Mode default-`denied`
(`components/gtm/ConsentDefault.tsx`), the `gclid` is available nowhere by the time a conversion
fires.

This single gap explains all three symptoms:

- **A trigger firing ≠ an attributed hit.** It only means the browser met the condition and the tag
  executed — not that the `gclid` was present or that consent let the request through. Hence GTM
  looks fine while attribution is broken downstream.
- **Google Ads:** clicks are counted by Ads itself (traffic coherent), but a conversion is tied to a
  click **only via `gclid`**. The Ads conversion fires on `/lp-thank-you-page`, reached via
  `router.push` → URL without `gclid`; and under consent-denied the `_gcl` cookie is never written.
  No `gclid` anywhere → **Ads conversions = 0**.
- **GA4 paid collapse:** GA4 classifies a session as Paid/Cross-network only if it sees `gclid`
  (auto-tagging) or `utm_medium=cpc`. Without it, sessions re-bucket to Direct/Organic → Paid channel
  craters; consent-denied cookieless pings add undercounting of the total.
- **GA4 conversions rise:** GA4 counts the conversion on the *event* (TY `page_view` / `lead_submit`)
  using its own `client_id` — **no `gclid` needed** — so GA4 keeps counting while Ads goes to zero.

## Goals

- Restore Paid-channel attribution in GA4.
- Restore conversion attribution in Google Ads, robust to Consent Mode `denied`.
- Do it coherently **site-wide** (paid traffic also lands on city / diploma / home pages, not only
  `/lp`), and keep Diploma360's existing output byte-identical where components are shared.

## Non-goals

- No change to the visual site, copy, prices, or the honest-claims constraints.
- No new analytics vendor. We work within the existing GTM + GA4 + Google Ads + Meta stack.

## Approach — two complementary pillars

The fix must survive Consent Mode `denied`, so it has a source-recovery pillar and a
conversion-recovery pillar. Neither alone is sufficient.

### Pillar A — Source recovery (GA4 Paid channel)

**A1. `lib/attribution.ts` (new).** Pure module, no React.
- `ATTR_PARAMS` = `['gclid','gbraid','wbraid','msclkid','fbclid','utm_source','utm_medium',
  'utm_campaign','utm_term','utm_content']`.
- `captureAttribution(search?: string): void` — parse `window.location.search` (arg override for
  tests). For each present, non-empty param, **last-click-wins**: overwrite the stored value.
  Params absent from the current URL are left untouched (do not clobber a prior click). Persist the
  merged object as JSON in a first-party cookie `mkt_attr` (brand-neutral — the same code builds both
  brands, and cookies are domain-scoped so `diploma360.it` / `lascuola360.it` never share it),
  `max-age` 90 days,
  `path=/; SameSite=Lax` (no `Secure` gate in dev; `Secure` in prod via `location.protocol`).
- `getAttribution(): Record<string,string>` — read + parse the cookie (empty object if absent/bad).
- SSR-safe: every function early-returns when `typeof window === 'undefined'` or document/cookie
  unavailable. Malformed cookie JSON → treated as empty, never throws.

**A2. `AttributionCapture` (new client component, no UI).** `useEffect(() => captureAttribution(), [])`.
Mounted **once in the root layout** next to the GTM scripts so it runs on every route's first paint,
before the user navigates or submits.

**A3. GTM URL passthrough** (runbook, non-code): enables `gclid` to pass through URLs under
consent-denied.

### Pillar B — Conversion recovery (Google Ads)

**B1. Enhanced Conversions for Leads** — the decisive lever. The form already collects
`nome`/`email`/`telefono`. On submit we push them into the `dataLayer` with `lead_submit` so GTM can
SHA-256 hash and send them; Google re-matches the conversion to the click **without** needing a
persisted `gclid`, compliant with Consent Mode (sent only when `ad_user_data` granted). Tag config =
runbook.

**B2. `pushLead` extended (`lib/analytics.ts`).** New signature:
```ts
pushLead(p: {
  origine: string
  pagina: string
  user_data?: { email?: string; phone_number?: string; name?: string }
}): void
```
The pushed object merges `getAttribution()` (gclid/utm/…), `user_data`, **and `brand: brand.id`**
(from `lib/brand.ts`). `user_data` keys are omitted when empty so the dataLayer stays clean. Raw PII
is acceptable here — GTM hashes before send and the send is consent-gated. `brand` is the routing key
(see multi-brand note).

**B3. Query propagation in the redirect (`LeadForm.tsx`, `RipForm.tsx`).** Belt-and-suspenders: build
the thank-you URL as `THANK_YOU_ROUTE[origine]` + a query string carrying the click ids from
`getAttribution()` (`gclid`/`gbraid`/`wbraid` only — utm not needed on TY). So an Ads conversion tag
that reads `gclid` from the URL still works even if it fires on the TY page. Read from the cookie (not
`location.search`) so it survives intra-site navigation. Order preserved: `pushLead(...)` fires
**before** `router.push(...)` (unchanged).

### Data flow

```
Ad click → /qualsiasi-pagina?gclid=X&utm_...   (any landing, site-wide)
  → AttributionCapture useEffect → captureAttribution() → cookie d360_attr (last-click-wins)
User submits LeadForm/RipForm
  → POST /api/lead (unchanged; server sets BRAND/PRODOTTO)
  → pushLead({ origine, pagina, brand, user_data:{email,phone,name}, ...getAttribution() })  [dataLayer]
      → GTM: GA4 conversion + Ads conversion (Enhanced Conversions) + Meta
  → router.push('/grazie' | '/lp-thank-you-page' + '?gclid=X&gbraid=...')  [URL fallback]
```

## Multi-brand (Diploma360 + La Scuola360)

`lib/brand.ts` confirms the two brands **share one GTM container** (`GTM-K5VMGM8C`, commented
*"same GTM container / GA4 / Meta"*) but run on **different domains** (`www.diploma360.it` /
`www.lascuola360.it`) from separate App Hosting backends (`NEXT_PUBLIC_BRAND` per backend). Leads
already carry a server-set `BRAND` attribute in Brevo.

- **Code is brand-agnostic**: same `attribution.ts` / `AttributionCapture` / `pushLead` build for
  both. Two accommodations only: the cookie name is brand-neutral (`mkt_attr`), and `pushLead` pushes
  `brand: brand.id` so the shared container can **route per brand off a clean dataLayer variable**
  instead of fragile hostname parsing.
- **The brand split lives mostly in the GTM runbook**: one container serving two domains must decide
  how GA4 (single roll-up property vs per-brand), Google Ads (almost certainly two separate Ads
  accounts/conversions), and Meta (one shared pixel vs per-brand) are keyed. The `brand` dataLayer
  variable is the routing key throughout.

## Consent / GDPR stance

- `d360_attr` is first-party, purpose-limited to conversion attribution, 90-day life. It is written
  regardless of consent (needed to not lose pre-banner clicks), but **nothing is sent to Google/Meta
  from it except through consent-gated GTM tags** — Consent Mode governs the actual network send.
- Enhanced Conversions PII only transmits when `ad_user_data` is granted; under denied, Consent Mode
  modeling fills the gap. Compliant.
- Follow-up (not blocking implementation): document `d360_attr` in the cookie/privacy policy.

## GTM runbook (separate deliverable, `docs/` — non-code)

I (main session) author a step-by-step runbook covering, in order, with GTM Preview verification for
each step:
0. **Create a `brand` dataLayer variable** (reads the `brand` key pushed on `lead_submit`, plus a
   hostname-based fallback for page-view-scoped tags) — the routing key used by the steps below.
1. **Conversion Linker** tag firing on All Pages.
2. **Consent Mode URL passthrough** enabled.
3. **Enhanced Conversions for Leads** on the Google Ads conversion tag, mapping `user_data.email` /
   `user_data.phone_number` from the `lead_submit` dataLayer event. **Per brand**: if Diploma360 and
   La Scuola360 use separate Google Ads accounts, split the conversion tag by the `brand` variable
   (trigger on `brand equals diploma360` / `lascuola360`) so each fires into the right account.
4. **Verify GA4 tag**: confirm `GT-M3LW776G` resolves to the correct GA4 property/stream (a `G-…`
   measurement ID) and the config tag is not incorrectly consent-blocked; fires on All Pages.
   **Per brand**: decide single roll-up property (filter/segment by `brand`) vs one property per
   brand; if separate, gate each config tag by the `brand` variable.
5. **Reconcile Meta Pixel**: docs say `1460557338306322`, live container inits `1020929560296043` —
   pick the correct single ID; remove the duplicate. **Per brand**: confirm whether both brands share
   one pixel or need separate pixels/audiences; if separate, route by `brand`.
6. **End-to-end validation, per brand**: GTM Preview against **both** `diploma360.it` and
   `lascuola360.it`; GA4 DebugView + Google Ads tag diagnostics / Tag Assistant; confirm a test lead
   on each domain shows `gclid` + `user_data` + correct `brand` on `lead_submit`, and the Ads
   conversion registers (Enhanced Conversions match) in the right account.

## Testing

- **`lib/attribution.test.ts`** (new): capture writes cookie; last-click-wins overwrite; absent
  params don't clobber; missing/empty search → no-op; malformed cookie → empty object, no throw;
  `getAttribution` round-trip.
- **`lib/analytics.test.ts`** (extend): `pushLead` includes `user_data`, `brand`, and merged
  attribution; omits empty `user_data` keys.
- **`components/forms/LeadForm.test.tsx`** (extend): `pushLead` called with `user_data`; redirect URL
  carries `gclid` when the cookie has one (mock `getAttribution`). Existing `next/navigation` mock
  retained.
- **`npm test`** output must be pristine (no new warnings).
- **`NEXT_PUBLIC_BRAND=diploma360 npm run build`** and **`=lascuola360 npm run build`** both green.
  Diploma360 `/`, `/chi-siamo`, nav, footer, sitemap unchanged.

## Agent assignment (parallelized to save time)

- **Code** (`lib/attribution.ts`, `AttributionCapture`, `pushLead`, `LeadForm`/`RipForm`, tests,
  layout mount) → **`frontend-developer`** agent — web-client analytics instrumentation.
- **GTM runbook** (`docs/GTM-tracking-runbook.md`) → main session, in parallel.

## Files touched

- New: `lib/attribution.ts`, `lib/attribution.test.ts`, `components/analytics/AttributionCapture.tsx`,
  `docs/GTM-tracking-runbook.md`.
- Edited: `lib/analytics.ts`, `components/forms/LeadForm.tsx`, `components/forms/RipForm.tsx`,
  `app/layout.tsx` (mount `AttributionCapture`), plus the two extended test files.
- Unchanged intentionally: `ConsentDefault.tsx`, `GtmScript.tsx`, `/api/lead/route.ts`.
