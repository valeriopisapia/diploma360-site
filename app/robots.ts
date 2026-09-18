import type { MetadataRoute } from 'next'
import { brand } from '@/lib/brand'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/lp', '/api/'],
    },
    sitemap:
      brand.id === 'lascuola360'
        ? [`${brand.domain}/sitemap.xml`, 'https://lascuola360.it/blog/sitemap.xml']
        : `${brand.domain}/sitemap.xml`,
    host: brand.domain,
  }
}
