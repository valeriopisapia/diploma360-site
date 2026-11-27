// @vitest-environment node
import { it, expect } from 'vitest'
import { resolveBrand, brand, type BrandId } from '@/lib/brand'
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { buildMetadata } from '@/lib/seo'

// App Hosting redirects www.<domain> → <domain> (302), so canonical URLs, robots Host and
// sitemap <loc> must use the apex host that answers 200 directly.
it('every brand domain is an https apex origin without trailing slash', () => {
  for (const id of ['diploma360', 'lascuola360', 'schoolr'] as BrandId[]) {
    const d = resolveBrand(id).domain
    expect(d, id).toMatch(/^https:\/\/[a-z0-9.-]+$/)
    expect(d, id).not.toContain('://www.')
  }
})

it('robots Host/Sitemap, sitemap <loc> and canonical all use the brand apex', () => {
  expect(brand.domain).toBe('https://diploma360.it') // default build brand
  const r = robots()
  expect(r.host).toBe(brand.domain)
  expect([r.sitemap].flat()[0]).toBe(`${brand.domain}/sitemap.xml`)
  const locs = sitemap().map(e => e.url)
  expect(locs.length).toBeGreaterThan(0)
  for (const u of locs) expect(u.startsWith(`${brand.domain}/`), u).toBe(true)
  expect(buildMetadata({ title: 't', description: 'd', path: '/faq' }).alternates?.canonical)
    .toBe('https://diploma360.it/faq')
})
