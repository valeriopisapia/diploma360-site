/**
 * GtmScript — loads the active brand's GTM container (brand.gtmId) after the page becomes
 * interactive, plus the <noscript> iframe fallback for no-JS environments.
 *
 * Must be rendered AFTER ConsentDefault in the root layout so that the
 * consent-default call fires before the GTM container initialises.
 */

import Script from "next/script"
import { brand } from "@/lib/brand"

const GTM_ID = brand.gtmId

export function GtmScript() {
  return (
    <>
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),
      dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
          `.trim(),
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}
