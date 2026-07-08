# La Scuola360 — divergent UI (Ripetizioni + Home + Chi siamo + nav) — Design

**Date:** 2026-07-08
**Status:** Draft — pending spec review
**Builds on:** the multi-brand foundation (`lib/brand.ts`, `NEXT_PUBLIC_BRAND`) already on `main`.

## Goal

La Scuola360 stops being a pure rebrand: it becomes a **superset** of Diploma360. It reuses the
whole Diploma branch (unchanged) and ADDS, for `brand.id === 'lascuola360'` only:
- a restructured top nav (`Home · Diploma ▾ · Ripetizioni ▾ · Chi siamo`),
- an umbrella **Home**,
- a unified **Chi siamo** page,
- a **Ripetizioni** (tutoring) section: 4 pages + its own form + footer.

**Diploma360 stays exactly as it is** (nav, home, chi-siamo, pages all unchanged).

Reference material (READ-ONLY, 1:1 visual references to port): `materiale/consegna-valerio 2/`
(`.dc.html` statics + `support.js` + `assets/`). See its `LEGGIMI-VALERIO.md`.

## Routing & gating architecture (cross-cutting — design once)

1. **Shared routes, per-brand content** — `/` and `/chi-siamo`. The route component picks by
   `brand.id`: Diploma360 → the current page (untouched); La Scuola360 → the new variant. Each
   brand's page body is its own component (e.g. `HomeDiploma` / `HomeLaScuola`,
   `ChiSiamoDiploma` / `ChiSiamoLaScuola`) so files stay focused; the route file is a thin selector.

2. **La-Scuola360-only routes** — `/ripetizioni`, `/ripetizioni/come-funziona`,
   `/ripetizioni/prezzi`, `/ripetizioni/materie`. Normal nested routes, but **gated**: a shared
   helper `assertBrand('lascuola360')` calls `notFound()` when the active brand differs → 404 on
   Diploma360. These pages ARE indexable (unlike `/lp`) → present in La Scuola360's sitemap only.
   The "Per livello" / "Recupero debiti·aiuto compiti" nav items are ANCHORS in
   `/ripetizioni/materie` (`#livello`, `#esigenza`), NOT separate pages. FAQ is `/ripetizioni#faq`.

3. **Per-brand nav** — `data/navigazione.ts` returns the structure for the active brand:
   Diploma360 = today's nav (unchanged); La Scuola360 = the 4-item nav with two mega dropdowns
   (Diploma ▾ groups existing pages; Ripetizioni ▾ points to the new pages/anchors). `MegaMenu` and
   `MobileMenu` already consume this data; their internal top-level mapping becomes brand-aware too.

4. **Chrome / footer — per-brand at the layout level.** `SiteHeader` stays shared (nav differs by
   brand). The footer is chosen by brand in `ChromeGate`: `/lp*` → `LpFooter` (unchanged);
   else Diploma360 → current `Footer`; else La Scuola360 → **`RipFooter`** (ported from
   `RipFooter.dc.html`) on ALL its pages — Home, Chi siamo, Ripetizioni, and the shared Diploma
   pages when served under La Scuola360. (RipFooter is effectively "the La Scuola360 footer".)

5. **Sitemap brand-aware** — `app/sitemap.ts` includes `/ripetizioni/*` only when
   `brand.id === 'lascuola360'`; Diploma360's sitemap is unchanged.

6. **Lead product marker** — a new Brevo text attribute **`PRODOTTO`** (created in Brevo like
   `BRAND`) on list 41. `LeadForm` gains a `prodotto` prop defaulting to `'Diploma'`; `RipForm`
   sends `'Ripetizioni'`. Set into the payload and mapped in `lib/brevo.ts` (`PRODOTTO: p.prodotto`)
   + `app/api/lead/route.ts`. Both products keep list 41; filterable by `PRODOTTO` (and `BRAND`).

7. **Design system / colours — unchanged.** The new pages reuse the existing global classes
   (`.mainnav/.navitem/.mega/.navlink/.mega-link`, cards, sections) — drop-in, same palette. Motion
   (reveal-on-scroll, counters) + mobile WhatsApp/CTA come from `support.js`; port as a small client
   effect module respecting `prefers-reduced-motion`.

## Pages to build (La Scuola360 only)

