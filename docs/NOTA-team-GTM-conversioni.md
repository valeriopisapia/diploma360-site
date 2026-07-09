# Nota per il team GTM — conversioni Google Ads a zero

**Data:** 2026-07-09 · **Container:** `GTM-K5VMGM8C` · **Dominio:** `www.diploma360.it` (ora è il sito Next.js)

## Diagnosi (verificata in browser sul sito live)

Il tracciamento è stato testato end-to-end. **Funziona tutto tranne una cosa:**

| Componente | Stato |
|---|---|
| gclid/utm catturati sul sito (cookie `mkt_attr`) | ✅ OK |
| Consent Mode v2 (default denied → granted) | ✅ OK |
| GA4 (`G-3QLZTYR5WK`) invia `/g/collect` | ✅ OK |
| Google Ads **Conversion Linker + remarketing** (`ga-audiences`, `set_partitioned_cookie`) | ✅ OK |
| Auto-tagging Ads + property GA4 | ✅ confermati dal team |
| **Google Ads — tag di CONVERSIONE** (`googleadservices.com/pagead/conversion/…`) | ❌ **NON scatta MAI** |
| Meta — evento lead sul thank-you | ❌ non scatta |

**Prova:** né simulando l'evento `lead_submit` (e `generate_lead`/`form_submit`/`conversion`), né
caricando la thank-you page `/lp-thank-you-page` con consenso concesso e `gclid` nell'URL, parte
alcuna richiesta di conversione Google Ads. Partono solo Linker e remarketing (page-load).

**Perché spiega tutto:** il traffico/remarketing gira → click coerenti e audience popolate; ma senza
tag di conversione che scatta, **Google Ads non registra conversioni**. GA4 continua a contare perché
spara comunque.

## Cosa fare (in ordine)

1. **Verificare che esista un tag "Google Ads Conversion Tracking"** nel container e che sia
   **abilitato** (non in pausa).
2. **Controllare il trigger del tag conversione**: deve scattare o sull'evento custom **`lead_submit`**
   (nome ESATTO — è quello che il sito pusha nel dataLayer, con dentro `gclid` e `user_data`) **oppure**
   sul **page-view della thank-you** (`/lp-thank-you-page` per gli ads, `/grazie` per la vetrina).
   → Oggi non è agganciato a nessuno dei due, o il tag manca.
3. **Enhanced Conversions for Leads**: sul tag conversione, mappare i dati utente dal dataLayer
   `lead_submit` → variabili `user_data.email` e `user_data.phone_number` (GTM li hasha da sé).
4. **PUBBLICARE il container** (non basta salvare il workspace). Verificare data/versione pubblicata.
5. Ripetere per il tag **Meta lead** (stesso trigger).

## Verifica finale (GTM Preview)

Aprire GTM Preview su `www.diploma360.it`, inviare un lead di test, e confermare che sul thank-you il
tag **Google Ads Conversion** risulti **Fired** con `gclid` e `user_data` valorizzati. Controprova in
**Google Ads → azione di conversione → Diagnostica**.

## Nota su GA4 (visite paid)
GA4 ora riceve il `gclid` dall'URL: l'attribuzione paid riparte da adesso; il crollo storico è la
finestra rotta precedente e rientra col ricircolo dati (24–72h). Property confermata dal team.

---
*Dettaglio tecnico completo del setup: `docs/GTM-tracking-runbook.md` (Step 3).*
