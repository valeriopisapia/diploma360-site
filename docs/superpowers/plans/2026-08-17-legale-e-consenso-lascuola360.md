# Pagine legali e consenso LaScuola360 — piano di implementazione

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pubblicare termini, privacy e cookie policy in-house per il brand LaScuola360 e rendere il consenso cookie conforme a ciò che quelle pagine dichiarano: banner a tre categorie, scelta ricordata 6 mesi in un cookie vero, consenso riapplicato a ogni caricamento.

**Architecture:** Le pagine legali diventano brand-aware — LaScuola360 rende i testi in-house del pacchetto del co-founder, gli altri brand restano su Iubenda. Il consenso passa da `localStorage` senza scadenza a un cookie con scadenza 6 mesi (nome per-brand, così la cookie policy dice il vero), con migrazione dolce dal valore esistente. Un inline script, montato prima di GTM come già fa `ConsentDefault`, riapplica il consenso memorizzato a ogni load — oggi chi ha già acconsentito resta `denied` per sempre, ed è il bug più grave dello stato attuale.

**Tech Stack:** Next.js App Router (repo `diploma360-site`), Vitest + Testing Library, GTM `GTM-K5VMGM8C` con Consent Mode v2 (default denied già in essere).

**Fonte dei contenuti:** `/Users/valeriopisapia/Desktop/Lascuola360/Attivita 2/` — `termini.html`, `privacy.html`, `cookie.html` (frammenti semantici senza stili, con commento in testa da NON pubblicare), più `istruzioni-in-breve.md` (i "nove passi") e `consent-update.js` (lo snippet di riferimento del co-founder).

## Global Constraints

- **Branch di lavoro, mai `main`**: il push su `main` fa il deploy automatico (Cloud Run/Firebase). Branch `feature/legale-consenso-lascuola360`, consegna via MR.
- **Multi-brand**: i testi nuovi valgono SOLO per `brand.id === 'lascuola360'`. Gli altri brand devono continuare a mostrare l'iframe Iubenda, pixel-identico a oggi. Ogni task che tocca le pagine ha un test di regressione sull'altro brand.
- **Nome del cookie di consenso**: `lascuola360_consent` per il brand lascuola360, `d360_consent` per gli altri (è il nome storico del localStorage: continuità). Il nome va preso da `brand`, mai hardcodato nei componenti.
- **Durata della scelta: 6 mesi** (Max-Age 15552000). Chiudere il banner senza scegliere = solo tecnici, NON persistito (il banner ricompare alla visita successiva).
- **Semantica delle categorie** (dallo snippet del co-founder, verbatim): statistica → `analytics_storage`; marketing → `ad_storage` + `ad_user_data` + `ad_personalization`. Mai altre combinazioni.
- **`[DATA]`**: 2 occorrenze per file, 6 in tutto. Il valore lo fornisce il committente al momento del merge (formato: «12 agosto 2026»); se non specificato, usare la data del giorno del merge. Nessun `[DATA]` deve sopravvivere: c'è un controllo dedicato nel task 1.
- **Test**: `npm run test` (Vitest). Seguire i pattern dei test esistenti (`components/consent/CookieBanner.test.tsx`, `components/gtm/ConsentDefault.test.tsx`, `app/layout.test.tsx`). Build di verifica per brand: `NEXT_PUBLIC_BRAND=lascuola360 npm run build`.
- **⚠️ Vincolo di sequenza esterno (passo 5 delle istruzioni)**: il blocco del Meta Pixel in console GTM (tag `1020929560296043`: consenso aggiuntivo richiesto `ad_storage`) va eseguito da chi ha accesso alla console **PRIMA** che la MR venga mergiata — la cookie policy nuova dichiara un comportamento che oggi il Pixel non rispetta. La checklist operativa è il deliverable del task 7. La MR non si merge senza conferma scritta che il passo è fatto.
- Nel repo c'è lavoro non committato di altre sessioni (`.superpowers/`, `materiale/`): non toccarlo, non committarlo.

---

## File Structure

