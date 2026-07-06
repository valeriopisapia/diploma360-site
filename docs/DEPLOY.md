# Deploy — Diploma360

Percorso **principale: Firebase App Hosting** (gestione più semplice, dashboard integrata,
deploy automatico dal repo connesso). In **Appendice** trovi l'alternativa **Cloud Run via
GitLab CI** (già validata) nel caso App Hosting non riesca a connettere il vostro GitLab.

Placeholder da sostituire: `<FIREBASE_PROJECT_ID>`, `<REGION>` (consigliata `europe-west1`),
`<KEY_XKEYSIB>` (Brevo API key, inizia con `xkeysib-`).

---

## A. Firebase App Hosting (percorso principale)

Firebase App Hosting è il livello Firebase che gira **sopra Cloud Run**: builda la Next.js dal
repo connesso e la serve, con scaling e TLS gestiti. Config nel repo: **`apphosting.yaml`**.

### A.1 Prerequisiti
1. Un **progetto Firebase** dedicato (un progetto Firebase È un progetto GCP) con **piano Blaze**
   (App Hosting richiede la fatturazione attiva). Console: https://console.firebase.google.com
   → *Add project* (o collega un progetto GCP esistente/dedicato).
2. CLI:
   ```bash
   npm i -g firebase-tools
   firebase login
   ```

### A.2 Connettere il repo (il punto delicato)
App Hosting connette il codice via **Developer Connect**. Il vostro GitLab
(`git.lascuola360.it`) è **raggiungibile da internet**, quindi la connessione diretta è
tecnicamente possibile. In Console → **Build → App Hosting → Get started**:

- **Se compare l'opzione GitLab / "self-managed GitLab"** → collega direttamente
  `git.lascuola360.it`, autorizza, scegli il repo e il branch **`main`**. ✅ Nessun GitHub.
- **Se compare solo GitHub** → serve un **mirror GitHub** (il vostro GitLab resta la fonte; il
  mirror è solo il trigger di deploy):
  ```bash
  # crea un repo vuoto su github.com, poi:
  git remote add github https://github.com/<owner>/diploma360-site.git
  git push github main
  # (opz.) mirror automatico: GitLab → Settings → Repository → Mirroring repositories → Push
  ```
  Poi in App Hosting connetti il repo **GitHub**, branch `main`.

Scegli la **region** (`<REGION>`). App Hosting rileva Next.js e usa `apphosting.yaml`.

