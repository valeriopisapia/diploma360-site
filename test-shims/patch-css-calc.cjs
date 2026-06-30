'use strict'
/**
 * Pre-populates Module._cache for @csstools/* packages to prevent ERR_REQUIRE_ESM
 * in vitest workers that load jsdom → cssstyle → @asamuzakjp/css-color (CJS v4).
 *
 * @csstools/* packages are ESM-only. Their CJS consumer (@asamuzakjp/css-color)
 * destructures constants from them at module init time, so we need stubs that
 * accept any property access (recursive Proxy). The real functions are never
 * called in our component tests (no CSS computation happens).
 */
const Module = require('module')
const path = require('path')

/**
 * Returns a deeply-recursive Proxy that:
 * - Accepts any property access (returns another stub)
 * - Is callable (returns another stub when invoked)
 * - Converts to 0 when used as a primitive (safe for comparisons)
 */
function makeStub() {
  const fn = function stub() { return makeStub() }
  const cache = {}
  return new Proxy(fn, {
    get(_target, key) {
      if (key === Symbol.toPrimitive) return () => 0
      if (key === Symbol.iterator) return undefined
      if (key === '__esModule') return true
      if (key === 'default') return makeStub()
      if (key in cache) return cache[key]
      cache[key] = makeStub()
      return cache[key]
    },
    set(_target, key, value) {
      cache[key] = value
      return true
    },
    apply() { return makeStub() },
    construct() { return makeStub() },
  })
}

const ESM_ONLY_PKGS = [
  '@csstools/css-calc',
  '@csstools/css-tokenizer',
  '@csstools/css-parser-algorithms',
  '@csstools/css-color-parser',
]

const NM = path.resolve(__dirname, '../node_modules')

for (const pkg of ESM_ONLY_PKGS) {
  let resolvedPath
  try {
    resolvedPath = require.resolve(pkg)
  } catch {
    const parts = pkg.startsWith('@') ? pkg.slice(1).split('/') : [null, pkg]
    const [scope, name] = parts.length === 2 ? parts : [null, parts[0]]
    resolvedPath = scope
      ? path.join(NM, `@${scope}`, name, 'dist', 'index.mjs')
      : path.join(NM, pkg, 'dist', 'index.mjs')
  }

  if (!Module._cache[resolvedPath]) {
    Module._cache[resolvedPath] = {
      id: resolvedPath,
      filename: resolvedPath,
      loaded: true,
      exports: makeStub(),
    }
  }
}
