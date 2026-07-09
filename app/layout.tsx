import type { Metadata, Viewport } from 'next'
import { brand } from '@/lib/brand'
import { ConsentDefault } from '@/components/gtm/ConsentDefault'
import { GtmScript } from '@/components/gtm/GtmScript'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { BrandFooter } from '@/components/layout/BrandFooter'
import { CookieBanner } from '@/components/consent/CookieBanner'
import { ChromeGate } from '@/components/layout/ChromeGate'
import { AttributionCapture } from '@/components/analytics/AttributionCapture'
import './globals.css'

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: brand.name,
  description: `Consegui il diploma online con ${brand.name}`,
  metadataBase: new URL(brand.domain),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#E48267',
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it">
      {/*
        ConsentDefault MUST appear before GtmScript.
        Placing it in <head> as a plain inline <script> ensures it executes
        at parse time (before any deferred/interactive scripts run).
        GtmScript (afterInteractive) sits first in <body> so the noscript
        iframe fallback is also in the body, as the spec requires.

        Google Fonts <link> tags follow ConsentDefault.  Using standard <link>
        rel="stylesheet" loads fonts under their literal family names ('Inter',
        'Poppins') so site.css selectors resolve correctly.  next/font/google
        hashes the font-family name (e.g. __Inter_abc123), which breaks any
        CSS that references the literal name — including our design-system
        site.css.  Self-hosting fonts for stricter GDPR compliance is a
        possible future hardening step.
      */}
      <head>
        <ConsentDefault />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GtmScript />
        <AttributionCapture />
        <ChromeGate><SiteHeader /></ChromeGate>
        {children}
        <ChromeGate><BrandFooter /></ChromeGate>
        <CookieBanner />
      </body>
    </html>
  )
}
