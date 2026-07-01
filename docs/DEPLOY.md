# Deploy — Diploma360 su Google Cloud Run (via GitLab CI)

Guida operativa completa. Il sito Next.js gira come **container su Cloud Run**, buildato e
deployato dalla **CI del vostro GitLab** (`git.lascuola360.it`). Nessun GitHub, nessun repo
nuovo. Ogni push su `main` fa un deploy automatico.

Legenda placeholder da sostituire:
- `<PROJECT_ID>` — id del progetto GCP (es. `diploma360-prod`)
- `<PROJECT_NUMBER>` — numero del progetto (lo ricavi al passo 1)
- `<REGION>` — regione, consigliata `europe-west1`
- `<KEY_XKEYSIB>` — la Brevo **API key** (inizia con `xkeysib-`)

---

## 0. Architettura in breve

- **Codice** → resta su GitLab (`origin`).
- **`.gitlab-ci.yml`** → 2 stage: `test` (npm ci + test + build) su ogni push/MR; `deploy` su `main`.
- **`deploy`** esegue `gcloud run deploy --source .`: Cloud Build costruisce l'immagine dal
  `Dockerfile`, la pubblica su Artifact Registry, e la rilascia su Cloud Run.
- **Segreti Brevo** → in **Secret Manager**, iniettati come env var nel servizio Cloud Run
  (mai nell'immagine, mai nel repo). Li legge `app/api/lead/route.ts`.
- **Tracking** (GTM/GA4/Pixel) → lato client, si configura nel pannello GTM.

Verificato in locale: `docker build` + run del container → tutte le route 200, `/lp` noindex,
`/api/lead` → `200 {"ok":true}` verso Brevo.

---

## 1. Prerequisiti GCP (una tantum)

1. Crea o seleziona un progetto GCP e **abilita la fatturazione (piano a consumo)**.
2. Installa e autentica gcloud:
   ```bash
   # macOS
   brew install --cask google-cloud-sdk
   gcloud auth login
   gcloud config set project <PROJECT_ID>
   ```
3. Ricava il **numero progetto** (serve dopo):
   ```bash
   gcloud projects describe <PROJECT_ID> --format='value(projectNumber)'
   ```
4. Abilita le API necessarie:
   ```bash
   gcloud services enable \
     run.googleapis.com \
     cloudbuild.googleapis.com \
     artifactregistry.googleapis.com \
     secretmanager.googleapis.com
   ```

---

## 2. Segreti Brevo in Secret Manager

Crea i due segreti (valori: la API key `xkeysib-...` e il list id `41`):
```bash
printf '%s' '<KEY_XKEYSIB>' | gcloud secrets create BREVO_API_KEY --data-file=-
printf '%s' '41'            | gcloud secrets create BREVO_LIST_ID --data-file=-
```

Il servizio Cloud Run gira, di default, con la **service account di runtime**
`<PROJECT_NUMBER>-compute@developer.gserviceaccount.com`. Dagli il permesso di leggere i segreti:
```bash
for S in BREVO_API_KEY BREVO_LIST_ID; do
  gcloud secrets add-iam-policy-binding "$S" \
    --member="serviceAccount:<PROJECT_NUMBER>-compute@developer.gserviceaccount.com" \
    --role="roles/secretmanager.secretAccessor"
done
```

> Per aggiornare un valore in futuro:
> `printf '%s' 'nuovo-valore' | gcloud secrets versions add BREVO_API_KEY --data-file=-`
> (la pipeline usa `:latest`, quindi il prossimo deploy prende la nuova versione).

---

## 3. Service account di deploy (per la CI)

```bash
# 3a. Crea la SA
gcloud iam service-accounts create diploma360-deployer \
  --display-name="Diploma360 GitLab CI deployer"

DEPLOYER="diploma360-deployer@<PROJECT_ID>.iam.gserviceaccount.com"

# 3b. Ruoli a livello progetto
for R in roles/run.admin roles/cloudbuild.builds.editor roles/artifactregistry.writer; do
  gcloud projects add-iam-policy-binding <PROJECT_ID> \
    --member="serviceAccount:$DEPLOYER" --role="$R"
done

# 3c. La SA di deploy deve poter "usare" la SA di runtime del servizio
gcloud iam service-accounts add-iam-policy-binding \
  <PROJECT_NUMBER>-compute@developer.gserviceaccount.com \
  --member="serviceAccount:$DEPLOYER" --role="roles/iam.serviceAccountUser"

# 3d. Genera la chiave JSON (da mettere in GitLab)
gcloud iam service-accounts keys create diploma360-deployer-key.json \
  --iam-account="$DEPLOYER"
```

> **Pre-crea il repo Artifact Registry** usato da `--source` (evita un errore al primo deploy):
> ```bash
> gcloud artifacts repositories create cloud-run-source-deploy \
>   --repository-format=docker --location=<REGION> \
>   --description="Cloud Run source deploys"
> ```

⚠️ `diploma360-deployer-key.json` è una **credenziale sensibile**: caricala solo in GitLab
(passo 4) e **cancellala dal disco** subito dopo (`rm diploma360-deployer-key.json`). Non
committarla mai.

---

## 4. Variabili CI/CD su GitLab

GitLab → progetto → **Settings → CI/CD → Variables** → aggiungi:

| Key | Value | Type | Flags |
|---|---|---|---|
| `GCP_SA_KEY` | contenuto di `diploma360-deployer-key.json` | **File** | Protected, Masked |
| `GCP_PROJECT_ID` | `<PROJECT_ID>` | Variable | Protected |

Opzionali (hanno già un default in `.gitlab-ci.yml`):
| Key | Default |
|---|---|
| `GCP_REGION` | `europe-west1` |
| `CLOUD_RUN_SERVICE` | `diploma360-site` |

> Serve un **GitLab Runner** attivo (shared o self-hosted) che possa eseguire immagini Docker
> (`node:20`, `google/cloud-sdk:slim`) e uscire su internet. Se usate i runner condivisi di
> GitLab.com è già ok; su GitLab self-managed verificate che ci sia almeno un runner registrato.

---

## 5. Primo deploy

Il deploy parte da solo a ogni push su `main`. Per lanciarlo ora:
```bash
git commit --allow-empty -m "chore: trigger first Cloud Run deploy"
git push origin main
```
Segui la pipeline in GitLab → **Build → Pipelines**. Al termine dello stage `deploy`, l'URL del
servizio è nei log (`Service URL: https://diploma360-site-....run.app`), oppure:
```bash
gcloud run services describe diploma360-site --region <REGION> --format='value(status.url)'
```

Apri quell'URL e verifica homepage, una pagina città, `/prezzi`, e invia un lead di prova.

---

## 6. Dominio custom `diploma360.it`

```bash
gcloud run domain-mappings create \
  --service diploma360-site --domain www.diploma360.it --region <REGION>
gcloud run domain-mappings create \
  --service diploma360-site --domain diploma360.it --region <REGION>
```
gcloud stampa i **record DNS** da creare (A/AAAA per l'apex, CNAME per il www). Aggiungili nel
DNS del dominio. La propagazione + certificato TLS possono richiedere fino a ~24h (di norma pochi
minuti). Il canonical del sito è già `https://www.diploma360.it`.

> In alternativa, tutto questo è disponibile anche da Console → Cloud Run → servizio →
> **Manage custom domains**.

---

## 7. Configurazione Brevo (pannello) — necessaria prima del go-live

1. **API key**: usa una **API key** (`xkeysib-...`), NON una SMTP key (`xsmtpsib-`). Brevo →
   *SMTP & API → API keys*.
2. **Authorised IPs**: **disattivato**. Cloud Run ha IP di uscita dinamici; con la whitelist i
   lead fallirebbero a intermittenza. (Brevo → *Security → Authorised IPs*.)
3. **Lista**: `BREVO_LIST_ID = 41` (`diploma360-lead-2026`).
4. **Attributi contatto** (tipo *testo*) — devono esistere: `NOME`, `TELEFONO`, `PER_CHI`,
   `MESSAGGIO`, `PAGINA_ARRIVO`, `ORIGINE`, `DATA_RICHIESTA`. (Già presenti sull'account.)
   Il telefono va su `TELEFONO` (testo), **non** su `SMS`/`LANDLINE_NUMBER` che validano E.164 e
   rifiutano numeri in formato locale o fissi.

---

## 8. Google Tag Manager

Il codice carica GTM `GTM-K5VMGM8C` con **Consent Mode v2** (default *denied*, il cookie banner
concede) e fa `dataLayer.push({event:'lead_submit', origine, pagina})` all'invio riuscito del form.
Nel **pannello GTM** configura:
- Tag **GA4** con measurement id `GT-M3LW776G` (trigger: All Pages), rispettando il consenso.
- Tag **Meta Pixel** `1460557338306322` (trigger: All Pages).
- **Conversione**: trigger su evento personalizzato `lead_submit` → tag conversione GA4/Ads e
  evento `Lead` del Pixel.

Nessuna modifica al codice: i tag vivono in GTM.

---

## 9. Verifica post-deploy (checklist)

- [ ] Homepage e navigazione OK sull'URL Cloud Run / dominio
- [ ] Una pagina città (`/recupero-anni-scolastici-milano`) e una diploma (`/diplomi/afm`) renderizzano
- [ ] `/lp` mostra `noindex` e NON ha l'header/menu del sito
- [ ] `/privacy`, `/termini`, `/cookie` mostrano l'iframe Iubenda
- [ ] Invio form reale → messaggio di successo → contatto compare nella lista Brevo `41` con gli attributi
- [ ] `https://www.diploma360.it/sitemap.xml` e `/robots.txt` rispondono
- [ ] GTM: in Preview/Tag Assistant, `lead_submit` scatta e i tag partono dopo consenso

---

## 10. Troubleshooting (problemi già incontrati)

| Sintomo | Causa | Fix |
|---|---|---|
| `/api/lead` → 401, msg "unrecognised IP" | Brevo *Authorised IPs* attivo | Disattivalo (§7.2) |
| `/api/lead` → 401 | Chiave SMTP (`xsmtpsib-`) invece di API | Usa `xkeysib-` (§7.1) |
| `/api/lead` → 400 "Invalid phone number" | Telefono mappato su `SMS` | Già risolto: usa `TELEFONO` (testo) |
| `/api/lead` → 500 "Brevo non configurato" | Secret non iniettati | Verifica §2 + `--set-secrets` nella CI |
| Deploy fallisce su permessi Artifact Registry | repo non esistente / ruoli mancanti | Pre-crea il repo (§3) + ruoli §3b |
| Deploy fallisce "iam.serviceAccountUser" | manca il binding §3c | Esegui §3c |
| Immagini non ottimizzate / errore sharp | — | `sharp` è già in `dependencies` |

Log del servizio in produzione:
```bash
gcloud run services logs read diploma360-site --region <REGION> --limit 100
```

---

## 11. Decisioni di business ancora aperte (non bloccano il deploy)

1. **Indirizzo sede**: vetrina `Viale Castrense 5, 00182 Roma` vs landing `Via Giovanni Antonelli
   41, 00197 Roma` — da unificare.
2. **Iubenda**: verifica che la policy (id `43474147`, Classme S.r.l.) copra anche il dominio
   `diploma360.it` e il trattamento del form (Brevo).
3. **Naming "Tutore.AI"/"Riepilogo360"** (landing/come-funziona): conferma la coerenza con la
   policy "niente claim AI" della vetrina.
4. **Fonts**: Inter/Poppins sono caricati via Google Fonts `<link>` — valutabile il self-hosting
   per hardening GDPR.