### A.3 Secret Brevo
Una volta sola (concedi l'accesso al backend quando richiesto):
```bash
firebase apphosting:secrets:set BREVO_API_KEY   # incolli la <KEY_XKEYSIB>
firebase apphosting:secrets:set BREVO_LIST_ID   # 41
```
Sono già referenziati in `apphosting.yaml` → iniettati nel runtime come
`process.env.BREVO_API_KEY` / `process.env.BREVO_LIST_ID`, letti da `app/api/lead/route.ts`.

### A.4 Deploy
Ogni **push sul branch connesso (`main`)** avvia un rollout automatico (build + deploy). Il primo
parte alla creazione del backend. Stato e URL in Console → App Hosting.

### A.5 Dominio
App Hosting → il tuo backend → **Add custom domain** → `www.diploma360.it` (e apex
`diploma360.it`) → aggiorna i DNS come indicato. Il canonical del sito è già
`https://www.diploma360.it`.

---

## B. Configurazione Brevo (pannello) — prima del go-live

1. **API key**: usa una **API key** (`xkeysib-...`), NON una SMTP key (`xsmtpsib-`).
   Brevo → *SMTP & API → API keys*.
2. **Authorised IPs**: **disattivato**. Gli IP di uscita del serverless sono dinamici; con la
   whitelist i lead fallirebbero a intermittenza. Brevo → *Security → Authorised IPs*.
3. **Lista**: `BREVO_LIST_ID = 41` (`diploma360-lead-2026`).
4. **Attributi** (tipo *testo*): `NOME`, `TELEFONO`, `PER_CHI`, `MESSAGGIO`, `PAGINA_ARRIVO`,
   `ORIGINE`, `DATA_RICHIESTA` (già presenti sull'account). Il telefono va su `TELEFONO` (testo),
   **non** su `SMS`/`LANDLINE_NUMBER` che validano E.164 e rifiutano numeri locali/fissi.

---

## C. Google Tag Manager

Il codice carica GTM `GTM-K5VMGM8C` con **Consent Mode v2** (default *denied*, concesso dal cookie
banner) e fa `dataLayer.push({event:'lead_submit', origine, pagina})` all'invio riuscito. Nel
pannello GTM configura:
- **GA4** measurement id `GT-M3LW776G` (All Pages, rispetta il consenso)
- **Meta Pixel** `1460557338306322` (All Pages)
- **Conversione**: trigger sull'evento `lead_submit` → conversione GA4/Ads + evento `Lead` del Pixel

Nessuna modifica al codice: i tag vivono in GTM.

---

## D. Verifica post-deploy

- [ ] Homepage e navigazione OK sull'URL App Hosting / dominio
- [ ] Pagina città (`/recupero-anni-scolastici-milano`) e diploma (`/diplomi/afm`) renderizzano
- [ ] `/lp` è `noindex` e NON mostra l'header/menu del sito
- [ ] `/privacy`, `/termini`, `/cookie` mostrano l'iframe Iubenda
- [ ] Form reale → successo → contatto nella lista Brevo `41` con gli attributi
- [ ] `/sitemap.xml` e `/robots.txt` rispondono
- [ ] GTM Preview: `lead_submit` scatta, i tag partono dopo consenso

---

## E. Troubleshooting (problemi già incontrati)

| Sintomo | Causa | Fix |
|---|---|---|
| `/api/lead` → 401 "unrecognised IP" | Brevo *Authorised IPs* attivo | Disattivalo (B.2) |
| `/api/lead` → 401 | Chiave SMTP (`xsmtpsib-`) | Usa API key `xkeysib-` (B.1) |
| `/api/lead` → 400 "Invalid phone number" | Telefono su `SMS` | Già risolto: usa `TELEFONO` testo |
| `/api/lead` → 500 "Brevo non configurato" | Secret non impostati | `firebase apphosting:secrets:set …` (A.3) |
| App Hosting non vede il repo GitLab | Solo GitHub nella UI | Usa il mirror GitHub (A.2) |

---

## Appendice — Alternativa: Cloud Run via GitLab CI (senza GitHub)

Se preferisci **restare 100% sul GitLab** senza App Hosting, il repo è già pronto anche per
questa strada (validata: `docker build` + smoke test del container → route 200, `/api/lead`
→ 200). File: `Dockerfile`, `.dockerignore`, `.gcloudignore`, `.gitlab-ci.yml` (job `deploy`
**opt-in manuale**), `next.config` con `output: 'standalone'`.

Setup una-tantum (GCP, con `gcloud`):
1. Abilita API: `run` `cloudbuild` `artifactregistry` `secretmanager`.
2. Secret in Secret Manager (`BREVO_API_KEY`, `BREVO_LIST_ID`) + accesso alla runtime SA
   `PROJECT_NUMBER-compute@developer.gserviceaccount.com` (ruolo `secretmanager.secretAccessor`).
3. Service account di deploy con ruoli `run.admin`, `cloudbuild.builds.editor`,
   `artifactregistry.writer`, e `iam.serviceAccountUser` sulla runtime SA; scarica la key JSON.
4. Variabili GitLab CI/CD: `GCP_SA_KEY` (File), `GCP_PROJECT_ID`, e **`DEPLOY_TARGET=cloudrun`**
   per abilitare il job.
5. In una pipeline su `main`, avvia manualmente il job `deploy` (è `when: manual`).

Attiva i secret con `--set-secrets` come già configurato nel job. Dominio via
`gcloud run domain-mappings create`.

> Consiglio: se scegli Cloud Run, valuta un **progetto GCP dedicato** (`diploma360-prod`) per
> billing/IAM/quote separati dagli altri workload. Lo stesso vale per il progetto Firebase.

---

## G. Multi-brand (Diploma360 + La Scuola360)

Lo **stesso repo e branch `main`** serve due brand. Il brand attivo è scelto a **build-time** da
`NEXT_PUBLIC_BRAND` (`lib/brand.ts`; default `diploma360`). Ogni brand = un **progetto Firebase**
separato, **entrambi collegati a `main`**. Nessun branch dedicato.

Per-brand differiscono solo: nome, logo, dominio, GTM id, lista Brevo (contatti/colori/copy uguali).

Setup del progetto La Scuola360:
1. Crea il progetto Firebase + backend App Hosting, collegalo al repo GitHub, branch **`main`**.
2. Secret nel progetto (Secret Manager):
   ```
   firebase apphosting:secrets:set BRAND           # valore: lascuola360
   firebase apphosting:secrets:set BREVO_API_KEY   # stessa chiave Classme (o account dedicato)
   firebase apphosting:secrets:set BREVO_LIST_ID   # la lista Brevo di La Scuola360
   ```
3. GTM: crea un **container GTM dedicato** a La Scuola360 (con GA4 + Meta Pixel al suo interno) e
   inserisci l'id in `lib/brand.ts` → `lascuola360.gtmId` (ora placeholder `GTM-XXXXXXX`).
4. Dominio: mappa `www.lascuola360.it` sul backend.

> ⚠️ **Prima di mergiare in `main`**: crea il secret `BRAND` (valore `diploma360`) **anche nel
> progetto Diploma360 esistente**, altrimenti il suo prossimo deploy fallisce per secret mancante
> (vedi `apphosting.yaml`). `NEXT_PUBLIC_BRAND` richiede `availability: [BUILD, RUNTIME]` perché
> Next inlinea `NEXT_PUBLIC_*` a build-time.

Verifica locale del brand: `NEXT_PUBLIC_BRAND=lascuola360 npm run build`.

**Ancora da decidere:** gli URL mock decorativi `app.diploma360.it/...` nelle pagine piattaforma
non sono ancora per-brand (serve decidere il sottodominio piattaforma per La Scuola360).

## F. Decisioni di business ancora aperte (non bloccano il deploy)
1. **Indirizzo sede**: vetrina `Viale Castrense 5, 00182 Roma` vs landing `Via Giovanni Antonelli
   41, 00197 Roma` — da unificare.
2. **Iubenda**: verifica che la policy (id `43474147`, Classme S.r.l.) copra anche il dominio
   `diploma360.it` e il trattamento del form (Brevo).
3. **Naming "Tutore.AI"/"Riepilogo360"**: conferma coerenza con la policy "niente claim AI".
4. **Fonts**: Inter/Poppins via Google Fonts `<link>` — self-hosting come hardening GDPR.
