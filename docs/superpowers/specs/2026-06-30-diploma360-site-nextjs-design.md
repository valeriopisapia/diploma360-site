# Diploma360 — Sito vetrina + Landing in Next.js — Design

**Data:** 2026-06-30
**Stato:** Approvato (design) · spec da rivedere prima del piano di implementazione

## 1. Obiettivo

Portare in **Next.js** il sito vetrina esistente (`materiale/sito-vetrina-diploma360-v3`) e la
landing per Ads (`materiale/landing page diploma360`), rendendoli **SEO-friendly e ben indicizzati**,
con tracking via **Google Tag Manager + Meta Pixel** e invio dei lead a **Brevo**.

Il materiale di partenza è un sito statico production-ready con design system già validato dalla
founder e vincoli "non negoziabili" (palette, claim onesti, prezzi esatti, niente claim AI).
Questo lavoro è un **porting + integrazioni**, NON un redesign.

## 2. Stack e architettura

- **Next.js (App Router)** con React Server Components. Pagine = contenuto statico → **SSG**
  (pre-render al build) per massima velocità e SEO.
- **Unica parte server:** API Route `/api/lead` (function serverless) che riceve i form e crea il
  contatto su Brevo. Necessaria solo per tenere segreta la `BREVO_API_KEY` (mai nel client).
- **Deploy target: Firebase App Hosting** — regge nativamente pagine statiche + la function della
  API route (Cloud Run). Secret Brevo in **Cloud Secret Manager**. Config: `apphosting.yaml`.
  Il codice resta host-agnostico: cambia solo il file di config di deploy.
- **CSS:** `styles/site.css` importato come **CSS globale** (design system condiviso, ~856 righe,
  portato fedelmente). I blocchi `<style>` per-pagina diventano **CSS Modules** nei componenti.
  **Tailwind** solo come utility per layout dei nuovi componenti, NON sostituisce il design system.
  Token brand (`#E48267`, gradient `#E3815A → #EC89C0`, verde AA `#16a34a`) esposti come CSS vars.
  Modifica colori solo nella fonte unica.
- **Niente Firestore, niente shadcn, niente CMS** per ora (YAGNI).

## 3. Routing e modello dati

### Pagine standard (1:1 con la vetrina)
`/`, `/come-funziona`, `/piattaforma`, `/nostra-piattaforma`, `/diplomi`, `/esami-diploma`,
`/esami-normativa`, `/iscrizioni`, `/garanzia`, `/prezzi`, `/sedi-esame`, `/credibilita`,
`/recuperare-due-anni-in-uno`, `/faq`, `/chi-siamo`, `/contatti`, `/grazie`,
`/privacy`, `/cookie`, `/termini`, `404`.

### Pagine generate da dati (data-driven)
- **Città:** `app/recupero-anni-scolastici-[citta]/page.tsx` + `generateStaticParams()` da
  `data/citta.ts` (19 città: Ancona, Bari, Bergamo, Bologna, Cagliari, Catania, Firenze, Genova,
  Latina, Milano, Napoli, Padova, Palermo, Perugia, Pescara, Roma, Salerno, Torino, Verona).
  Una pagina-template, 19 generate al build. (Roma usa la variante v2 con zone/FAQ strutturate.)
- **Diplomi:** `app/diplomi/[slug]/page.tsx` da `data/diplomi.ts` (~20 indirizzi, es. `afm`,
  `agricoltura`, `chimica`, `elettronica`, …).

### Landing Ads
- Route **`/lp`**, `noindex`, **esclusa da sitemap e da menu/footer**. Layout proprio (non eredita
  header/footer della vetrina). Target: genitori.

### URL & redirect
- Clean URLs nativi di Next.
- **301** da vecchie URL WordPress `*.html` → route pulita.
- I rewrite "città" del vecchio `vercel.json` non servono più: la route È già
  `/recupero-anni-scolastici-<citta>`.

## 4. Integrazioni

### Google Tag Manager + Consent Mode v2
- **GTM** `GTM-K5VMGM8C` nel root layout (via `next/script`). Dentro GTM si configurano
  **GA4** (`GT-M3LW776G`) e **Meta Pixel** (`1460557338306322`); il codice predispone solo
  dataLayer ed eventi — i tag si gestiscono dal pannello GTM senza deploy.
- **Consent Mode v2:** default `denied` per `analytics_storage`, `ad_storage`, `ad_user_data`,
  `ad_personalization`, impostato **prima** di GTM. Banner cookie custom (portato dall'esistente,
  reso componente React) → su "Accetta" fa `gtag('consent','update', granted)`. Scelta persistita
  in `localStorage`.
- **Evento conversione:** su invio form riuscito, push su `dataLayer` (es. `lead_submit` con
  `origine`, `pagina`) → conversione GA4/Ads/Pixel configurabile da GTM.

