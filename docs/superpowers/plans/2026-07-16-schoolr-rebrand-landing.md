# Schoolr Rebrand Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a third brand `schoolr` (`NEXT_PUBLIC_BRAND=schoolr`, domain schoolr.net) that serves a single self-contained "Schoolr → LaScuola360" rebrand-announcement page, redirecting every other path to lascuola360.it.

**Architecture:** Reuse the existing build-time multi-brand mechanism in `lib/brand.ts`. The `schoolr` build renders a dedicated `HomeSchoolr` component at `/` (site chrome hidden, like `/lp`), emits a one-entry sitemap, and uses `middleware.ts` to 301-redirect any non-home path to `https://www.lascuola360.it/`. The two existing brands are untouched.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, plain global CSS (no CSS Modules), Vitest + happy-dom, Firebase App Hosting.

## Global Constraints

- **Multi-brand source of truth:** all per-brand divergence goes through `lib/brand.ts` `brand.*` fields — never scattered `if (brand.id)` in shared JSX/CSS beyond the existing selector points.
- **Never hardcode** the literal `Diploma360` or host `www.diploma360.it` in `app/`,`components/`,`data/` (guard test `test/no-hardcoded-brand.test.ts`). The strings `Schoolr`, `LaScuola360`, `Diploma di Stato` are NOT guarded and are allowed.
- **Content verbatim** from `materiale/consegna-valerio/Schoolr Rebrand.dc.html` (READ-ONLY reference — never edit `materiale/`). Keep the designer's spelling **"LaScuola360"** (no space).
- **Honest claims:** "Diploma di Stato riconosciuto" (no MIM/MIUR); no "senza interessi"; study-tools framing OK.
- **Contacts:** `tel:0684280999`, `https://wa.me/393517214644` (shared, via `brand.contacts.*`).
- **CSS convention:** page-specific styling = plain global CSS imported at top of the component (`import './home-schoolr.css'`); bare global class names, NOT CSS Modules.
- **Verify per brand:** `NEXT_PUBLIC_BRAND=<brand> npm run build` for `schoolr`, `diploma360`, `lascuola360`. `npm test` output must be pristine.
- **Link rewrites** (source `.dc.html` → production), applied everywhere in the port:
  | source href | production href |
  |---|---|
  | `Home Scuola360.dc.html` | `https://www.lascuola360.it/` |
  | `Ripetizioni.dc.html` | `https://www.lascuola360.it/ripetizioni` |
  | `tel:0684280999` | `{brand.contacts.telHref}` |
  | `https://wa.me/393517214644` | `{brand.contacts.whatsappUrl}` |

---

## File Structure

- **Create** `public/schoolr/` — page assets (6 image files).
- **Modify** `lib/brand.ts` — add `schoolr` to `BrandId` + `BRANDS`.
- **Create** `lib/brand.test.ts` — assert `resolveBrand('schoolr')` (if no brand test exists yet).
- **Create** `components/home/HomeSchoolr.tsx` + `components/home/home-schoolr.css` — the ported page.
- **Modify** `app/page.tsx` — 3-way home selector + schoolr metadata.
- **Modify** `components/layout/ChromeGate.tsx` — hide site chrome for schoolr.
- **Modify** `app/sitemap.ts` — schoolr emits only `/`.
- **Create** `middleware.ts` — schoolr-only legacy-route 301 redirect.
- **Modify** `AGENTS.md` — document the third brand.

---

## Task 1: Page assets in `public/schoolr/`

**Files:**
- Create: `public/schoolr/logo-lascuola360.svg`, `studentessa.jpg`, `mock-quiz.png`, `mock-podcast.png`, `mock-flashcard.png`, `testimonial-giulia.jpg`

**Interfaces:**
- Produces: image paths `/schoolr/<name>` consumed by Task 3 (`HomeSchoolr`).

