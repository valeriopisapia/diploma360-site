import { it, expect } from 'vitest'
import { execSync } from 'node:child_process'

// The brand name must come from lib/brand.ts, never be hardcoded in copy/data.
// Scans tracked source under app/, components/, data/ for the capitalised literal.
it('has no hardcoded "Diploma360" brand-name literal outside lib/brand.ts', () => {
  let out = ''
  try {
    out = execSync(
      `git grep -n -I "Diploma360" -- app components data ':!lib/brand.ts'`,
      { encoding: 'utf8' },
    )
  } catch {
    out = '' // git grep exits non-zero when there are no matches
  }
  expect(out.trim(), `Hardcoded brand name found:\n${out}`).toBe('')
})
