// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { buildMetadata } from './seo'

it('builds canonical + index metadata', () => {
  const m = buildMetadata({ title: 'X', description: 'Y', path: '/prezzi' })
  expect(m.alternates?.canonical).toBe('https://www.diploma360.it/prezzi')
  expect(m.title).toBe('X')
})
it('sets noindex robots when asked', () => {
  const m = buildMetadata({ title: 'X', description: 'Y', path: '/lp', noindex: true })
  expect(m.robots).toMatchObject({ index: false, follow: false })
})
