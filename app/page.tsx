import { brand } from '@/lib/brand'
import { buildMetadata } from '@/lib/seo'
import { HomeDiploma } from '@/components/home/HomeDiploma'

export const metadata = buildMetadata({
  title: `Diploma online e recupero anni scolastici | ${brand.name}`,
  description:
    'Recupera gli anni persi e prendi il Diploma di Stato da casa: lezioni live, tutor dedicati e materiali pronti. Scopri gratis il tuo percorso.',
  path: '/',
})

export default function HomePage() {
  return <HomeDiploma />
}
