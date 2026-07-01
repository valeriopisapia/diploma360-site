import type { MetadataRoute } from 'next'
import { allCittaSlugs } from '@/data/citta'
import { allDiplomaSlugs } from '@/data/diplomi'

const BASE = 'https://www.diploma360.it'

const STATIC_ROUTES = [
  '/',
  '/come-funziona',
  '/piattaforma',
  '/nostra-piattaforma',
  '/diplomi',
  '/esami-diploma',
  '/esami-normativa',
  '/iscrizioni',
  '/garanzia',
  '/prezzi',
  '/sedi-esame',
  '/credibilita',
  '/recuperare-due-anni-in-uno',
  '/faq',
  '/chi-siamo',
  '/contatti',
  '/privacy',
  '/cookie',
  '/termini',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1.0 : 0.8,
  }))

  const cityEntries: MetadataRoute.Sitemap = allCittaSlugs().map((slug) => ({
    url: `${BASE}/recupero-anni-scolastici-${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const diplomaEntries: MetadataRoute.Sitemap = allDiplomaSlugs().map((slug) => ({
    url: `${BASE}/diplomi/${slug}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticEntries, ...cityEntries, ...diplomaEntries]
}
