import { brand } from '@/lib/brand'
import { buildMetadata } from '@/lib/seo'
import { ChiSiamoDiploma } from '@/components/chi-siamo/ChiSiamoDiploma'
import { ChiSiamoLaScuola } from '@/components/chi-siamo/ChiSiamoLaScuola'

export const metadata =
  brand.id === 'lascuola360'
    ? buildMetadata({
        title: `Chi siamo | ${brand.name}`,
        description:
          `${brand.name}: scuola online di Classme S.r.l. per diploma e ripetizioni, con tutor e docenti reali, una sede fisica a Roma e partner qualificati.`,
        path: '/chi-siamo',
      })
    : buildMetadata({
        title: `Chi siamo | ${brand.name}`,
        description:
          `${brand.name} di Classme S.r.l.: chi siamo, la nostra missione e come accompagniamo studenti e famiglie verso il diploma.`,
        path: '/chi-siamo',
      })

export default function ChiSiamoPage() {
  return brand.id === 'lascuola360' ? <ChiSiamoLaScuola /> : <ChiSiamoDiploma />
}
