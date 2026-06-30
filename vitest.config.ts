import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    passWithNoTests: true,
    // jsdom v27 + cssstyle v5 pull in ESM-only packages (@csstools/*, parse5).
    // --experimental-require-module (Node ≥20.17) lets CJS workers require ESM,
    // unblocking jsdom on Node 20. Data tests pin // @vitest-environment node
    // and are unaffected.
    execArgv: ['--experimental-require-module'],
  },
  resolve: { alias: { '@': new URL('./', import.meta.url).pathname } },
})
