'use client'

import { useCallback, useEffect, useState } from 'react'
import { applyConsent } from '@/lib/analytics'
import { readConsent, writeConsent, type ConsentChoice } from '@/lib/consent'
import styles from './CookieBanner.module.css'

/** Contract with the footer (Task 5): dispatching this event on `document` reopens the
 *  banner, precompiled with the currently stored choice (both categories off if nothing
 *  was ever stored). Name is part of the public interface — do not rename casually. */
export const OPEN_EVENT = 'd360:open-cookie-banner'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [statistics, setStatistics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  const loadFromStorage = useCallback((): ConsentChoice => {
    const stored = readConsent()
    return stored ?? { statistics: false, marketing: false }
  }, [])

  useEffect(() => {
    const stored = readConsent()
    if (stored === null) {
      setVisible(true)
      return
    }
    setStatistics(stored.statistics)
    setMarketing(stored.marketing)
  }, [])

  useEffect(() => {
    function handleOpen() {
      const current = loadFromStorage()
      setStatistics(current.statistics)
      setMarketing(current.marketing)
      setVisible(true)
    }
    document.addEventListener(OPEN_EVENT, handleOpen)
    return () => document.removeEventListener(OPEN_EVENT, handleOpen)
  }, [loadFromStorage])

  if (!visible) return null

  function commit(choice: ConsentChoice) {
    writeConsent(choice)
    applyConsent(choice.statistics, choice.marketing)
    setVisible(false)
  }

  function handleAcceptAll() {
    commit({ statistics: true, marketing: true })
  }

  function handleRejectAll() {
    commit({ statistics: false, marketing: false })
  }

  function handleSavePreferences() {
    commit({ statistics, marketing })
  }

  /** Closing/ignoring the banner is NOT a choice: only technical cookies apply, for this
   *  session only (applyConsent with both flags off — mirrors "denied" default). No cookie
   *  is written, so the banner reappears on the next visit. */
  function handleClose() {
    applyConsent(false, false)
    setVisible(false)
  }

  return (
    <div
      className={`cookie-banner ${styles.banner}`}
      role="dialog"
      aria-live="polite"
      aria-label="Preferenze cookie"
    >
      <button
        type="button"
        className={styles.close}
        aria-label="Chiudi"
        onClick={handleClose}
      >
        &times;
      </button>
      <div className="cookie-text">
        <h4>Rispettiamo la tua privacy</h4>
        <p>
          Usiamo cookie tecnici necessari al funzionamento del sito e, solo col tuo consenso,
          cookie di statistica e cookie di profilazione e marketing (anche di terze parti, per
          personalizzare le pubblicità). Puoi scegliere categoria per categoria.{' '}
          <a href="/cookie">Cookie Policy</a>.
        </p>
        <div className={styles.categories}>
          <label className={styles.category}>
            <input type="checkbox" checked disabled readOnly aria-label="Necessari (sempre attivi)" />
            <span>
              Necessari <em className={styles.always}>sempre attivi</em>
            </span>
          </label>
          <label className={styles.category} htmlFor="cookie-consent-statistics">
            <input
              id="cookie-consent-statistics"
              type="checkbox"
              checked={statistics}
              onChange={(e) => setStatistics(e.target.checked)}
            />
            <span>Statistica</span>
          </label>
          <label className={styles.category} htmlFor="cookie-consent-marketing">
            <input
              id="cookie-consent-marketing"
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
            />
            <span>Profilazione e marketing</span>
          </label>
        </div>
      </div>
      <div className={`cookie-actions ${styles.actions}`}>
        <button className="btn btn-primary" type="button" data-cookie="reject" onClick={handleRejectAll}>
          Rifiuta tutti
        </button>
        <button className="btn btn-primary" type="button" data-cookie="accept" onClick={handleAcceptAll}>
          Accetta tutti
        </button>
        <button className="btn btn-out" type="button" data-cookie="save" onClick={handleSavePreferences}>
          Salva preferenze
        </button>
      </div>
    </div>
  )
}
