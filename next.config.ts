import type { NextConfig } from "next";

const isLaScuola360 = process.env.NEXT_PUBLIC_BRAND === 'lascuola360'

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        // Blog articles are real .html files on Netlify. Redirects run before rewrites,
        // so preserve their extension only for the La Scuola360 blog.
        source: isLaScuola360 ? '/:path((?!blog/).*)\\.html' : '/:path*.html',
        destination: isLaScuola360 ? '/:path' : '/:path*',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      ...(isLaScuola360 ? [
        { source: '/blog', destination: 'https://lascuola360-blog.netlify.app/blog/' },
        { source: '/blog/:path*', destination: 'https://lascuola360-blog.netlify.app/blog/:path*' },
      ] : []),
      {
        source: '/q/:codice',
        destination: 'https://kit-clienti-lascuola360.netlify.app/q/:codice',
      },
    ]
  },
};

export default nextConfig;
