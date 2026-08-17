# Blocco Meta Pixel in GTM e collaudo del consenso cookie

Documento operativo per chi ha accesso alla console Google Tag Manager (GTM) dei siti
diploma360.it / lascuola360.it. Da eseguire in console, non nel codice.

## ⚠️ Ordine di esecuzione — leggere prima di procedere

**Questa checklist va completata PRIMA di pubblicare la nuova Cookie Policy sul sito.**

La nuova Cookie Policy dichiara che il Pixel di Meta viene bloccato finché l'utente non dà
il consenso al marketing. Oggi non è così: il Pixel scrive il cookie `_fbp` al primo
caricamento della pagina, prima di qualsiasi scelta dell'utente. Se la pagina `/cookie` va
online prima che il blocco sia fatto e pubblicato in GTM, il sito dichiara un comportamento
che non rispetta — è il primo problema da correggere prima di andare live.

Sequenza corretta:

1. Sezione 1 di questo documento (console GTM) — blocco Pixel, pubblicazione contenitore.
2. Sezione 2 di questo documento (collaudo da browser) — conferma che il blocco funziona.
3. Solo a questo punto: via libera alla pubblicazione della pagina `/cookie`.

---

## 1. Blocco del Meta Pixel in console GTM

**Contenitore:** `GTM-K5VMGM8C` (condiviso da diploma360.it e lascuola360.it — la modifica
fatta qui vale per entrambi i domini, non solo per lascuola360).

Il Consent Mode v2 di Google è già configurato correttamente e funziona: con le impostazioni
di default (consenso negato), oggi **non** partono `_ga` né `_gcl_au` prima della scelta
dell'utente. Il problema riguarda solo il Pixel di Meta, che non obbedisce automaticamente al
segnale di consenso di Google — serve un'impostazione esplicita, tag per tag.

### 1.1 Tag Meta Pixel

- [ ] Aprire il contenitore `GTM-K5VMGM8C` in GTM.
- [ ] Individuare il tag del Meta Pixel con ID `1020929560296043`.
- [ ] Aprire il tag → **Impostazioni di consenso** (in fondo alla configurazione del tag).
- [ ] Attivare **"Richiedi controlli di consenso aggiuntivi"**.
- [ ] Selezionare il tipo di consenso **`ad_storage`**.
- [ ] Salvare il tag.

### 1.2 Ogni altro tag pubblicitario nel contenitore

Ripetere lo stesso passaggio (Impostazioni di consenso → Controlli di consenso aggiuntivi
richiesti → `ad_storage`) su **ogni altro tag di tipo pubblicitario** presente nel
contenitore — non solo sul Meta Pixel. Per trovarli, filtrare l'elenco tag del contenitore
per **tipo**, non per nome (i nomi possono essere personalizzati o poco chiari):

- [ ] Tag di tipo **Meta / Facebook Pixel** (oltre a quello già gestito al punto 1.1, se ce
      ne sono altri).
- [ ] Tag di tipo **Conversion Linker** di Google Ads (se presente, verificarne comunque il
      comportamento: normalmente segue già il Consent Mode, ma va controllato).
- [ ] Tag di tipo **Google Ads Conversion Tracking** / **Google Ads Remarketing**.
- [ ] Tag di tipo **Floodlight** (Campaign Manager), se presente.
- [ ] Qualsiasi altro tag la cui categoria in GTM sia riconducibile a pubblicità/remarketing
      (LinkedIn Insight Tag, TikTok Pixel, Pinterest Tag, ecc. — se presenti nel contenitore).
- [ ] Per ciascuno: `ad_storage` impostato come controllo di consenso aggiuntivo richiesto.

### 1.3 Pubblicazione

- [ ] Salvare tutte le modifiche ai tag.
- [ ] **Pubblicare** il contenitore `GTM-K5VMGM8C` con una versione che descriva la modifica
      (es. "Blocco tag pubblicitari senza consenso ad_storage").
- [ ] Annotare qui la versione pubblicata e la data: ________________________________

Senza la pubblicazione, i tag continuano a girare con la configurazione precedente anche se
le modifiche sono salvate in bozza.

---

## 2. Collaudo post-deploy (da browser)

Da eseguire **dopo** aver pubblicato il contenitore GTM (sezione 1) e **dopo** il deploy del
sito con la nuova Cookie Policy. Tutti i passaggi vanno fatti su `lascuola360.it`; la sezione
4 ripete i controlli essenziali sugli altri domini del gruppo.