| File | Responsabilità |
|---|---|
| `data/legal/lascuola360/{termini,privacy,cookie}.ts` (nuovi) | I tre testi come stringhe esportate, generati dai frammenti HTML |
| `components/legal/LegalHtml.tsx` (nuovo) | Rende un testo legale in-house (dangerouslySetInnerHTML) |
| `app/{termini,privacy,cookie}/page.tsx` (mod.) | Brand-aware: lascuola360 → in-house, altri → Iubenda |
| `lib/brand.ts` (mod.) | `legal.consentCookieName` per brand |
| `lib/consent.ts` (nuovo) | Lettura/scrittura del cookie di consenso + migrazione da localStorage |
| `lib/analytics.ts` (mod.) | `applyConsent(statistica, marketing)` al posto di `grantConsent()` |
| `components/gtm/ConsentFromStorage.tsx` (nuovo) | Inline script: riapplica il consenso memorizzato prima di GTM |
| `app/layout.tsx` (mod.) | Monta ConsentFromStorage dopo ConsentDefault, prima di GtmScript |
| `components/consent/CookieBanner.tsx` (riscritto) | Tre categorie, pari peso, salva preferenze, riapribile via evento |
| `components/layout/Footer.tsx` + config footerNav (mod.) | «Gestisci le preferenze sui cookie» + email di contatto |
| `components/forms/LeadForm.tsx` (mod.) | Casella di presa visione, non di consenso |
| `docs/gtm-consent-checklist.md` (nuovo) | Procedura console GTM (passo 5) + collaudo finale |

---

### Task 1: Contenuti legali brand-aware

**Files:**
- Create: `data/legal/lascuola360/termini.ts`, `privacy.ts`, `cookie.ts`
- Create: `components/legal/LegalHtml.tsx`
- Modify: `app/termini/page.tsx`, `app/privacy/page.tsx`, `app/cookie/page.tsx`
- Test: `app/legal-pages.test.tsx` (nuovo)

**Interfaces:**
- Consumes: `brand` da `@/lib/brand`; `IubendaPolicy` esistente (invariata).
- Produces: `LegalHtml({ doc: 'termini' | 'privacy' | 'cookie' })`; i moduli `data/legal/lascuola360/*.ts` esportano `export const html: string` e `export const updatedAt: string`.

- [ ] **Step 1: Generare i moduli contenuto dai frammenti**

Conversione meccanica (il testo è statico: niente fs a runtime, niente config di bundling):

```bash
mkdir -p data/legal/lascuola360
for doc in termini privacy cookie; do
  node -e '
    const fs = require("fs");
    let html = fs.readFileSync(process.argv[1], "utf8");
    // il commento in testa al frammento NON va pubblicato
    html = html.replace(/^\s*<!--[\s\S]*?-->\s*/, "");
    // [DATA] → data di entrata in vigore (vedi Global Constraints)
    html = html.replaceAll("[DATA]", process.argv[3]);
    fs.writeFileSync(process.argv[2],
      "// Generato dal pacchetto legale del 12/08/2026 — non modificare a mano il testo:\n" +
      "// correzioni ai contenuti passano dal responsabile di prodotto.\n" +
      "export const updatedAt = " + JSON.stringify(process.argv[3]) + "\n" +
      "export const html = " + JSON.stringify(html) + "\n");
  ' "/Users/valeriopisapia/Desktop/Lascuola360/Attivita 2/$doc.html" "data/legal/lascuola360/$doc.ts" "17 agosto 2026"
done
grep -rn "\[DATA\]" data/legal/ && echo "ERRORE: [DATA] residui" || echo "ok, nessun [DATA]"
```

