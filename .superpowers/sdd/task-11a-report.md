# Task 11a Report — Content Pages Port

**Branch:** `worktree-agent-a70d049445bc50e2b`  
**Commit:** `21e06f7 feat(pages): port come-funziona, piattaforma, nostra-piattaforma, esami-diploma, esami-normativa`  
**Build:** ✅ Pass (Next.js 16.2.9 Turbopack, 10 static pages)  
**Grep check:** ✅ Clean (no "senza interessi", "MIM", "MIUR", "tutor-ai", "tutore-ai", or "materiali + AI")

---

## Pages Delivered

| Page | Route | CSS file | Status |
|------|-------|----------|--------|
| `come-funziona/page.tsx` | `/come-funziona` | `come-funziona.module.css` (`:global {}`) | ✅ |
| `piattaforma/page.tsx` | `/piattaforma` | `piattaforma.module.css` (`:global {}`) | ✅ |
| `nostra-piattaforma/page.tsx` | `/nostra-piattaforma` | `nostra-piattaforma.css` (global import) | ✅ |
| `esami-diploma/page.tsx` | `/esami-diploma` | `esami-diploma.css` (global import) | ✅ |
| `esami-normativa/page.tsx` | `/esami-normativa` | `esami-normativa.css` + `esami-normativa.module.css` (`:global {}`) | ✅ |

---

## Constraint Compliance

| Constraint | Result |
|------------|--------|
| NEVER "senza interessi" | ✅ Not present in any file |
| NEVER "MIM" or "MIUR" | ✅ All occurrences replaced with "ministeriale" |
| NEVER AI-tutor claims | ✅ etl-step 02 "who": "tutor + materiali + AI" → "tutor + materiali + piattaforma" |
| "Coordinatrice del percorso" (feminine) | ✅ Used throughout come-funziona, esami-normativa |
| Internal links: clean routes, no `.html` | ✅ All `.html` links converted (e.g. `index.html#lead` → `/#lead`) |
| Tel: `tel:0684280999` | ✅ |
| WhatsApp: `https://wa.me/393517214644` | ✅ |
| Email: `info@diploma360.it` | ✅ |

---

## MIM → Ministeriale Replacements (esami-normativa)

1. `etl-step 02 .who`: "tutor + materiali + AI" → "tutor + materiali + piattaforma"
2. `etl-step 03 body`: "programmi MIM" → "programmi ministeriali"
3. `iter-step 04 h4` (Le norme): "O.M. annuale del MIM" → "O.M. annuale ministeriale"
4. `callout` (Le norme): "ordinanza del MIM" → "ordinanza ministeriale"
5. `buroc-card 03 body`: "Stessi programmi MIM" → "Stessi programmi ministeriali"

---

## Implementation Notes

- `come-funziona` and `piattaforma` use `.module.css` with `:global {}` wrapper (side-effect import)
- `nostra-piattaforma`, `esami-diploma`, `esami-normativa` use plain `.css` files (global CSS import from page component) — valid in Next.js 13+ App Router
- All pages are Server Components (no `'use client'`)
- `<Image>` used only for real photos (`lezione-live.jpg`, `coordinatrice.jpg`) with `fill` prop
- `<img>` used for decorative mock screenshots
- `nostra-piattaforma` screen 14 "Assistente di studio" included as study-tools section with no AI capability claims added
