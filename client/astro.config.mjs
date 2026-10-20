// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import svelte from '@astrojs/svelte';
import istanbul from 'vite-plugin-istanbul';

import node from '@astrojs/node';

// Instrument source for code coverage when running E2E tests with
// VITE_COVERAGE=true (see scripts/run-e2e-tests.sh). Gated here directly
// (rather than via the plugin's own `requireEnv` env lookup) because Astro
// overrides Vite's `envPrefix` to "PUBLIC_", so the plugin's default
// "VITE_"-prefixed env lookup never matches. Never enabled for production
// builds.
const coverageEnabled = process.env.VITE_COVERAGE === 'true';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    svelte(),
  ],
  vite: {
    plugins: [
      tailwindcss(),
      svelte(),
      ...(coverageEnabled
        ? [
            istanbul({
              include: 'src/**/*',
              exclude: ['node_modules', 'e2e-tests/*'],
              extension: ['.js', '.ts', '.svelte', '.astro'],
              checkProd: true,
            }),
          ]
        : []),
    ]
  },

  adapter: node({
    mode: 'standalone'
  }),

  server: {
    host: '0.0.0.0',
  },
});
