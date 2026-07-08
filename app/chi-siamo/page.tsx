import { brand } from '@/lib/brand'
import { buildMetadata } from '@/lib/seo'
import { ChiSiamoDiploma } from '@/components/chi-siamo/ChiSiamoDiploma'

export const metadata = buildMetadata({
  title: `Chi siamo | ${brand.name}`,
  description:
    `${brand.name} di Classme S.r.l.: chi siamo, la nostra missione e come accompagniamo studenti e famiglie verso il diploma.`,
  path: '/chi-siamo',
})

export default function ChiSiamoPage() {
  return <ChiSiamoDiploma />
}
