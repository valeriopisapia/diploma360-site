# Diploma360 Site (Next.js) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the existing static Diploma360 showcase site and Ads landing page into a Next.js (App Router) app that is SEO-solid, tracks via GTM + Meta Pixel with Consent Mode v2, and sends form leads to Brevo.

**Architecture:** Next.js App Router, statically generated (SSG) pages plus one serverless API route (`/api/lead`) that keeps the Brevo API key server-side. The validated design system (`styles/site.css`) is ported verbatim as global CSS; per-page inline `<style>` blocks become CSS Modules. Repetitive pages (19 cities, ~20 diplomas) are generated from data files. Deploy target is Firebase App Hosting.

**Tech Stack:** Next.js 15 (App Router, TypeScript), React 19, Tailwind CSS (utility only — does NOT replace `site.css`), Vitest + React Testing Library (unit/component), Firebase App Hosting.

## Global Constraints

Every task implicitly inherits these. Values copied verbatim from the design spec (`docs/superpowers/specs/2026-06-30-diploma360-site-nextjs-design.md`).

- **Design system is the source of truth.** Port `materiale/sito-vetrina-diploma360-v3/styles/site.css` faithfully. Modify brand colors only in this one file. Brand tokens: corallo `#E48267`, gradient `#E3815A → #EC89C0`, verde AA `#16a34a`.
- **Prices, verbatim:** `1.500 € / 1.900 € / 2.900 €` — installments `72,68 / 92,06 / 140,52 €/mese × 24`. **Never write "senza interessi".**
- **Honest claims only:** never "facciamo al posto tuo"; use "Diploma di Stato riconosciuto" (never "MIM"/"MIUR"); use "Coordinatrice del percorso". **No AI claims anywhere.**
- **Contacts on CTAs:** `tel:0684280999` · `https://wa.me/393517214644` · `info@diploma360.it`. Header primary button = "Chiama ora".
- **Tracking IDs:** GTM `GTM-K5VMGM8C`; Google Tag (GA4) `GT-M3LW776G`; Meta Pixel `1460557338306322`. All tags fire **through GTM**, gated by Consent Mode v2.
- **Logo:** official PNG with "Powered by LaScuola360". Fake partner/review logos stay with disclaimer until real ones arrive.
- **Canonical domain:** `https://www.diploma360.it`.
- **`/lp` is `noindex`** and excluded from sitemap, menu, and footer.
- **TDD:** write the failing test first, watch it fail, implement minimal code, watch it pass, commit. Frequent commits. DRY, YAGNI.
- **Source material is read-only reference:** `materiale/**` is the input. Never edit it; port from it.

**Source → target route map** (used throughout):

| Source file (`materiale/sito-vetrina-diploma360-v3/`) | Route | `<title>` |
|---|---|---|
| `index.html` | `/` | Diploma online e recupero anni scolastici \| Diploma360 |
| `come-funziona.html` | `/come-funziona` | Come funziona \| Diploma360 |
| `piattaforma.html` | `/piattaforma` | La piattaforma \| Diploma360 |
| `nostra-piattaforma.html` | `/nostra-piattaforma` | La nostra piattaforma \| Diploma360 |
| `diplomi.html` | `/diplomi` | Diplomi e indirizzi online \| Diploma360 |
| `esami-diploma.html` | `/esami-diploma` | Il valore del diploma \| Diploma di Stato riconosciuto — Diploma360 |
| `esami-normativa.html` | `/esami-normativa` | Esami e normativa \| Come funzionano gli esami — Diploma360 |
| `iscrizioni.html` | `/iscrizioni` | Iscrizioni 2026/2027 \| Diploma360 |
| `garanzia.html` | `/garanzia` | Garanzia Promosso o Ripreparato \| Diploma360 |
| `prezzi.html` | `/prezzi` | Prezzi e piani \| Diploma360 |
| `sedi-esame.html` | `/sedi-esame` | Sedi d'esame in tutta Italia — Diploma360 |
| `credibilita.html` | `/credibilita` | Perché fidarti di Diploma360 — Serietà e garanzie |
| `recuperare-due-anni-in-uno.html` | `/recuperare-due-anni-in-uno` | Recuperare due anni in uno: come funziona e quanto costa |
| `faq.html` | `/faq` | Domande frequenti \| Diploma360 |
| `chi-siamo.html` | `/chi-siamo` | Chi siamo \| Diploma360 |
| `contatti.html` | `/contatti` | Contatti \| Diploma360 |
| `grazie.html` | `/grazie` | Grazie! Richiesta ricevuta — Diploma360 |
| `privacy.html` | `/privacy` | Privacy Policy \| Diploma360 |
| `cookie.html` | `/cookie` | Cookie Policy \| Diploma360 |
| `termini.html` | `/termini` | Termini di servizio \| Diploma360 |
| `404.html` | `not-found` | Pagina non trovata \| Diploma360 |
| `recupero-anni-<citta>.html` ×19 | `/recupero-anni-scolastici-<citta>` | (per-city, from source) |
| `diplomi/<slug>.html` ×20 | `/diplomi/<slug>` | (per-diploma, from source) |

**City slugs (19):** ancona, bari, bergamo, bologna, cagliari, catania, firenze, genova, latina, milano, napoli, padova, palermo, perugia, pescara, roma, salerno, torino, verona.
**Diploma slugs (20):** afm, agricoltura, chimica, elettronica, enogastronomia, grafica, informatica, liceo-artistico, liceo-classico, liceo-economico-sociale, liceo-linguistico, liceo-scientifico, liceo-scienze-applicate, liceo-scienze-umane, liceo-sportivo, meccanica, rim, sanita, servizi-commerciali, turismo.

---

## File Structure

