# Nota per il team GTM — perché "non scatena nulla" (root cause definitiva)

**Data:** 2026-07-09 · **Container:** `GTM-K5VMGM8C` · **Dominio:** `www.diploma360.it` (ora è il sito Next.js SPA)

## Cosa ho verificato (browser + analisi del `gtm.js` pubblicato)

Sulla thank-you page, dopo un submit reale, scattano SOLO i tag "All Pages":
**GA4 Pageview ✅, Linker ✅, Meta Pixel base ✅**. NON scattano:
`GA4 Lead Tutti I Moduli`, `GA4 Lead Landing Page`, `Conversioni` (Meta). *(`GA4 Chiama ora` e
`Whatsapp` non scattano perché non c'è stato un click a telefono/WhatsApp — è normale.)*

Analizzando il container pubblicato (`gtm.js`):

- ❌ **Nessun tag di conversione Google Ads**: non esiste alcun `AW-…` nel container. Solo il *Linker*.
  → Le conversioni Google Ads NON hanno un tag proprio: arrivavano (o dovrebbero arrivare) via
  **import degli eventi chiave GA4** in Google Ads.
- ❌ **`lead_submit` non è presente da nessuna parte** nel container → nessun trigger ascolta
  l'evento che il sito emette a ogni lead.
- ✅ Trigger presenti: **Form Submit** (`gtm.formSubmit`), **Page View** (`gtm.js`/`gtm.dom`/`gtm.load`), Click.
- ❌ **Nessun trigger History Change** (`gtm.historyChange`).

## Perché non scatta nulla (la causa)

I tag lead/conversione sono agganciati a trigger **Form Submit** e/o **Page View**, pensati per il
**vecchio sito WordPress** (form con POST + navigazione a una pagina reale). Il **nuovo sito è una
SPA (Next.js)**:

1. il form invia in **AJAX con `preventDefault()`** → il **Form Submit nativo di GTM non scatta**;
2. la thank-you si raggiunge con **`router.push` = History Change** (nessun caricamento pagina reale)
   → i tag su **Page View non scattano**, e nel container **non c'è un trigger History Change**.

Il sito Next.js emette apposta un evento dataLayer **`lead_submit`** — affidabile e SPA-safe — a ogni
lead andato a buon fine, con dentro `gclid`, gli `utm_*` e `user_data:{email, phone_number, name}`.
**Ma nessun tag del container è agganciato a `lead_submit`.** Ecco perché "non scatena nulla".

## Il fix (tutto lato container GTM — il sito è già a posto)

1. **Creare un trigger "Evento personalizzato"** con Nome evento **esattamente** `lead_submit`.
2. **Riagganciare a questo trigger** i tag che oggi non scattano (togliendo i vecchi trigger Form
   Submit / Page View che non funzionano sulla SPA):
   - `GA4 Lead Tutti I Moduli`
   - `GA4 Lead Landing Page`
   - `Conversioni` (Meta Pixel — evento Lead)
3. **Conversioni Google Ads** (oggi NON esiste un tag Ads di conversione):
   - se le conversioni Ads sono **importate dagli eventi chiave GA4** → sistemando i tag GA4 Lead
     (punto 2) tornano automaticamente; **oppure**
   - creare un vero **tag "Conversione di Google Ads"** (`AW-xxxx/label`) sul trigger `lead_submit`,
     con **Conversioni ottimizzate (Enhanced Conversions)** che leggono `user_data.email` e
     `user_data.phone_number` dall'evento `lead_submit` (GTM li hasha da sé).
   → confermare quale dei due modelli è in uso e completarlo.
4. Variabili dataLayer da creare (se non esistono): `user_data.email`, `user_data.phone_number`
   (dot notation), più `gclid` se serve al tag.
5. Lasciare `GA4 Chiama ora` e `Whatsapp` come sono (scattano sui click a telefono/WhatsApp).
6. **PUBBLICARE** il container (non basta salvare il workspace).

## Verifica finale (GTM Preview)
Inviare un lead di test → nell'evento **`lead_submit`** i tag `GA4 Lead…`, `Conversioni` (e il tag
Ads) devono risultare **Fired**, con `gclid` e `user_data` valorizzati. Controprova in
**Google Ads → azione di conversione → Diagnostica** e in **GA4 → DebugView**.

## Nota GA4 visite paid
GA4 ora riceve il `gclid` dall'URL: l'attribuzione paid riparte da adesso; il crollo storico è la
finestra rotta precedente e rientra col ricircolo dati (24–72h). Property `G-3QLZTYR5WK` confermata dal team.

---
*Riferimento tecnico completo: `docs/GTM-tracking-runbook.md`. Meta Pixel live: `1020929560296043`.*
