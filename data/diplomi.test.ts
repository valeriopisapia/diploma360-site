// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { diplomi, getDiploma, allDiplomaSlugs } from './diplomi'

describe('diplomi', () => {
  it('has the 20 expected slugs', () => {
    expect(allDiplomaSlugs().sort()).toEqual([
      'afm','agricoltura','chimica','elettronica','enogastronomia','grafica','informatica',
      'liceo-artistico','liceo-classico','liceo-economico-sociale','liceo-linguistico',
      'liceo-scientifico','liceo-scienze-applicate','liceo-scienze-umane','liceo-sportivo',
      'meccanica','rim','sanita','servizi-commerciali','turismo',
    ].sort())
  })
  it('looks up a diploma by slug', () => {
    expect(getDiploma('afm')?.nome).toBeTruthy()
    expect(getDiploma('nope')).toBeUndefined()
  })
  it('every entry has non-empty seo fields', () => {
    for (const d of diplomi) { expect(d.titoloSeo).toBeTruthy(); expect(d.descSeo).toBeTruthy() }
  })
  it('categoria is correctly typed', () => {
    for (const d of diplomi) {
      expect(['liceo', 'tecnico', 'professionale']).toContain(d.categoria)
    }
    // spot-checks
    expect(getDiploma('liceo-scientifico')?.categoria).toBe('liceo')
    expect(getDiploma('afm')?.categoria).toBe('tecnico')
    expect(getDiploma('enogastronomia')?.categoria).toBe('professionale')
  })
})