```
app/
  layout.tsx                          → root: <html lang="it">, GTM, consent default, site.css, header, footer
  page.tsx                            → Home (port of index.html)
  <standard-page>/page.tsx            → one folder per standard route above
  recupero-anni-scolastici-[citta]/page.tsx   → dynamic, generateStaticParams from data/citta
  diplomi/page.tsx                    → diplomi index
  diplomi/[slug]/page.tsx             → dynamic, generateStaticParams from data/diplomi
  lp/layout.tsx + lp/page.tsx         → Ads landing, noindex, own chrome
  not-found.tsx                       → 404
  api/lead/route.ts                   → POST → Brevo
  sitemap.ts                          → all indexable URLs (excludes /lp)
  robots.ts
components/
  layout/SiteHeader.tsx  MegaMenu.tsx  MobileMenu.tsx  Footer.tsx
  forms/LeadForm.tsx
  consent/CookieBanner.tsx
  marketing/PartnerCarousel.tsx  FaqAccordion.tsx
  seo/JsonLd.tsx
  gtm/GtmScript.tsx  ConsentDefault.tsx
data/
  citta.ts        → City[] (slug, nome, …) + getCitta/allCittaSlugs
  diplomi.ts      → Diploma[] (slug, nome, …) + getDiploma/allDiplomaSlugs
  navigazione.ts  → header/mega-menu + footer link trees
  prezzi.ts       → 3 plans (price, monthly rate)
lib/
  brevo.ts        → createBrevoContact(payload, opts)
  seo.ts          → buildMetadata(...)
  analytics.ts    → pushLead(dataLayer event)
styles/
  site.css        → ported design system (single source of brand colors)
public/
  assets-vetrina/…  → copied from materiale showcase
  foto/…            → copied from materiale landing
apphosting.yaml     → Firebase App Hosting config + secret bindings
vitest.config.ts
```

---

### Task 1: Scaffold Next.js app + design system import

**Files:**
- Create: `package.json`, `next.config.mjs`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.mjs`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `vitest.config.ts`, `.gitignore`
- Create: `styles/site.css` (copied from `materiale/sito-vetrina-diploma360-v3/styles/site.css`)
- Create: `public/assets-vetrina/` (copied), `public/foto/` (copied)

**Interfaces:**
- Produces: a running Next.js app with `site.css` loaded globally; `npm run build` succeeds; `npm test` runs Vitest.

- [ ] **Step 1: Scaffold the app non-interactively**

```bash
cd /Volumes/ExtremeSSD/projects/schoolr/new/diploma360-site
npx create-next-app@latest . --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*" --no-turbopack --use-npm --yes
```

If `create-next-app` refuses because the directory is non-empty (README, docs, materiale exist), scaffold in a temp dir and move files in:

```bash
TMP=$(mktemp -d) && npx create-next-app@latest "$TMP/app" --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*" --no-turbopack --use-npm --yes
rsync -a --exclude README.md "$TMP/app/" ./
```

- [ ] **Step 2: Install test tooling**

```bash
npm i -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Add `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: { environment: 'jsdom', globals: true, setupFiles: ['./vitest.setup.ts'] },
  resolve: { alias: { '@': new URL('./', import.meta.url).pathname } },
})
```

Create `vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

Add to `package.json` scripts: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: Copy design system + assets (read-only source → app)**

```bash
cp "materiale/sito-vetrina-diploma360-v3/styles/site.css" styles/site.css
mkdir -p public/assets-vetrina && cp -R "materiale/sito-vetrina-diploma360-v3/assets-vetrina/." public/assets-vetrina/
mkdir -p public/foto && cp -R "materiale/landing page diploma360/foto/." public/foto/
```

- [ ] **Step 5: Wire `site.css` globally**

In `app/globals.css`, keep Tailwind directives and append `@import '../styles/site.css';` at the top (before Tailwind layers so Tailwind utilities can override where needed). Confirm `app/layout.tsx` imports `./globals.css` and sets `<html lang="it">`.

- [ ] **Step 6: Replace default home with a placeholder that proves CSS loads**

`app/page.tsx`:

```tsx
export default function Home() {
  return <main className="container"><h1>Diploma360 — porting in corso</h1></main>
}
```

- [ ] **Step 7: Verify build + dev render**

Run: `npm run build`
Expected: build completes with `/` as a static route, no errors.

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "chore: scaffold Next.js app, import site.css + assets"
```

---

### Task 2: Data layer — cities & diplomas

**Files:**
- Create: `data/citta.ts`, `data/diplomi.ts`
- Test: `data/citta.test.ts`, `data/diplomi.test.ts`

**Interfaces:**
- Produces:
  - `type City = { slug: string; nome: string; titoloSeo: string; descSeo: string }`
  - `export const citta: City[]`, `export function getCitta(slug: string): City | undefined`, `export function allCittaSlugs(): string[]`
  - `type Diploma = { slug: string; nome: string; categoria: 'liceo' | 'tecnico' | 'professionale'; titoloSeo: string; descSeo: string }`
  - `export const diplomi: Diploma[]`, `export function getDiploma(slug): Diploma | undefined`, `export function allDiplomaSlugs(): string[]`
- Per-city/diploma `titoloSeo`/`descSeo` are read from each source file's `<title>`/`<meta description>` while porting (Tasks 9–10); here seed with the slug-derived `nome` and leave SEO fields populated from source at port time. Populate all 19 + 20 entries now with `slug` and human `nome`.

- [ ] **Step 1: Write failing test for cities**

