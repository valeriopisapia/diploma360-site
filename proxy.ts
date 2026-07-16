import { NextResponse, type NextRequest } from 'next/server'
import { brand } from '@/lib/brand'

const LASCUOLA_HOME = 'https://www.lascuola360.it/'

// This repo's Next.js (16.2.9) deprecates the `middleware.ts` / `middleware()`
// convention in favor of `proxy.ts` / `proxy()` (see
// node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
// Behavior and matcher syntax are unchanged — only the file/export name differs.
export function proxy(request: NextRequest) {
  // Only the schoolr build redirects; other brands are a no-op.
  if (brand.id !== 'schoolr') return NextResponse.next()
  // The home page is the rebrand landing; everything else forwards to LaScuola360.
  if (request.nextUrl.pathname === '/') return NextResponse.next()
  return NextResponse.redirect(LASCUOLA_HOME, 301)
}

export const config = {
  // Skip API, Next internals, and any path with a file extension (static assets,
  // /schoolr/*.png, /sitemap.xml, /robots.txt, favicon, og-image).
  matcher: ['/((?!api|_next/static|_next/image|.*\\..*).*)'],
}
