import { notFound } from 'next/navigation'
import { brand, type BrandId } from './brand'

/** Renders a 404 when the current build's brand is not `id`. Use at the top of
 *  brand-exclusive route components (e.g. /ripetizioni/*). */
export function assertBrand(id: BrandId): void {
  if (brand.id !== id) notFound()
}