- [ ] **Step 1: Copy the six present assets**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site
mkdir -p public/schoolr
cp "materiale/consegna-valerio/assets/logo-lascuola360.svg" public/schoolr/
cp "materiale/consegna-valerio/assets/studentessa.jpg" public/schoolr/
cp "materiale/consegna-valerio/assets/mock-quiz.png" public/schoolr/
cp "materiale/consegna-valerio/assets/mock-podcast.png" public/schoolr/
cp "materiale/consegna-valerio/assets/mock-flashcard.png" public/schoolr/
cp "materiale/consegna-valerio/assets/testimonial-giulia.jpg" public/schoolr/
```

Note: `logo-schoolr.png` is intentionally NOT copied — it does not exist as a file. The Schoolr wordmark is rendered as styled text in Task 3 (`.sr-logo-word`). If the founder later supplies an official `logo-schoolr.png`, drop it in `public/schoolr/` and swap the `.sr-logo-word` span for `<Image src="/schoolr/logo-schoolr.png" .../>`.

- [ ] **Step 2: Verify all six files exist**

Run: `ls -1 public/schoolr/`
Expected: exactly the six filenames above.

- [ ] **Step 3: Commit**

```bash
git add public/schoolr/
git commit -m "feat(schoolr): add rebrand landing assets"
```

---

## Task 2: Add the `schoolr` brand to `lib/brand.ts`

**Files:**
- Modify: `lib/brand.ts`
- Test: `lib/brand.test.ts` (create if absent)

**Interfaces:**
- Produces: `BrandId` now includes `'schoolr'`; `brand.id === 'schoolr'` selectable at build time; `brand.gtmId === 'GTM-K8W5CM7C'`, `brand.domain === 'https://schoolr.net'` when built with `NEXT_PUBLIC_BRAND=schoolr`.

- [ ] **Step 1: Write the failing test**

Create `lib/brand.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { resolveBrand } from './brand'

