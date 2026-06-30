import { it, expect } from 'vitest'
import { headerNav, footerNav } from './navigazione'

it('header is non-empty and all hrefs are clean routes', () => {
  expect(headerNav.length).toBeGreaterThan(0)
  for (const g of headerNav) {
    for (const i of g.items) {
      expect(i.href.endsWith('.html')).toBe(false)
    }
  }
})

it('footer links to legal pages', () => {
  const hrefs = footerNav.flatMap(g => g.items.map(i => i.href))
  expect(hrefs).toEqual(expect.arrayContaining(['/privacy', '/cookie', '/termini']))
})
