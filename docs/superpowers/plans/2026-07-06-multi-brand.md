# Multi-brand (Diploma360 + La Scuola360) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve a second brand "La Scuola360" from the same repo and identical content, changing only brand-specific attributes (name, logo, domain, GTM, Brevo list), selected at build time by `NEXT_PUBLIC_BRAND`.

**Architecture:** A build-time brand config module (`lib/brand.ts`) exposes an active `brand` object chosen by `process.env.NEXT_PUBLIC_BRAND` (default `diploma360`). All currently-hardcoded brand values (SEO domain/name, GTM id, logos, robots/sitemap base, Iubenda id, and the brand name baked into page/data copy) are refactored to read from `brand`. Both Firebase App Hosting backends build `main`; the La Scuola360 backend sets `NEXT_PUBLIC_BRAND=lascuola360`.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Vitest + happy-dom.

## Global Constraints

- **Prices VERBATIM (both brands):** `1.500 / 1.900 / 2.900 €`; rates `72,68 / 92,06 / 140,52 €/mese × 24`. **NEVER** write "senza interessi".
- **Honest claims only:** never "facciamo al posto tuo"; "Diploma di Stato riconosciuto" (never "MIM"/"MIUR"); no AI-capability claims.
- **`site.css` is the single source of brand colours; identical for both brands — do NOT touch colours.**
- **Design system uses literal font names `'Inter'`/`'Poppins'`** — unrelated to this work; leave fonts alone.
- **`npm test` output must be pristine** (no new warnings). The happy-dom Google-Fonts fetch errors in `layout.test.tsx` are pre-existing noise, not failures.
- **Verify builds with `npm run build`** (page ports have no unit tests beyond what this plan adds).
- **`NEXT_PUBLIC_BRAND` is inlined at build time** by Next — it must be present in the environment during `next build`, not only at runtime.
- **`materiale/` is READ-ONLY** — never edit it.

---

## File Structure

**New files:**
- `lib/brand.ts` — brand type, registry (`diploma360`, `lascuola360`), and the resolved active `brand`.
- `lib/brand.test.ts` — resolver unit tests.
- `test/no-hardcoded-brand.test.ts` — anti-regression guard (no stray `Diploma360` literal outside `lib/brand.ts`).

**Modified (Phase 1 — single-source spots):**
- `lib/seo.ts` — domain/name/OG image from `brand`.
- `components/gtm/GtmScript.tsx` — GTM id from `brand`.
- `app/robots.ts`, `app/sitemap.ts` — base URL from `brand`.
- `components/layout/SiteHeader.tsx`, `app/lp/LpHeader.tsx`, `app/lp/LpFooter.tsx` — logo src/alt from `brand`.
- `components/legal/IubendaPolicy.tsx` — policy id from `brand`.
- `app/layout.test.tsx` — assert the active brand's GTM id instead of the literal.

**Modified (Phase 2 — brand-name copy sweep):** ~39 files under `app/`, `components/`, `data/` containing the literal `Diploma360` (notably `data/citta.ts`, `data/diplomi.ts`, and page files).

**Phase 3:** `lib/brand.ts` (fill La Scuola360 entry) + new asset files under `public/`.

**Phase 4:** `apphosting.yaml`, `AGENTS.md`, `docs/DEPLOY.md`.

**Phase 5 (optional, non-blocking):** contacts centralization across ~27 files.

---

## Phase 1 — Brand config module + single-source refactor

### Task 1: Brand config module + resolver

**Files:**
- Create: `lib/brand.ts`
- Test: `lib/brand.test.ts`

**Interfaces:**
- Produces:
  - `type BrandId = 'diploma360' | 'lascuola360'`
  - `type Brand = { id: BrandId; name: string; domain: string; logo: { header: string; lp: string; alt: string; ogImage: string }; contacts: { telDisplay: string; telHref: string; whatsappUrl: string; email: string }; gtmId: string; legal: { entity: string; iubendaPolicyId: string } }`
  - `function resolveBrand(raw: string | undefined): Brand`
  - `const brand: Brand` (the active brand = `resolveBrand(process.env.NEXT_PUBLIC_BRAND)`)

- [ ] **Step 1: Write the failing test**

