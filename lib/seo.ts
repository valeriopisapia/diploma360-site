import type { Metadata } from 'next'
import { brand } from './brand'

const SITE = brand.domain
const SITE_NAME = brand.name
const DEFAULT_OG_IMAGE = `${SITE}${brand.logo.ogImage}` // absolute, branded 1200x630

interface BuildMetadataOpts {
  title: string
  description: string
  path: string
  noindex?: boolean
  ogImage?: string
}

export function buildMetadata({
  title,
  description,
  path,
  noindex,
  ogImage,
}: BuildMetadataOpts): Metadata {
  const canonical = `${SITE}${path}`
  const image = ogImage ?? DEFAULT_OG_IMAGE

  const metadata: Metadata = {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      locale: 'it_IT',
      siteName: SITE_NAME,
      title,
      description,
      url: canonical,
      images: [{ url: image, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  }

  if (noindex) {
    metadata.robots = { index: false, follow: false }
  }

  return metadata
}
