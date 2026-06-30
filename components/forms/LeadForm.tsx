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
import { pushLead } from '@/lib/analytics'
import styles from './LeadForm.module.css'

type Origine = 'vetrina' | 'landing-ads'

interface LeadFormProps {
  origine: Origine
  showPerChi?: boolean
}

type UIStatus = 'idle' | 'loading' | 'ok' | 'err'

export function LeadForm({ origine, showPerChi = false }: LeadFormProps) {
  const [uiStatus, setUiStatus] = useState<UIStatus>('idle')

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
    const telefono = (
      form.querySelector<HTMLInputElement>('[name="telefono"]')?.value ?? ''
    ).trim()
    const email = (
      form.querySelector<HTMLInputElement>('[name="email"]')?.value ?? ''
    ).trim()
    const consenso =
      form.querySelector<HTMLInputElement>('[name="consenso"]')?.checked ?? false

    if (!telefono || !email || !consenso) {
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
        website,
      }
      if (per_chi) payload.per_chi = per_chi

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('bad status')

      pushLead({ origine, pagina })
      setUiStatus('ok')
      form.reset()
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
          autoComplete="tel"
          required
          placeholder="Es. 333 1234567"
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

      <button type="submit" disabled={uiStatus === 'loading'}>
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
