import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { ConsentDefault } from '@/components/gtm/ConsentDefault'
import { GtmScript } from '@/components/gtm/GtmScript'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Footer } from '@/components/layout/Footer'
import { CookieBanner } from '@/components/consent/CookieBanner'
import './globals.css'

// ─── Fonts ────────────────────────────────────────────────────────────────────
// site.css references 'Inter' (body) and 'Poppins' (headings/buttons) by
// their literal family names.  next/font/google generates @font-face rules
// with those same names, so the existing CSS rules resolve correctly.

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  display: 'swap',
})

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Diploma360',
  description: 'Consegui il diploma online con Diploma360',
  metadataBase: new URL('https://www.diploma360.it'),
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className={`${inter.className} ${poppins.className}`}>
      {/*
        ConsentDefault MUST appear before GtmScript.
        Placing it in <head> as a plain inline <script> ensures it executes
        at parse time (before any deferred/interactive scripts run).
        GtmScript (afterInteractive) sits first in <body> so the noscript
        iframe fallback is also in the body, as the spec requires.
      */}
      <head>
        <ConsentDefault />
      </head>
      <body>
        <GtmScript />
        <SiteHeader />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
