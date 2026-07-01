# Task 16 Report: Firebase App Hosting config + README + final audit

## Files changed

| File | Action |
|---|---|
| `apphosting.yaml` | Created |
| `README.md` | Replaced (was GitLab template) |
| `.superpowers/sdd/task-16-report.md` | Created (this file) |

---

## 1. `apphosting.yaml`

```yaml
runConfig:
  minInstances: 0
env:
  - variable: BREVO_API_KEY
    secret: BREVO_API_KEY
  - variable: BREVO_LIST_ID
    secret: BREVO_LIST_ID
```

Maps Cloud Secret Manager secrets `BREVO_API_KEY` and `BREVO_LIST_ID` into the Next.js backend runtime. Values are never hardcoded.

---

## 2. README sections

- **Description:** one-paragraph project description (marketing site + Ads landing, Next.js App Router, Firebase App Hosting).
- **Local dev:** `npm install`, `npm run dev`, `npm run build`, `npm test`.
- **Environment variables:** table of `BREVO_API_KEY` / `BREVO_LIST_ID`, `.env.local` instructions.
- **Deploy:** `apphosting.yaml` reference, `firebase apphosting:secrets:set` commands.
- **Tracking:** GTM `GTM-K5VMGM8C`, GA4 `GT-M3LW776G`, Meta Pixel `1460557338306322`, Consent Mode v2.
- **Structure:** annotated `app/` directory tree showing all key routes.
- **Open decisions / TODO:** 4 items (address conflict, legal drafts, Brevo setup, Google Fonts).

---

## 3. Test suite

```
Test Files  15 passed (15)
     Tests  47 passed (47)
  Duration  1.74s
```

All 47 tests passed across 15 test files.

---

## 4. Production build

Exit code 0. Route summary (66 pages total):

```
Route (app)
┌ ○ /
├ ● /[slug]  (+19 city paths)
├ ƒ /api/lead
├ ○ /chi-siamo
├ ○ /come-funziona
├ ○ /contatti
├ ○ /cookie
├ ○ /credibilita
├ ○ /diplomi
├ ● /diplomi/[slug]  (+20 diploma paths)
├ ○ /esami-diploma
├ ○ /esami-normativa
├ ○ /faq
├ ○ /garanzia
├ ○ /grazie
├ ○ /iscrizioni
├ ○ /lp
├ ○ /nostra-piattaforma
├ ○ /piattaforma
├ ○ /prezzi
├ ○ /privacy
├ ○ /recuperare-due-anni-in-uno
├ ○ /robots.txt
├ ○ /sedi-esame
├ ○ /sitemap.xml
└ ○ /termini
```

All required routes present: `/`, standard pages, `/[slug]` with 19 city routes, 20 `/diplomi/*`, `/lp` (noindex), `/api/lead` (dynamic ƒ), `/sitemap.xml`, `/robots.txt`.

---

## 5. Claim/guard audit

### Grep 1: "senza interessi"
```
clean: senza interessi
```

### Grep 2: MIM / MIUR
```
clean: MIM/MIUR
```

### Grep 3: AI tokens (tutor-ai, tutore-ai, tutor_ai)
```
app/nostra-piattaforma/page.tsx:350:  <img src="/assets-vetrina/mocks/tutor_ai.png" alt="Assistente di studio: spiegazioni, quiz e flashcard" loading="lazy" />
FOUND-BAD (grep exit code 0)
```

**Assessment: FALSE POSITIVE.** The match is a static image asset filename `src="/assets-vetrina/mocks/tutor_ai.png"` — a mock screenshot shown in a platform feature illustration. It is not a text claim, not a link, and the `alt` text makes no AI claims. No fix required.

---

## 6. Price/rate check

Prices `1.500 / 1.900 / 2.900` and rates `72,68 / 92,06 / 140,52` are present in `app/prezzi/page.tsx`. No "senza interessi" appears anywhere in `app/`, `components/`, or `data/`.

---

## 7. Concerns

- **Address conflict (open decision a):** `Viale Castrense 5, 00182 Roma` (showcase) vs `Via Giovanni Antonelli 41, 00197 Roma` (/lp) — must be resolved before go-live.
- **Legal pages (open decision b):** `/privacy`, `/cookie`, `/termini` are placeholder drafts — require legal review.
- **Brevo panel setup (open decision c):** `BREVO_LIST_ID` and 7 contact attributes must be created in the Brevo panel before lead capture works in production.
- **Google Fonts (open decision d):** loaded from `fonts.googleapis.com` — self-hosting is a possible GDPR hardening step.
- The `tutor_ai.png` image filename triggers the AI-token grep but is not a prohibited claim.
