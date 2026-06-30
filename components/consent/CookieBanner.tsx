'use client'

import { useState, useEffect } from 'react'
import { grantConsent } from '@/lib/analytics'
import styles from './CookieBanner.module.css'

const CONSENT_KEY = 'd360_consent'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (!stored) setVisible(true)
    } catch {
      // localStorage unavailable — stay hidden
    }
  }, [])

  if (!visible) return null

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'all')
    grantConsent()
    setVisible(false)
  }

  function handleReject() {
    localStorage.setItem(CONSENT_KEY, 'necessary')
    setVisible(false)
  }

  return (
    <div
      className={`cookie-banner ${styles.banner}`}
      role="dialog"
      aria-live="polite"
      aria-label="Preferenze cookie"
    >
      <div className="cookie-text">
        <h4>Rispettiamo la tua privacy</h4>
        <p>
          Usiamo cookie tecnici necessari e, solo col tuo consenso, cookie di statistica per
          migliorare il sito.{' '}
          <a href="/cookie">Cookie Policy</a>.
        </p>
      </div>
      <div className="cookie-actions">
        <button className="btn btn-out" type="button" data-cookie="reject" onClick={handleReject}>
          Solo necessari
        </button>
        <button className="btn btn-primary" type="button" data-cookie="accept" onClick={handleAccept}>
          Accetta tutti
        </button>
      </div>
    </div>
  )
}