### Brevo (lead)
- API Route `/api/lead` (logica portata da `materiale/.../api/lead.js`).
- Secret: `BREVO_API_KEY`, `BREVO_LIST_ID`.
- **Lista unica** + attributo **`ORIGINE`/`PAGINA_ARRIVO`** per distinguere `vetrina` vs `landing-ads`.
- Attributi Brevo: `NOME, SMS (telefono), PER_CHI, MESSAGGIO, PAGINA_ARRIVO, ORIGINE, DATA_RICHIESTA`.
- Un solo endpoint per entrambi i form. Honeypot anti-spam, validazione server-side
  (email+telefono obbligatori), `updateEnabled: true` (no errore su duplicati), fallback
  WhatsApp/telefono in caso di errore.
- Payload form vetrina: `{nome, telefono, email, per_chi, messaggio, pagina, ts}`.
- Payload form landing: mappato sugli stessi attributi (origine = `landing-ads`).

## 5. SEO

- **Metadata API** di Next: title/description/canonical/OpenGraph per pagina (portati da quelli
  curati esistenti, 50-60 char).
- **JSON-LD** come componenti: `EducationalOrganization`, `Course` (diplomi), `FAQPage`
  (faq + città), `BreadcrumbList`. Portati da quelli già presenti nel materiale.
- **`sitemap.ts`** generata dai dati (pagine + città + diplomi, **`/lp` esclusa**) e **`robots.ts`**.
- Immagini via **`next/image`** (lazy, formati moderni, dimensioni esplicite → niente CLS).
- Cache header su asset statici.

## 6. Struttura del progetto

```
app/
  layout.tsx                      → GTM, Consent default, CSS globale
  page.tsx                        → Home
  <pagine standard>/page.tsx
  recupero-anni-scolastici-[citta]/page.tsx
  diplomi/[slug]/page.tsx
  lp/page.tsx + layout.tsx        → landing Ads (noindex)
  api/lead/route.ts               → endpoint Brevo
  sitemap.ts  robots.ts
components/
  SiteHeader/ MegaMenu/ MobileMenu/ Footer/
  LeadForm/ CookieBanner/ Hero*/ PlanCard/ BrochureCard/
  Timeline4Step/ PartnerCarousel/ FaqAccordion/ JsonLd/
data/
  citta.ts  diplomi.ts  navigazione.ts  prezzi.ts
lib/
  brevo.ts  seo.ts  consent.ts
styles/
  site.css                        → design system condiviso (fonte unica colori)
public/
  assets-vetrina/...  foto/...     → asset vetrina + landing
apphosting.yaml                   → config Firebase App Hosting
```

## 7. Vincoli non negoziabili (da mantenere)

- Palette cipria; logo PNG ufficiale con "Powered by LaScuola360".
- Prezzi **1.500 / 1.900 / 2.900 €** — rate **72,68 / 92,06 / 140,52 €/mese × 24**.
  **Mai "senza interessi".**
- Claim onesti: mai "facciamo al posto tuo"; "Diploma di Stato riconosciuto" (mai "MIM"/"MIUR");
  "Coordinatrice del percorso".
- **Nessun claim AI.**
- Contatti CTA: `tel:0684280999` · `https://wa.me/393517214644` · `info@diploma360.it`.
- Loghi partner/recensioni fittizi: restano con disclaimer finché non arrivano i reali.

## 8. Da confermare (decisioni aperte)

1. **Indirizzo sede:** vetrina = *Viale Castrense 5, 00182 Roma*; landing = *Via Giovanni
   Antonelli 41, 00197 Roma*. → Quale usare ovunque?
2. **Pagine legali landing:** oggi puntano a *schoolr.net*; uniformare alle pagine della vetrina
   (`/privacy`, `/cookie`, `/termini`)? Le legali della vetrina sono "BOZZE da validare".
3. **`BREVO_LIST_ID`** e creazione attributi sul pannello Brevo.
4. **Dominio canonical:** confermato `https://www.diploma360.it/`.

## 9. Fasi (proposta di implementazione)

1. **Scaffold** Next.js (App Router, TS, Tailwind utility), import `site.css`, token brand, config
   Firebase App Hosting.
2. **Componenti condivisi** (header/mega-menu/mobile, footer, cookie banner, lead form, JsonLd).
3. **Pagine standard** (port 1:1 con Metadata + JSON-LD).
4. **Pagine data-driven** (città + diplomi da `data/`).
5. **Landing `/lp`** (layout proprio, noindex).
6. **Integrazioni:** GTM + Consent Mode v2, evento conversione, API `/api/lead` → Brevo.
7. **SEO finale:** sitemap/robots, 301 legacy, canonical, OpenGraph, immagini ottimizzate.
8. **Verifica:** build statica, Lighthouse SEO/perf, test invio lead end-to-end, controllo claim.

## 10. Fuori scope (YAGNI)

- CMS / editing contenuti da pannello.
- Firestore / storage lead proprio (solo Brevo per ora).
- Redesign visivo, shadcn/ui.
- Push notifications (WonderPush) e widget recensioni (TrustIndex) presenti sul sito live attuale —
  valutabili in seguito, non in questo scope.
