# Diploma360 — sito marketing

Diploma360 marketing site and Ads landing pages. Built with Next.js (App Router), ported from the static sources in `materiale/`, and deployed on Firebase App Hosting. Targets prospective adult students seeking a state-recognised secondary diploma in Italy.

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

`.env.local` is gitignored. In production these values come from Firebase secrets — see the Deploy section below.

---

## Deploy (Firebase App Hosting)

The project is configured for Firebase App Hosting via `apphosting.yaml` at the repo root.

### First-time secret setup

Run these commands once (grant the backend service account access when prompted):

```bash
firebase apphosting:secrets:set BREVO_API_KEY
firebase apphosting:secrets:set BREVO_LIST_ID
```

Firebase App Hosting automatically injects the secrets into the Next.js server runtime as `process.env.BREVO_API_KEY` and `process.env.BREVO_LIST_ID`.

### Subsequent deploys

Pushing to the connected branch triggers an automatic build and deploy.

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
- **Brevo setup required:** `BREVO_LIST_ID` must reference a real Brevo list. The following contact attributes must be created in the Brevo panel before leads can be captured: `NOME`, `SMS`, `PER_CHI`, `MESSAGGIO`, `PAGINA_ARRIVO`, `ORIGINE`, `DATA_RICHIESTA`.
- **Google Fonts privacy hardening:** fonts are currently loaded via `<link>` from `fonts.googleapis.com`. Self-hosting the font files is a possible GDPR-hardening step (eliminates the Google IP-address transfer).