`data/citta.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { citta, getCitta, allCittaSlugs } from './citta'

describe('citta', () => {
  it('has the 19 expected slugs', () => {
    expect(allCittaSlugs().sort()).toEqual([
      'ancona','bari','bergamo','bologna','cagliari','catania','firenze','genova','latina',
      'milano','napoli','padova','palermo','perugia','pescara','roma','salerno','torino','verona',
    ].sort())
  })
  it('looks up a city by slug', () => {
    expect(getCitta('milano')?.nome).toBe('Milano')
    expect(getCitta('nope')).toBeUndefined()
  })
  it('every entry has non-empty seo fields', () => {
    for (const c of citta) { expect(c.titoloSeo).toBeTruthy(); expect(c.descSeo).toBeTruthy() }
  })
})
```

- [ ] **Step 2: Run test, verify it fails**

Run: `npm test -- data/citta.test.ts`
Expected: FAIL (module not found / exports undefined).

- [ ] **Step 3: Implement `data/citta.ts`**

Build the array from the slug list, `nome` = capitalized city name, `titoloSeo`/`descSeo` copied from each `materiale/.../recupero-anni-<slug>.html` `<title>`/description. Provide `getCitta` (find by slug) and `allCittaSlugs` (map slug).

- [ ] **Step 4: Run cities test, verify pass**

Run: `npm test -- data/citta.test.ts`
Expected: PASS.

- [ ] **Step 5: Repeat for diplomas (test first)**

