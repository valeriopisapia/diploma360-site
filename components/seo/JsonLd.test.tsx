// @vitest-environment jsdom
import { render } from '@testing-library/react'
import { JsonLd } from './JsonLd'

it('serializes data into a ld+json script', () => {
  const { container } = render(<JsonLd data={{ '@type': 'FAQPage' }} />)
  const s = container.querySelector('script[type="application/ld+json"]')
  expect(s?.innerHTML).toContain('"FAQPage"')
})
