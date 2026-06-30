// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { citta, getCitta, allCittaSlugs } from './citta'

describe('citta', () => {
  it('has the 19 expected slugs', () => {
    expect(allCittaSlugs().sort()).toEqual([
      'ancona','bari','bergamo','bologna','cagliari','catania','firenze','genova','latina',
      'milano','napoli','padova','palermo','perugia','pescara','roma','salerno','torino','verona',
    ].sort())
  })
  it('looks up a city by slug', () => {
    expect(getCitta('milano')?.nome).toBe('Milano')
    expect(getCitta('nope')).toBeUndefined()
  })
  it('every entry has non-empty seo fields', () => {
    for (const c of citta) { expect(c.titoloSeo).toBeTruthy(); expect(c.descSeo).toBeTruthy() }
  })
})
