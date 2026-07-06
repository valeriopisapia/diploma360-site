# Multi-brand (Diploma360 + La Scuola360) — Design

**Date:** 2026-07-06
**Status:** Approved (design) — pending spec review
**Approach:** A — single `main` branch + build-time brand config selected per Firebase project

## Goal

Serve a **second brand, "La Scuola360"**, from the **same repository and same content** as
Diploma360, changing only brand-specific attributes (name, logo, domain, tracking, Brevo list).
It is a **pure rebrand**: identical pages, copy, prices, city/diploma lists, layout, and **colours**.

## Why approach A (not a dedicated branch)

Content is identical between brands, so a long-lived `lascuola360` branch would be permanent
maintenance overhead — every change on `main` would need merging, with recurring conflicts on
exactly the brand files (name/logo/contacts), plus drift risk. Instead:

- One `main` branch, one source of truth.
- Brand-specific values live in a **brand config module**, selected at build time by an env var
  `NEXT_PUBLIC_BRAND` (default `diploma360`).
- **Both** Firebase App Hosting backends build from `main`; the La Scuola360 backend sets
  `NEXT_PUBLIC_BRAND=lascuola360` (+ its own `BREVO_LIST_ID`). No divergent branch.

A fix or feature ships to both brands automatically. Adding a 3rd brand = one config entry +
assets + a Firebase project.

## Brand config module — `lib/brand.ts`

Single source of truth for everything that differs per brand. Secrets stay in env (not here).

```ts
export type BrandId = 'diploma360' | 'lascuola360'

export type Brand = {
  id: BrandId
  name: string                 // visible/structured brand name
  domain: string               // canonical origin, e.g. https://www.diploma360.it
  logo: {
    header: string             // SiteHeader <img> src
    lp: string                 // LpHeader/LpFooter <img> src
    alt: string
    ogImage: string            // absolute or /public path for OG/Twitter
  }
  contacts: { tel: string; telHref: string; whatsappUrl: string; email: string }
  gtmId: string                // GTM-xxxx (per-brand container)
  legal: { entity: string; iubendaPolicyId: string }
}

const BRANDS: Record<BrandId, Brand> = {
  diploma360: { /* current live values, unchanged */ },
  lascuola360: { /* La Scuola360 values; placeholders where TBD */ },
}

// Unknown value → throw at module load so a misconfigured build fails loudly.
export const brand: Brand = resolveBrand(process.env.NEXT_PUBLIC_BRAND)
```

- `resolveBrand` defaults to `diploma360` when the env var is unset; throws on an unknown value.
- `NEXT_PUBLIC_BRAND` is a public build-time flag (inlined by Next). Available on both client and
  server, so `GtmScript` (client) and `/api/lead` (server) can both read `brand`.

### Known values

| Field | diploma360 | lascuola360 |
|---|---|---|
| name | `Diploma360` | `La Scuola360` |
| domain | `https://www.diploma360.it` | `https://www.lascuola360.it` |
| contacts.tel / telHref | `06 8428 0999` / `tel:0684280999` | **same (shared)** |
| contacts.whatsappUrl | `https://wa.me/393517214644` | **same (shared)** |
| contacts.email | `info@diploma360.it` | **same (shared)** |
| logo.* | current PNGs + `/og-image.png` | **from `LaScuola360_logo_vettoriale.svg`** (assets TBD) |
| gtmId | `GTM-K5VMGM8C` | **TBD** (own container) |
| legal.entity | `Classme S.r.l.` | `Classme S.r.l.` (confirm) |
| legal.iubendaPolicyId | `43474147` | **TBD** (may reuse if same entity/coverage) |

Contacts are shared today but modelled per-brand so a future split needs no refactor.

## Refactor surface (de-hardcode → `brand`)

1. **`lib/seo.ts`** — `SITE`/`SITE_NAME` → `brand.domain`/`brand.name` (title, canonical, OG,
   Twitter, `metadataBase`).
2. **`components/gtm/GtmScript.tsx`** — `GTM_ID` → `brand.gtmId`.
3. **Logo + alt** — `components/layout/SiteHeader.tsx`, `app/lp/LpHeader.tsx`, `app/lp/LpFooter.tsx`
   → `brand.logo`.
4. **Contacts** — ~27 files hardcoding `0684280999` / `wa.me/393517214644` / `info@diploma360.it`
   → `brand.contacts`.
5. **Brand name in copy** — ~25 pages containing the literal `Diploma360` → `{brand.name}`. Only the
   visible/structured name and alt text; **not** asset filenames (`logo-diploma360.png` stays,
   handled via `brand.logo`) and **not** code comments.
