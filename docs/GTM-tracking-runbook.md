# GTM Tracking Runbook — Diploma360 + La Scuola360

**Container:** `GTM-K5VMGM8C` (SHARED by both brands — same container serves `www.diploma360.it`
and `www.lascuola360.it`).
**Date:** 2026-07-09
**Goal:** Restore GA4 paid-channel attribution and Google Ads conversion tracking after the new
Next.js landing went live.

**Setup (confirmed 2026-07-09):** Google Ads and GA4 are **shared** (single account / single
property for both brands); the **Meta Pixel is configured inside GTM**; **cookie disclosure is handled
by Iubenda**. So there is **no per-brand tag splitting** — all tags are single and shared. The `brand`
field is used only to **segment reporting** (a GA4 custom dimension), not to route tags.

This runbook is the **non-code half** of the fix. The code half (branch `fix/tracking-attribution`)
now pushes, on `lead_submit`:

```
event: 'lead_submit'
origine, pagina
brand:      'diploma360' | 'lascuola360'      ← reporting segmentation key (not routing)
gclid / gbraid / wbraid / msclkid / fbclid    ← whichever were on the landing URL
utm_source / utm_medium / utm_campaign / utm_term / utm_content
user_data: { email, phone_number, name }      ← for Enhanced Conversions (raw; GTM hashes)
```

Ad click identifiers are also persisted in a first-party cookie `mkt_attr` on every page, and the
click ids are appended to the thank-you URL (`/grazie`, `/lp-thank-you-page`).

> Do every change in a GTM **Workspace**, validate in **Preview**, and only then **Publish**. Test
> against BOTH domains before publishing.

---

## Why it broke (one-line recap)

The old site passed `gclid` through to conversions; the new SPA dropped the query string on the
thank-you redirect, and Consent Mode is default-denied. So Google Ads had no `gclid` to attribute a
conversion (conversions → 0, traffic unaffected), and GA4 could no longer classify sessions as Paid
(paid channel collapsed). GTM triggers still "fired" because a trigger firing is not the same as an
attributed, consented hit.

---

## Step 0 — Create the `brand` segmentation variable

Since Ads/GA4/Meta are all shared, `brand` is **not** used to route tags — it's used to keep the two
brands' data distinguishable inside the single property (a GA4 custom dimension) and for validation.

1. **Variables → New → Data Layer Variable**
   - Name: `DLV - brand`
   - Data Layer Variable Name: `brand`
   - Default Value: *(leave empty)*
2. Add a **hostname fallback** for page-view-scoped use (before any `lead_submit` fires):
   - **Variables → New → Custom JavaScript**, name `JS - brand (hostname fallback)`:
     ```js
     function () {
       var h = {{Page Hostname}} || '';
       if (h.indexOf('lascuola360') !== -1) return 'lascuola360';
       if (h.indexOf('diploma360') !== -1) return 'diploma360';
       return 'unknown';
     }
     ```
   - (Enable the built-in **Page Hostname** variable if not already: Variables → Configure → Page Hostname.)
3. **Trigger → Custom Event**, event name `lead_submit`, name `CE - lead_submit` (used by all the
   conversion tags below — no brand filter needed, since accounts are shared).

---

## Step 1 — Conversion Linker (All Pages)

Required for Google Ads (and Enhanced Conversions) to read/write click identifiers.

