import { brand } from '@/lib/brand'
import { buildMetadata } from '@/lib/seo'
import { HomeDiploma } from '@/components/home/HomeDiploma'
import { HomeLaScuola } from '@/components/home/HomeLaScuola'

export const metadata =
  brand.id === 'lascuola360'
    ? buildMetadata({
        title: `Diploma e ripetizioni online | ${brand.name}`,
        description:
          `${brand.name}: la scuola online di Classme per il Diploma di Stato e le ripetizioni, con tutor e docenti reali e una piattaforma che ti dice sempre cosa studiare dopo.`,
        path: '/',
      })
    : buildMetadata({
        title: `Diploma online e recupero anni scolastici | ${brand.name}`,
        description:
          'Recupera gli anni persi e prendi il Diploma di Stato da casa: lezioni live, tutor dedicati e materiali pronti. Scopri gratis il tuo percorso.',
        path: '/',
      })

export default function HomePage() {
  return brand.id === 'lascuola360' ? <HomeLaScuola /> : <HomeDiploma />
}
