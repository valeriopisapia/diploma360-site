import Image from 'next/image'
import { brand } from '@/lib/brand'

/**
 * LpFooter — footer for the Ads landing funnel (own chrome, separate from the
 * site Footer). Shared between the landing page (`/lp`) and its thank-you page
 * (`/lp-thank-you-page`). Static markup, ported from the landing source.
 */
export function LpFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Image
              className="footer-logo"
              src={brand.logo.lp}
              alt={brand.logo.alt}
              width={136}
              height={34}
              style={{ width: 'auto' }}
              loading="lazy"
            />
            <p className="footer-claim">
              Recupera gli anni persi e preparati al diploma valido e riconosciuto dallo Stato
              italiano, online: tutor per ogni materia e supporto fino agli esami.
            </p>
            <div className="footer-social">
              <a href="https://www.instagram.com/schoolrhq/" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/schoolrhq" target="_blank" rel="noopener" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/schoolr/" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@schoolr" target="_blank" rel="noopener" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16.5 3c.3 2.1 1.5 3.4 3.5 3.6v2.4c-1.2.1-2.3-.2-3.5-.9v5.9c0 3.3-2.4 5.5-5.4 5.5-2.9 0-5.1-2.1-5.1-4.9 0-3 2.3-5 5.3-4.8v2.6c-.4-.1-.8-.2-1.2-.1-1.2.1-2 .9-1.9 2.1.1 1.2 1 1.9 2.1 1.8 1.2-.1 1.9-1 1.9-2.4V3h2.8z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Esplora</h4>
            <a href="#metodo">Perché siamo diversi</a>
            <a href="#indirizzi">Indirizzi</a>
            <a href="#famiglia">Le persone e la famiglia</a>
            <a href="#prezzi">Prezzi</a>
            <a href="#faq">Domande frequenti</a>
          </div>
          <div className="footer-col">
            <h4>Contatti</h4>
            <a href="tel:+390684280999">06 84 280 999</a>
            <a href="https://wa.me/393517214644">Scrivici su WhatsApp</a>
            <a href="mailto:info@diploma360.it">info@diploma360.it</a>
            <span className="fc-item"><b>Lun–Ven</b> 9:00–19:00</span>
          </div>
          <div className="footer-col">
            <h4>Note legali</h4>
            <a href="/privacy">Privacy Policy</a>
            <a href="/cookie">Cookie Policy</a>
            <a href="/termini">Termini e condizioni</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-legal">
            <b>*</b>Fino a 2 anni in uno: dove la normativa lo consente.{' '}
            <b>*</b>Promosso o Ripreparato: garanzia inclusa nei piani Plus e Max, secondo
            condizioni; se non passi l&apos;esame ti riprepariamo gratis.{' '}
            <b>*</b>97% promossi e dati indicati: dati interni {brand.name}; i risultati possono
            variare in base alla situazione di partenza, al percorso scelto e all&apos;impegno dello
            studente.
          </p>
          <div className="footer-copy">
            © 2026 <b>{brand.name}</b> — Powered by LaScuola360. Tutti i diritti riservati.
            {/* Company block preserved verbatim from source — note: address differs from showcase site */}
            <span className="footer-company">
              Classme S.r.l. · P.IVA IT15441141007 · C.F. 15441141007 · Sede legale Via
              Giovanni Antonelli, 00197 Roma (RM), IT · Stabile organizzazione: Via Giovanni
              Antonelli 41, 00197 Roma (RM), IT
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
