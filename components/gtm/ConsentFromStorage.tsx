import { brand } from '@/lib/brand'

/**
 * ConsentFromStorage — must be rendered AFTER ConsentDefault and BEFORE GtmScript.
 *
 * The bug this fixes: grantConsent() (now applyConsent) only ever fired from the cookie
 * banner's own click handler. A returning visitor who already accepted has a consent cookie
 * (lib/consent.ts, Task 2) but the banner never renders for them again — so consent stayed
 * `denied` forever and analytics/ads tags never fired for anyone but first-time acceptors.
 * This component re-applies the stored choice on EVERY load, before GTM's container script
 * runs, so returning visitors' real consent is honoured immediately.
 *
 * Server component: the cookie name is brand-specific (brand.legal.consentCookieName) and is
 * serialised into the inline script string at render time — the running JS never imports
 * lib/consent.ts or reads `brand` itself. Like ConsentDefault, this is a plain <script>
 * (dangerouslySetInnerHTML), not a useEffect: a client-side effect runs after hydration,
 * which is too late relative to GtmScript's afterInteractive load and would defeat the
 * ordering guarantee that is the entire point of this component.
 *
 * The cookie-parsing regex mirrors lib/consent.ts's `v1.<s|_>.<m|_>` format on purpose
 * (duplicated, not imported): this script must have zero module dependencies to stay
 * inlineable at parse time. It is a single anchored regex — no eval, no dependencies.
 */

function buildScript(cookieName: string): string {
  return [
    '(function(){',
    `  var NAME = ${JSON.stringify(cookieName)};`,
    '  var RE = /^v1\\.([s_])\\.([m_])$/;',
    '  var parts = document.cookie ? document.cookie.split(";") : [];',
    '  for (var i = 0; i < parts.length; i++) {',
    '    var part = parts[i];',
    '    var eq = part.indexOf("=");',
    '    if (eq === -1) continue;',
    '    var key = part.slice(0, eq).trim();',
    '    if (key !== NAME) continue;',
    '    var raw = part.slice(eq + 1).trim();',
    '    var value;',
    '    try { value = decodeURIComponent(raw); } catch (e) { return; }',
    '    var m = RE.exec(value);',
    '    if (!m) return;',
    '    gtag("consent","update",{',
    '      analytics_storage: m[1] === "s" ? "granted" : "denied",',
    '      ad_storage: m[2] === "m" ? "granted" : "denied",',
    '      ad_user_data: m[2] === "m" ? "granted" : "denied",',
    '      ad_personalization: m[2] === "m" ? "granted" : "denied"',
    '    });',
    '    return;',
    '  }',
    '})();',
  ].join('')
}

export function ConsentFromStorage() {
  return (
    <script
      id="consent-from-storage"
      dangerouslySetInnerHTML={{ __html: buildScript(brand.legal.consentCookieName) }}
    />
  )
}