### Valori per brand (nome cookie di consenso)

Il nome del cookie che memorizza la scelta dell'utente **cambia per dominio** — non è lo
stesso ovunque. Dove nei passi seguenti si parla del "cookie di consenso", usare questa
tabella:

| Dominio | Nome cookie | Durata |
|---|---|---|
| `lascuola360.it` | `lascuola360_consent` | 180 giorni |
| `diploma360.it` | `d360_consent` | 180 giorni |
| `schoolr.net` | `d360_consent` | 180 giorni |

### 2.1 Nessun cookie di marketing prima della scelta

- [ ] Aprire una **finestra di navigazione anonima**.
- [ ] Andare sul sito. **Non toccare il banner dei cookie** (non cliccare né "Accetta",
      né "Rifiuta", né la X).
- [ ] Aprire la console del browser (tasto F12, poi scheda "Console").
- [ ] Incollare ed eseguire questo script, verbatim:

```js
// COLLAUDO — finestra anonima, aprire lascuola360.it, NON toccare il banner,
// aprire la console del browser (F12) e incollare queste righe.

console.log('cookie marketing:', /_fbp|_fbc|_gcl_au/.test(document.cookie) ? 'PRESENTI ✗' : 'nessuno ✓');
console.log('cookie attuali:', document.cookie || '(nessuno)');

// Atteso PRIMA di scegliere:  nessuno ✓
// Poi accettare tutto, ricaricare e rilanciare: _fbp e _ga DEVONO comparire,
// altrimenti il consenso non sta arrivando ai tag.
```

- [ ] Risultato atteso sulla prima riga: **`nessuno ✓`**. Se compare `PRESENTI ✗`, il blocco
      del Pixel (sezione 1) non è ancora efficace — non proseguire, tornare alla sezione 1.

**Se il risultato è `PRESENTI ✗`, prima di concludere che il blocco non funziona:**

- Controllare in GTM → **Versioni** che la versione **pubblicata** (non solo salvata) sia
  quella con il controllo di consenso `ad_storage` sui tag pubblicitari (sezione 1.3).
- Attendere qualche minuto: la propagazione della nuova versione non è sempre istantanea.
- **Chiudere del tutto** la finestra anonima e **aprirne una nuova**: i cookie già scritti in
  una finestra anonima aperta in precedenza non spariscono da soli finché quella finestra
  resta aperta, anche ricaricando la pagina.
- Se il problema persiste, aprire DevTools → **Network**, filtrare per `facebook` e
  individuare quale richiesta scrive il cookie prima del consenso: identifica il tag
  incriminato non ancora coperto dal blocco.

### 2.2 Accettando tutto, i cookie DEVONO comparire

- [ ] Nella stessa finestra, cliccare **"Accetta tutti"** sul banner.
- [ ] Ricaricare la pagina.
- [ ] Rilanciare lo stesso script della sezione 2.1 in console.
- [ ] Verificare che tra i cookie attuali (seconda riga stampata) compaiano **`_fbp`** e
      **`_ga`**. Se mancano, il consenso non sta arrivando ai tag: verificare le impostazioni
      di consenso fatte nella sezione 1 e la configurazione del Consent Mode.

### 2.3 Rifiutando tutto, nessun cookie di marketing

- [ ] Aprire una **nuova finestra anonima** (non riusare quella precedente, che ha già un
      consenso salvato).
- [ ] Andare sul sito e cliccare **"Rifiuta tutti"** sul banner.
- [ ] Ricaricare la pagina.
- [ ] Verificare nei cookie del browser (o rilanciando lo script della sezione 2.1) che **non
      compaiano** `_fbp`, `_fbc`, `_gcl_au` né `_ga`.

### 2.4 Riapertura delle preferenze dal footer

- [ ] Su una pagina qualsiasi del sito, scorrere fino al footer e cliccare
      **"Gestisci le preferenze sui cookie"**.
- [ ] Verificare che il banner si riapra mostrando le scelte già salvate (le stesse impostate
      nel passaggio precedente), non vuoto e non con le impostazioni di default.
