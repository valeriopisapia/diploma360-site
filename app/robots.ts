import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/lp', '/api/'],
    },
    sitemap: 'https://www.diploma360.it/sitemap.xml',
    host: 'https://www.diploma360.it',
  }
}
