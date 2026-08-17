'use client'

import { useCallback, useEffect, useState } from 'react'
import { applyConsent } from '@/lib/analytics'
import { captureAttribution } from '@/lib/attribution'
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
    // Re-apply the stored choice. Redundant with the inline ConsentFromStorage script for the
    // ordinary returning visitor (harmless: same values, and gtag consent update is
    // idempotent), but NOT redundant on the page load that migrates the legacy localStorage
    // value: there the cookie does not exist yet when the inline script runs, readConsent()
    // creates it right here, and without this call the whole session would stay denied
    // despite a stored consent.
    applyConsent(stored.statistics, stored.marketing)
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
    // Accepting marketing re-runs the attribution capture, which the first page load
    // deliberately skipped for lack of consent (lib/attribution). On the ad landing page the
    // click identifiers are still in location.search, so nothing is lost by waiting for the
    // choice. Order matters: captureAttribution reads the consent cookie itself, so it has to
    // run *after* writeConsent — before it, it would read the previous value and skip.
    if (choice.marketing) captureAttribution()
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

  /** The X means "cancel", and what cancelling does depends on whether a choice already exists.
   *
   *  Nothing stored (first visit): closing is NOT a choice — only technical cookies apply, for
   *  this session only (applyConsent with both flags off, mirroring the "denied" default). No
   *  cookie is written, so the banner reappears on the next visit.
   *
   *  A choice already stored (banner reopened from the footer): closing changes nothing at all.
   *  Revoking here would push the tags to denied for the rest of the SPA session while the
   *  cookie still says granted, and the user asked to cancel — not to revoke. Revoking is done
   *  by unticking the categories and saving. */
  function handleClose() {
    if (readConsent() === null) applyConsent(false, false)
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
