import { brand } from '@/lib/brand'
import { Footer } from './Footer'
import { RipFooter } from './RipFooter'

export function BrandFooter() {
  return brand.id === 'lascuola360' ? <RipFooter /> : <Footer />
}
