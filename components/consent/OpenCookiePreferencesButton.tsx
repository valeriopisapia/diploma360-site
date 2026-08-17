'use client'

import { OPEN_EVENT } from './CookieBanner'

/**
 * Reopens the cookie banner (Task 4 contract, `OPEN_EVENT` on `document`), precompiled
 * with the currently stored choice. Shared by both brand footers (Task 5) so the event
 * name lives in exactly one place — importing the constant instead of a string literal
 * closes off the divergence risk already fixed for the consent maps in Task 3.
 *
 * A real `<button>`, not a link: this does not navigate anywhere.
 */
export function OpenCookiePreferencesButton({ className }: { className?: string }) {
  function handleClick() {
    document.dispatchEvent(new Event(OPEN_EVENT))
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      Gestisci le preferenze sui cookie
    </button>
  )
}
