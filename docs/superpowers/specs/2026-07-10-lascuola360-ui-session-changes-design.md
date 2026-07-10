# Design — UI session changes (delivery `new_consegna-valerio`)

**Date:** 2026-07-10 · **Source:** `materiale/new_consegna-valerio/MODIFICHE-SESSIONE.md`
(static-HTML delivery — translated to the Next.js multi-brand codebase).

## Goal & guiding principle
Apply the design-session UI improvements to the Next.js port. Founder principle (confirmed):
**improve the UI, do NOT change content/copy, stay close to the current look.** The verbatim
price/claims constraints in `AGENTS.md` still hold on both brands.

## Brand-scoping decision
The delivery says "La Scuola360 only", but the changes live in code **shared** by both brands.
Decision (approved):
- **Pure-UI fixes** (brand-neutral) apply to **BOTH** brands — this consciously relaxes the
  "Diploma360 byte-identical" guidance for cosmetics only. Builds/tests stay green
  (`no-hardcoded-brand.test.ts` checks only hardcoded brand literals, not identical output).
- The only **genuinely brand-specific** items (A1 header CTA, A4 copy) flow through
  `lib/brand.ts` — where this repo already concentrates per-brand divergence — via two new
  fields `brand.header` and `brand.copy`. **No scattered `if brand.id` in shared JSX/CSS.**

## Scope (per item)

| # | Change | Type | Applies to | Mechanism |
|---|--------|------|-----------|-----------|
| A1 | Header CTA "Iscriviti" instead of phone | brand UI | **lascuola360 only** | `brand.header.{showPhone, primaryCta:{label,href}}`; diploma360 keeps phone + "Chiama ora" |
| A2 | Footer legal links | — | **already done** | none (`footerNav` already → `/privacy` `/cookie` `/termini`) |
| A3 | Hero `max-width:920px` → `1280px` | pure UI | **both** | one-line CSS edit in the ~6 hero CSS files that still carry the 920 wrap |
| A4 | Gender agreement + de-doubled brand line | brand copy | **lascuola360 only** | `brand.copy.{diverso, credibilitaLead}`; diploma360 copy unchanged |
| A5-box | Equal-height plan boxes | pure UI | **both** | `prezzi.css`: `.plans{align-items:stretch}`, `.plan{height:100%}`, remove `.plan.plus{transform:scale(1.02)}`, `.plan p.desc{min-height:66px}` |
| A5-Plus | Plus card restructure | — | **already done** | none (`plan-tag`/`pnum`/`pname-new`/`pnarr` present) |
| A5-CTA | Plan CTAs → in-page form | UX | **both** | prezzi CTAs `/#lead` → `#lead` (needs A6 on prezzi) |
| A6 | "Form in fondo" where missing | UI structure | **both** | new reusable `LeadSection` (`id="lead"` + `LeadForm`); add to **prezzi** (enables A5-CTA) + **diplomi overview** (doc's example). Other institutional pages: optional follow-up, out of scope now. |

### A4 exact strings
- `app/come-funziona/page.tsx:43` — `è diverso` → `è {brand.copy.diverso}` (diploma360 `diverso`,
  lascuola360 `diversa`).
- `app/credibilita/page.tsx:82` — the `sec-lead` line renders the brand name twice for lascuola360
  ("La Scuola360 … Diploma di Stato di LaScuola360"). Route through `brand.copy.credibilitaLead`:
  diploma360 = current sentence verbatim; lascuola360 = de-doubled per delivery
  ("Il diploma è il percorso di La Scuola360…"). diploma360 output unchanged.

## Components / files touched
- `lib/brand.ts` — extend `Brand` type + both brand objects with `header` and `copy`.
- `components/layout/SiteHeader.tsx` — drive `header-cta` from `brand.header`; replace hardcoded
  `tel:0684280999` with `brand.contacts.telHref` (diploma360 value identical → byte-safe).
- `components/forms/LeadSection.tsx` (NEW) — reusable bottom form section (`id="lead"`), wraps
  existing `LeadForm`; markup extracted from HomeDiploma's existing block to match the design system.
- `app/prezzi/page.tsx` (+ `prezzi.css`), `app/diplomi/page.tsx`, the ~6 hero CSS files,
  `app/come-funziona/page.tsx`, `app/credibilita/page.tsx`.

## Verification
- `npm test` pristine (update `SiteHeader.test.tsx`/`Footer.test.tsx` if they assert the CTA).
- `rm -rf .next && NEXT_PUBLIC_BRAND=diploma360 npm run build` and `=lascuola360 npm run build` both succeed.
- Manual/diff check: diploma360 header, come-funziona, credibilita copy unchanged; lascuola360 shows
  "Iscriviti" CTA, "diversa", de-doubled line; both brands show wider hero, equal-height boxes, prezzi
  in-page `#lead` form.

## Out of scope
Block B files (already reflected in the port), the GTM/GA4 tracking thread, adding the form to every
institutional page, and any content/copy rewrites beyond A4.