- [ ] Cambiare almeno una scelta (es. attivare la categoria "Statistica") e salvare.
- [ ] Aprire DevTools → **Application → Cookies** → dominio del sito.
- [ ] Verificare che il cookie di consenso (nome secondo la tabella "Valori per brand" sopra —
      su lascuola360.it è **`lascuola360_consent`**) sia presente, con il nuovo valore
      corrispondente alla scelta appena fatta, e una durata (colonna "Expires / Max-Age") di
      **180 giorni** (Max-Age `15552000`) da quel momento.

### 2.5 Controlli statici sulle tre pagine legali

Sulle pagine `/termini`, `/privacy`, `/cookie` di lascuola360.it:

- [ ] Nessun segnaposto **`[DATA]`** visibile **nel testo della pagina come appare a schermo**
      (un `[DATA]` dentro un commento HTML non visibile non conta come errore).
- [ ] Un solo **titolo principale (h1)** visibile a schermo per pagina — nessuna pagina ne
      mostra due (contano solo i titoli effettivamente renderizzati, non eventuali h1 dentro
      commenti HTML).
- [ ] Le tabelle presenti scorrono orizzontalmente senza sfondare lo schermo, testate da un
      telefono (o dalla vista mobile del browser, larghezza intorno ai 375px).
- [ ] Nessuna sezione relativa a **Klarna** visibile in nessuna delle tre pagine (va tolta
      finché il contratto con Klarna non è firmato).

### 2.6 Link interni ed esterni — tutti devono rispondere

Dai **termini**:
- [ ] `/prezzi` risponde (200, non 404).
- [ ] `/ripetizioni/prezzi` risponde.
- [ ] `/privacy` risponde.

Dalla **privacy**:
- [ ] `/cookie` risponde.

Dalla **cookie policy**:
- [ ] `/privacy` risponde.
- [ ] Il link a **Google** (informativa sui cookie/consenso Google) apre correttamente.
- [ ] Il link a **Meta** (informativa sui cookie/consenso Meta) apre correttamente.
- [ ] Il link al **Garante per la protezione dei dati personali** apre correttamente.

Per i tre link esterni (Google, Meta, Garante): controllare anche che il dominio mostrato
nella barra degli indirizzi, una volta aperta la pagina, sia quello atteso (rispettivamente
un dominio `google.com`, `meta.com`, `garanteprivacy.it`) e non un redirect verso un altro
dominio.

---

## 3. Verifica brand secondari

Il gruppo pubblica anche `diploma360.it` (brand storico, testi legali gestiti su Iubenda,
non toccati da questa modifica) e usa lo stesso banner cookie su `schoolr.net`.

- [ ] Su **diploma360.it**, aprire `/termini`, `/privacy`, `/cookie`: devono mostrare ancora
      il contenuto **Iubenda** (l'iframe della policy Iubenda), non i nuovi testi in-house —
      nessuna modifica attesa qui.
- [ ] Su **diploma360.it**, verificare che il banner cookie compaia al primo accesso e che il
      bottone **"Gestisci le preferenze sui cookie"** nel footer lo riapra correttamente.
- [ ] Su **schoolr.net**, verificare allo stesso modo che banner e bottone
      "Gestisci le preferenze sui cookie" funzionino.

Nota: diploma360.it condivide il contenitore GTM `GTM-K5VMGM8C` con lascuola360.it, quindi il
blocco del Pixel fatto in sezione 1 si applica automaticamente anche a diploma360.it.
Schoolr.net usa invece un contenitore GTM **separato** (`GTM-K8W5CM7C`), non toccato dalla
sezione 1 di questo documento — va controllato a parte:

- [ ] **Verificare se il contenitore `GTM-K8W5CM7C` (schoolr.net) contiene tag pubblicitari**
      (Meta Pixel o altri, vedi l'elenco per tipo alla sezione 1.2): se sì, applicare la
      stessa impostazione di consenso della sezione 1 (Impostazioni di consenso → Controlli
      di consenso aggiuntivi richiesti → `ad_storage`) anche lì, e pubblicare il contenitore.

---

## 4. Chiusura

- [ ] Tutti i punti delle sezioni 1 e 2 sono spuntati e verificati di persona.
- [ ] La sezione 3 è stata verificata.
- [ ] Confermo per iscritto che il blocco del Pixel è pubblicato e collaudato, ed è possibile
      procedere con la pubblicazione della nuova Cookie Policy.

Nome e data: ________________________________
