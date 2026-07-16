# Schoolr rebrand landing — design

**Date:** 2026-07-16
**Status:** Approved (architecture + open decisions resolved), pending spec review.

## Goal

Add a **third brand** `schoolr` to the multi-brand site. The `schoolr` build serves a **single
page**: the "Schoolr → LaScuola360" rebrand-announcement landing (ported 1:1 from
`materiale/consegna-valerio/Schoolr Rebrand.dc.html`). It goes live on the **schoolr.net** domain
as its own Firebase App Hosting backend, using the **same `NEXT_PUBLIC_BRAND` strategy** as
`diploma360` and `lascuola360`.

The page is self-contained (its own header + footer), has **no form**, and all its CTAs point out
to **LaScuola360** (external domain). Every non-home path on schoolr.net 301-redirects to
`https://www.lascuola360.it/` (preserves SEO of legacy schoolr.net URLs; no 404s).

## Source content

`materiale/` is READ-ONLY reference. The page copy is founder/designer-approved and ported
**verbatim**. Section order (from `Schoolr Rebrand.dc.html`):

1. **Header** (sticky) — dual logo `Schoolr → LaScuola360`, phone + WhatsApp, CTA "Vai a LaScuola360".
2. **Hero** — dual logo, H1 "Siamo sempre noi. Ora ci chiamiamo LaScuola360.", subtitle, primary CTA
   "Entra in LaScuola360", 3 reassurance chips.
3. **Trust stats** — +20.000 studenti · +3.000 tutor · 1.500 materie · 4,7/5 Trustpilot.
4. **Perché** — "Da un servizio di ripetizioni a una vera scuola online."
5. **Cosa resta uguale** — 3 cards (stesso team/tutor · account valido · ripetizioni invariate).
6. **Novità · Diploma** — image + copy "Ora puoi arrivare fino al Diploma di Stato" (3 bullet).
7. **Novità · Strumenti** — quiz (big) + podcast / flashcard / riassunto.
8. **Continuità / Trust** — Classme S.r.l. (P.IVA 15441141007) + Trustpilot testimonial.
9. **Lead block (NO form)** — CTA "Vai a LaScuola360" + phone + WhatsApp.
10. **Footer** (dark) — "LaScuola360" · © 2026 Classme S.r.l. · P.IVA · sede Roma.

### Content constraints honored
- Honest claims only: "Diploma di Stato riconosciuto" (no MIM/MIUR). Study-tools framing OK.
- No prices except the stat figures; no "senza interessi".
- Contacts verbatim: `tel:0684280999`, `https://wa.me/393517214644`.
- The designer writes **"LaScuola360"** (no space); kept verbatim even though the `lascuola360`
  brand's `name` is **"La Scuola360"**. This page is the schoolr→lascuola creative — do not normalize.

## Architecture

### 1. `lib/brand.ts` — add the `schoolr` brand
- Extend `BrandId` to `'diploma360' | 'lascuola360' | 'schoolr'`.
- Add a `schoolr` entry to `BRANDS` with **every `Brand` field populated** (TS requires it), even
  where unused by the single page:
  - `name: 'Schoolr'`
  - `domain: 'https://schoolr.net'`
  - `logo`: `header`/`lp`/`ogImage` under `/schoolr/…`, `alt: 'Schoolr — ora LaScuola360'`
  - `contacts: SHARED_CONTACTS` (phone/WhatsApp shared; email irrelevant — no form)
  - `gtmId: 'GTM-K8W5CM7C'` (schoolr's own container: GA4 `G-Q0817JQ7RN` + Meta pixel
    `1095747563947293`, for audience/analytics continuity)
  - `legal: { entity: 'Classme S.r.l.', iubendaPolicyId: '43474147' }`
  - `platformHost: 'app.lascuola360.it'` (unused; placeholder)
  - `header`: placeholder (`showPhone:false`, CTA to lascuola360) — unused (chrome hidden)
  - `copy`: placeholder strings — unused (no shared pages rendered)

### 2. `app/page.tsx` — 3-way home selector
```
brand.id === 'schoolr'     → <HomeSchoolr/>
brand.id === 'lascuola360' → <HomeLaScuola/>
else                       → <HomeDiploma/>
```
Metadata: `buildMetadata({ title: 'Schoolr ora è LaScuola360', description: …, path: '/' })` —
canonical resolves to `https://schoolr.net/`. **Indexable** (this is the public schoolr.net home).

### 3. `components/home/HomeSchoolr.tsx` + `home-schoolr.css`
- Self-contained: renders its own `<header>` and `<footer>` (the site chrome is hidden for schoolr).
- Follows project convention: `import './home-schoolr.css'` at top; **plain global classes**
  (NOT CSS Modules). The `.dc.html` is inline-style-heavy → extract styles into `home-schoolr.css`
  as `.sr-*`-prefixed classes; JSX uses `className`. Keep the responsive `@media` rules and the
  `sr-arrowpulse` keyframe from the source `<style>` block.