describe('resolveBrand', () => {
  it('resolves schoolr with schoolr.net domain and its own GTM container', () => {
    const b = resolveBrand('schoolr')
    expect(b.id).toBe('schoolr')
    expect(b.domain).toBe('https://schoolr.net')
    expect(b.gtmId).toBe('GTM-K8W5CM7C')
  })

  it('still resolves the two existing brands', () => {
    expect(resolveBrand('diploma360').id).toBe('diploma360')
    expect(resolveBrand('lascuola360').id).toBe('lascuola360')
  })

  it('throws on unknown brand', () => {
    expect(() => resolveBrand('nope')).toThrow(/Unknown brand/)
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- lib/brand.test.ts`
Expected: FAIL — `resolveBrand('schoolr')` throws "Unknown brand" (schoolr not in BRANDS).

- [ ] **Step 3: Add `schoolr` to the `BrandId` union**

In `lib/brand.ts`, change:

```typescript
export type BrandId = 'diploma360' | 'lascuola360' | 'schoolr'
```

- [ ] **Step 4: Add the `schoolr` entry to `BRANDS`**

In `lib/brand.ts`, inside the `BRANDS` object, after the `lascuola360` entry, add:

```typescript
  schoolr: {
    id: 'schoolr',
    name: 'Schoolr',
    domain: 'https://schoolr.net',
    logo: {
      // Wordmark rendered as text (.sr-logo-word); paths are placeholders/unused.
      header: '/schoolr/logo-schoolr.png',
      lp: '/schoolr/logo-schoolr.png',
      alt: 'Schoolr — ora LaScuola360',
      ogImage: '/og-image-lascuola360.png',
    },
    contacts: SHARED_CONTACTS,
    // schoolr's own GTM container (GA4 G-Q0817JQ7RN + Meta pixel already configured)
    gtmId: 'GTM-K8W5CM7C',
    legal: { entity: 'Classme S.r.l.', iubendaPolicyId: '43474147' },
    platformHost: 'app.lascuola360.it', // unused placeholder
    header: {
      // unused — site chrome is hidden for schoolr (ChromeGate), page has its own header
      showPhone: false,
      primaryCta: { label: 'Vai a LaScuola360', href: 'https://www.lascuola360.it/' },
    },
    copy: {
      // unused — schoolr renders no shared pages
      diverso: 'diverso',
      credibilitaLead: '',
    },
  },
```

- [ ] **Step 5: Run the test to verify it passes**

Run: `npm test -- lib/brand.test.ts`
Expected: PASS (all four assertions).

- [ ] **Step 6: Run the full suite to confirm nothing broke**

Run: `npm test`
Expected: PASS, pristine output (no new warnings). If a `switch (brand.id)` somewhere is now non-exhaustive it will surface here — none is expected.

- [ ] **Step 7: Commit**

```bash
git add lib/brand.ts lib/brand.test.ts
git commit -m "feat(schoolr): register third brand in lib/brand.ts (schoolr.net, GTM-K8W5CM7C)"
```

---

## Task 3: `HomeSchoolr` component + CSS + wire the home selector

**Files:**
- Create: `components/home/HomeSchoolr.tsx`
- Create: `components/home/home-schoolr.css`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `brand.contacts.*` (Task 2); assets under `/schoolr/` (Task 1).
- Produces: `export function HomeSchoolr()`; `app/page.tsx` renders it when `brand.id === 'schoolr'`.

- [ ] **Step 1: Create `components/home/home-schoolr.css`**

Copy the responsive rules + keyframe from the source `<style>` block **verbatim**, plus the wordmark helper. This is the only bespoke CSS; everything else is inline `style` in the JSX (the source is inline-style-based, so keep inline styles as React `style={{…}}` objects during the port — do NOT invent a full class system).

```css
/* home-schoolr.css — bespoke rules for the Schoolr rebrand landing.
   The rest of the page styling lives inline (style={{…}}) matching the source .dc.html. */

.sr-transit { animation: sr-arrowpulse 2.4s ease-in-out infinite; }
@keyframes sr-arrowpulse {
  0%, 100% { transform: translateX(0); opacity: .85; }
  50%      { transform: translateX(5px); opacity: 1; }
}

/* Schoolr wordmark (replaces missing logo-schoolr.png) */
.sr-logo-word {
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  letter-spacing: -.02em;
  color: #C7674E;
  line-height: 1;
  display: inline-block;
}

@media (max-width: 900px) {
  .sr-2col { grid-template-columns: 1fr !important; gap: 32px !important; }
  .sr-3col { grid-template-columns: 1fr !important; }
  .sr-4stat { grid-template-columns: repeat(2, 1fr) !important; }
  .sr-hide-sm { display: none !important; }
}
@media (max-width: 680px) {
  .sr-section { padding-left: 20px !important; padding-right: 20px !important; }
  .sr-header-inner { padding: 0 16px !important; gap: 10px !important; }
  .sr-hd-logos { gap: 8px !important; }
  .sr-hd-logos img, .sr-hd-logos .sr-logo-word { height: 20px !important; font-size: 20px !important; }
  .sr-hd-logos .sr-arrow { display: none !important; }
  .sr-hd-right { gap: 9px !important; }
  .sr-lbl { display: none !important; }
  .sr-cta-hd .sr-cta-full { display: none !important; }
  .sr-cta-hd .sr-cta-short { display: inline !important; }
  .sr-cta-hd { padding: 9px 15px !important; }
  .sr-hero-logos { gap: 14px !important; margin-bottom: 28px !important; }
  .sr-hero-logos .sr-l1 { height: 28px !important; font-size: 28px !important; }
  .sr-hero-logos .sr-l2 { height: 29px !important; }
  .sr-hero-logos .sr-arrow2 { width: 22px !important; height: 22px !important; }
  .sr-footer-inner { padding-left: 20px !important; padding-right: 20px !important; }
}
.sr-cta-hd .sr-cta-short { display: none; }
```

- [ ] **Step 2: Create `components/home/HomeSchoolr.tsx`**

Port `materiale/consegna-valerio/Schoolr Rebrand.dc.html` (lines 54–273, the `<div>…</div>` inside `<x-dc>`) into JSX, section by section, following these rules:

1. First line: `import './home-schoolr.css'`. Also `import Image from 'next/image'` and `import { brand } from '@/lib/brand'`.
2. Convert every inline `style="a:b;c:d"` to a React `style={{ a: 'b', c: 'd' }}` object (camelCase properties). Convert `class="…"` to `className="…"`.
3. Wrap each top-level `<section>` adding `className="sr-section"` (so the 680px padding rule applies) IN ADDITION to keeping its inline style. Keep the existing `.sr-*` classes already present on inner elements (`sr-4stat`, `sr-2col`, `sr-3col`, `sr-hide-sm`, `sr-header-inner`, `sr-hd-logos`, `sr-hd-right`, `sr-lbl`, `sr-cta-hd`/`sr-cta-full`/`sr-cta-short`, `sr-hero-logos`/`sr-l1`/`sr-l2`/`sr-arrow2`, `sr-transit`, `sr-arrow`, `sr-footer-inner`).
4. **Logo replacement:** every `<img src="assets/logo-schoolr.png" alt="Schoolr" style="height:26px;…">` becomes `<span className="sr-logo-word" style={{ fontSize: 26 }}>Schoolr</span>` (header) and `<span className="sr-logo-word sr-l1" style={{ fontSize: 42 }}>Schoolr</span>` (hero, 42px). Keep the arrow SVG and the LaScuola360 logo image as-is.
5. **Images** via `next/image` with explicit width/height (intrinsic-ish; use `width`/`height` matching the rendered box, `style={{ width: '100%', height: 'auto' }}` where the source is fluid):
   - `assets/logo-lascuola360.svg` → `/schoolr/logo-lascuola360.svg` (keep as `<img>` — SVG; `next/image` on SVG is fine but plain `<img>` avoids optimizer issues; use `<img>` with width/height 130×26 header, ~150×44 hero).
   - `assets/studentessa.jpg` → `/schoolr/studentessa.jpg` (`<Image>` `width={720}` `height={612}`, `style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top' }}`).
   - `assets/mock-quiz.png` → `/schoolr/mock-quiz.png` (`<Image>` `width={720}` `height={480}`, `style={{ width:'100%', height:'auto', display:'block' }}`).
   - `assets/mock-podcast.png` → `/schoolr/mock-podcast.png` (`<Image>` `width={520}` `height={360}`, fluid).
   - `assets/mock-flashcard.png` → `/schoolr/mock-flashcard.png` (`<Image>` `width={520}` `height={360}`, fluid).
   - `assets/testimonial-giulia.jpg` → `/schoolr/testimonial-giulia.jpg` (`<Image>` `width={40}` `height={40}`, `style={{ borderRadius:'50%', objectFit:'cover' }}`).
6. **Link rewrites** per the Global Constraints table. Use `{brand.contacts.telHref}` / `{brand.contacts.whatsappUrl}` for phone/WhatsApp anchors. `Home Scuola360.dc.html` → `https://www.lascuola360.it/`; `Ripetizioni.dc.html` → `https://www.lascuola360.it/ripetizioni`.
7. Keep the outer wrapper `<div>` (line 54) with its radial-gradient background inline style. The component returns a single root fragment/`<div>` containing header + all sections + footer (the page is self-contained).
8. Do NOT add a Google-Fonts `<link>` (the root layout already loads Poppins/Inter). Do NOT render `SiteHeader`/`BrandFooter` (hidden by ChromeGate in Task 4).
9. JSX gotchas: `<br>` → `<br />`; SVG attributes to camelCase (`stroke-width` → `strokeWidth`, `stroke-linecap` → `strokeLinecap`, `stroke-linejoin` → `strokeLinejoin`, `clip-path`→`clipPath`, `fill-rule`→`fillRule`, `stroke-linecap` etc.); `xmlns` stays; `viewBox` stays; `<line>`/`<polyline>`/`<path>`/`<circle>`/`<rect>` points/coords unchanged. `-webkit-background-clip` → `WebkitBackgroundClip: 'text'` and `backgroundClip: 'text'`.

Component signature:

```tsx
import './home-schoolr.css'
import Image from 'next/image'
import { brand } from '@/lib/brand'

export function HomeSchoolr() {
  return (
    <div style={{ /* wrapper background from source line 54 */ }}>
      {/* header, hero, stats, perché, cosa-resta, novità-diploma, novità-strumenti, continuità, lead, footer */}
    </div>
  )
}
```

- [ ] **Step 3: Wire the 3-way selector in `app/page.tsx`**

Replace the imports and body:

```tsx
import { brand } from '@/lib/brand'
import { buildMetadata } from '@/lib/seo'
import { HomeDiploma } from '@/components/home/HomeDiploma'
import { HomeLaScuola } from '@/components/home/HomeLaScuola'
import { HomeSchoolr } from '@/components/home/HomeSchoolr'

export const metadata =
  brand.id === 'schoolr'
    ? buildMetadata({
        title: 'Schoolr ora è LaScuola360',
        description:
          'Schoolr è diventata LaScuola360: stesso team, stesso account, stesse ripetizioni — e ora anche il Diploma di Stato e nuovi strumenti di studio.',
        path: '/',
      })
    : brand.id === 'lascuola360'
      ? buildMetadata({
          title: `Diploma e ripetizioni online | ${brand.name}`,
          description:
            `${brand.name}: la scuola online di Classme per il Diploma di Stato e le ripetizioni, con tutor e docenti reali e una piattaforma che ti dice sempre cosa studiare dopo.`,
          path: '/',
        })
      : buildMetadata({
          title: `Diploma online e recupero anni scolastici | ${brand.name}`,
          description:
            'Recupera gli anni persi e prendi il Diploma di Stato da casa: lezioni live, tutor dedicati e materiali pronti. Scopri gratis il tuo percorso.',
          path: '/',
        })

export default function HomePage() {
  if (brand.id === 'schoolr') return <HomeSchoolr />
  return brand.id === 'lascuola360' ? <HomeLaScuola /> : <HomeDiploma />
}
```

- [ ] **Step 4: Type-check the component and page**

Run: `npx tsc --noEmit`
Expected: no errors in `HomeSchoolr.tsx` / `page.tsx`.

- [ ] **Step 5: Build the schoolr brand**

Run: `NEXT_PUBLIC_BRAND=schoolr npm run build`
Expected: build succeeds; `/` is a static route.

- [ ] **Step 6: Guard test still green**

Run: `npm test -- test/no-hardcoded-brand.test.ts`
Expected: PASS (the port contains no `Diploma360`/`www.diploma360.it` literal).

- [ ] **Step 7: Visual check vs the source**

Run the schoolr dev server and compare against the source ANTEPRIMA:

```bash
NEXT_PUBLIC_BRAND=schoolr npm run dev
```

Open `http://localhost:3000/` and `materiale/consegna-valerio/ANTEPRIMA - Schoolr Rebrand.html` side by side. Confirm: dual-logo header, hero, 4 stats, 3 "cosa resta uguale" cards, novità Diploma image, 4 strumenti, testimonial, lead CTA block (no form), dark footer. All CTAs point to lascuola360.it; phone/WhatsApp correct.

- [ ] **Step 8: Commit**

```bash
git add components/home/HomeSchoolr.tsx components/home/home-schoolr.css app/page.tsx
git commit -m "feat(schoolr): port rebrand landing page + 3-way home selector"
```

---

## Task 4: Hide site chrome for schoolr (`ChromeGate`)

**Files:**
- Modify: `components/layout/ChromeGate.tsx`

**Interfaces:**
- Consumes: `brand.id` (Task 2).
- Produces: `<SiteHeader/>` and `<BrandFooter/>` render nothing on the schoolr build.

- [ ] **Step 1: Add the schoolr early-return**

Rewrite `components/layout/ChromeGate.tsx`:

```tsx
'use client'
import { usePathname } from 'next/navigation'
import { brand } from '@/lib/brand'

export function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  // Schoolr is a single self-contained page with its own header/footer.
  if (brand.id === 'schoolr') return null
  if (pathname?.startsWith('/lp')) return null
  return <>{children}</>
}
```

- [ ] **Step 2: Build schoolr and confirm no double chrome**

Run: `NEXT_PUBLIC_BRAND=schoolr npm run build`
Expected: success. In the schoolr dev server, `/` shows only the page's own header/footer (no `SiteHeader` mega-menu, no `BrandFooter`).

- [ ] **Step 3: Confirm the other brands still show chrome**

Run: `NEXT_PUBLIC_BRAND=diploma360 npm run build`
Expected: success; `/` still renders `SiteHeader` + `Footer` (unchanged).

- [ ] **Step 4: Test suite**

Run: `npm test`
Expected: PASS, pristine. (If a `ChromeGate` test exists it must still pass — the new branch only adds behavior for schoolr.)

- [ ] **Step 5: Commit**

```bash
git add components/layout/ChromeGate.tsx
git commit -m "feat(schoolr): hide site header/footer on the schoolr build"
```

---

## Task 5: Schoolr sitemap emits only `/`

**Files:**
- Modify: `app/sitemap.ts`

**Interfaces:**
- Consumes: `brand.id` / `brand.domain` (Task 2).
- Produces: `sitemap()` returns a single `/` entry when `brand.id === 'schoolr'`.

- [ ] **Step 1: Add the schoolr early branch**

In `app/sitemap.ts`, at the very top of `export default function sitemap()` (before building `staticEntries`):

```typescript
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  if (brand.id === 'schoolr') {
    return [
      {
        url: `${BASE}/`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 1.0,
      },
    ]
  }

  // …existing diploma/lascuola logic unchanged…
```

Leave the rest of the function exactly as-is.

- [ ] **Step 2: Build schoolr and inspect the sitemap**

Run: `NEXT_PUBLIC_BRAND=schoolr npm run build`
Then check the generated sitemap:

```bash
grep -c "<url>" .next/server/app/sitemap.xml.body 2>/dev/null || (NEXT_PUBLIC_BRAND=schoolr npm run dev & sleep 6 && curl -s http://localhost:3000/sitemap.xml && kill %1)
```

Expected: exactly one `<url>` entry, `https://schoolr.net/`.

- [ ] **Step 3: Confirm diploma sitemap unchanged**

Run: `NEXT_PUBLIC_BRAND=diploma360 npm run dev` then `curl -s http://localhost:3000/sitemap.xml | grep -c "<url>"`
Expected: the full set of diploma routes (unchanged, > 40 entries), no `/ripetizioni`.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat(schoolr): sitemap emits only the home route for schoolr"
```

---

## Task 6: `middleware.ts` — redirect non-home paths to lascuola360.it (schoolr only)

**Files:**
- Create: `middleware.ts` (repo root)

**Interfaces:**
- Consumes: `brand.id` (Task 2).
- Produces: on the schoolr build, any request whose pathname ≠ `/` and is not an asset/internal path receives a 301 to `https://www.lascuola360.it/`. No-op on the other brands.

- [ ] **Step 1: Read the Next 16 middleware reference**

Before writing, skim `node_modules/next/dist/docs/` for the middleware API (this repo warns Next 16 differs from training data). Confirm `NextRequest`/`NextResponse` import path and the `config.matcher` syntax.

- [ ] **Step 2: Create `middleware.ts`**

```typescript
import { NextResponse, type NextRequest } from 'next/server'
import { brand } from '@/lib/brand'

const LASCUOLA_HOME = 'https://www.lascuola360.it/'

export function middleware(request: NextRequest) {
  // Only the schoolr build redirects; other brands are a no-op.
  if (brand.id !== 'schoolr') return NextResponse.next()
  // The home page is the rebrand landing; everything else forwards to LaScuola360.
  if (request.nextUrl.pathname === '/') return NextResponse.next()
  return NextResponse.redirect(LASCUOLA_HOME, 301)
}

export const config = {
  // Skip API, Next internals, and any path with a file extension (static assets,
  // /schoolr/*.png, /sitemap.xml, /robots.txt, favicon, og-image).
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}
```

- [ ] **Step 3: Build schoolr with middleware**

Run: `NEXT_PUBLIC_BRAND=schoolr npm run build`
Expected: build succeeds and reports a Middleware entry.

- [ ] **Step 4: Verify redirect behavior on the schoolr dev server**

```bash
NEXT_PUBLIC_BRAND=schoolr npm run dev
```

Then:

```bash
curl -sI http://localhost:3000/ | head -1                     # 200
curl -sI http://localhost:3000/prezzi | grep -iE 'HTTP|location'   # 301 → https://www.lascuola360.it/
curl -sI http://localhost:3000/ripetizioni | grep -iE 'HTTP|location' # 301 → https://www.lascuola360.it/
curl -sI http://localhost:3000/sitemap.xml | head -1          # 200 (not redirected)
curl -sI http://localhost:3000/schoolr/mock-quiz.png | head -1 # 200 (asset not redirected)
```

Expected: `/` and assets/sitemap = 200; other routes = 301 to the LaScuola360 home.

- [ ] **Step 5: Confirm the middleware is a no-op on diploma360**

```bash
NEXT_PUBLIC_BRAND=diploma360 npm run dev
curl -sI http://localhost:3000/prezzi | head -1   # 200 (no redirect)
```

Expected: 200 — the diploma build serves `/prezzi` normally.

- [ ] **Step 6: Commit**

```bash
git add middleware.ts
git commit -m "feat(schoolr): redirect non-home paths to lascuola360.it (schoolr build only)"
```

---

## Task 7: Documentation + full three-brand verification

**Files:**
- Modify: `AGENTS.md`

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Document the third brand in `AGENTS.md`**

In the **Brands** section, update the opening line and add a short schoolr note. Change the first sentence of the Brands section from "The SAME repo/content serves TWO brands" to "The SAME repo/content serves THREE brands (Diploma360 + La Scuola360 + Schoolr)", and add this bullet after the La Scuola360 superset paragraph:

```markdown
- **Schoolr is a single-page rebrand brand.** `NEXT_PUBLIC_BRAND=schoolr` (domain `schoolr.net`)
  serves ONLY the "Schoolr → LaScuola360" rebrand landing at `/` (`components/home/HomeSchoolr.tsx`,
  self-contained — site chrome hidden by `ChromeGate`). It uses schoolr's own GTM container
  `GTM-K8W5CM7C` (GA4 `G-Q0817JQ7RN` + its Meta pixel). `middleware.ts` 301-redirects every
  non-home path to `https://www.lascuola360.it/`; its sitemap is only `/`. Deploy as a third
  Firebase App Hosting backend `schoolr-site` with `NEXT_PUBLIC_BRAND=schoolr`.
```

- [ ] **Step 2: Build all three brands cleanly**

```bash
NEXT_PUBLIC_BRAND=schoolr npm run build
NEXT_PUBLIC_BRAND=lascuola360 npm run build
NEXT_PUBLIC_BRAND=diploma360 npm run build
```

Expected: all three succeed with no errors.

- [ ] **Step 3: Full test suite**

Run: `npm test`
Expected: PASS, pristine output (no warnings).

- [ ] **Step 4: Regression spot-check (diploma unchanged)**

Confirm the diploma build's `/`, nav, footer, and sitemap are unchanged vs `main` (git diff shows only additive branches in `app/page.tsx`, `ChromeGate.tsx`, `app/sitemap.ts`, `lib/brand.ts`):

```bash
git diff main --stat
```

Expected: only the files listed in this plan are touched; no edits to `HomeDiploma`, `HomeLaScuola`, nav data, or footer components.

- [ ] **Step 5: Commit**

```bash
git add AGENTS.md
git commit -m "docs(agents): document Schoolr as the third single-page brand"
```

---

## Self-Review (completed during authoring)

- **Spec coverage:** brand config (T2), page port (T3), chrome hidden (T4), sitemap (T5), middleware redirect (T6), assets (T1), docs (T7), GTM-K8W5CM7C (T2), verbatim content + link rewrites (Global Constraints + T3). All spec sections mapped.
- **Placeholder scan:** the only intentional deferral is the official `logo-schoolr.png` file — resolved deterministically with the `.sr-logo-word` text wordmark and a documented swap-in point (T1/T3), not a TODO.
- **Type consistency:** `HomeSchoolr` (used in T3), `brand.id === 'schoolr'` branches (T2–T6), `resolveBrand` (T2 test) — names consistent across tasks.
