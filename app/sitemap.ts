import type { MetadataRoute } from 'next'
import { allCittaSlugs } from '@/data/citta'
import { allDiplomaSlugs } from '@/data/diplomi'
import { brand } from '@/lib/brand'

const BASE = brand.domain

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

const RIPETIZIONI_ROUTES = [
  '/ripetizioni',
  '/ripetizioni/come-funziona',
  '/ripetizioni/prezzi',
  '/ripetizioni/materie',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  if (brand.id === 'schoolr') {
    return [
      {
        url: `${BASE}/`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 1.0,
      },
    ]
  }

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${BASE}${route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1.0 : 0.8,
  }))

  const ripetizioniEntries: MetadataRoute.Sitemap =
    brand.id === 'lascuola360'
      ? RIPETIZIONI_ROUTES.map((route) => ({
          url: `${BASE}${route}`,
          lastModified,
          changeFrequency: 'monthly',
          priority: 0.7,
        }))
      : []

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

  return [...staticEntries, ...ripetizioniEntries, ...cityEntries, ...diplomaEntries]
}
