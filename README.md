# Diploma360 — sito marketing

Diploma360 marketing site and Ads landing pages. Built with Next.js (App Router), ported from the static sources in `materiale/`, and deployed on Google Cloud Run (via GitLab CI). Targets prospective adult students seeking a state-recognised secondary diploma in Italy.

---

## Local dev

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (output: .next/)
npm test         # Vitest unit suite
```

---

## Environment variables

| Variable | Used by | Notes |
|---|---|---|
| `BREVO_API_KEY` | `app/api/lead/route.ts` | Server-only. Brevo (Sendinblue) API key. |
| `BREVO_LIST_ID` | `app/api/lead/route.ts` | Server-only. Numeric Brevo list ID. |

**Local dev:** copy `.env.local.example` (if present) or create `.env.local` manually:

```bash
BREVO_API_KEY=your-key-here
BREVO_LIST_ID=12345
```

`.env.local` is gitignored. In production these values come from Google Secret Manager, injected into the Cloud Run service — see the Deploy section below.

---

## Deploy (Cloud Run via GitLab CI)

The app is containerised (`Dockerfile`, Next.js `output: 'standalone'`) and deployed to **Google Cloud Run** by the project's own **GitLab CI** (`.gitlab-ci.yml`) — no GitHub, no separate repo. Every push to `main` runs tests then `gcloud run deploy --source .`; Brevo values are injected from Secret Manager (`BREVO_API_KEY`, `BREVO_LIST_ID`).

**Full step-by-step deploy guide (one-time GCP setup, CI variables, custom domain, Brevo & GTM config, troubleshooting): [`docs/DEPLOY.md`](docs/DEPLOY.md).**

Quick reference for the GitLab CI/CD variables to set:

| Key | Value | Type |
|---|---|---|
| `GCP_SA_KEY` | deploy service-account JSON key | File |
| `GCP_PROJECT_ID` | GCP project id | Variable |

---

## Tracking

All analytics tags fire through **GTM `GTM-K5VMGM8C`**, which loads:

- **GA4** `GT-M3LW776G`
- **Meta Pixel** `1460557338306322`

Tags are gated by **Consent Mode v2** — the cookie banner sets `analytics_storage` / `ad_storage` grants. Consent signals and conversions are configured in the GTM panel, not in code.

---

## Project structure

```
app/
  page.tsx                         # Home (/)
  chi-siamo/                       # /chi-siamo
  come-funziona/                   # /come-funziona
  nostra-piattaforma/              # /nostra-piattaforma
  prezzi/                          # /prezzi
  recupero-anni-scolastici-[citta]/# /recupero-anni-scolastici-<city> — 19 city landing pages
  diplomi/[slug]/                  # /diplomi/<slug> — 20 diploma pages
  lp/                              # /lp — paid Ads landing (noindex)
  api/lead/                        # POST /api/lead — Brevo lead capture (dynamic, server)
  sitemap.xml/                     # /sitemap.xml (generated)
  robots.txt/                      # /robots.txt (generated)

data/                              # City list, diploma list, navigation data
components/                        # Layout (Header, Footer, MegaMenu), forms, GTM, SEO helpers
lib/                               # Brevo client, SEO utilities, analytics helpers
styles/site.css                    # Global CSS (ported from materiale/)
```

---

## Open decisions / TODO

- **Company address conflict:** the showcase pages use `Viale Castrense 5, 00182 Roma`; the `/lp` landing uses `Via Giovanni Antonelli 41, 00197 Roma`. Needs to be unified before go-live.
- **Legal page drafts:** `/privacy`, `/cookie`, and `/termini` are placeholder drafts and must be reviewed and validated by a qualified professional before launch.
- **Brevo setup required:** `BREVO_LIST_ID` must reference a real Brevo list. The following contact attributes (type: text) must exist in the Brevo panel before leads can be captured: `NOME`, `TELEFONO`, `PER_CHI`, `MESSAGGIO`, `PAGINA_ARRIVO`, `ORIGINE`, `DATA_RICHIESTA`. Note: the phone is stored in a plain-text `TELEFONO` attribute — NOT Brevo's `SMS`/`LANDLINE_NUMBER` phone attributes, which enforce E.164 validation and reject local-format or landline numbers. Also ensure the Brevo account's "Authorised IPs" restriction is disabled (serverless egress IPs are dynamic).
- **Google Fonts privacy hardening:** fonts are currently loaded via `<link>` from `fonts.googleapis.com`. Self-hosting the font files is a possible GDPR-hardening step (eliminates the Google IP-address transfer).
