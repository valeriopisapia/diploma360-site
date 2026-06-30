# Handoff sviluppatore — Sito vetrina Diploma360

Sito statico **production-ready**, multipagina, pronto da mettere online e/o da portare in Next.js.

## 1. Struttura

```
sito-v3/
├── index.html                 → Home
├── come-funziona.html  piattaforma.html  nostra-piattaforma.html  diplomi.html
├── esami-diploma.html  esami-normativa.html  iscrizioni.html  garanzia.html  prezzi.html
├── sedi-esame.html            → sedi d'esame (cartina + box città)
├── credibilita.html           → «Perché fidarti»
├── recupero-anni-<città>.html → 19 landing locali (Ancona…Verona), v. §9
├── recuperare-due-anni-in-uno.html → pagina informativa/SEO
├── faq.html  chi-siamo.html  contatti.html  grazie.html
├── diplomi/<slug>.html        → 20 pagine indirizzo (es. diplomi/afm.html)
├── privacy.html  cookie.html  termini.html  404.html   (legali = BOZZE da validare)
├── styles/site.css            → design system condiviso (UNICA fonte CSS comune)
├── js/site.js                 → cookie consent + GA4 + scroll-reveal + form lead + mega-menu
├── api/lead.js                → endpoint serverless Brevo (PRONTO, manca solo env var)
├── vercel.json  _redirects  netlify.toml → config deploy + rewrite route pulite (PRONTI)
├── assets-vetrina/            → logo, foto, mocks/, partner/ (loghi ufficiali carosello)
├── sitemap.xml  robots.txt
├── Handoff Valerio - Diploma360.html → documento handoff dev con checklist pre-lancio
```

## 2. Come funziona il CSS (importante)

- `styles/site.css` contiene **tutto il design system condiviso** (token, header/mega-menu, footer, bottoni, card, hero, form, cookie banner, accessibilità).
- Ogni pagina linka `site.css` e ha un piccolo `<style>` inline con **solo il CSS specifico di quella pagina** (deduplicato automaticamente in fase di build: niente regola comune duplicata).
- Token brand canonici (decisi col founder): corallo solido `#E48267`, gradient `#E3815A → #EC89C0`, verde AA `#16a34a`. **Modificare i colori solo in `site.css`.**

## 3. Avvio locale / deploy

È un sito statico: nessun build necessario.
- **Locale:** servire la cartella `sito/` con un qualsiasi static server (`npx serve sito`).
- **Deploy (Vercel/Netlify/Cloudflare Pages):** pubblicare la cartella `sito/` come sito statico. Nessuna configurazione speciale.
- **Redirect 301** dal vecchio `diploma360.it`: mappa da fornire (le URL nuove sono in `sitemap.xml`).

## 4. Form lead → Brevo  ⚠️ da collegare (endpoint GIÀ scritto)

Il form (Home + altre pagine) ha `data-lead-form` e in `js/site.js` invia un `POST` JSON a `window.__LEAD_ENDPOINT__` (default `/api/lead`) con: `{nome, telefono, email, per_chi, messaggio, pagina, ts}` (`per_chi` = "Per me"/"Per mio figlio").
**L'endpoint è già pronto in `api/lead.js`** (serverless Vercel; su Netlify spostalo in `netlify/functions/lead.js`). Imposta solo le env var `BREVO_API_KEY` e `BREVO_LIST_ID` sull'host — la API key non va mai nel client. Crea su Brevo gli attributi `NOME, SMS, PER_CHI, MESSAGGIO, PAGINA_ARRIVO, DATA_RICHIESTA`. In assenza di endpoint, il form mostra un fallback con telefono/WhatsApp.

## 5. Analytics GA4  ⚠️ da configurare

In ogni pagina c'è `window.__GA_ID__='G-XXXXXXXXXX'` → **sostituire con l'ID reale**. GA si carica **solo dopo consenso** (Consent Mode v2 già impostato: default `denied`, `granted` all'accettazione). Niente da fare lato consenso.

## 6. Contatti agganciati alle CTA

`tel:0684280999` · `https://wa.me/393517214644` · `info@diploma360.it`. Il pulsante header è **«Chiama ora»** (`tel:`).

## 7. Porting in Next.js (quando vorrai)

I mock sono HTML monolitico: il lavoro è **estrarre componenti** da `site.css` + markup. Componenti consigliati: `SiteHeader/MegaMenu/MobileMenu`, `LeadForm`, `HeroFormLead/HeroPhoto/HeroTimeline`, `BrochureCard`, `PlanCard`, `MatCard`, `Timeline4Step`, `Footer`. Le 20 pagine indirizzo e le 7 landing si generano da un dato unico (`indirizzi.ts`, `per-chi.ts`). Schema SEO già presente: `EducationalOrganization` (Home/pagine) e `Course` (indirizzi).

## 8. Landing locali «Recupero anni» (19 città)  ⚠️ nota URL

- File: `recupero-anni-<città>.html` (Ancona, Bari, Bergamo, Bologna, Cagliari, Catania, Firenze, Genova, Latina, Milano, Napoli, Padova, Palermo, Perugia, Pescara, Roma, Salerno, Torino, Verona) + `recuperare-due-anni-in-uno.html`. Stesso template: hero + form lead, testimonianze, zone servite, 4 passi, indirizzi, prezzo, FAQ (con `FAQPage` JSON-LD già in pagina).
- Raggiungibili dal box «Trova la zona più vicina a te» di `sedi-esame.html` (la card Brescia punta al form Home: pagina non ancora prodotta).
- **Attenzione:** i canonical (e la sitemap) usano route pulite del tipo `/recupero-anni-scolastici-<città>/`, diverse dal nome file. In produzione servono **rewrite** `/recupero-anni-scolastici-<città>/ → recupero-anni-<città>.html` (e `/recuperare-due-anni-in-uno/`), o in alternativa allineare i canonical alle route che sceglierai.

## 9. Regole NON negoziabili (rispettate, da mantenere)

- Palette cipria; logo PNG ufficiale con «Powered by LaScuola360».
- Prezzi 1.500/1.900/2.900 € — rate 72,68/92,06/140,52 €/mese × 24. **Mai «senza interessi».**
- Claim onesti: mai «facciamo al posto tuo». «Diploma di Stato riconosciuto» (mai «MIM»). «Coordinatrice del percorso».
- **Niente claim AI** — già ripuliti (token `--ai`, `.ainote`, sezione «Strumenti AI», sezione tutor-AI di `/piattaforma`).
- Loghi partner / sedi / recensioni fittizi: restano con disclaimer finché non arrivano i reali (vedi CHANGELOG punto «claim»).