`data/diplomi.test.ts` asserts the 20 slugs (list in Global Constraints), `getDiploma('afm')?.nome` truthy, and non-empty seo fields. Then implement `data/diplomi.ts` reading `<title>`/description from each `materiale/.../diplomi/<slug>.html`, with `categoria` derived (slugs starting `liceo-` → `'liceo'`; map the rest to `'tecnico'`/`'professionale'` per the showcase's `diplomi.html` grouping).

- [ ] **Step 6: Run diplomas test, verify pass**

Run: `npm test -- data/diplomi.test.ts`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add data/ && git commit -m "feat(data): city and diploma data with lookups"
```

---

### Task 3: SEO helper + JSON-LD component

**Files:**
- Create: `lib/seo.ts`, `components/seo/JsonLd.tsx`
- Test: `lib/seo.test.ts`, `components/seo/JsonLd.test.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `buildMetadata(opts: { title: string; description: string; path: string; noindex?: boolean; ogImage?: string }): import('next').Metadata` — sets `title`, `description`, `alternates.canonical` = `https://www.diploma360.it` + path, `openGraph`, `robots: { index:false, follow:false }` when `noindex`.
  - `<JsonLd data={object} />` — renders `<script type="application/ld+json">` with `JSON.stringify(data)`.

- [ ] **Step 1: Write failing test for `buildMetadata`**

`lib/seo.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { buildMetadata } from './seo'

it('builds canonical + index metadata', () => {
  const m = buildMetadata({ title: 'X', description: 'Y', path: '/prezzi' })
  expect(m.alternates?.canonical).toBe('https://www.diploma360.it/prezzi')
  expect(m.title).toBe('X')
})
it('sets noindex robots when asked', () => {
  const m = buildMetadata({ title: 'X', description: 'Y', path: '/lp', noindex: true })
  expect(m.robots).toMatchObject({ index: false, follow: false })
})
```

- [ ] **Step 2: Run, verify fail**

Run: `npm test -- lib/seo.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `lib/seo.ts`** with `const SITE = 'https://www.diploma360.it'` and the mapping described in Interfaces.

- [ ] **Step 4: Run, verify pass**

Run: `npm test -- lib/seo.test.ts`
Expected: PASS.

- [ ] **Step 5: Test + implement `JsonLd`**

`components/seo/JsonLd.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { JsonLd } from './JsonLd'

it('serializes data into a ld+json script', () => {
  const { container } = render(<JsonLd data={{ '@type': 'FAQPage' }} />)
  const s = container.querySelector('script[type="application/ld+json"]')
  expect(s?.innerHTML).toContain('"FAQPage"')
})
```

Implement: `export function JsonLd({ data }: { data: unknown }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} /> }`

- [ ] **Step 6: Run, verify pass**

Run: `npm test -- components/seo/JsonLd.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add lib/seo.ts components/seo/ && git commit -m "feat(seo): metadata builder + JsonLd component"
```

---

### Task 4: GTM + Consent Mode v2 (default denied)

**Files:**
- Create: `components/gtm/ConsentDefault.tsx`, `components/gtm/GtmScript.tsx`, `lib/analytics.ts`
- Test: `lib/analytics.test.ts`, `components/gtm/ConsentDefault.test.tsx`

**Interfaces:**
- Produces:
  - `ConsentDefault` — inline script (via `next/script` strategy `beforeInteractive`) that sets `window.dataLayer`, defines `gtag`, and calls `gtag('consent','default',{ ad_storage:'denied', analytics_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', wait_for_update:500 })`. Must run **before** GTM.
  - `GtmScript` — loads GTM `GTM-K5VMGM8C` via `next/script` (`afterInteractive`) + the `<noscript>` iframe.
  - `lib/analytics.ts`: `grantConsent()` → `gtag('consent','update',{ ad_storage:'granted', analytics_storage:'granted', ad_user_data:'granted', ad_personalization:'granted' })`; `pushLead(p: { origine: string; pagina: string })` → `window.dataLayer.push({ event: 'lead_submit', ...p })`.

- [ ] **Step 1: Write failing test for `pushLead`/`grantConsent`**

`lib/analytics.test.ts`:

```ts
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { pushLead, grantConsent } from './analytics'

beforeEach(() => { (window as any).dataLayer = []; (window as any).gtag = (...a: any[]) => (window as any).dataLayer.push(a) })

it('pushes a lead_submit event', () => {
  pushLead({ origine: 'vetrina', pagina: '/prezzi' })
  expect((window as any).dataLayer).toContainEqual({ event: 'lead_submit', origine: 'vetrina', pagina: '/prezzi' })
})
it('grants all consent signals', () => {
  grantConsent()
  expect((window as any).dataLayer).toContainEqual(['consent','update',{ ad_storage:'granted', analytics_storage:'granted', ad_user_data:'granted', ad_personalization:'granted' }])
})
```

- [ ] **Step 2: Run, verify fail**

Run: `npm test -- lib/analytics.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `lib/analytics.ts`** per Interfaces (guard `typeof window !== 'undefined'`).

- [ ] **Step 4: Run, verify pass**

Run: `npm test -- lib/analytics.test.ts`
Expected: PASS.

- [ ] **Step 5: Implement `ConsentDefault` + `GtmScript`** as described; test that `ConsentDefault` renders a script containing `'consent','default'` and `analytics_storage`.

`components/gtm/ConsentDefault.test.tsx`:

```tsx
import { render } from '@testing-library/react'
import { ConsentDefault } from './ConsentDefault'
it('emits a default-denied consent script', () => {
  const { container } = render(<ConsentDefault />)
  expect(container.innerHTML).toContain("'consent','default'")
  expect(container.innerHTML).toContain("analytics_storage:'denied'")
})
```

- [ ] **Step 6: Run, verify pass**

Run: `npm test -- components/gtm/ConsentDefault.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add components/gtm/ lib/analytics.ts && git commit -m "feat(gtm): GTM loader + Consent Mode v2 default denied"
```

---

### Task 5: Brevo lead pipeline (`/api/lead`)

**Files:**
- Create: `lib/brevo.ts`, `app/api/lead/route.ts`
- Test: `lib/brevo.test.ts`, `app/api/lead/route.test.ts`

**Interfaces:**
- Consumes: env `BREVO_API_KEY`, `BREVO_LIST_ID`.
- Produces:
  - `type LeadPayload = { nome?: string; telefono: string; email: string; per_chi?: string; messaggio?: string; pagina?: string; origine?: string; ts?: string }`
  - `createBrevoContact(p: LeadPayload, env: { apiKey: string; listId: string }, fetchImpl?: typeof fetch): Promise<{ ok: true } | { ok: false; status: number; error: string }>` — POSTs to `https://api.brevo.com/v3/contacts` with `updateEnabled:true`, `listIds:[Number(listId)]`, attributes `{ NOME, SMS:telefono, PER_CHI, MESSAGGIO, PAGINA_ARRIVO:pagina, ORIGINE:origine, DATA_RICHIESTA:ts }`. Treats Brevo `duplicate_parameter`/"already exist" as success.
  - `app/api/lead/route.ts` exports `POST(req: Request)`: 405 on non-POST is N/A (route only defines POST); validates `email`+`telefono` required → 400; honeypot field `website` non-empty → 200 no-op; missing env → 500; delegates to `createBrevoContact`.

- [ ] **Step 1: Write failing test for `createBrevoContact` (happy path, mocked fetch)**

`lib/brevo.test.ts`:

```ts
import { describe, it, expect, vi } from 'vitest'
import { createBrevoContact } from './brevo'

const env = { apiKey: 'k', listId: '7' }

it('maps payload to Brevo attributes and succeeds on 201', async () => {
  const fetchMock = vi.fn(async () => new Response(null, { status: 201 }))
  const res = await createBrevoContact(
    { email: 'a@b.it', telefono: '333', nome: 'Ada', per_chi: 'Per me', pagina: '/lp', origine: 'landing-ads' },
    env, fetchMock as any)
  expect(res.ok).toBe(true)
  const body = JSON.parse((fetchMock.mock.calls[0][1] as any).body)
  expect(body.listIds).toEqual([7])
  expect(body.attributes).toMatchObject({ NOME: 'Ada', SMS: '333', PER_CHI: 'Per me', PAGINA_ARRIVO: '/lp', ORIGINE: 'landing-ads' })
})

it('treats duplicate contact as success', async () => {
  const fetchMock = vi.fn(async () => new Response('{"code":"duplicate_parameter"}', { status: 400 }))
  const res = await createBrevoContact({ email: 'a@b.it', telefono: '1' }, env, fetchMock as any)
  expect(res.ok).toBe(true)
})

it('reports real Brevo errors', async () => {
  const fetchMock = vi.fn(async () => new Response('boom', { status: 500 }))
  const res = await createBrevoContact({ email: 'a@b.it', telefono: '1' }, env, fetchMock as any)
  expect(res.ok).toBe(false)
})
```

- [ ] **Step 2: Run, verify fail**

Run: `npm test -- lib/brevo.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement `lib/brevo.ts`** (port logic from `materiale/sito-vetrina-diploma360-v3/api/lead.js`, parameterizing fetch + env, returning the result union).

- [ ] **Step 4: Run, verify pass**

Run: `npm test -- lib/brevo.test.ts`
Expected: PASS.

- [ ] **Step 5: Write failing test for the route (validation + honeypot)**

`app/api/lead/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'

beforeEach(() => { process.env.BREVO_API_KEY = 'k'; process.env.BREVO_LIST_ID = '7'; vi.stubGlobal('fetch', vi.fn(async () => new Response(null, { status: 201 }))) })

const post = (body: any) => POST(new Request('http://x/api/lead', { method: 'POST', body: JSON.stringify(body), headers: { 'content-type': 'application/json' } }))

it('400 when email or telefono missing', async () => {
  const r = await post({ email: '', telefono: '' }); expect(r.status).toBe(400)
})
it('200 no-op when honeypot filled', async () => {
  const r = await post({ email: 'a@b.it', telefono: '1', website: 'bot' })
  expect(r.status).toBe(200); expect(fetch).not.toHaveBeenCalled()
})
it('200 on valid lead', async () => {
  const r = await post({ email: 'a@b.it', telefono: '1', origine: 'vetrina' })
  expect(r.status).toBe(200); expect(fetch).toHaveBeenCalledOnce()
})
```

- [ ] **Step 6: Run, verify fail**

Run: `npm test -- app/api/lead/route.test.ts`
Expected: FAIL.

- [ ] **Step 7: Implement `app/api/lead/route.ts`** (`export const runtime = 'nodejs'`; parse JSON; honeypot `website`; validate; read env; call `createBrevoContact`; map result → `Response.json`).

- [ ] **Step 8: Run, verify pass**

Run: `npm test -- app/api/lead/route.test.ts`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add lib/brevo.ts app/api/lead/ && git commit -m "feat(lead): Brevo contact pipeline + /api/lead route"
```

---

### Task 6: LeadForm component

**Files:**
- Create: `components/forms/LeadForm.tsx`, `components/forms/LeadForm.module.css`
- Test: `components/forms/LeadForm.test.tsx`

**Interfaces:**
- Consumes: `pushLead` (Task 4), `/api/lead` (Task 5).
- Produces: `<LeadForm origine={'vetrina' | 'landing-ads'} showPerChi?={boolean} />` — fields `nome, telefono (required), email (required), per_chi (radio, when showPerChi), messaggio`, hidden honeypot `website`, GDPR consent checkbox (required). On submit: client validation → POST JSON to `/api/lead` → on ok call `pushLead({ origine, pagina: location.pathname })` and show success; on error show WhatsApp/phone fallback. Port markup/classes from the showcase form (`data-lead-form` in `materiale/.../index.html` + `js/site.js` `initLeadForm`).

- [ ] **Step 1: Write failing test**

`components/forms/LeadForm.test.tsx`:

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, beforeEach, it, expect } from 'vitest'
import { LeadForm } from './LeadForm'

vi.mock('@/lib/analytics', () => ({ pushLead: vi.fn() }))
import { pushLead } from '@/lib/analytics'

beforeEach(() => { vi.stubGlobal('fetch', vi.fn(async () => new Response('{"ok":true}', { status: 200 }))) })

it('submits and fires lead_submit on success', async () => {
  render(<LeadForm origine="vetrina" />)
  fireEvent.change(screen.getByLabelText(/telefono/i), { target: { value: '333' } })
  fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.it' } })
  fireEvent.click(screen.getByLabelText(/privacy|consenso|acconsento/i))
  fireEvent.submit(screen.getByRole('button', { name: /invia|richiedi/i }).closest('form')!)
  await waitFor(() => expect(pushLead).toHaveBeenCalledWith({ origine: 'vetrina', pagina: '/' }))
})
```

- [ ] **Step 2: Run, verify fail**

Run: `npm test -- components/forms/LeadForm.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement `LeadForm`** ('use client'), porting fields/classes from source; honeypot named `website`; POST to `/api/lead`; call `pushLead` on success.

- [ ] **Step 4: Run, verify pass**

Run: `npm test -- components/forms/LeadForm.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add components/forms/ && git commit -m "feat(form): LeadForm with honeypot + dataLayer conversion event"
```

---

### Task 7: CookieBanner component

**Files:**
- Create: `components/consent/CookieBanner.tsx`, `components/consent/CookieBanner.module.css`
- Test: `components/consent/CookieBanner.test.tsx`

**Interfaces:**
- Consumes: `grantConsent` (Task 4).
- Produces: `<CookieBanner />` ('use client') — reads/writes `localStorage['d360_consent']`; hidden when a choice exists; "Accetta tutti" → `setItem('all')` + `grantConsent()`; "Solo necessari" → `setItem('necessary')`. Port markup/classes from showcase `#cookie-banner` + `js/site.js` `initCookies`.

- [ ] **Step 1: Write failing test**

```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, beforeEach, it, expect } from 'vitest'
vi.mock('@/lib/analytics', () => ({ grantConsent: vi.fn() }))
import { grantConsent } from '@/lib/analytics'
import { CookieBanner } from './CookieBanner'

beforeEach(() => localStorage.clear())

it('hidden once a choice is stored', () => {
  localStorage.setItem('d360_consent', 'all')
  render(<CookieBanner />)
  expect(screen.queryByText(/cookie/i)).toBeNull()
})
it('accept grants consent and persists', () => {
  render(<CookieBanner />)
  fireEvent.click(screen.getByRole('button', { name: /accetta/i }))
  expect(localStorage.getItem('d360_consent')).toBe('all')
  expect(grantConsent).toHaveBeenCalled()
})
```

- [ ] **Step 2: Run, verify fail** — `npm test -- components/consent/CookieBanner.test.tsx` → FAIL.
- [ ] **Step 3: Implement `CookieBanner`** per Interfaces.
- [ ] **Step 4: Run, verify pass** → PASS.
- [ ] **Step 5: Commit**

```bash
git add components/consent/ && git commit -m "feat(consent): cookie banner wired to Consent Mode update"
```

---

### Task 8: Navigation data + SiteHeader/MegaMenu/MobileMenu/Footer

**Files:**
- Create: `data/navigazione.ts`, `components/layout/SiteHeader.tsx`, `MegaMenu.tsx`, `MobileMenu.tsx`, `Footer.tsx` (+ `.module.css` each)
- Test: `data/navigazione.test.ts`, `components/layout/SiteHeader.test.tsx`, `components/layout/Footer.test.tsx`

**Interfaces:**
- Produces:
  - `data/navigazione.ts`: `export const headerNav: NavGroup[]`, `export const footerNav: NavGroup[]` where `NavGroup = { label: string; items: { label: string; href: string }[] }`. Mirror the showcase mega-menu/footer link structure (e.g. "Sedi d'esame" under *Come funziona › Diploma ed esami*; "Perché fidarti" under *Chi siamo › Diploma360*). All hrefs use clean routes.
  - `SiteHeader` — logo (PNG, "Powered by LaScuola360"), desktop `MegaMenu`, mobile `MobileMenu`, primary CTA "Chiama ora" → `tel:0684280999`. Accessible menu (click + keyboard `aria-expanded`/`aria-controls`), ported from `js/site.js` `initMega`.
  - `Footer` — company data, legal links (`/privacy`, `/cookie`, `/termini`), socials, contacts.

- [ ] **Step 1: Write failing test for nav data + header render**

`data/navigazione.test.ts`:

```ts
import { it, expect } from 'vitest'
import { headerNav, footerNav } from './navigazione'
it('header is non-empty and all hrefs are clean routes', () => {
  expect(headerNav.length).toBeGreaterThan(0)
  for (const g of headerNav) for (const i of g.items) expect(i.href.endsWith('.html')).toBe(false)
})
it('footer links to legal pages', () => {
  const hrefs = footerNav.flatMap(g => g.items.map(i => i.href))
  expect(hrefs).toEqual(expect.arrayContaining(['/privacy', '/cookie', '/termini']))
})
```

`components/layout/SiteHeader.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { it, expect } from 'vitest'
import { SiteHeader } from './SiteHeader'
it('shows the primary call CTA', () => {
  render(<SiteHeader />)
  const cta = screen.getByRole('link', { name: /chiama ora/i })
  expect(cta).toHaveAttribute('href', 'tel:0684280999')
})
```

- [ ] **Step 2: Run, verify fail** → FAIL.
- [ ] **Step 3: Implement** `data/navigazione.ts`, then the four components porting markup/classes from the showcase header/footer and `js/site.js` menu logic.
- [ ] **Step 4: Run, verify pass** (`npm test -- components/layout data/navigazione.test.ts`) → PASS.
- [ ] **Step 5: Commit**

```bash
git add data/navigazione.ts components/layout/ && git commit -m "feat(layout): header/mega-menu/mobile/footer + nav data"
```

---

### Task 9: Root layout wiring (GTM, consent, chrome)

**Files:**
- Modify: `app/layout.tsx`
- Test: `app/layout.test.tsx`

**Interfaces:**
- Consumes: `ConsentDefault`, `GtmScript`, `SiteHeader`, `Footer`, `CookieBanner`.
- Produces: root layout with `<html lang="it">`, `ConsentDefault` before `GtmScript`, GTM `<noscript>` in body, header + `{children}` + footer + cookie banner. Default `metadataBase = new URL('https://www.diploma360.it')`.

- [ ] **Step 1: Write failing test** asserting layout renders header CTA + cookie banner text and that ConsentDefault appears before GtmScript in markup order. (Render `RootLayout` with a child; query the container HTML; assert `indexOf("'consent','default'") < indexOf('GTM-K5VMGM8C')`.)
- [ ] **Step 2: Run, verify fail** → FAIL.
- [ ] **Step 3: Implement** the layout composition.
- [ ] **Step 4: Run, verify pass** → PASS.
- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx && git commit -m "feat(layout): wire GTM, consent default, header/footer/cookie banner"
```

---

### Task 10: Home page port

**Files:**
- Create: `app/page.tsx`, `app/home.module.css`
- Reference (read-only): `materiale/sito-vetrina-diploma360-v3/index.html`
- Test: `app/page.test.tsx`

**Interfaces:**
- Consumes: `LeadForm`, `PartnerCarousel`, `JsonLd`, `buildMetadata`.
- Produces: Home route. `export const metadata = buildMetadata({ title: 'Diploma online e recupero anni scolastici | Diploma360', description: <from source>, path: '/' })`. Includes `EducationalOrganization` JSON-LD (ported from source). Hero contains `LeadForm origine="vetrina" showPerChi`.

- [ ] **Step 1: Write failing content test**

`app/page.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { it, expect } from 'vitest'
import Home from './page'
it('renders hero headline and a lead form', () => {
  render(<Home />)
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  expect(screen.getByLabelText(/telefono/i)).toBeInTheDocument()
})
it('never claims no-interest financing', () => {
  const { container } = render(<Home />)
  expect(container.textContent).not.toMatch(/senza interessi/i)
})
```

- [ ] **Step 2: Run, verify fail** → FAIL.
- [ ] **Step 3: Port `index.html`** into `app/page.tsx`: convert markup to JSX, move page-specific `<style>` into `home.module.css`, replace the form block with `<LeadForm origine="vetrina" showPerChi />`, the partner marquee with `<PartnerCarousel />`, embed `EducationalOrganization` via `<JsonLd>`. Build `PartnerCarousel`/`FaqAccordion` now if first needed (port from source + `site.css`).
- [ ] **Step 4: Run, verify pass** → PASS.
- [ ] **Step 5: Commit**

```bash
git add app/page.tsx app/home.module.css components/marketing/ && git commit -m "feat(home): port home page with lead form, partners, JSON-LD"
```

---

### Task 11: Standard content pages port (grouped)

Port the remaining standard pages. Each page is its own folder `app/<route>/page.tsx` (+ `*.module.css` for page-specific styles), `export const metadata = buildMetadata({ title: <from table>, description: <from source>, path: '/<route>' })`, JSON-LD ported where the source has it (notably `faq` → `FAQPage`; `prezzi` uses the verbatim prices/rates). Pages with a lead form use `<LeadForm origine="vetrina" />`.

**Pages:** come-funziona, piattaforma, nostra-piattaforma, diplomi (index — lists `data/diplomi`), esami-diploma, esami-normativa, iscrizioni, garanzia, prezzi, sedi-esame, credibilita, recuperare-due-anni-in-uno, faq, chi-siamo, contatti, grazie, privacy, cookie, termini. Plus `app/not-found.tsx` (404).

Split into commits of ~4 pages. For each page:

- [ ] **Step A: Write a content test** `app/<route>/page.test.tsx` asserting: the page renders, its `metadata.title` equals the table value, and the "no `senza interessi`" guard. For `faq` also assert a `FAQPage` `ld+json` script is present; for `prezzi` assert the strings `1.500`, `1.900`, `2.900` and `72,68`, `92,06`, `140,52` appear and `senza interessi` does not.
- [ ] **Step B: Run, verify fail.**
- [ ] **Step C: Port the source HTML** into the page (JSX + module CSS + JSON-LD as in source).
- [ ] **Step D: Run, verify pass.**
- [ ] **Step E: Commit** after each group of ~4 (`feat(pages): port <names>`).

- [ ] **Final step: full test + build**

Run: `npm test && npm run build`
Expected: all green; every standard route appears as a static route.

---

### Task 12: City pages (dynamic, data-driven)

**Files:**
- Create: `app/recupero-anni-scolastici-[citta]/page.tsx`, `app/recupero-anni-scolastici-[citta]/citta.module.css`
- Reference: `materiale/.../recupero-anni-<slug>.html` (Roma uses the v2 variant)
- Test: `app/recupero-anni-scolastici-[citta]/page.test.tsx`

**Interfaces:**
- Consumes: `data/citta` (`citta`, `getCitta`, `allCittaSlugs`), `LeadForm`, `JsonLd`, `buildMetadata`.
- Produces: `export function generateStaticParams()` → `allCittaSlugs().map(citta => ({ citta }))`; `generateMetadata({ params })` → `buildMetadata({ title: getCitta(params.citta).titoloSeo, description: ...descSeo, path: '/recupero-anni-scolastici-' + params.citta })`; page renders the shared city template (hero + `LeadForm origine="vetrina"`, testimonianze, zone servite, 4 passi, prezzo, FAQ) with `FAQPage` + `BreadcrumbList` JSON-LD. Unknown slug → `notFound()`.

- [ ] **Step 1: Write failing test**

```tsx
import { it, expect } from 'vitest'
import { generateStaticParams } from './page'
it('generates 19 city params including milano', async () => {
  const params = await generateStaticParams()
  expect(params).toHaveLength(19)
  expect(params).toContainEqual({ citta: 'milano' })
})
```

- [ ] **Step 2: Run, verify fail** → FAIL.
- [ ] **Step 3: Implement** the dynamic route: build one template that reads city-specific copy. Where per-city body text differs, store the differing fields in `data/citta.ts` (extend the `City` type with the fields you need — testimonianze/zone — populated from each source file) and render them; shared scaffolding lives in the template. Roma's richer zone/FAQ content maps into the same fields.
- [ ] **Step 4: Run, verify pass** → PASS.
- [ ] **Step 5: Build check**

Run: `npm run build`
Expected: 19 `/recupero-anni-scolastici-*` static routes generated.

- [ ] **Step 6: Commit**

```bash
git add app/recupero-anni-scolastici-[citta]/ data/citta.ts && git commit -m "feat(citta): data-driven city landing pages (19)"
```

---

### Task 13: Diploma pages (dynamic, data-driven)

**Files:**
- Create: `app/diplomi/[slug]/page.tsx`, `app/diplomi/[slug]/diploma.module.css`
- Reference: `materiale/.../diplomi/<slug>.html`
- Test: `app/diplomi/[slug]/page.test.tsx`

**Interfaces:**
- Consumes: `data/diplomi`, `LeadForm`, `JsonLd`, `buildMetadata`.
- Produces: `generateStaticParams()` → `allDiplomaSlugs().map(slug => ({ slug }))`; `generateMetadata` → per-diploma title/desc + canonical `/diplomi/<slug>`; page renders the diploma template with `Course` JSON-LD (ported from source). Unknown slug → `notFound()`.

- [ ] **Step 1: Write failing test** asserting `generateStaticParams()` has 20 entries incl. `{ slug: 'afm' }`.
- [ ] **Step 2: Run, verify fail** → FAIL.
- [ ] **Step 3: Implement** the dynamic route mirroring Task 12's approach; per-diploma body fields live in `data/diplomi.ts`.
- [ ] **Step 4: Run, verify pass** → PASS.
- [ ] **Step 5: Build check** — `npm run build` → 20 `/diplomi/*` static routes.
- [ ] **Step 6: Commit**

```bash
git add app/diplomi/ data/diplomi.ts && git commit -m "feat(diplomi): data-driven diploma pages (20) with Course JSON-LD"
```

---

### Task 14: Ads landing `/lp`

**Files:**
- Create: `app/lp/layout.tsx`, `app/lp/page.tsx`, `app/lp/lp.module.css`
- Reference: `materiale/landing page diploma360/index.html`
- Test: `app/lp/page.test.tsx`

**Interfaces:**
- Consumes: `LeadForm`, `JsonLd`, `buildMetadata`.
- Produces: `/lp` route with its **own** `layout.tsx` (does NOT render `SiteHeader`/`Footer`; landing has its own chrome). `export const metadata = buildMetadata({ title: <from source>, description: <from source>, path: '/lp', noindex: true })`. Form is `<LeadForm origine="landing-ads" />`. GTM/consent still inherited from root layout. Legal links per the resolved Open Decision (default to `/privacy`, `/cookie`, `/termini` until told otherwise).

- [ ] **Step 1: Write failing test**

```tsx
import { it, expect } from 'vitest'
import { metadata } from './page'
it('landing is noindex', () => {
  expect(metadata.robots).toMatchObject({ index: false, follow: false })
})
```

Plus a render test: form present, `origine` hidden value is `landing-ads`, and no `SiteHeader` "Chiama ora" duplicate from root (landing layout owns chrome).

- [ ] **Step 2: Run, verify fail** → FAIL.
- [ ] **Step 3: Port the landing** `index.html` into `app/lp/page.tsx` + own layout; replace the Formspree form with `<LeadForm origine="landing-ads" />`; port partner carousel/cookie handling already centralized.
- [ ] **Step 4: Run, verify pass** → PASS.
- [ ] **Step 5: Commit**

```bash
git add app/lp/ && git commit -m "feat(lp): Ads landing at /lp (noindex) with Brevo lead form"
```

---

### Task 15: sitemap, robots, legacy redirects

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`
- Modify: `next.config.mjs` (redirects)
- Test: `app/sitemap.test.ts`

**Interfaces:**
- Consumes: `data/citta`, `data/diplomi`.
- Produces:
  - `sitemap()` → array of all indexable URLs: static routes + 19 city + 20 diploma, **excluding `/lp`** and excluding 404. Absolute URLs under `https://www.diploma360.it`.
  - `robots()` → allow all, `sitemap` pointer, `disallow: ['/lp', '/api/']`.
  - `next.config.mjs` `redirects()`: `/:path*.html` → `/:path*` (301) and `/index.html` → `/` (301). `trailingSlash: false`.

- [ ] **Step 1: Write failing test**

```ts
import { it, expect } from 'vitest'
import sitemap from './sitemap'
it('includes city + diploma routes and excludes /lp', () => {
  const urls = sitemap().map(e => e.url)
  expect(urls).toContain('https://www.diploma360.it/recupero-anni-scolastici-milano')
  expect(urls).toContain('https://www.diploma360.it/diplomi/afm')
  expect(urls.some(u => u.endsWith('/lp'))).toBe(false)
})
```

- [ ] **Step 2: Run, verify fail** → FAIL.
- [ ] **Step 3: Implement** `sitemap.ts`, `robots.ts`, and the `next.config.mjs` redirects.
- [ ] **Step 4: Run, verify pass** → PASS.
- [ ] **Step 5: Commit**

```bash
git add app/sitemap.ts app/robots.ts next.config.mjs && git commit -m "feat(seo): sitemap, robots, 301 legacy .html redirects"
```

---

### Task 16: Firebase App Hosting config + final verification

**Files:**
- Create: `apphosting.yaml`
- Reference: design spec §2

**Interfaces:**
- Produces: `apphosting.yaml` binding secrets `BREVO_API_KEY`, `BREVO_LIST_ID` (from Cloud Secret Manager) into the App Hosting backend env; default run config for the Next.js app.

- [ ] **Step 1: Write `apphosting.yaml`**

```yaml
runConfig:
  minInstances: 0
env:
  - variable: BREVO_API_KEY
    secret: BREVO_API_KEY
  - variable: BREVO_LIST_ID
    secret: BREVO_LIST_ID
```

- [ ] **Step 2: Document secret creation** in `README.md` (replace the GitLab template): commands to create the two secrets and grant the backend access:

```bash
firebase apphosting:secrets:set BREVO_API_KEY
firebase apphosting:secrets:set BREVO_LIST_ID
```

- [ ] **Step 3: Full test suite**

Run: `npm test`
Expected: all tests pass.

- [ ] **Step 4: Production build**

Run: `npm run build`
Expected: success. Confirm route summary lists: `/`, all standard routes, 19 city routes, 20 diploma routes, `/lp` (noindex), `/api/lead` (dynamic), `/sitemap.xml`, `/robots.txt`.

- [ ] **Step 5: Manual claim/guard audit**

Run: `grep -ri "senza interessi" app components data && echo "FOUND — fix" || echo "clean"`
Expected: `clean`. Repeat for `MIUR`, `MIM`, and any AI-claim tokens (`tutor-ai`, `tutore-ai`).

- [ ] **Step 6: Commit**

```bash
git add apphosting.yaml README.md && git commit -m "chore(deploy): Firebase App Hosting config + secret docs"
```

---

## Self-Review (completed during authoring)

**Spec coverage:**
- Stack/SSG/CSS port → Tasks 1, 10–14. Firebase App Hosting → Task 16. ✓
- Routing + data-driven city/diploma → Tasks 2, 12, 13. Landing `/lp` noindex → Task 14. ✓
- GTM + Consent Mode v2 → Task 4, 9. Conversion event → Tasks 4, 6. Brevo → Tasks 5, 6. ✓
- SEO (metadata, JSON-LD, sitemap/robots, images, 301) → Tasks 3, 10–13, 15. ✓
- Non-negotiable constraints → Global Constraints + guard tests in Tasks 10, 11, 16. ✓
- Open decisions (address, landing legal links, BREVO_LIST_ID, canonical) → tracked in spec §8; Task 14 defaults landing legal links to site pages; `BREVO_LIST_ID` is a deploy-time secret (Task 16). ✓

**Open decisions to confirm before/at execution** (from spec §8): sede address, landing legal links target, Brevo list id + attribute creation on the Brevo panel. None block scaffolding; resolve before go-live.

**Placeholder scan:** No "TBD/TODO" in task bodies. Per-page body copy is intentionally sourced from the read-only `materiale/**` files (the port's source of truth), with exact target paths, titles, and test assertions specified.
