import { afterEach, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

it('proxies the blog only for La Scuola360 without redirecting article HTML', async () => {
  vi.stubEnv('NEXT_PUBLIC_BRAND', 'lascuola360')
  vi.resetModules()
  const config = (await import('./next.config')).default
  const redirects = await config.redirects!()
  const rewrites = await config.rewrites!()

  expect(redirects[1]).toMatchObject({
    source: '/:path((?!blog/).*)\\.html',
    destination: '/:path',
  })
  expect(rewrites).toEqual(expect.arrayContaining([
    { source: '/blog', destination: 'https://lascuola360-blog.netlify.app/blog/' },
    { source: '/blog/:path*', destination: 'https://lascuola360-blog.netlify.app/blog/:path*' },
  ]))
})

it('keeps the existing HTML redirect and has no blog proxy for Diploma360', async () => {
  vi.stubEnv('NEXT_PUBLIC_BRAND', 'diploma360')
  vi.resetModules()
  const config = (await import('./next.config')).default
  const redirects = await config.redirects!()
  const rewrites = await config.rewrites!()

  expect(redirects[1]).toMatchObject({ source: '/:path*.html', destination: '/:path*' })
  expect(rewrites).toEqual([
    { source: '/q/:codice', destination: 'https://kit-clienti-lascuola360.netlify.app/q/:codice' },
  ])
})
