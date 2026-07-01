'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export function LpHeader() {
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const update = () => {
      setIsHidden((window.scrollY || document.documentElement.scrollTop) > 24)
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <header className={`header${isHidden ? ' hide' : ''}`}>
      <div className="wrap">
        <a className="brand" href="#">
          <Image
            className="brand-logo"
            src="/foto/logo-diploma360.png"
            alt="Diploma360 — Powered by LaScuola360"
            width={160}
            height={38}
            priority
          />
        </a>
        <div className="head-actions">
          <a className="btn btn-primary btn-sm head-call" href="tel:+390684280999">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            {' '}Chiama ora
          </a>
          <a className="btn btn-wa btn-sm" href="https://wa.me/393517214644">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.54-3.7 8.24-8.24 8.24-1.52 0-3.01-.41-4.3-1.19l-.31-.18-3.12.82.83-3.04-.2-.32a8.18 8.18 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.24-8.24zm-2.9 4.43c-.14 0-.36.05-.55.26-.19.21-.72.71-.72 1.73s.74 2.01.84 2.15c.1.14 1.45 2.21 3.5 3.1.49.21.87.34 1.17.43.49.16.94.13 1.29.08.39-.06 1.21-.49 1.38-.97.17-.48.17-.88.12-.97-.05-.08-.19-.13-.39-.23-.21-.1-1.21-.6-1.4-.67-.19-.07-.32-.1-.46.1-.14.21-.53.67-.65.81-.12.14-.24.16-.44.05-.21-.1-.87-.32-1.66-1.02-.61-.55-1.03-1.22-1.15-1.43-.12-.21-.01-.32.09-.42.09-.09.21-.24.31-.36.1-.12.14-.21.21-.35.07-.14.03-.26-.02-.36-.05-.1-.46-1.12-.63-1.53-.17-.4-.34-.35-.46-.36z"/>
            </svg>
            {' '}<span className="wa-label"><span className="hide-sm">Scrivici su </span>WhatsApp</span>
          </a>
        </div>
      </div>
    </header>
  )
}