| Route | Reference | Notes |
|---|---|---|
| `/` (La Scuola360 variant) | `Home Scuola360.dc.html` | umbrella narrative home |
| `/chi-siamo` (La Scuola360 variant) | `Chi-Siamo.dc.html` | unifies chi siamo + perché fidarti + partner + contatti; partner logo carousel |
| `/ripetizioni` | `Ripetizioni.dc.html` | landing + lead form (`RipForm`); `#faq`, `#lead` anchors |
| `/ripetizioni/come-funziona` | `Ripetizioni-Come-Funziona.dc.html` | |
| `/ripetizioni/prezzi` | `Ripetizioni-Prezzi.dc.html` | |
| `/ripetizioni/materie` | `Ripetizioni-Materie.dc.html` | anchors `#livello`, `#esigenza` |

Shared components to port: `RipForm` (lead form → `/api/lead` with `prodotto='Ripetizioni'`),
`RipFooter` (La Scuola360 footer). Header nav restructure per `SiteHeader.dc.html`.

## Assets

Copy from `materiale/consegna-valerio 2/assets/` into `public/` (La Scuola360-scoped paths):
- **Logo:** `logo-lascuola360.svg` is the CANONICAL logo here — regenerate the raster header/LP logos
  from THIS svg (reconcile with the earlier `logo-lascuola360.png` generated from a different SVG;
  this one wins if they differ).
- Platform mocks (`mock-*.png`, `piattaforma.png`), portraits (`p_*.jpg`, `studentessa.jpg`),
  testimonials (`testimonial-*.jpg`), sede photos (`sede-*.png`).
- **Partner logos** (`assets/partner/*.png`) for the Chi-siamo carousel — **EXCLUDE `luxottica.png`**
  (founder constraint: Luxottica was removed on request, do not re-add even though the file exists).

## SEO & metadata

- Each new page uses `buildMetadata()` (brand-aware domain/name already wired). Titles/descriptions
  ported from the references, brand name via `brand.name`.
- `<JsonLd>` where the reference has structured data (Course/FAQ/BreadcrumbList/EducationalOrg).
- Ripetizioni + Home + Chi-siamo are indexable; only in La Scuola360's sitemap.

## Non-negotiable content constraints (apply to La Scuola360 too)

- Prices VERBATIM; never "senza interessi"; honest claims only; "Diploma di Stato riconosciuto"
  (never MIM/MIUR); no AI-capability claims. **Luxottica excluded from partners.** Contacts as per
  `brand.contacts`.

## Testing

- Gating: `/ripetizioni/*` → `notFound()` (404) under diploma360; render under lascuola360. Unit-test
  the `assertBrand` helper.
- Nav: `data/navigazione.ts` returns the correct structure per brand.
- Sitemap: `/ripetizioni/*` present only for lascuola360.
- Lead marker: `lib/brevo.ts` maps `PRODOTTO`; route sets it; `RipForm` sends `'Ripetizioni'`.
- The existing anti-regression guard stays green (new pages use `brand.*`, no hardcoded name/domain).
- Build BOTH brands: `npm run build` (diploma360, unchanged output) and
  `NEXT_PUBLIC_BRAND=lascuola360 npm run build` (new routes present, Diploma routes still there).

## Non-goals

- No change to Diploma360's nav/home/chi-siamo/pages.
- No colour/design-system divergence.
- No new Ripetizioni sub-pages beyond the 4 (extra nav items are anchors).

## Implementation phases (for the plan)

1. **Foundation:** brand-aware `data/navigazione.ts` + `MegaMenu`/`MobileMenu` mapping; `assertBrand`
   gate helper; per-brand footer in `ChromeGate` (`RipFooter` ported); brand-aware `sitemap.ts`;
   `PRODOTTO` Brevo attribute + `LeadForm` prop + `brevo.ts`/route wiring; assets imported.
2. **Chi siamo** (La Scuola360 variant + partner carousel, luxottica excluded).
3. **Ripetizioni** section (4 pages + `RipForm` + motion module).
4. **Home** (La Scuola360 umbrella variant).

## Open items to confirm at review

- Logo reconciliation (canonical `logo-lascuola360.svg` from the consegna folder vs the earlier png).
- `RipFooter` links: are they Ripetizioni-specific, or general La Scuola360 footer links (since it's
  used on all La Scuola360 pages)? Port as-is unless they should be generalized.
- Build order of the page phases (2→4) is flexible; foundation (1) must be first.
