import { render } from '@testing-library/react'
import { ConsentDefault } from './ConsentDefault'
it('emits a default-denied consent script', () => {
  const { container } = render(<ConsentDefault />)
  expect(container.innerHTML).toContain("'consent','default'")
  expect(container.innerHTML).toContain("analytics_storage:'denied'")
})
