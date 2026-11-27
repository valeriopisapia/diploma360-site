import { render, screen, act } from '@testing-library/react'
import { it, expect, vi, afterEach } from 'vitest'
import { Counter, Reveal } from './Reveal'

afterEach(() => {
  vi.unstubAllGlobals()
})

it('Counter renders the final value and follows a changed value', () => {
  vi.stubGlobal('IntersectionObserver', undefined) // no motion → final value
  const { rerender } = render(<Counter value="+5.000" />)
  expect(screen.getByText('+5.000')).toBeInTheDocument()
  rerender(<Counter value="97%" />)
  expect(screen.getByText('97%')).toBeInTheDocument()
})

it('Counter zeroes on view and ends at the final value', async () => {
  let cb: IntersectionObserverCallback = () => {}
  vi.stubGlobal('IntersectionObserver', class {
    constructor(c: IntersectionObserverCallback) { cb = c }
    observe() {}
    unobserve() {}
    disconnect() {}
  })
  let now = 0
  vi.stubGlobal('requestAnimationFrame', (f: FrameRequestCallback) => setTimeout(() => f((now += 100)), 0))
  vi.stubGlobal('cancelAnimationFrame', (id: number) => clearTimeout(id))
  render(<Counter value="150+" durationMs={1} />)
  expect(screen.getByText('150+')).toBeInTheDocument()
  const span = screen.getByText('150+')
  act(() => cb([{ isIntersecting: true, target: span } as unknown as IntersectionObserverEntry], {} as IntersectionObserver))
  expect(span.textContent).toBe('0+')
  await act(async () => { await new Promise(r => setTimeout(r, 20)) })
  expect(span.textContent).toBe('150+')
})

it('Reveal stays visible without IntersectionObserver and hides until in view with it', () => {
  vi.stubGlobal('IntersectionObserver', undefined)
  const { unmount } = render(<Reveal data-testid="r">x</Reveal>)
  expect(screen.getByTestId('r')).toHaveStyle({ opacity: '1' })
  unmount()

  let cb: IntersectionObserverCallback = () => {}
  vi.stubGlobal('IntersectionObserver', class {
    constructor(c: IntersectionObserverCallback) { cb = c }
    observe() {}
    unobserve() {}
    disconnect() {}
  })
  render(<Reveal data-testid="r2">y</Reveal>)
  const el = screen.getByTestId('r2')
  expect(el).toHaveStyle({ opacity: '0' })
  act(() => cb([{ isIntersecting: true, target: el } as unknown as IntersectionObserverEntry], {} as IntersectionObserver))
  expect(el).toHaveStyle({ opacity: '1' })
})