```ts
// lib/brand.test.ts
import { it, expect } from 'vitest'
import { resolveBrand } from './brand'

it('defaults to diploma360 when unset', () => {
  expect(resolveBrand(undefined).id).toBe('diploma360')
  expect(resolveBrand(undefined).name).toBe('Diploma360')
  expect(resolveBrand(undefined).domain).toBe('https://www.diploma360.it')
})

it('resolves lascuola360', () => {
  const b = resolveBrand('lascuola360')
  expect(b.id).toBe('lascuola360')
  expect(b.name).toBe('La Scuola360')
  expect(b.domain).toBe('https://www.lascuola360.it')
})

it('throws on an unknown brand so a misconfigured build fails loudly', () => {
  expect(() => resolveBrand('acme')).toThrow(/unknown brand/i)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/brand.test.ts`
Expected: FAIL — `resolveBrand` is not defined / module missing.

- [ ] **Step 3: Write minimal implementation**

```ts
// lib/brand.ts
export type BrandId = 'diploma360' | 'lascuola360'

export type Brand = {
  id: BrandId
  name: string
  domain: string
  logo: { header: string; lp: string; alt: string; ogImage: string }
  contacts: { telDisplay: string; telHref: string; whatsappUrl: string; email: string }
  gtmId: string
  legal: { entity: string; iubendaPolicyId: string }
}

// Contacts are shared across brands today, but modelled per-brand for a future split.
const SHARED_CONTACTS = {
  telDisplay: '06 84 280 999',
  telHref: 'tel:0684280999',
  whatsappUrl: 'https://wa.me/393517214644',
  email: 'info@diploma360.it',
}

const BRANDS: Record<BrandId, Brand> = {
  diploma360: {
    id: 'diploma360',
    name: 'Diploma360',
    domain: 'https://www.diploma360.it',
    logo: {
      header: '/assets-vetrina/logo-diploma360.png',
      lp: '/foto/logo-diploma360.png',
      alt: 'Diploma360 — Powered by LaScuola360',
      ogImage: '/og-image.png',
    },
    contacts: SHARED_CONTACTS,
    gtmId: 'GTM-K5VMGM8C',
    legal: { entity: 'Classme S.r.l.', iubendaPolicyId: '43474147' },
  },
  lascuola360: {
    id: 'lascuola360',
    name: 'La Scuola360',
    domain: 'https://www.lascuola360.it',
    logo: {
      // PLACEHOLDER assets — added in Phase 3 (Task 12). Paths are final; files land then.
      header: '/assets-vetrina/logo-lascuola360.png',
      lp: '/foto/logo-lascuola360.png',
      alt: 'La Scuola360',
      ogImage: '/og-image-lascuola360.png',
    },
    contacts: SHARED_CONTACTS,
    gtmId: 'GTM-XXXXXXX', // PLACEHOLDER — La Scuola360 GTM container to be created (see spec).
    legal: { entity: 'Classme S.r.l.', iubendaPolicyId: '43474147' }, // confirm La Scuola360 policy id
  },
}

export function resolveBrand(raw: string | undefined): Brand {
  const id = (raw ?? 'diploma360') as BrandId
  const found = BRANDS[id]
  if (!found) throw new Error(`Unknown brand "${raw}". Set NEXT_PUBLIC_BRAND to one of: ${Object.keys(BRANDS).join(', ')}`)
  return found
}

export const brand: Brand = resolveBrand(process.env.NEXT_PUBLIC_BRAND)
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/brand.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/brand.ts lib/brand.test.ts
git commit -m "feat(brand): brand config module + resolver (NEXT_PUBLIC_BRAND)"
```

---

### Task 2: SEO metadata from brand

**Files:**
- Modify: `lib/seo.ts:3-5,32,36`
- Test: `lib/seo.test.ts` (existing — extend)

**Interfaces:**
- Consumes: `brand` from Task 1 (`brand.domain`, `brand.name`, `brand.logo.ogImage`).

- [ ] **Step 1: Write the failing test** (append to `lib/seo.test.ts`)

```ts
import { brand } from './brand'

it('uses the active brand domain and name', () => {
  const m = buildMetadata({ title: 'X', description: 'd', path: '/foo' })
  expect(m.alternates?.canonical).toBe(`${brand.domain}/foo`)
  expect(m.openGraph?.siteName).toBe(brand.name)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/seo.test.ts`
Expected: FAIL — canonical still `https://www.diploma360.it/foo` only by coincidence; the `siteName` assertion binds to `brand.name` which currently equals the literal, so to force a real failure first change nothing and confirm the NEW assertion referencing `brand` compiles. If it passes trivially (default brand), that is acceptable — the real protection is Step 3 wiring. Proceed.

