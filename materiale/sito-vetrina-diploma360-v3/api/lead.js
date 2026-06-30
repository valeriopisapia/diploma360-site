/**
 * Endpoint lead Diploma360 — riceve il form e crea il contatto su Brevo.
 *
 * Funziona così com'è su VERCEL (cartella /api → serverless function).
 * Su NETLIFY: sposta questo file in `netlify/functions/lead.js` e adatta la
 * firma export (handler(event)) — la logica Brevo resta identica.
 *
 * Variabili d'ambiente da impostare nel pannello hosting (NON nel codice):
 *   BREVO_API_KEY   → la API key v3 di Brevo
 *   BREVO_LIST_ID   → l'ID numerico della lista dove far entrare i lead
 *
 * Il client (js/site.js) invia JSON:
 *   { nome, telefono, email, per_chi, messaggio, pagina, ts }
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { BREVO_API_KEY, BREVO_LIST_ID } = process.env;
  if (!BREVO_API_KEY || !BREVO_LIST_ID) {
    return res.status(500).json({ error: 'Brevo non configurato (manca BREVO_API_KEY o BREVO_LIST_ID)' });
  }

  // Su Vercel req.body è già parsato; fallback per altri runtime.
  const body = typeof req.body === 'object' && req.body ? req.body : JSON.parse(req.body || '{}');
  const { nome = '', telefono = '', email = '', per_chi = '', messaggio = '', pagina = '', ts = '' } = body;

  if (!email || !telefono) {
    return res.status(400).json({ error: 'Email e telefono sono obbligatori' });
  }

  try {
    const r = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        email,
        updateEnabled: true,                 // se il contatto esiste, aggiorna invece di errore
        listIds: [Number(BREVO_LIST_ID)],
        attributes: {
          NOME: nome,
          SMS: telefono,                     // mappa sull'attributo telefono della tua lista
          PER_CHI: per_chi,                  // "Per me" / "Per mio figlio"  (crea l'attributo su Brevo)
          MESSAGGIO: messaggio,
          PAGINA_ARRIVO: pagina,
          DATA_RICHIESTA: ts
        }
      })
    });

    // Brevo risponde 201 (creato) o 204 (aggiornato). 400 "duplicate_parameter" = già esiste: ok.
    if (!r.ok && r.status !== 204) {
      const detail = await r.text();
      if (!/duplicate_parameter|Contact already exist/i.test(detail)) {
        console.error('Brevo error', r.status, detail);
        return res.status(502).json({ error: 'Brevo ha rifiutato la richiesta' });
      }
    }

    // (Opzionale) qui puoi anche inviare una mail di notifica interna via Brevo /v3/smtp/email.
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Lead endpoint error', e);
    return res.status(500).json({ error: 'Errore interno' });
  }
}
