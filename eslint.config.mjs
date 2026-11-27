import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Read-only static reference sources (see AGENTS.md) — not part of the app.
    "materiale/**",
  ]),
  {
    // Internal <a href="/..."> links are intentionally NOT converted to next/link for now:
    // they do a full page load, and the GTM containers have Page View triggers but no
    // History Change trigger (docs/NOTA-team-GTM-conversioni.md) — turning them into SPA
    // navigations would silently stop page-view based tags (e.g. Meta Pixel PageView) on
    // those clicks. Kept visible as a warning until GTM handles history changes.
    rules: {
      "@next/next/no-html-link-for-pages": "warn",
    },
  },
  {
    // Test doubles (mocked fetch/dataLayer/window) are typed loosely on purpose.
    files: ["**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
]);

export default eslintConfig;
