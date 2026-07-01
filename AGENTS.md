<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Diploma360 — project guide

Marketing site + Ads landing for **Diploma360** (Classme S.r.l.), an Italian online
state-diploma / "recupero anni scolastici" service. Next.js port of the static sources in
`materiale/` (READ-ONLY reference — never edit `materiale/`).

## Commands
- `npm run dev` — dev server
- `npm run build` — production build (verify changes with this; page ports have no unit tests)
- `npm test` — Vitest (happy-dom). Output must be pristine (no warnings).

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
  which wraps `<SiteHeader/>`/`<Footer/>` in the root layout. GTM/consent/cookie banner still apply.
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

## Non-negotiable content constraints (founder-approved; enforce on every edit)
- Prices VERBATIM: `1.500 / 1.900 / 2.900 €`; rates `72,68 / 92,06 / 140,52 €/mese × 24`.
  **NEVER write "senza interessi".**
- Honest claims only: never "facciamo al posto tuo"; "Diploma di Stato riconosciuto" (never
  "MIM"/"MIUR"); "Coordinatrice del percorso". **No AI-capability claims** (the honest
  "study tools / Riepilogo360" framing is fine; the `tutor_ai.png` mock + `--ai-*` css var are
  faithful-to-source and OK).
- Contacts: `tel:0684280999`, WhatsApp `https://wa.me/393517214644`, `info@diploma360.it`.
- Partner logos: fake/placeholder stay with disclaimer. **Luxottica was removed on request — do
  not re-add it** even though the asset file exists.

## Integrations
- **GTM** `GTM-K5VMGM8C` with **Consent Mode v2** (default denied, granted by the cookie banner).
  GA4 `GT-M3LW776G` + Meta Pixel `1460557338306322` are configured IN GTM, not in code.
  `LeadForm` fires `dataLayer.push({event:'lead_submit', origine, pagina})` on success.
  `ConsentDefault` must render in `<head>` BEFORE `GtmScript` (root layout ordering).
- **Brevo** (`lib/brevo.ts` + `/api/lead`): list `BREVO_LIST_ID=41`, attributes (text):
  `NOME, TELEFONO, PER_CHI, MESSAGGIO, PAGINA_ARRIVO, ORIGINE, DATA_RICHIESTA`.
  GOTCHAS learned: use a Brevo **API key** (`xkeysib-`), NOT an SMTP key (`xsmtpsib-`) → else 401;
  disable Brevo **"Authorised IPs"** (serverless egress IPs are dynamic) → else 401; the phone
  goes in **`TELEFONO` (text)**, NOT `SMS`/`LANDLINE_NUMBER` which validate E.164 and reject
  local/landline numbers → else 400 "Invalid phone number". Key/secret are server-side only.
- **Legal pages** (`/privacy`, `/termini`, `/cookie`): `components/legal/IubendaPolicy.tsx`
  renders the Iubenda policy (id `43474147`, Classme S.r.l.) as a direct **iframe** — no CTA.

## Deploy & git
- Two remotes, keep BOTH in sync: `origin` (GitLab, source of truth) + `github`
  (`valeriopisapia/diploma360-site`, deploy trigger). **After every commit, push to both.**
- Primary target: **Firebase App Hosting** (`apphosting.yaml`, connects via the GitHub repo).
  Alternative (opt-in, validated): **Cloud Run via GitLab CI** (`Dockerfile`, `.gitlab-ci.yml`,
  `next.config` `output:'standalone'`). Full guide: `docs/DEPLOY.md`.
- Secrets (`BREVO_API_KEY`, `BREVO_LIST_ID`) come from Secret Manager at runtime, never in the repo.
  Local dev: `.env.local` (gitignored; template `.env.example`).

## Docs
Design spec: `docs/superpowers/specs/`. Implementation plan: `docs/superpowers/plans/`.
Deploy guide: `docs/DEPLOY.md`. Open business decisions (sede address, Iubenda domain coverage,
"Tutore.AI" naming, font self-hosting) are tracked in `docs/DEPLOY.md` §F.
