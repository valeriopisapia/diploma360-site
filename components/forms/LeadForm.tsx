'use client'

/**
 * LeadForm — shared lead-capture form.
 *
 * Markup and classes ported from:
 *   materiale/sito-vetrina-diploma360-v3/index.html  (data-lead-form block)
 *   materiale/sito-vetrina-diploma360-v3/js/site.js  (initLeadForm)
 *
 * Honeypot field `website` guards against bots (invisible to real users).
 * On success: POST /api/lead + pushLead GTM event.
 * On error: fallback with WhatsApp 351 7214644 / phone 06 8428 0999.
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { pushLead } from '@/lib/analytics'
import styles from './LeadForm.module.css'

type Origine = 'vetrina' | 'landing-ads'

interface LeadFormProps {
  origine: Origine
  showPerChi?: boolean
}

type UIStatus = 'idle' | 'loading' | 'ok' | 'err'

// Thank-you route per origin: the vetrina forms land on /grazie, the ads
// landing form on its own /lp-thank-you-page (own chrome, separate conversion URL).
const THANK_YOU_ROUTE: Record<Origine, string> = {
  vetrina: '/grazie',
  'landing-ads': '/lp-thank-you-page',
}

const MAX_PHONE_DIGITS = 15 // E.164 ceiling
const PHONE_RE = /^\+?\d{6,15}$/

/**
 * Keep only digits and an optional single leading `+`, and cap the length.
 * Blocks letters, spaces, symbols and absurdly long input as the user types
 * or pastes.
 */
function sanitizePhone(raw: string): string {
  const hasPlus = raw.trimStart().startsWith('+')
  const digits = raw.replace(/\D/g, '').slice(0, MAX_PHONE_DIGITS)
  return (hasPlus ? '+' : '') + digits
}

export function LeadForm({ origine, showPerChi = false }: LeadFormProps) {
  const router = useRouter()
  const [uiStatus, setUiStatus] = useState<UIStatus>('idle')

  // Live-filter the phone field: rewrite the value on every input/paste so
  // invalid characters can never remain, and clear any prior custom-validity.
  const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const el = e.currentTarget
    const clean = sanitizePhone(el.value)
    if (el.value !== clean) el.value = clean
    el.setCustomValidity('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    // Honeypot: if filled by a bot, fake success without sending
    const website = (
      form.querySelector<HTMLInputElement>('[name="website"]')?.value ?? ''
    ).trim()
    if (website) {
      setUiStatus('ok')
      form.reset()
      return
    }

    // Client-side validation of required fields
    const telInput = form.querySelector<HTMLInputElement>('[name="telefono"]')
    const telefono = (telInput?.value ?? '').trim()
    const email = (
      form.querySelector<HTMLInputElement>('[name="email"]')?.value ?? ''
    ).trim()
    const consenso =
      form.querySelector<HTMLInputElement>('[name="consenso"]')?.checked ?? false

    // Guard the phone format even against paste/autofill that bypass live filtering.
    if (telefono && !PHONE_RE.test(telefono)) {
      telInput?.setCustomValidity(
        'Inserisci un numero di telefono valido: solo cifre, con eventuale + iniziale.',
      )
    } else {
      telInput?.setCustomValidity('')
    }

    if (!telefono || !email || !consenso || !PHONE_RE.test(telefono)) {
      form.reportValidity?.()
      return
    }

    const nome = (
      form.querySelector<HTMLInputElement>('[name="nome"]')?.value ?? ''
    ).trim()
    const perChiEl = form.querySelector<HTMLInputElement>('[name="per_chi"]:checked')
    const per_chi = perChiEl?.value ?? ''
    const messaggio = (
      form.querySelector<HTMLTextAreaElement>('[name="messaggio"]')?.value ?? ''
    ).trim()
    const pagina = typeof window !== 'undefined' ? window.location.pathname : '/'

    setUiStatus('loading')
    try {
      const payload: Record<string, string> = {
        nome,
        telefono,
        email,
        messaggio,
        pagina,
        origine,
        ts: new Date().toISOString(),
      }
      if (per_chi) payload.per_chi = per_chi

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('bad status')

      // Fire the GTM event first, then client-side navigate to the thank-you
      // page. router.push keeps the SPA context alive so the dataLayer event
      // isn't cut off by a full reload. Stay in 'loading' so the button remains
      // disabled during the redirect.
      pushLead({ origine, pagina })
      router.push(THANK_YOU_ROUTE[origine])
    } catch {
      setUiStatus('err')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      data-lead-form
      className={styles.form}
    >
      <div className="field">
        <label htmlFor="lf-nome">Nome e cognome</label>
        <input
          id="lf-nome"
          name="nome"
          type="text"
          autoComplete="name"
          placeholder="Es. Marco Rossi"
        />
      </div>

      <div className="field">
        <label htmlFor="lf-tel">Telefono</label>
        <input
          id="lf-tel"
          name="telefono"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          required
          maxLength={MAX_PHONE_DIGITS + 1}
          pattern="\+?[0-9]{6,15}"
          title="Solo cifre, con eventuale + iniziale per il prefisso."
          onInput={handlePhoneInput}
          placeholder="Es. 3331234567"
        />
      </div>

      <div className="field">
        <label htmlFor="lf-email">Email</label>
        <input
          id="lf-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="nome@email.it"
        />
      </div>

      {showPerChi && (
        <div className="field">
          <span className="field-label">Per chi è il percorso?</span>
          <div className="seg" role="radiogroup" aria-label="Per chi è il percorso?">
            <label className="seg-opt">
              <input type="radio" name="per_chi" value="Per me" />
              <span>Per me</span>
            </label>
            <label className="seg-opt">
              <input type="radio" name="per_chi" value="Per mio figlio" />
              <span>Per mio figlio</span>
            </label>
          </div>
        </div>
      )}

      <div className="field">
        <label htmlFor="lf-msg">Messaggio (facoltativo)</label>
        <textarea
          id="lf-msg"
          name="messaggio"
          rows={2}
          placeholder="Raccontaci la situazione: anni da recuperare, indirizzo, dubbi…"
        />
      </div>

      {/* Honeypot — invisible to real users; filled value = bot */}
      <input
        type="text"
        name="website"
        className="hp-field"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <label className="lf-consent">
        <input type="checkbox" name="consenso" required />{' '}
        Ho letto la{' '}
        <a href="/privacy">Privacy Policy</a>
        {' '}e acconsento al trattamento dei dati.
      </label>

      <button type="submit" className="btn btn-primary btn-block" disabled={uiStatus === 'loading'}>
        {uiStatus === 'loading' ? 'Invio in corso…' : 'Invia la richiesta'}
      </button>

      {/* aria-live region: always in DOM so screen readers detect it */}
      <p
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={`lf-status${uiStatus === 'ok' ? ' ok' : uiStatus === 'err' ? ' err' : ''}`}
        hidden={uiStatus === 'idle' || uiStatus === 'loading'}
      >
        {uiStatus === 'ok' && 'Richiesta inviata! Ti ricontattiamo entro 24h.'}
        {uiStatus === 'err' && (
          <>
            Invio non riuscito. Scrivici su{' '}
            <a
              href="https://wa.me/393517214644"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp 351 7214644
            </a>
            {' '}o chiama lo{' '}
            <a href="tel:0684280999">06 8428 0999</a>.
          </>
        )}
      </p>
    </form>
  )
}