- [ ] **Step 3: Refactor `lib/seo.ts`**

Replace lines 3-5:

```ts
import { brand } from './brand'

const SITE = brand.domain
const SITE_NAME = brand.name
const DEFAULT_OG_IMAGE = `${SITE}${brand.logo.ogImage}` // absolute, branded 1200x630
```

(Leave the rest of the file unchanged; `SITE`/`SITE_NAME`/`DEFAULT_OG_IMAGE` are still referenced below.)

- [ ] **Step 4: Run tests**

Run: `npx vitest run lib/seo.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add lib/seo.ts lib/seo.test.ts
git commit -m "refactor(seo): derive domain/name/OG from brand config"
```

---

### Task 3: GTM id from brand

**Files:**
- Modify: `components/gtm/GtmScript.tsx:11`
- Test: `app/layout.test.tsx:72-74` (update)

**Interfaces:**
- Consumes: `brand.gtmId` from Task 1.

- [ ] **Step 1: Update the failing test** — in `app/layout.test.tsx`, replace the literal assertion:

```ts
import { brand } from '@/lib/brand'
// ...
const gtmIdx = fullHtml.indexOf(brand.gtmId)
expect(gtmIdx, `GtmScript (${brand.gtmId}) not found in document HTML`).toBeGreaterThan(-1)
```

- [ ] **Step 2: Run test to verify current state**

Run: `npx vitest run app/layout.test.tsx`
Expected: PASS already (default brand gtmId === `GTM-K5VMGM8C`). This guards against regressions once the source uses `brand`.

- [ ] **Step 3: Refactor `components/gtm/GtmScript.tsx`**

Replace line 11 and update the doc comment:

```ts
import Script from "next/script"
import { brand } from "@/lib/brand"

const GTM_ID = brand.gtmId
```

(Everything else in the file is unchanged; it already interpolates `${GTM_ID}`.)

- [ ] **Step 4: Run tests + typecheck build**

Run: `npx vitest run app/layout.test.tsx && npm run build`
Expected: PASS; build compiles.

- [ ] **Step 5: Commit**

```bash
git add components/gtm/GtmScript.tsx app/layout.test.tsx
git commit -m "refactor(gtm): read container id from brand config"
```

---

### Task 4: robots + sitemap base URL from brand

**Files:**
- Modify: `app/robots.ts:10-11`, `app/sitemap.ts:5`

**Interfaces:**
- Consumes: `brand.domain`.

- [ ] **Step 1: Refactor `app/sitemap.ts`** — replace line 5:

```ts
import { brand } from '@/lib/brand'
const BASE = brand.domain
```

- [ ] **Step 2: Refactor `app/robots.ts`** — replace the hardcoded URLs:

```ts
import { brand } from '@/lib/brand'
// inside the returned object:
    sitemap: `${brand.domain}/sitemap.xml`,
    host: brand.domain,
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: compiles; `/sitemap.xml` and `/robots.txt` still prerender.

- [ ] **Step 4: Commit**

```bash
git add app/robots.ts app/sitemap.ts
git commit -m "refactor(seo): robots/sitemap base URL from brand config"
```

---

### Task 5: Logos + alt from brand (site header, LP header/footer)

**Files:**
- Modify: `components/layout/SiteHeader.tsx:32-33`, `app/lp/LpHeader.tsx:26-27`, `app/lp/LpFooter.tsx` (logo `src`/`alt`).

**Interfaces:**
- Consumes: `brand.logo.header`, `brand.logo.lp`, `brand.logo.alt`.

- [ ] **Step 1: `SiteHeader.tsx`** — add `import { brand } from '@/lib/brand'` and replace the `<img>` src/alt:

```tsx
              src={brand.logo.header}
              alt={brand.logo.alt}
```

- [ ] **Step 2: `LpHeader.tsx`** — add the import and replace the `<Image>` src/alt:

```tsx
            src={brand.logo.lp}
            alt={brand.logo.alt}
