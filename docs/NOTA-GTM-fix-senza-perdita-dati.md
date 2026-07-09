# Nota GTM — il fix, SENZA perdere lo storico

**Data:** 2026-07-09 · **Container:** `GTM-K5VMGM8C` · **Modello conversioni:** GA4 → import in Google Ads
(l'account Ads non ha obiettivi/ID propri: le conversioni le crea GA4 e le passa a Ads).

## Il problema, in una riga
Gli **eventi lead di GA4** (`GA4 Lead Tutti I Moduli`, `GA4 Lead Landing Page`) **non scattano** sul
nuovo sito: i loro trigger sono **Form Submit / Page View**, fatti per il vecchio WordPress a
ricaricamento pagina, e non funzionano sulla SPA (form in AJAX + thank-you via `router.push`). Senza
quegli eventi GA4, non c'è nulla da importare in Ads → conversioni a zero.

## Il fix (solo GTM)
Agganciare quei tag GA4 lead a un trigger **Evento personalizzato** con nome evento **`lead_submit`**
(l'evento che il sito già emette a ogni lead riuscito, con dentro `gclid` e `user_data`).

## ⚠️ NON si perde lo storico dei 2 anni
Lo storico (GA4 e la conversion action importata in Ads) è legato al **nome dell'evento GA4** e alla
**conversion action**, NON al trigger. Cambiando **solo il trigger**, il tag resta lo stesso e manda a
GA4 lo **stesso identico evento** → serie storica continua, conversion action Ads e apprendimento
Smart Bidding **intatti**.

**✅ FAI:** modifica **solo il trigger** dei tag `GA4 Lead…` esistenti → Evento personalizzato `lead_submit`.
Lascia invariati **nome evento e parametri**.

**❌ NON fare** (questo sì cancellerebbe lo storico / resetterebbe il bidding):
- creare un tag o evento GA4 con **nome nuovo**;
- **rinominare** l'evento;
- **eliminare e ricreare** il key event in GA4;
- creare una **nuova conversion action** in Google Ads (es. un tag `AW-…` di conversione — NON serve,
  voi lavorate via import GA4).

## Differenza (benigna, in meglio)
Il vecchio Form Submit scattava al *tentativo* di invio; `lead_submit` scatta all'invio **riuscito** →
conteggi più puliti, volume praticamente uguale. Non è un cambio di definizione.

## Verifica (GTM Preview)
Inviare un lead di test → sull'evento `lead_submit` i tag `GA4 Lead…` risultano **Fired** e mandano lo
**stesso nome-evento** di prima (conferma che lo storico non si spezza). Poi **Pubblicare**.
