<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Diploma360 — project guide

Marketing site + Ads landing for **Diploma360** (Classme S.r.l.), an Italian online
state-diploma / "recupero anni scolastici" service. Next.js port of the static sources in
`materiale/` (READ-ONLY reference — never edit `materiale/`).

## Commands
- `npm run dev` — dev server (uses `.env.local`'s `NEXT_PUBLIC_BRAND` if set)
- `npm run dev:diploma360` / `npm run dev:lascuola360` — dev server forced to a brand (inline env
  wins over `.env.local`). Multi-brand: the active brand is chosen at BUILD by `NEXT_PUBLIC_BRAND`.
- `npm run build` — production build (verify changes with this; page ports have no unit tests).
  Verify a specific brand with `NEXT_PUBLIC_BRAND=<brand> npm run build`.
- `npm test` — Vitest (happy-dom). Output must be pristine (no warnings). Component tests that use
  `next/navigation` (e.g. `LeadForm`'s `useRouter`) must `vi.mock('next/navigation', …)`. The benign
  Google-Fonts `fetch` errors from `layout.test.tsx` are happy-dom noise, not failures.

## Stack
Next.js 16 (App Router, **Turbopack**), React 19, TypeScript, Tailwind (utility only — does NOT
replace the design system), Vitest + happy-dom, `sharp` (image optimisation).

## Architecture & routing
- SSG pages + one dynamic API route `app/api/lead/route.ts` (only server code).
- **Cities (19):** `app/[slug]/page.tsx` is a ROOT catch-all serving
  `/recupero-anni-scolastici-<city>`. Why root catch-all: a folder named
  `recupero-anni-scolastici-[citta]` is NOT a valid Next dynamic segment (the WHOLE folder name
  must be `[param]`). So `[slug]` captures the full segment; `generateStaticParams` returns the
  full slugs; `dynamicParams = false` → 404 for anything else. Static routes still win over it.
- **Diplomas (20):** `app/diplomi/[slug]/page.tsx` (valid nested dynamic segment) + `app/diplomi/page.tsx` (index).
- **Landing:** `app/lp/` — `noindex`, excluded from sitemap/menu, its OWN chrome. The site
  header/footer are hidden on `/lp` by `components/layout/ChromeGate.tsx` (client, `usePathname`),
  which wraps `<SiteHeader/>` and `<BrandFooter/>` in the root layout. GTM/consent/cookie banner
  still apply. LP chrome is componentised in `app/lp/`: `LpHeader`, `LpFooter`, `LpFloatActions`.
- **Per-brand pages (multi-brand):** `/` and `/chi-siamo` are thin **selectors** on `brand.id`
  (`HomeDiploma`/`HomeLaScuola`, `ChiSiamoDiploma`/`ChiSiamoLaScuola`). La-Scuola360-ONLY routes
  `app/ripetizioni/*` (landing + come-funziona + prezzi + materie) call `assertBrand('lascuola360')`
  (→ 404 on Diploma360, excluded from its sitemap). Footer is per-brand via `BrandFooter`
  (`RipFooter` for La Scuola360, `Footer` for Diploma360). Nav is data-driven per brand
  (`data/navigazione.ts` `getHeaderNav()` → `MegaMenu`/`MobileMenu`). Scroll/counter motion:
  `components/motion/Reveal.tsx` (honors `prefers-reduced-motion`). See the **Brands** section.
- **Thank-you pages:** `/grazie` (vetrina) + `/lp-thank-you-page` (ads funnel). On success `LeadForm`
  redirects here by `origine` (client-side `router.push`, AFTER the GTM event). `/lp-thank-you-page`
  is a top-level route (outside `app/lp/`), so it imports `../lp/lp.css` and reuses the LP chrome
  components. The `/lp` prefix in ChromeGate AND `robots.ts` disallow intentionally also matches
  `/lp-thank-you-page`; both TY pages are `noindex` + absent from `app/sitemap.ts`.
- City/diploma per-item copy lives in `data/citta.ts` / `data/diplomi.ts` (single template + data).

## Conventions
- **Design system = `styles/site.css`** (ported verbatim; the single source of brand colours).
  Brand tokens: corallo `#E48267`, gradient `#E3815A → #EC89C0`, verde AA `#16a34a`.
  `site.css` uses **literal font-family names** `'Inter'`/`'Poppins'` → fonts are loaded via a
  Google Fonts `<link>` in the root layout (NOT `next/font`, whose hashed names wouldn't match).
- **Page-specific CSS = plain global `app/<route>/<name>.css`** imported at top of the page —
  NOT CSS Modules (the ported markup uses bare global class names; Modules would hash them).
- **Metadata:** every page uses `buildMetadata()` from `lib/seo.ts` (title, description, canonical
  under `https://www.diploma360.it`, OpenGraph + Twitter + default `/og-image.png`). Root layout
  sets `metadataBase` + `viewport` (theme-color).
- **Structured data:** `<JsonLd>` (`components/seo/JsonLd.tsx`) — EducationalOrganization, Course,
  FAQPage, BreadcrumbList.
- Header/footer/cookie banner come from the root layout; pages must NOT render them.
- **Form in fondo:** `components/forms/LeadSection.tsx` is the reusable bottom-of-page conversion
  block (`id="lead"` + `LeadForm`, `origine="vetrina"`). Content pages that need an in-page form use
  it (prezzi, diplomi index, and the institutional pages); on-page CTAs point to `#lead` (in-page),
  NOT `/#lead` (home). City + diploma-detail templates have their own `id="lead"` form already.

## Non-negotiable content constraints (founder-approved; enforce on every edit)
- Prices VERBATIM: `1.500 / 1.900 / 2.900 €`; rates `72,68 / 92,06 / 140,52 €/mese × 24`.
  **NEVER write "senza interessi".**
- Honest claims only: never "facciamo al posto tuo"; "Diploma di Stato riconosciuto" (never
  "MIM"/"MIUR"); "Coordinatrice del percorso". **No AI-capability claims** (the honest
  "study tools / Riepilogo360" framing is fine; the `tutor_ai.png` mock + `--ai-*` css var are
  faithful-to-source and OK).
- Contacts: `tel:0684280999`, WhatsApp `https://wa.me/393517214644`. Email is **per-brand**
  (`brand.contacts.email`): Diploma360 `info@diploma360.it`, La Scuola360 `info@lascuola360.it`
  (phone/WhatsApp shared). Never hardcode — use `brand.contacts.*`.
- Partner logos: fake/placeholder stay with disclaimer. **Luxottica was removed on request — do
  not re-add it** even though the asset file exists.

## Integrations
- **GTM** `GTM-K5VMGM8C` with **Consent Mode v2** (default denied, granted by the cookie banner).
  GA4 `GT-M3LW776G` + Meta Pixel `1460557338306322` are configured IN GTM, not in code.
  (Heads-up: the live GTM container currently inits Meta Pixel `1020929560296043` — reconcile which
  is correct before trusting Meta conversions.)
  `LeadForm` fires `dataLayer.push({event:'lead_submit', origine, pagina})` on success, then
  redirects to the thank-you page. Its phone field accepts ONLY digits + an optional leading `+`,
  capped at 15 (live `onInput` filter + submit-time `^\+?\d{6,15}$` guard).
  `ConsentDefault` must render in `<head>` BEFORE `GtmScript` (root layout ordering).
- **Brevo** (`lib/brevo.ts` + `/api/lead`): list `BREVO_LIST_ID=41`, attributes (text):
  `NOME, TELEFONO, PER_CHI, MESSAGGIO, PAGINA_ARRIVO, ORIGINE, DATA_RICHIESTA, BRAND, PRODOTTO`.
  `BRAND` is set **server-side** from `brand.name` (route.ts) — distinguishes the two brands sharing
  list 41. `PRODOTTO` is **client-supplied** (`LeadForm` prop, default `'Diploma'`; `RipForm` sends
  `'Ripetizioni'`) — distinguishes the two products. Both Brevo attributes must exist (created
  2026-07; `BRAND` 2026-07-06, `PRODOTTO` 2026-07-08).
  GOTCHAS learned: use a Brevo **API key** (`xkeysib-`), NOT an SMTP key (`xsmtpsib-`) → else 401;
  disable Brevo **"Authorised IPs"** (serverless egress IPs are dynamic) → else 401. The phone
  ALWAYS goes in **`TELEFONO` (text)** — the raw value, never validated. It is ALSO written to the
  native **`SMS`** field (contact card + SMS/WhatsApp campaigns) but ONLY when `toE164Mobile()` can
  normalise it confidently (already-`+…`, or a bare 10-digit IT mobile → `+39…`); otherwise `SMS`
  is omitted. TWO reasons `SMS` can fail the whole create: (1) `SMS`/`LANDLINE_NUMBER` E.164-validate
  and reject local/landline → 400 "Invalid phone number"; (2) **`SMS` is a UNIQUE identifier** — a
  number already tied to another contact → 400 `duplicate_parameter` "SMS is already associated with
  another Contact" and NOTHING is saved. So `createBrevoContact`: on ANY failure of the with-`SMS`
  attempt it retries once WITHOUT `SMS` (TELEFONO still holds the number) → the lead is never lost.
  CRITICAL: a `duplicate_parameter` from the with-`SMS` attempt must NOT be treated as success (that
  silently drops the lead) — only a duplicate on the no-`SMS` attempt = genuine already-exists = ok.
  Key/secret are server-side only.
- **Legal pages** (`/privacy`, `/termini`, `/cookie`): `components/legal/IubendaPolicy.tsx`
  renders the Iubenda policy (from `brand.legal.iubendaPolicyId`) as a direct **iframe** — no CTA.

## Brands (multi-brand: Diploma360 + La Scuola360)
- The SAME repo/content serves TWO brands. **`lib/brand.ts` is the single source of truth**: it
  exports the active `brand` selected at BUILD time by `NEXT_PUBLIC_BRAND` (default `diploma360`;
  unknown value → throws). Per-brand fields: `name`, `domain`, `logo.{header,lp,alt,ogImage}`,
  `contacts` (incl. per-brand `email`), `gtmId`, `legal.{entity,iubendaPolicyId}`, `platformHost`,
  `header.{showPhone,primaryCta}` (diploma360 = phone + "Chiama ora"; lascuola360 = no phone +
  "Iscriviti" → `/iscrizioni`), `copy.{diverso,credibilitaLead}` (brand-gendered adjective +
  de-doubled credibilità line). **Route new per-brand divergence through `brand.*` fields, NOT
  scattered `if (brand.id)` in shared JSX/CSS** — e.g. the header CTA + those two copy fragments do.
  Secrets (`BREVO_*`) stay runtime env. GTM/Iubenda id are SHARED; email/domain/logo differ.
- **NEVER hardcode the brand name `Diploma360` or the domain `www.diploma360.it`** in
  `app/`,`components/`,`data/` — use `brand.name` / `brand.domain` / `brand.logo.*`. A guard test
  (`test/no-hardcoded-brand.test.ts`) fails the build if either literal reappears outside `brand.ts`
  (it matches capital `Diploma360` + host `www.diploma360.it`; the contact email is not matched).
- **La Scuola360 is a SUPERSET, not a pure rebrand.** Colours/prices/design-system are identical, but
  La Scuola360 diverges: its own restructured **nav** (`getHeaderNav()`), umbrella **Home** and
  unified **Chi siamo** (`/` and `/chi-siamo` are per-brand selectors → `*Diploma`/`*LaScuola`
  components; extract-verbatim so Diploma360 stays byte-identical), a **Ripetizioni** section
  (`app/ripetizioni/*`: landing + come-funziona + prezzi + materie, gated by
  `assertBrand('lascuola360')` → 404 on Diploma360, absent from its sitemap), and its own footer
  (`RipFooter` via `BrandFooter`). Ripetizioni leads use `RipForm` (→ `PRODOTTO='Ripetizioni'`).
  Motion via `components/motion/Reveal.tsx`. La Scuola360 page assets live under `public/lascuola360/`
  (**Luxottica excluded** from the partner carousel). **Verbatim-price + honest-claims constraints
  apply to BOTH brands.** When editing shared components, keep Diploma360's output UNCHANGED.
- Verify each brand: `NEXT_PUBLIC_BRAND=lascuola360 npm run build` (and `=diploma360`); Diploma360's
  `/`,`/chi-siamo`, nav, footer, sitemap must remain unchanged.
- **Deploy:** both brands are separate BACKENDS in the SAME Firebase project `schoolrcloud`
  (`diploma360-site`, `lascuola360-site`), both on `main`. `NEXT_PUBLIC_BRAND` is set **per-backend**
  (App Hosting console env) — NOT a secret (a secret is per-project, can't differ between backends).
  `diploma360-site` uses the default; `lascuola360-site` sets `NEXT_PUBLIC_BRAND=lascuola360`.
  Leads share Brevo list 41 but carry a server-set `BRAND` attribute. See `docs/DEPLOY.md §G`.
- Decorative platform mock URL bars use `brand.platformHost` (display text only, not a real
  subdomain): `app.diploma360.it` / `app.lascuola360.it`.

## Deploy & git
- Two remotes, keep BOTH in sync: `origin` (GitLab, source of truth) + `github`
  (`valeriopisapia/diploma360-site`, deploy trigger). **After every commit, push to both.**
- Primary target: **Firebase App Hosting** (`apphosting.yaml`, connects via the GitHub repo).
  Live deploy URL: `https://diploma360-site--schoolrcloud.us-east4.hosted.app`.
  **DNS cut over — verified 2026-07-10:** `www.diploma360.it` now serves THIS Next.js site (GTM
  `GTM-K5VMGM8C` + GA4 `G-3QLZTYR5WK` load; the old WordPress/Divi site is gone). So live changes can
  be verified on `www.diploma360.it` directly (it redirects to the apex `diploma360.it`).
  Alternative (opt-in, validated): **Cloud Run via GitLab CI** (`Dockerfile`, `.gitlab-ci.yml`,
  `next.config` `output:'standalone'`). Full guide: `docs/DEPLOY.md`.
- Secrets (`BREVO_API_KEY`, `BREVO_LIST_ID`) come from Secret Manager at runtime, never in the repo.
  Local dev: `.env.local` (gitignored; template `.env.example`).

## Docs
Design spec: `docs/superpowers/specs/`. Implementation plan: `docs/superpowers/plans/`.
Deploy guide: `docs/DEPLOY.md`. Open business decisions (sede address, Iubenda domain coverage,
"Tutore.AI" naming, font self-hosting) are tracked in `docs/DEPLOY.md` §F.
