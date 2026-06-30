/**
 * ConsentDefault — must be rendered BEFORE GtmScript in the layout.
 *
 * Initialises window.dataLayer, defines gtag, and fires the Consent Mode v2
 * default-denied call so the signal is set before the GTM container loads.
 *
 * A plain <script> element is used (following the project's JsonLd pattern)
 * so the inline code is present in the HTML stream at parse time, which is
 * equivalent to the `beforeInteractive` guarantee when mounted first in the
 * root layout.
 */

const CONSENT_SCRIPT = [
  "window.dataLayer=window.dataLayer||[];",
  "function gtag(){dataLayer.push(arguments);}",
  "gtag('consent','default',{",
  "  ad_storage:'denied',",
  "  analytics_storage:'denied',",
  "  ad_user_data:'denied',",
  "  ad_personalization:'denied',",
  "  wait_for_update:500",
  "});",
].join("")

export function ConsentDefault() {
  return (
    <script
      id="consent-default"
      dangerouslySetInnerHTML={{ __html: CONSENT_SCRIPT }}
    />
  )
}
