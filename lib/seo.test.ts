// @vitest-environment node
import { it, expect } from 'vitest'
import { buildMetadata } from './seo'
import { brand } from './brand'

it('uses the active brand domain and name', () => {
  const m = buildMetadata({ title: 'X', description: 'd', path: '/foo' })
  expect(m.alternates?.canonical).toBe(`${brand.domain}/foo`)
  expect(m.openGraph?.siteName).toBe(brand.name)
})

it('builds canonical + index metadata', () => {
  const m = buildMetadata({ title: 'X', description: 'Y', path: '/prezzi' })
  expect(m.alternates?.canonical).toBe('https://www.diploma360.it/prezzi')
  expect(m.title).toBe('X')
})
it('sets noindex robots when asked', () => {
  const m = buildMetadata({ title: 'X', description: 'Y', path: '/lp', noindex: true })
  expect(m.robots).toMatchObject({ index: false, follow: false })
})
