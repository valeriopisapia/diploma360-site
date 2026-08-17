#!/usr/bin/env node
/**
 * Genera i moduli in data/legal/lascuola360/{termini,privacy,cookie}.ts a partire dai
 * frammenti HTML legali forniti dal committente (fuori repo, percorso fisso su questa
 * macchina — vedi SOURCE_DIR). Conversione meccanica, testo statico: niente fs a runtime,
 * niente config di bundling. Non editare i .ts a mano: rilanciare questo script.
 *
 * Passi:
 *  1) rimuove il commento-istruzioni in testa al frammento (non va pubblicato)
 *  2) rimuove i blocchi gated a un contratto non firmato (vedi sotto) — salvo flag esplicito
 *  3) sostituisce [DATA] con la data di entrata in vigore
 *
 * BLOCCHI GATED A CONTRATTO (Klarna, oggi — SCHOOL legal fix-round-1):
 * I frammenti sorgente marcano il testo che NON va pubblicato finché un contratto non è
 * firmato con l'attributo `data-pubblicare="solo-a-contratto-<nome>-firmato"` sull'elemento
 * che lo contiene: un <section id="klarna"> in termini.html (in più racchiuso da un commento-
 * guardia visuale ▼...▼ / ▲...▲), uno <span> inline in privacy.html (senza commento-guardia).
 * Lo stripping è guidato SOLO da questo marcatore strutturale (attributo + eventuale coppia di
 * commenti-guardia adiacenti), mai da un match testuale su "Klarna": se domani lo stesso
 * meccanismo gated un partner diverso con lo stesso attributo, questo script lo rimuove
 * identicamente senza bisogno di modifiche.
 *
 * Il committente non ha oggi evidenza di contratto Klarna firmato → i blocchi gated restano
 * rimossi di default (regola del sorgente: "fino ad allora rimuoverla"). Quando il contratto
 * sarà firmato, per ripubblicarli è un flag esplicito, non una riscrittura dello script:
 *
 *   PUBLISH_GATED_BLOCKS=1 node scripts/generate-legal-content-lascuola360.mjs
 *
 * Verifica dopo la rigenerazione: nessun `[DATA]` residuo, nessun blocco gated pubblicato per
 * sbaglio (il test app/legal-pages.test.tsx fa fallire la suite se "Klarna" ricompare senza
 * che sia stato un atto deliberato).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const SOURCE_DIR = '/Users/valeriopisapia/Desktop/Lascuola360/Attivita 2'
const OUT_DIR = path.join(__dirname, '..', 'data', 'legal', 'lascuola360')
const EFFECTIVE_DATE = '17 agosto 2026'
const DOCS = ['termini', 'privacy', 'cookie']

const publishGatedBlocks = process.env.PUBLISH_GATED_BLOCKS === '1'

function stripLeadingComment(html) {
  // Il commento-istruzioni in cima al frammento non va pubblicato come testo visibile.
  return html.replace(/^\s*<!--[\s\S]*?-->\s*/, '')
}

function stripContractGatedBlocks(html) {
  if (publishGatedBlocks) return html
  // Marcatore: data-pubblicare="solo-a-contratto-<nome>-firmato" sull'elemento da rimuovere,
  // opzionalmente racchiuso da un commento-guardia ▼...▼ / ▲...▲ adiacente (immediatamente
  // prima/dopo l'elemento). Il tag può essere qualsiasi (section, span, ...): la chiusura è
  // trovata per backreference sul nome del tag di apertura.
  return html.replace(
    /(?:\s*<!--\s*▼[\s\S]*?▼\s*-->\s*)?<([a-z][\w-]*)\b[^>]*\bdata-pubblicare="solo-a-contratto-[\w-]+-firmato"[^>]*>[\s\S]*?<\/\1>(?:\s*<!--\s*▲[\s\S]*?▲\s*-->)?/gi,
    '',
  )
}

for (const doc of DOCS) {
  const srcPath = path.join(SOURCE_DIR, `${doc}.html`)
  let html = fs.readFileSync(srcPath, 'utf8')
  html = stripLeadingComment(html)
  html = stripContractGatedBlocks(html)
  html = html.replaceAll('[DATA]', EFFECTIVE_DATE)

  const outPath = path.join(OUT_DIR, `${doc}.ts`)
  fs.writeFileSync(
    outPath,
    '// Generato dal pacchetto legale del 12/08/2026 — non modificare a mano il testo:\n' +
      '// correzioni ai contenuti passano dal responsabile di prodotto.\n' +
      '// Rigenerare con: node scripts/generate-legal-content-lascuola360.mjs\n' +
      'export const updatedAt = ' + JSON.stringify(EFFECTIVE_DATE) + '\n' +
      'export const html = ' + JSON.stringify(html) + '\n',
  )
}

const leftoverData = DOCS.some(doc =>
  fs.readFileSync(path.join(OUT_DIR, `${doc}.ts`), 'utf8').includes('[DATA]'),
)
if (leftoverData) {
  console.error('ERRORE: [DATA] residui')
  process.exit(1)
}

console.log(
  publishGatedBlocks
    ? 'ok — rigenerato, blocchi gated a contratto PUBBLICATI (PUBLISH_GATED_BLOCKS=1)'
    : 'ok — rigenerato, blocchi gated a contratto rimossi (default: nessun contratto firmato)',
)
