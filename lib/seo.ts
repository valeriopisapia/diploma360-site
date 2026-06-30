import type { Metadata } from 'next'

const SITE = 'https://www.diploma360.it'

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

  const metadata: Metadata = {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  }

  if (noindex) {
    metadata.robots = { index: false, follow: false }
  }

  return metadata
}