6. **`components/legal/IubendaPolicy.tsx`** — policy id → `brand.legal.iubendaPolicyId`.
7. **`app/sitemap.ts` / `app/robots.ts`** — confirm they derive the base URL from `brand.domain`.
8. **`data/citta.ts` / `data/diplomi.ts`** — audit for the literal brand name and tokenize if present.

## Assets

Add La Scuola360 assets alongside Diploma360's (no removals); `brand.logo` points to the right set:
- Header + LP logo derived from `LaScuola360_logo_vettoriale.svg` (match existing header sizing; keep
  raster fallbacks consistent with current `<img>` usage).
- `og-image` for La Scuola360; `icon.svg`/favicon + `theme-color` if brand-specific (colours are the
  same, so theme-color likely unchanged).

## Deploy & environment

- **Two Firebase App Hosting backends, both building from `main`** (two separate Firebase projects).
- Brand selected by `NEXT_PUBLIC_BRAND`, set **per project**. Because it must be present at **build**
  time (Next inlines `NEXT_PUBLIC_*`), expose it with `availability: [BUILD, RUNTIME]`. Mechanism to
  finalize against App Hosting docs; preferred: a Secret-Manager-backed env declared once in
  `apphosting.yaml` (mirrors the existing `BREVO_*` secrets), with each project's Secret Manager
  holding its own value (`diploma360` / `lascuola360`). Alternative: App Hosting environment-specific
  config. **This is the one item to verify against current App Hosting docs during implementation.**
- Per-project runtime env: `BREVO_LIST_ID` (La Scuola360's list). Same Classme Brevo account reuses
  the existing `BREVO_API_KEY`; a separate account would set its own key too.

## Analytics (Google / Meta)

- Each brand has its **own GTM container** (`brand.gtmId`). GA4 + Meta Pixel remain configured
  **inside** each container (not in code), exactly as today — so no code changes for GA/Meta, only a
  different container id per brand.
- **Finding (2026-07-06):** the current live `www.lascuola360.it` (Divi/WordPress) has **no GTM, no
  GA4, and no Meta Pixel** in its markup (only Trustindex reviews + Brevo `sibforms`) — nothing to
  import the way `GTM-K5VMGM8C` was reused for Diploma360. La Scuola360's tags must be **created
  fresh** (new GTM container + GA4 + Meta Pixel inside it) or supplied by the user if they exist
  elsewhere. `brand.gtmId` stays a placeholder until then.
- Consent Mode v2 default-denied ordering (`ConsentDefault` before `GtmScript`) is unchanged.
- Clean separation: no cross-brand analytics contamination.

## Testing

- Unit-test `resolveBrand`: unset → `diploma360`; `lascuola360` → La Scuola360; unknown → throws.
- Assert `lib/seo.ts` and `GtmScript` consume the active brand (domain/name/gtmId).
- Update `app/layout.test.tsx` (currently asserts `GTM-K5VMGM8C`) to be brand-aware (default brand).
- **Anti-regression guard:** a test that fails if the literal `Diploma360` reappears in page copy
  outside `lib/brand.ts` (prevents new hardcodes). Scope the scan to `app/`, `components/`, `data/`.
- Build both brands: `NEXT_PUBLIC_BRAND=lascuola360 npm run build` succeeds and emits La Scuola360
  name/logo/domain/GTM. Keep `npm test` output pristine.

## Docs

- `AGENTS.md`: document the brand system; mark contacts/entity/GTM/Brevo-list/domain as **per-brand**;
  keep the verbatim-price and honest-claims constraints (identical for both brands).

## Non-goals / out of scope

- No content, pricing, page, or city/diploma differences between brands (pure rebrand).
- No colour/theme divergence (identical palette).
- No runtime per-hostname brand switching (rejected approach C — fights the SSG model).
- No dedicated `lascuola360` branch (rejected approach B).

## Open values to provide before/at La Scuola360 launch

`gtmId`, `legal.iubendaPolicyId`, La Scuola360 `BREVO_LIST_ID`, and the La Scuola360 assets
(logo/og/favicon). All have a defined home in the design; only the values are pending.

## Suggested implementation phases (for the plan)

1. Brand config module + centralize `seo.ts`, `GtmScript`, logos, contacts, Iubenda (diploma360
   values only — behaviour identical, all tests green).
2. Tokenize the brand name in page copy + the anti-regression guard.
3. La Scuola360 assets + brand entry; verify `NEXT_PUBLIC_BRAND=lascuola360` build.
4. Deploy/env wiring (apphosting env mechanism) + `AGENTS.md` update.