Nel solo `cookie.ts`, verificare che la prima riga della tabella «Tecnici e necessari» dichiari `lascuola360_consent` e durata «6 mesi» (il frammento ha il segnaposto: se c'è ancora, sostituirlo con questi valori — sono quelli che il task 2 implementa davvero).

- [ ] **Step 2: Scrivere il test che fallisce**

```tsx
// app/legal-pages.test.tsx — pattern di mock del brand: vedere app/layout.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('pagine legali per brand', () => {
  it('lascuola360 rende il testo in-house con un solo h1 e senza iframe', async () => {
    vi.doMock('@/lib/brand', async () => {
      const real = await vi.importActual<typeof import('@/lib/brand')>('@/lib/brand')
      return { ...real, brand: real.brands.lascuola360 }
    })
    const { default: Privacy } = await import('./privacy/page')
    render(<Privacy />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(document.querySelector('iframe')).toBeNull()
    expect(document.body.textContent).toContain('Classme')
    vi.doUnmock('@/lib/brand')
  })

  it('gli altri brand restano su Iubenda (iframe presente, h1 della pagina presente)', async () => {
    const { default: Privacy } = await import('./privacy/page')
    render(<Privacy />)
    expect(document.querySelector('iframe.iubenda-frame')).not.toBeNull()
  })
})
```

> Se il pattern di mock del brand nel repo è diverso (controllare `layout.test.tsx`), seguire quello: il test deve selezionare il brand come fanno i test esistenti, non inventare un meccanismo nuovo.

- [ ] **Step 3: Verificare che fallisca** — `npm run test -- app/legal-pages` → FAIL (LegalHtml non esiste, le pagine rendono sempre Iubenda).

- [ ] **Step 4: Implementare**

```tsx
// components/legal/LegalHtml.tsx
import * as termini from '@/data/legal/lascuola360/termini'
import * as privacy from '@/data/legal/lascuola360/privacy'
import * as cookie from '@/data/legal/lascuola360/cookie'

const DOCS = { termini, privacy, cookie } as const

/**
 * Testi legali in-house (solo brand lascuola360; gli altri brand usano IubendaPolicy).
 * Il frammento porta il proprio <h1>: la pagina che usa questo componente NON deve
 * avere un h1 proprio, o ne finiscono due (vietato dalle istruzioni di pubblicazione).
 */
export function LegalHtml({ doc }: { doc: keyof typeof DOCS }) {
  return <div className="legal" dangerouslySetInnerHTML={{ __html: DOCS[doc].html }} />
}
```

Le tre pagine diventano (schema per `privacy`, identico per le altre):

```tsx
export default function Privacy() {
  const inHouse = brand.id === 'lascuola360'
  return (
    <main className="section">
      <div className="wrap">
        {inHouse ? (
          <LegalHtml doc="privacy" />
        ) : (
          <div className="legal">
            <h1>Privacy Policy</h1>
            <IubendaPolicy type="privacy" />
          </div>
        )}
      </div>
    </main>
  )
}
```

Verificare la resa visiva delle tabelle su mobile (i frammenti hanno tabelle: se il CSS `.legal` non gestisce l'overflow orizzontale, aggiungere `overflow-x:auto` su un wrapper — il collaudo delle istruzioni lo richiede esplicitamente).

- [ ] **Step 5: Verificare che passi** — `npm run test -- app/legal-pages` → PASS. Poi controllo visivo: `npm run dev:lascuola360` → le tre pagine con i testi; `npm run dev:diploma360` → iframe come prima.

- [ ] **Step 6: Commit** — `git add data/legal components/legal app/termini app/privacy app/cookie app/legal-pages.test.tsx && git commit -m "feat(legal): testi in-house LaScuola360, Iubenda resta agli altri brand"`

---

### Task 2: Il consenso in un cookie vero, 6 mesi, con migrazione

**Files:**
- Create: `lib/consent.ts` — Test: `lib/consent.test.ts`
- Modify: `lib/brand.ts` (aggiunta `legal.consentCookieName`)

**Interfaces:**
- Produces:
  - `interface ConsentChoice { statistics: boolean; marketing: boolean }`
  - `readConsent(): ConsentChoice | null` — legge il cookie; se assente, migra dal localStorage storico (`d360_consent`: `'all'` → tutto true, `'necessary'` → tutto false) scrivendo il cookie e rimuovendo la chiave; `null` se non c'è nulla o il valore è corrotto.
  - `writeConsent(c: ConsentChoice): void` — cookie `<consentCookieName>` = `v1.<s|_>.<m|_>` (o JSON url-encoded: scegliere il più leggibile e testarlo), `Max-Age=15552000; Path=/; SameSite=Lax`.
  - `CONSENT_MAX_AGE_DAYS = 180`.

- [ ] **Step 1: Test che falliscono** — casi: roundtrip write/read; attributi del cookie (Max-Age, Path, SameSite) verificati sul valore scritto; migrazione da `'all'` e da `'necessary'` (cookie creato, localStorage ripulito); valore corrotto → `null` senza lanciare; nome cookie preso dal brand (lascuola360 → `lascuola360_consent`).
- [ ] **Step 2: FAIL** — `npm run test -- lib/consent`
- [ ] **Step 3: Implementare** (jsdom in Vitest supporta `document.cookie`; per gli attributi, testare la stringa passata — wrappare la scrittura in una funzione `serializeCookie` esportata e testabile).
- [ ] **Step 4: PASS**, poi regressione: `npm run test` intero (il vecchio `CONSENT_KEY` del banner sarà rimosso nel task 4: qui non toccare il banner).
- [ ] **Step 5: Commit** — `fix(consent): il consenso vive in un cookie con scadenza 6 mesi, non piu' in localStorage`

---

### Task 3: Riapplicare il consenso a ogni caricamento (il bug degli utenti di ritorno)

Oggi `grantConsent()` parte solo al click su «Accetta»: chi ha già acconsentito, alla visita successiva resta `denied` e i tag non partono mai. È il passo 6 delle istruzioni, ed è un fix che **recupera dati analytics oggi persi**.

**Files:**
- Modify: `lib/analytics.ts` — `applyConsent(statistics, marketing)` sostituisce `grantConsent()` (stessa mappa dello snippet del co-founder; aggiornare i chiamanti).
- Create: `components/gtm/ConsentFromStorage.tsx` — Test: `components/gtm/ConsentFromStorage.test.tsx`
- Modify: `app/layout.tsx` — ordine: `ConsentDefault` → `ConsentFromStorage` → `GtmScript`.

**Interfaces:**
- Consumes: il formato cookie del task 2 (l'inline script lo rilegge in puro JS: tenere il formato PARSABILE senza dipendenze — è il motivo per preferire `v1.s.m` a JSON).
- Produces: inline script (stesso pattern parse-time di `ConsentDefault`: la garanzia d'ordine è il motivo per cui NON è un useEffect) che legge il cookie e, se presente, esegue `gtag('consent','update',…)` con la semantica delle categorie.

- [ ] **Step 1: Test che falliscono** — con `document.cookie` impostato a consenso pieno, l'esecuzione dello script (eval del contenuto in jsdom, come fa `ConsentDefault.test`) produce nel `dataLayer` un update con le 4 chiavi `granted`; con solo statistica → `analytics_storage granted`, le altre `denied`; senza cookie → nessun update nel dataLayer.
- [ ] **Step 2: FAIL** → **Step 3: implementare** → **Step 4: PASS** + il test esistente di `ConsentDefault` resta verde (l'ordine nel layout è verificato estendendo `app/layout.test.tsx`: i tre script compaiono nell'ordine giusto).
- [ ] **Step 5: Commit** — `fix(consent): il consenso memorizzato viene riapplicato a ogni load, prima dei tag`

---

### Task 4: Banner a tre categorie, pari peso, riapribile

**Files:**
- Rewrite: `components/consent/CookieBanner.tsx` (+ `CookieBanner.module.css`) — Test: `components/consent/CookieBanner.test.tsx` (esteso, non riscritto: i casi esistenti che restano validi rimangono)

**Interfaces:**
- Consumes: `readConsent`/`writeConsent` (task 2), `applyConsent` (task 3).
- Produces: il banner ascolta l'evento `document` **`d360:open-cookie-banner`** e si riapre precompilato con le scelte correnti — è il contratto che il footer (task 5) userà.

Requisiti dal passo 7, verbatim: tre categorie (necessari sempre attivi e non disattivabili · statistica · profilazione e marketing); «Rifiuta tutti» con lo **stesso peso grafico** di «Accetta tutti» (stessa classe bottone); in più «Salva preferenze» per la scelta granulare; chiudere senza scegliere = solo tecnici applicati alla sessione, **niente cookie scritto** (ricompare alla prossima visita).

- [ ] **Step 1: Test che falliscono** — (a) i due bottoni principali hanno la stessa classe/variante (il test asserisce la parità, non i nomi); (b) accetta tutti → cookie con entrambe true + `applyConsent(true,true)`; (c) rifiuta tutti → cookie con entrambe false + `applyConsent(false,false)`; (d) toggle statistica + salva → `applyConsent(true,false)`; (e) chiusura senza scelta → nessun cookie scritto; (f) `d360:open-cookie-banner` con cookie esistente → banner visibile e toggle precompilati; (g) al mount con cookie già presente → banner NON visibile.
- [ ] **Step 2: FAIL** → **Step 3: implementare** (copy del banner: menzionare ora anche il marketing, perché è la categoria che governa il Pixel — il testo attuale parla solo di statistica ed è un'altra affermazione oggi falsa) → **Step 4: PASS** su tutta la suite.
- [ ] **Step 5: Commit** — `feat(consent): banner a tre categorie con pari peso e preferenze granulari`

---

### Task 5: Footer — gestione preferenze ed email di contatto

**Files:**
- Modify: `components/layout/Footer.tsx` + la config `footerNav` (individuare dove vive: il Footer fa `footerNav.find(g => g.label === 'Legale')`) — Test: esteso il test del footer se esiste, altrimenti nuovo.

- [ ] **Step 1: Test che falliscono** — il footer contiene: un **bottone** (non link: non è navigazione) «Gestisci le preferenze sui cookie» che al click dispatcha `d360:open-cookie-banner`; un link `mailto:` con l'email del brand (`brand.contacts.email` — per lascuola360 è già `info@lascuola360.it`); i tre link legali esistenti invariati.
- [ ] **Step 2: FAIL** → **Step 3: implementare** → **Step 4: PASS**.
- [ ] **Step 5: Commit** — `feat(footer): gestione preferenze cookie ed email di contatto`

---

### Task 6: La casella del form è presa visione, non consenso

Base giuridica per ricontattare chi chiede un preventivo: art. 6.1.b — la casella non deve chiedere un consenso che non serve (passo 9).

**Files:**
- Modify: `components/forms/LeadForm.tsx` (righe ~256-260) — Test: `components/forms/LeadForm.test.tsx` (esteso)

- [ ] **Step 1: Test che falliscono** — il label della casella è «Ho letto l'Informativa privacy» con link a `/privacy` che apre in scheda nuova (`target="_blank"` + `rel="noopener"`); il testo «acconsento al trattamento» NON è più presente; la casella resta obbligatoria per l'invio.
- [ ] **Step 2: FAIL** → **Step 3: implementare**. Il `name="consenso"` del campo NON si tocca (è nel payload verso il backend/dataLayer: rinominarlo è un cambio di contratto fuori scope — lasciare un commento che lo dica). Aggiungere un commento nel form: se in futuro si raccolgono dati su DSA/BES/salute serve una casella separata e facoltativa di consenso esplicito — oggi il form non li chiede e non deve sollecitarli nel campo messaggio.
- [ ] **Step 4: PASS** → **Step 5: Commit** — `fix(lead): la casella privacy e' presa visione, non consenso (art. 6.1.b)`

---

### Task 7: Checklist GTM e collaudo (deliverable operativo, nessun codice di prodotto)

**Files:**
- Create: `docs/gtm-consent-checklist.md`

Contenuto richiesto, dalle istruzioni del co-founder:
1. **Blocco Meta Pixel** (da fare in console GTM, contenitore `GTM-K5VMGM8C`): tag Meta Pixel ID `1020929560296043` → *Impostazioni consenso → Controlli di consenso aggiuntivi richiesti → `ad_storage`*; stessa impostazione su ogni altro tag pubblicitario presente; pubblicare il contenitore. **Da eseguire prima del merge della MR** (la cookie policy dichiara questo comportamento).
2. **Collaudo post-deploy**, copiato da `verifica-in-console.js`: finestra anonima, non toccare il banner, console → il check dei cookie marketing deve dare «nessuno ✓»; poi accettare tutto, ricaricare, rilanciare → `_fbp` e `_ga` DEVONO comparire (altrimenti il consenso non arriva ai tag). Aggiungere: rifiuta tutti → ricarica → nessun `_fbp`/`_ga` nuovo; «Gestisci le preferenze» riapre il banner precompilato; nessun `[DATA]` visibile nelle tre pagine; un solo `h1` per pagina; tabelle scorrevoli da telefono; **tutti i link interni delle tre pagine rispondono** — in particolare dai termini: `/prezzi`, `/ripetizioni/prezzi`, `/privacy`; dalla privacy: `/cookie`; dalla cookie policy: `/privacy` più i link esterni a Google, Meta e Garante.
3. Nota per il brand diploma360: nessun cambiamento atteso — verifica rapida che le tre pagine mostrino ancora Iubenda.

- [ ] **Step 1: scrivere il documento** → **Step 2: Commit** — `docs(gtm): checklist blocco Meta Pixel e collaudo del consenso`

---

### Task 8: Verifica finale e MR

- [ ] `npm run test` — tutta la suite verde.
- [ ] `npm run lint` — nessun errore nuovo.
- [ ] `NEXT_PUBLIC_BRAND=lascuola360 npm run build` e `npm run build` (brand default) — entrambe verdi.
- [ ] Giro visivo con `npm run dev:lascuola360`: le tre pagine, il banner nuovo (accetta/rifiuta/salva), «Gestisci le preferenze» dal footer, il form.
- [ ] MR verso `main` con nella descrizione: il vincolo GTM (punto 1 del task 7) come **blocco esplicito al merge**, e il collaudo post-deploy come checklist per chi verifica.

## Fuori scope (deciso)

- Testi in-house per i brand diversi da LaScuola360 (restano su Iubenda finché non arrivano contenuti dedicati).
- Rinomina del campo `consenso` nel payload del form (contratto col backend).
- Dismissione dell'abbonamento Iubenda: valutabile solo dopo che tutti i brand avranno testi propri.
