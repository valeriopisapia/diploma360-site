# CHANGELOG — Build sito vetrina Diploma360

## 24/06/2026 — Audit finale + pacchetto handoff dev
- **Menu accessibile** (#01): voci padre del mega-menu ora pilotabili da click, tastiera (Invio/Spazio/↓/Esc) e touch, con `aria-expanded`/`aria-controls`. In `site.js` + `site.css` → attivo su tutte le pagine.
- **Gerarchia CTA hero** (#04): il form è l'azione primaria; telefono e WhatsApp diventano link secondari testuali sotto l'hero.
- **Campo "Per chi è il percorso?"** nel form home: scelta segmentata *Per me / Per mio figlio*; `site.js` ora invia `per_chi` nel payload lead.
- **Carosello partner**: 8 loghi ufficiali (CDP, Coop, Edenred, Edison, Epassi, Jointly, Marsh, Nana Bianca) in `assets-vetrina/partner/`, marquee in loop, grayscale→colore all'hover, pausa su hover, fermo con reduced-motion. *Luxottica rimosso su richiesta.*
- **Pulizia debito CSS** (#06): rimossi 70 commenti build "Fase 1/2" + 1 regola CSS morta (`.month/.tot/.rate{display:none!important}`) su 34 pagine. Nessun impatto visivo.
- **Pacchetto deploy pronto**: `vercel.json`, `_redirects`, `netlify.toml`, `api/lead.js` (endpoint Brevo allineato ai campi reali), `Handoff Valerio - Diploma360.html` (documento dev con checklist pre-lancio).
- **#02 (claim 97% / 4,8 Google)**: lasciato invariato su decisione della founder.

## 11/06/2026 — Pagine locali "Recupero anni" (19 città) + "Recuperare due anni in uno"
- **19 pagine città** `recupero-anni-<città>.html` (Ancona, Bari, Bergamo, Bologna, Cagliari, Catania, Firenze, Genova, Latina, Milano, Napoli, Padova, Palermo, Perugia, Pescara, Roma, Salerno, Torino, Verona) + pagina informativa `recuperare-due-anni-in-uno.html`. Per Roma usata la **v2** (zone con nomi, FAQ/Breadcrumb strutturati).
- **Adattamenti minimi sui file importati:** header+footer standard del sito (mega-menu attuale, cookie banner GDPR, `js/site.js`), link rimappati (`sedi-esame-hub.html` → `sedi-esame.html`; diplomi → `diplomi/…`). Corpo pagine **invariato**. I sorgenti v1 erano troncati a fine file: FAQPage JSON-LD **ricostruito** dalle FAQ presenti in pagina.
- **sedi-esame.html:** le 15 card città con pagina ora linkano la rispettiva pagina locale; aggiunte 4 card (Genova, Padova → Nord; Latina, Pescara → Centro). Brescia invariata (nessuna pagina). Nessuna pagina hub nuova.
- **Sitemap:** +20 URL (canonical `/recupero-anni-scolastici-<città>/`). Nessun'altra pagina del sito toccata; menu e footer invariati.


## 10/06/2026 — V2: nuovo set fotografico coerente
- 10 nuove foto (set unico: studio crema #F6EDE6, luce naturale) in `assets-vetrina/`: coordinatrice, studentessa, 4 tutor, lezione-live, 3 testimonial.
- Risolte le collisioni di identità (stessa foto stock usata per ruoli diversi: support/p_blonde/studio) e i fondali fuori palette (nero, magenta, verde, lilla).
- Sostituzioni su index, come-funziona, contatti, credibilità. Le foto vere della sede, p_group e gli screenshot piattaforma restano invariati. La V1 (foto originali) resta in `sito/`.

## 10/06/2026 — Integrazione 3 pagine (Sedi d'esame, Credibilità, Esami e normativa)
- **2 pagine nuove:** `sedi-esame.html` (esame in 4 step, cartina Italia SVG, griglia province, mini-FAQ) e `credibilita.html` («Perché fidarti»: chi c'è dietro, sede con foto `sede-vetrina.png` + mappa Google, tutele, checklist anti-diplomificio).
- **1 pagina aggiornata:** `esami-normativa.html` arricchita con i blocchi *I quattro esami*, *Candidato esterno vs interno* (vincolo residenza e deroghe) e *La cornice normativa* (D.Lgs 62/2017, L. 1/2007, DPR 122/2009, O.M. MIM).
- **Menu + footer su tutte le 33 pagine con nav** (desktop, mobile e footer): «Sedi d'esame» sotto *Come funziona › Diploma ed esami*; «Perché fidarti» sotto *Chi siamo › Diploma360*.
- **Sitemap:** +2 URL (`/sedi-esame`, `/credibilita`). Nessun «MIUR»/«Riconosciuto dal MIM» introdotto; 0 link interni rotti.

Decisioni prese nello Step 2 (build), con motivazione.

## Sistema
- **Design system unico** in `styles/site.css`; ogni pagina linka il file condiviso + solo il proprio CSS specifico (deduplicato). Eliminata la duplicazione dei ~39 fogli inline e i patch `!important` (`Wrap !important`, blocchi «V3/V4/V5»). Container portato a **1280px** nella base.
- **Colore brand:** confermato il **corallo dei mock `#E48267`** come brand solido (decisione founder, 30/05). Gradient `#E3815A → #EC89C0` invariato.

## Critico risolto (dall'audit)
- **Residui AI rimossi ovunque:** token `--ai*`, componente `.ainote`, blocco CSS «Strumenti AI». Su `/piattaforma` la sezione 03 (tutor-AI implicito: «(o qualcosa)», «alle 23», URL `tutore-ai`, screenshot `tutor_ai.png`) è stata **riscritta in chiave onesta** («Il ripasso, sempre pronto» — riassunto/podcast/quiz/flashcard) con immagine `flashcard.png`.
- **Title corretto:** era «Diploma360 V5 …»; ora title SEO per pagina (50-60 char).
- **Link interni:** normalizzati a route pulite (`/come-funziona`, `/prezzi`, `/diplomi/<slug>`, …). Rimossi i link morti verso `Home V3/V4/V5` (→ `index.html`) e corretto `indirizzi/` → `diplomi/`. **0 link interni rotti su 43 pagine.**
- **Form lead:** reso accessibile (label associate, `required`, `autocomplete`), consenso GDPR esplicito, honeypot anti-spam, stati di esito; pronto per endpoint Brevo.
- **SEO:** meta description, canonical, Open Graph, JSON-LD (`EducationalOrganization` + `Course` sugli indirizzi), `sitemap.xml`, `robots.txt`.
- **Cookie/Analytics:** cookie banner GDPR + Consent Mode v2; GA4 caricato solo dopo consenso.
- **Accessibilità:** skip-link, focus visibile, `prefers-reduced-motion` rispettato, scroll-reveal sicuro.

## Forti applicate (audit)
- **F3** meno CTA in competizione · **F5** menu accessibile da tastiera/touch (in corso lato componenti) · **F6** responsive curato · **F1** token unico.

## Richieste founder in corso d'opera
- **Pulsante header → «Chiama ora»** (`tel:`) al posto di «Scopri il tuo percorso», su tutte le pagine.
- **Cookie banner** reso orizzontale (barra, non scatola).
- **Nessuna gallery di 12 mockup** su `/piattaforma`: l'istruzione del patch è stata **scartata** su indicazione del founder; restano i mockup già presenti nelle 3 sezioni tour.

## Claim non sostanziati (DECISIONE APERTA)
Mantenuti **come nei mock validati dal founder**, con i disclaimer già presenti («97%…*», «recensioni reali in arrivo», «loghi/nomi a scopo illustrativo»). Le regole scritte impongono di tenere i fittizi finché non arrivano i reali. → **Da confermare:** lasciare con disclaimer o nascondere fino ai dati veri (numeri, «4,8 Google», loghi partner, sedi).

## Da completare (richiede input founder)
- ID **GA4** reale (placeholder `G-XXXXXXXXXX`).
- Endpoint **Brevo** (`/api/lead`) + lista/mittente.
- Testi **legali** (privacy/cookie/termini sono bozze tecniche da validare).
- Mappa **redirect 301** dal vecchio sito.
- Foto/loghi/recensioni/sedi **reali**.