1. **Tags → New → Google Ads → Conversion Linker.**
2. Advanced settings → **Enable linking across domains** only if diploma360.it/lascuola360.it need to
   share (normally NOT — they're separate brands; leave default).
3. Trigger: **All Pages**.
4. Consent: it respects `ad_storage`; no override needed.
5. Name it `Conversion Linker` and save.

---

## Step 2 — Consent Mode: URL passthrough

Lets Google pass `gclid` through URLs when `ad_storage` is denied, so attribution survives without a
cookie.

- If you use **Google's Consent Mode template / Google tag settings**: enable
  **`url_passthrough` = true** and **`ads_data_redaction` = true**.
- Concretely, add to the page (already partly done in code via `ConsentDefault`) or via a Custom HTML
  tag firing FIRST on All Pages (Tag Sequencing / priority high):
  ```html
  <script>
    gtag('set', 'url_passthrough', true);
    gtag('set', 'ads_data_redaction', true);
  </script>
  ```
- Verify in Preview that ad-click URLs keep `gclid` across the thank-you navigation.

---

## Step 3 — Google Ads conversion + Enhanced Conversions for Leads (shared account)

This is the decisive step for recovering Ads conversions under consent-denied. Google Ads is a
**single shared account**, so this is **one tag** — no per-brand split.

1. In **Google Ads → Goals → Conversions**, open the lead conversion action → turn ON
   **Enhanced conversions for leads**, method **Google Tag Manager**. Accept the customer-data terms.
2. In GTM, **Tags → New → Google Ads Conversion Tracking**:
   - Conversion ID / Label: the account's values.
   - **Include user-provided data** → **New Variable → User-Provided Data → Manual configuration**:
     - Email: `{{DLV - user_data.email}}`
     - Phone: `{{DLV - user_data.phone_number}}`
     - (create these Data Layer Variables: `user_data.email`, `user_data.phone_number` — DLV supports
       dot notation)
   - GTM hashes automatically; do **not** pre-hash.
3. **Trigger:** `CE - lead_submit` (no brand filter — single account handles both brands).
4. Consent: gate on `ad_storage` + `ad_user_data` (default Google Ads consent behavior).

> Optional: if you later want to tell diploma vs scuola leads apart *inside* the shared Ads account,
> pass `{{DLV - brand}}` as a custom parameter on the conversion — reporting only, still one tag.

---

## Step 4 — Verify / fix the GA4 configuration

Symptom to fix: GA4 paid channel collapse + possible under-measurement.

1. **Confirm the measurement ID.** The code loads GTM only; GA4 lives inside the container. Find the
   **Google Tag / GA4 Configuration** tag. `GT-M3LW776G` is a Google *tag* ID — confirm it is
   connected to the **correct GA4 property/stream** (a `G-XXXXXXX` measurement ID). In GA4 Admin →
   Data Streams, cross-check the stream's measurement ID against what the tag sends.
2. **Fires on All Pages**, not consent-blocked incorrectly: with Consent Mode, GA4 should still send
   **cookieless pings** when `analytics_storage=denied` (do NOT add a blocking trigger exception).
3. **Single shared property:** keep the one GA4 config. To keep diploma vs scuola distinguishable,
   send `brand` as an **event parameter** (map `{{DLV - brand}}` on the config/key events) and register
   it as a **custom dimension** (GA4 Admin → Custom definitions → `brand`). Then filter/segment reports
   by `brand`. No second property, no brand-gated config tag.
4. **Validate paid attribution:** in GA4 **DebugView**, land on a URL with `?gclid=test123` on each
   domain and confirm the session source/medium resolves to `google / cpc` (auto-tagging), not
   `(direct)`.

---

## Step 5 — Reconcile the Meta Pixel

The project docs record `1460557338306322`, but the live container currently inits
`1020929560296043`. Two pixels = split/duplicated Meta conversions.

Meta lives **inside GTM** and is **shared** (one pixel, one audience pool for both brands) — no
per-brand split. The only open item is the ID discrepancy:

1. Decide the **single correct pixel ID** with the founder / Meta Business Manager owner
   (docs `1460557338306322` vs live `1020929560296043`).
2. Remove the duplicate pixel tag; keep exactly one base-code tag on All Pages + the lead event tag on
   `CE - lead_submit`.
3. Meta lead event can also receive `user_data` (email/phone) for Advanced Matching — map from the
   same DLVs; Meta hashes.
4. Consent: gate Meta on `ad_storage` / marketing consent.

---

## Step 6 — End-to-end validation (do for BOTH domains before publishing)

For `www.diploma360.it` AND `www.lascuola360.it` (or the current hosted.app URLs while DNS is not cut
over):

1. **GTM Preview** → open the site with a test query, e.g.
   `?gclid=TEST_GCLID&utm_source=google&utm_medium=cpc`.
2. Confirm the `mkt_attr` cookie is set (Application → Cookies) with the gclid.
3. Submit a test lead. In the Preview panel, on the `lead_submit` event verify the data layer shows:
   - correct `brand` for the domain,
   - `gclid` = `TEST_GCLID`,
   - `user_data` with the email/phone you typed.
4. Confirm the thank-you URL carries `?gclid=TEST_GCLID` (and `gbraid`/`wbraid` if present).
5. **GA4 DebugView:** the `lead_submit`/conversion event appears with source = google/cpc.
6. **Google Ads → the conversion action → Diagnostics / "Recent conversions":** the Enhanced
   Conversions status shows "recording" and a test conversion lands in the shared account.
7. Only when all green on both domains → **Submit / Publish** the container version. Name the version
   e.g. `attribution-recovery-2026-07-09`.

---

## What success looks like (after publish + a few days)

- GA4 **Paid Search / Cross-network** channels recover to pre-3-Jul levels (attribution restored, not
  new traffic).
- Google Ads conversions resume, matched via gclid where present and via Enhanced Conversions where
  not.
- GA4 and Google Ads conversion counts move back into a sane ratio.
- `brand` (custom dimension) cleanly separates diploma vs scuola data inside the shared property.

## Setup decisions — RESOLVED 2026-07-09

- [x] **Google Ads / GA4: shared** (single account / single property). → No per-brand tag split;
      `brand` is a GA4 custom dimension for reporting (Steps 0, 3, 4).
- [x] **Meta: shared, configured inside GTM** (one pixel). → No per-brand split (Step 5).
- [x] **Cookie disclosure: handled by Iubenda.** → No manual policy edit; instead make sure `mkt_attr`
      (first-party, 90 days, attribution) is picked up by the Iubenda cookie scan / declared in the
      Iubenda cookie policy.

## Still open

- [ ] **Meta Pixel ID:** confirm the single correct ID — docs `1460557338306322` vs live
      `1020929560296043` — and remove the duplicate (Step 5).
