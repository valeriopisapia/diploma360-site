import type { MetadataRoute } from 'next'
import { brand } from '@/lib/brand'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/lp', '/api/'],
    },
    sitemap: `${brand.domain}/sitemap.xml`,
    host: brand.domain,
  }
}
