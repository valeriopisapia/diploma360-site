# Diploma360 — Landing Ads (Genitori) · Pacchetto consegna

Landing **statica** pronta alla pubblicazione. Nessun framework, nessuna build, nessuna dipendenza da installare. Si apre con doppio clic su `index.html`.

```
index.html      → la landing (home)
foto/           → immagini e loghi partner (path relativi: NON rinominare la cartella)
README.md       → questo file
```

---

## ⚡ MINIMO INDISPENSABILE per andare online (≈10 minuti)

Solo **2 cose** sono davvero necessarie. Tutto il resto è già pronto.

### 1) Pubblicare il sito (5 min)
È un sito statico: va bene qualsiasi hosting.
- **Drag & drop (più semplice):** trascina l'intera cartella su **Netlify Drop** (app.netlify.com/drop), **Vercel** o **Cloudflare Pages**. Online subito con HTTPS.
- **Hosting classico / FTP:** carica `index.html` + la cartella `foto/` nella root del dominio.
- ⚠️ Tieni sempre `index.html` e `foto/` **nella stessa posizione**.

### 2) Collegare il form (1 min)
Il form ha già: validazione, anti-spam (honeypot), invio AJAX e schermata "Richiesta inviata!". Manca solo l'endpoint.
1. Crea un form gratuito su **formspree.io** → ottieni un ID (es. `xyzabcd`).
2. In `index.html` cerca `formspree.io/f/REPLACE_ID` e sostituisci **`REPLACE_ID`** con il tuo ID.
3. Fatto. Le richieste arrivano via email.

> Endpoint alternativi (Web3Forms o backend interno): vedi §A in fondo.

**Con questi 2 passi la landing è già pienamente funzionante e pubblicabile.**

---

## 🔧 CONSIGLIATO (ma non bloccante)

### Tracking conversioni
Inserisci i tag (GA4 / Google Ads / Meta Pixel) nell'`<head>`.
L'**evento di conversione** = invio form riuscito: nel blocco `<script>` finale, dove c'è `ok.hidden=false;`, aggiungi la tua chiamata (es. `gtag('event','conversion',{...})`).

I tag di marketing vanno attivati **solo dopo il consenso** cookie (vedi sotto): usa l'hook
```js
window.onCookieConsent(function(){
  // carica qui GA4 / Meta Pixel / Google Ads
});
```

### Dominio nei meta
`canonical` e `og:url` nell'`<head>` puntano a `https://www.diploma360.it/`. Aggiorna **solo se** il dominio di pubblicazione è diverso.

---

## ✅ GIÀ FATTO (non serve toccare nulla)

- **Banner cookie funzionante** — compare al primo accesso, "Accetta tutti / Rifiuta", salva la scelta in `localStorage` e non riappare. Riapribile con `window.openCookieSettings()`.
- **Link legali** — Privacy / Cookie / Termini collegati (`schoolr.net`), nel footer e nel consenso del form.
- **Link social** — Instagram / Facebook / LinkedIn / TikTok (account ufficiali).
- **Contatti reali** — tel. `06 84 280 999`, WhatsApp, email `info@diploma360.it`.
- **Dati societari** — Classme S.r.l., P.IVA IT15441141007.
- **Carosello partner** — loghi reali a scorrimento infinito.
- **SEO/Social** — dati strutturati JSON-LD (Organization + FAQ) e meta Open Graph/Twitter presenti.
- **Mobile** — layout dedicato (barra fissa con Chiama + Consulenza, sezioni a colonna singola, banner cookie sopra la barra).

---

## ✔️ Checklist go-live
- [ ] Sito caricato online (HTTPS attivo)
- [ ] `REPLACE_ID` sostituito con l'ID Formspree — **test:** invio una richiesta e verifico che arrivi l'email
- [ ] (consigliato) Tag GA4 / Ads / Pixel + evento conversione su invio form
- [ ] (consigliato) Tag marketing agganciati a `window.onCookieConsent`
- [ ] `canonical` / `og:url` con il dominio corretto
- [ ] Prova reale da smartphone (iOS/Android)

---

## §A — Endpoint form alternativi

**Web3Forms:** ottieni una `access_key` su web3forms.com → cambia `action` in `https://api.web3forms.com/submit` → aggiungi dentro il form `<input type="hidden" name="access_key" value="LA_TUA_KEY"/>`.

**Backend proprio:** punta `action` al tuo endpoint (accetta `POST` multipart/form-data, risponde 200, idealmente JSON). Se **non** risponde JSON, rimuovi l'ultimo blocco `<script>` di `index.html`: il form farà un POST classico.

**Campi inviati:** `nome`, `telefono`, `email`, `messaggio`, `privacy_consent`, `origine`, `_subject`.
Lo stato di successo è il `<div id="lead-success">`, mostrato quando l'invio va a buon fine.