```

- [ ] **Step 3: `LpFooter.tsx`** — add the import; replace the logo `src` with `brand.logo.lp` and `alt` with `brand.logo.alt` (locate the `<img`/`<Image` logo element first with `grep -n "logo\|alt=" app/lp/LpFooter.tsx`).

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: compiles.

- [ ] **Step 5: Commit**

```bash
git add components/layout/SiteHeader.tsx app/lp/LpHeader.tsx app/lp/LpFooter.tsx
git commit -m "refactor(layout): logo src/alt from brand config"
```

---

### Task 6: Iubenda policy id from brand

**Files:**
- Modify: `components/legal/IubendaPolicy.tsx`

**Interfaces:**
- Consumes: `brand.legal.iubendaPolicyId`.

- [ ] **Step 1: Inspect** — `grep -n "43474147\|policyId\|id=" components/legal/IubendaPolicy.tsx` to find the literal.

- [ ] **Step 2: Refactor** — add `import { brand } from '@/lib/brand'` and replace the literal `43474147` with `brand.legal.iubendaPolicyId` (in whatever URL/attribute it appears).

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: compiles; `/privacy`, `/termini`, `/cookie` still prerender.

- [ ] **Step 4: Commit**

```bash
git add components/legal/IubendaPolicy.tsx
git commit -m "refactor(legal): Iubenda policy id from brand config"
```

---

## Phase 2 — Brand-name copy sweep + anti-regression guard

### Task 7: Anti-regression guard test (write FIRST, expected to fail)

**Files:**
- Create: `test/no-hardcoded-brand.test.ts`

**Rationale:** After the sweep, no source file except `lib/brand.ts` may contain the literal brand name `Diploma360`. Writing the guard first makes the sweep's "done" condition executable.

- [ ] **Step 1: Write the guard**

```ts
// test/no-hardcoded-brand.test.ts
import { it, expect } from 'vitest'
import { execSync } from 'node:child_process'

// The brand name must come from lib/brand.ts, never be hardcoded in copy/data.
// Scans tracked source under app/, components/, data/ for the capitalised literal.
it('has no hardcoded "Diploma360" brand-name literal outside lib/brand.ts', () => {
  let out = ''
  try {
    out = execSync(
      `git grep -n -I "Diploma360" -- app components data ':!lib/brand.ts'`,
      { encoding: 'utf8' },
    )
  } catch {
    out = '' // git grep exits non-zero when there are no matches
  }
  expect(out.trim(), `Hardcoded brand name found:\n${out}`).toBe('')
})
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npx vitest run test/no-hardcoded-brand.test.ts`
Expected: FAIL — lists ~39 files still containing `Diploma360`.

- [ ] **Step 3: Commit the guard (red)**

```bash
git add test/no-hardcoded-brand.test.ts
git commit -m "test(brand): guard against hardcoded brand-name literal (currently red)"
```

---

### Task 8: Tokenize brand name in `data/citta.ts` and `data/diplomi.ts`

**Files:**
- Modify: `data/citta.ts` (38 occurrences), `data/diplomi.ts` (40 occurrences)

**Interfaces:**
- Consumes: `brand.name`.

**Transformation rule:** the literal `Diploma360` inside these data strings becomes `${brand.name}`, converting the containing single-quoted string to a template literal. Add `import { brand } from '@/lib/brand'` at the top of each file.

- [ ] **Step 1: Add the import** to the top of `data/citta.ts` and `data/diplomi.ts`:

```ts
import { brand } from '@/lib/brand'
```

- [ ] **Step 2: Convert each occurrence.** For every string literal containing `Diploma360`, change the quotes to backticks and replace `Diploma360` with `${brand.name}`. Representative examples (apply to ALL matches from `git grep -n "Diploma360" -- data/citta.ts data/diplomi.ts`):

```ts
// before
titoloSeo: 'Recupero anni scolastici a Ancona | Diploma360',
// after
titoloSeo: `Recupero anni scolastici a Ancona | ${brand.name}`,

// before (string with an apostrophe escape stays inside the backticks)
descSeo:
  'Recupero anni scolastici a Ancona con Diploma360: studi online, sostieni l\'esame ...',
// after
descSeo:
  `Recupero anni scolastici a Ancona con ${brand.name}: studi online, sostieni l'esame ...`,
