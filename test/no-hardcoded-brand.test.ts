import { it, expect } from 'vitest'
import { execSync } from 'node:child_process'

// Brand name AND brand domain must come from lib/brand.ts, never be hardcoded in
// copy/data/structured-data. Scans tracked source under app/, components/, data/
// for the capitalised name literal `Diploma360` or the domain host `www.diploma360.it`.
// (The contact email `info@diploma360.it` has no `www.` and is intentionally NOT
// matched — contacts are a separate, shared concern routed through brand.contacts.)
it('has no hardcoded brand name or domain outside lib/brand.ts', () => {
  let out = ''
  try {
    out = execSync(
      `git grep -n -I -E "Diploma360|www\\.diploma360\\.it" -- app components data ':!lib/brand.ts'`,
      { encoding: 'utf8' },
    )
  } catch {
    out = '' // git grep exits non-zero when there are no matches
  }
  expect(out.trim(), `Hardcoded brand name/domain found:\n${out}`).toBe('')
})
