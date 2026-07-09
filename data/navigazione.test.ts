import { it, expect } from 'vitest'
import { footerNav, getHeaderNav } from './navigazione'

it('diploma360 nav: Home, Come funziona▾, Diplomi, Prezzi, Chi siamo', () => {
  // resolveBrand default is diploma360 in the test env
  const nav = getHeaderNav()
  expect(nav.map(i => i.label)).toEqual(['Home', 'Come funziona', 'Diplomi', 'Prezzi', 'Chi siamo'])
  const mega = nav.filter(i => i.kind === 'mega')
  expect(mega).toHaveLength(2)
})

it('header is non-empty and all hrefs are clean routes', () => {
  const nav = getHeaderNav()
  expect(nav.length).toBeGreaterThan(0)
  for (const item of nav) {
    if (item.kind === 'link') {
      expect(item.href.endsWith('.html')).toBe(false)
    } else {
      for (const col of item.columns) {
        for (const link of col.items) {
          expect(link.href.endsWith('.html')).toBe(false)
        }
      }
    }
  }
})

it('footer links to legal pages', () => {
  const hrefs = footerNav.flatMap(g => g.items.map(i => i.href))
  expect(hrefs).toEqual(expect.arrayContaining(['/privacy', '/cookie', '/termini']))
})
