# Task 11a Report — Content Pages Port

**Branch:** `feat/nextjs-port`
**Commits:**
- `21e06f7 feat(pages): port come-funziona, piattaforma, nostra-piattaforma, esami-diploma, esami-normativa`
- `b7bea92 fix(pages): correct metadata titles to spec, drop dead module.css stubs`

**Build:** Pass (Next.js 16.2.9 Turbopack — 5 new routes prerendered as static)
**Tests:** 47/47 pass (15 files)
**Grep check:** Clean (no "senza interessi", "MIM", "MIUR", "Luxottica")

---

## Pages Delivered

| Page | Route | Title | CSS file |
|------|-------|-------|----------|
| `come-funziona/page.tsx` | `/come-funziona` | `Come funziona \| Diploma360` | `come-funziona.css` |
| `piattaforma/page.tsx` | `/piattaforma` | `La piattaforma \| Diploma360` | `piattaforma.css` |
| `nostra-piattaforma/page.tsx` | `/nostra-piattaforma` | `La nostra piattaforma \| Diploma360` | `nostra-piattaforma.css` |
| `esami-diploma/page.tsx` | `/esami-diploma` | `Il valore del diploma \| Diploma di Stato riconosciuto — Diploma360` | `esami-diploma.css` |
| `esami-normativa/page.tsx` | `/esami-normativa` | `Esami e normativa \| Come funzionano gli esami — Diploma360` | `esami-normativa.css` |

All 5 titles match the exact spec values.

---

## Constraint Compliance

| Constraint | Result |
|------------|--------|
| NEVER "senza interessi" | Not present |
| NEVER "MIM" / "MIUR" | All occurrences replaced with "ministeriale" |
| NEVER AI-tutor claims | timeline step "tutor + materiali + AI" → "tutor + materiali + piattaforma" |
| "Coordinatrice del percorso" (feminine) | Used throughout come-funziona, esami-normativa |
| Internal links: clean routes, no `.html` | All `.html` links converted (e.g. `index.html#lead` → `/#lead`) |
| Tel `tel:0684280999`, WA `wa.me/393517214644`, email `info@diploma360.it` | Correct |
| JSON-LD | EducationalOrganization schema on all 5 pages via `<JsonLd>` |
| Lead forms | None (no source page had `data-lead-form`) |

---

## MIM → Ministeriale Replacements (esami-normativa)

1. timeline step: "tutor + materiali + AI" → "tutor + materiali + piattaforma"
2. "programmi MIM" → "programmi ministeriali"
3. "O.M. annuale del MIM" → "O.M. annuale ministeriale"
4. "ordinanza del MIM" → "ordinanza ministeriale"
5. "Stessi programmi MIM" → "Stessi programmi ministeriali"

---

## Implementation Notes

- CSS approach: each page co-locates its page-specific styles in a plain `<name>.css` file imported as a side-effect from the page component. The spec named these `<name>.module.css`, but every class in these files is a **global** extension of the primitives in `styles/site.css` (referenced as plain strings, e.g. `className="mhero"`). CSS Modules would hash those names and break the markup; using `:global {}` blocks around `@media`/`@keyframes` is fragile. Plain global `.css` imports from a page component are fully supported in the App Router and are the semantically correct choice here. The 5 dead `.module.css` files the initial commit left behind (four 1-line stubs + one 106-line orphan never imported) were removed in `b7bea92`.
- All pages are Server Components (no `'use client'`).
- `<Image>` (next/image) used for real photos; `<img>` used for decorative mock screenshots.
- `nostra-piattaforma` screen 14 "Assistente di studio" included as a study-tools section (quiz/flashcard helper) with no AI capability claims added.

---

## Concerns

- **CSS naming deviation:** files are `.css`, not `.module.css` (rationale above). Flagged for review if strict `.module.css` naming is required by downstream tooling.
- **esami-diploma description:** source HTML had no `<meta name="description">`; one was crafted from page content.
- **nostra-piattaforma screen 14:** ported with honest study-tools framing rather than an AI-tutor claim (DONE_WITH_CONCERNS per copy constraints).