- Fonts: rely on the root layout's Google-Fonts `<link>` (Poppins/Inter) — do NOT re-add a font link.
- Images: `next/image` from `/schoolr/…` (matches the port convention in HomeLaScuola).
- **Link rewrites** (source `.dc.html` → production):
  - `Home Scuola360.dc.html` → `https://www.lascuola360.it/`
  - `Ripetizioni.dc.html` → `https://www.lascuola360.it/ripetizioni`
  - phone/WhatsApp → unchanged (`brand.contacts.*`).
- No `<JsonLd>` required (rebrand landing); optional `Organization` JSON-LD may be added but is not
  in scope.

### 4. Chrome — hide site header/footer for schoolr
`components/layout/ChromeGate.tsx`: add an early `if (brand.id === 'schoolr') return null`
(alongside the existing `/lp` check). Hides both `<SiteHeader/>` and `<BrandFooter/>` for the whole
schoolr build. GTM/consent/cookie-banner from the root layout still apply (same as `/lp`).

### 5. `middleware.ts` (NEW) — legacy-route redirect (schoolr only)
- No-op for `diploma360`/`lascuola360` (early return; `brand.id` is build-time inlined).
- For `schoolr`: any matched path **≠ `/`** → `NextResponse.redirect('https://www.lascuola360.it/', 301)`.
- Matcher excludes Next internals + all files with an extension (assets), so `/schoolr/*.png`,
  `/_next/*`, `/favicon.ico`, `/og-image*.png`, `/sitemap.xml`, `/robots.txt`, `/api/*` are NOT
  redirected: `matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)']` (verify against Next 16
  docs in `node_modules/next/dist/docs/` before finalizing).
- Compatible with `output: 'standalone'` + Firebase App Hosting.

### 6. `app/sitemap.ts` — schoolr emits only `/`
Add a `brand.id === 'schoolr'` early branch returning a single entry (`/`, priority 1.0). Skip the
diploma STATIC_ROUTES, ripetizioni, city, and diploma entries. `robots.ts` is unchanged (allow `/`,
disallow `/lp`,`/api/`) and stays correct (middleware handles the rest).

### 7. Assets → `public/schoolr/`
Copy from `materiale/consegna-valerio/assets/`:
`logo-lascuola360.svg`, `studentessa.jpg`, `mock-quiz.png`, `mock-podcast.png`,
`mock-flashcard.png`, `testimonial-giulia.jpg`.
**`logo-schoolr.png` is missing** from the assets folder (referenced but only inlined as base64 in
`ANTEPRIMA - Schoolr Rebrand.html`). Resolution: **extract it from the ANTEPRIMA base64** during
implementation and write to `public/schoolr/logo-schoolr.png`. (If extraction fails or quality is
poor, ask the founder for the source PNG/SVG.)

## What stays unchanged (regression guard)
- `diploma360` and `lascuola360` builds: `/`, `/chi-siamo`, nav, footer, sitemap **byte-identical**.
  The only shared files touched (`app/page.tsx`, `ChromeGate.tsx`, `app/sitemap.ts`, `lib/brand.ts`)
  add a `schoolr` branch **before/around** the existing logic without altering the other two paths.
- `no-hardcoded-brand` guard: the page copy contains "Schoolr", "LaScuola360", "Diploma di Stato"
  — none match the guarded literals (`Diploma360`, `www.diploma360.it`). Safe.

## Verification
- `NEXT_PUBLIC_BRAND=schoolr npm run build` — succeeds; `/` renders the rebrand page; other routes
  are unreachable via middleware; sitemap = only `/`.
- `NEXT_PUBLIC_BRAND=diploma360 npm run build` and `=lascuola360 npm run build` — unchanged output
  for `/`, `/chi-siamo`, nav, footer, sitemap.
- `npm test` — pristine (add/adjust brand-related tests if any assert the `BrandId` union).
- Visual check of the schoolr `/` against `ANTEPRIMA - Schoolr Rebrand.html` (browser).

## Deploy (follow-up, not in this change)
- New Firebase App Hosting backend `schoolr-site` in project `schoolrcloud`, on `main`, with
  `NEXT_PUBLIC_BRAND=schoolr` (per-backend env, not a secret). Point `schoolr.net` DNS at it.
  Document in `docs/DEPLOY.md §G` alongside the other two backends.

## Out of scope
- Any second schoolr page, form, or lead capture (the page is intentionally form-less).
- Reconciling the "LaScuola360" vs "La Scuola360" spelling globally.
- Meta pixel ID reconciliation for the other brands (tracked separately in AGENTS.md).