```

Note: inside backticks, `\'` becomes a plain `'`, and any literal backtick or `${` in the copy (none expected here) would need escaping.

- [ ] **Step 3: Verify no literal remains in the data files + typecheck**

Run: `git grep -n "Diploma360" -- data/ ; npx tsc --noEmit`
Expected: no matches in `data/`; typecheck clean.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: compiles; city/diploma pages prerender with the brand name interpolated.

- [ ] **Step 5: Commit**

```bash
git add data/citta.ts data/diplomi.ts
git commit -m "refactor(data): brand name from brand config in city/diploma copy"
```

---

### Task 9: Tokenize brand name in `app/` and `components/` copy

**Files:**
- Modify: all remaining files from `git grep -l "Diploma360" -- app components ':!lib/brand.ts'`.

**Interfaces:**
- Consumes: `brand.name`.

**Transformation rules (apply per occurrence by context):**

1. **JSX text node** → interpolate:
```tsx
// before:  <h2>Perché scegliere Diploma360</h2>
// after:   <h2>Perché scegliere {brand.name}</h2>
```

2. **String prop / metadata / JsonLd value** → template literal:
```tsx
// before:  buildMetadata({ title: 'Chi siamo | Diploma360', ... })
// after:   buildMetadata({ title: `Chi siamo | ${brand.name}`, ... })
```

3. **`alt`/`aria-label` strings** → template literal as in (2).

4. **JsonLd `logo:` absolute URLs** like `'https://www.diploma360.it/assets-vetrina/logo-diploma360.png'` → use the brand: `` `${brand.domain}${brand.logo.header}` `` (this also removes the hardcoded domain). Add the import where needed.

Each modified file must `import { brand } from '@/lib/brand'` (client components already may; server components add it).

- [ ] **Step 1: Enumerate** — `git grep -c "Diploma360" -- app components ':!lib/brand.ts'` to get the per-file counts (work highest-count first).

- [ ] **Step 2: Apply the rules** file by file until `git grep "Diploma360" -- app components ':!lib/brand.ts'` returns nothing. Do NOT touch: `lib/brand.ts`; asset filename substrings (`logo-diploma360.png` is lowercase and won't match); code comments referencing the brand may be reworded or left — the guard only matches `Diploma360` (capital D + 360), so reword any comment that contains that exact form.

- [ ] **Step 3: Run the guard test — expect GREEN now**

Run: `npx vitest run test/no-hardcoded-brand.test.ts`
Expected: PASS.

- [ ] **Step 4: Full test suite + build**

Run: `npm test && npm run build`
Expected: all green; build compiles. Output pristine.

- [ ] **Step 5: Cross-brand build smoke check**

Run: `NEXT_PUBLIC_BRAND=lascuola360 npm run build 2>&1 | grep -iE "error|failed" || echo "lascuola360 build OK"`
Expected: `lascuola360 build OK` (assets are placeholders but paths resolve at build; missing image files do not fail the build — they 404 at runtime, fixed in Phase 3).

- [ ] **Step 6: Commit**

```bash
git add app components
git commit -m "refactor: brand name from brand config across pages/components"
```

---

## Phase 3 — La Scuola360 assets + entry verification

### Task 10: Add La Scuola360 assets

**Files:**
- Create: `public/assets-vetrina/logo-lascuola360.png`, `public/foto/logo-lascuola360.png`, `public/og-image-lascuola360.png` (and `public/icon.svg` variant only if brand-specific — colours are identical, so likely reuse).

**Source:** `/Users/valeriopisapia/Downloads/LaScuola360_logo_vettoriale.svg` (provided).

- [ ] **Step 1: Generate raster logos** sized to the existing usage (header 160×44, LP 160×38). Convert the SVG with `sharp` (already a dependency) or an equivalent tool, preserving aspect ratio and transparent background. Place at the two paths above.

- [ ] **Step 2: Create `og-image-lascuola360.png`** (1200×630) mirroring the Diploma360 OG layout with the La Scuola360 logo/name.

- [ ] **Step 3: Verify files load in a La Scuola360 build**

Run: `NEXT_PUBLIC_BRAND=lascuola360 npm run build`
Expected: compiles. Optionally serve and spot-check the logo renders (see Task 11).

- [ ] **Step 4: Commit**

```bash
git add public/assets-vetrina/logo-lascuola360.png public/foto/logo-lascuola360.png public/og-image-lascuola360.png
git commit -m "assets(lascuola360): brand logos + OG image"
```

---

### Task 11: Manual cross-brand verification

**Files:** none (verification task).

- [ ] **Step 1: Build + run each brand and confirm the swap**

Run (default brand):
```bash
npm run build && npm start &   # serves diploma360
```
Confirm home + `/lp` show Diploma360 logo/name; `/sitemap.xml` uses `www.diploma360.it`; page source contains `GTM-K5VMGM8C`. Stop the server.

Run (La Scuola360):
```bash
NEXT_PUBLIC_BRAND=lascuola360 npm run build && NEXT_PUBLIC_BRAND=lascuola360 npm start &
```
Confirm home + `/lp` show the La Scuola360 logo/name; canonical/OG use `www.lascuola360.it`; page source contains the La Scuola360 GTM id (once real). Stop the server.

- [ ] **Step 2: Record results** in the PR/commit message. No commit needed unless fixes are required.

---

## Phase 4 — Deploy wiring + docs

### Task 12: App Hosting brand env + docs

**Files:**
- Modify: `apphosting.yaml`, `AGENTS.md`, `docs/DEPLOY.md`.

- [ ] **Step 1: Verify the exact mechanism against current App Hosting docs.** Read `node_modules`/official docs for per-backend env vars with **build-time** availability. Target: a Secret-Manager-backed env, mirroring the existing `BREVO_*` entries, but available at BUILD.

- [ ] **Step 2: Add to `apphosting.yaml`** (illustrative — reconcile keys with the verified syntax):

```yaml
  - variable: NEXT_PUBLIC_BRAND
    secret: BRAND            # per-project Secret Manager value: 'diploma360' | 'lascuola360'
    availability:
      - BUILD
      - RUNTIME
```

- [ ] **Step 3: Document the per-project setup** in `docs/DEPLOY.md`: create the `BRAND` secret in each Firebase project (`firebase apphosting:secrets:set BRAND`), set the La Scuola360 project's `BREVO_LIST_ID`, point BOTH backends at `main`, and note GTM/Meta are created per-brand inside each container.

- [ ] **Step 4: Update `AGENTS.md`** — add a "Brands" section: `lib/brand.ts` is the source of truth; `NEXT_PUBLIC_BRAND` selects it; contacts/entity/GTM/Brevo-list/domain are per-brand; prices and honest-claims constraints are identical for both.

- [ ] **Step 5: Commit**

```bash
git add apphosting.yaml AGENTS.md docs/DEPLOY.md
git commit -m "docs+deploy: per-project NEXT_PUBLIC_BRAND wiring for multi-brand"
```

---

## Phase 5 (OPTIONAL, non-blocking) — Contacts centralization

Contacts are **identical** across brands today, so this is future-proofing, not required for the La Scuola360 launch. Do it only if/when contacts must diverge.

### Task 13: Route contacts through `brand.contacts`

**Files:**
- Modify: the ~27 files from `git grep -l "0684280999\|393517214644\|info@diploma360" -- app components`.

**Interfaces:** consumes `brand.contacts.{telDisplay, telHref, whatsappUrl, email}`.

**Mapping (apply per occurrence):**
- `href="tel:0684280999"` and `href="tel:+390684280999"` → `href={brand.contacts.telHref}`
- display `06 84 280 999` / `06 8428 0999` → `{brand.contacts.telDisplay}`
- `href="https://wa.me/393517214644"` and any `wa.me/393517214644` string → `brand.contacts.whatsappUrl`
- `info@diploma360.it` (display and `mailto:`) → `{brand.contacts.email}` / `` `mailto:${brand.contacts.email}` ``

- [ ] **Step 1:** Add a guard (optional) extending Task 7's test to also forbid the raw contact literals outside `lib/brand.ts`.
- [ ] **Step 2:** Apply the mapping file by file; add `import { brand }` where needed.
- [ ] **Step 3:** `npm test && npm run build` — all green.
- [ ] **Step 4:** Commit: `refactor(contacts): route all contacts through brand config`.

---

## Self-Review Notes

- **Spec coverage:** brand module (Task 1), seo/gtm/robots/sitemap/logo/iubenda (Tasks 2-6), name sweep + guard (Tasks 7-9), assets (Task 10), verification (Task 11), deploy/docs (Task 12), contacts (Task 13, optional). GTM "created fresh" finding → placeholder in Task 1 + documented in Task 12. Analytics-in-GTM (no code) → covered by Task 3 only touching the container id. Brevo per-brand list → runtime env, documented Task 12.
- **Placeholders:** `GTM-XXXXXXX`, La Scuola360 assets, and Iubenda id are intentional external values with a defined home (called out in Task 1/10/12), not plan gaps.
- **Type consistency:** `brand.logo.header/lp/alt/ogImage`, `brand.contacts.telDisplay/telHref/whatsappUrl/email`, `brand.legal.iubendaPolicyId`, `brand.gtmId`, `brand.domain`, `brand.name` are used consistently across tasks and match the Task 1 type.
