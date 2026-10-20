import { test as base, expect, type Response } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const NYC_OUTPUT_DIR = path.join(process.cwd(), '.nyc_output');

/**
 * Extends the base Playwright `test` to collect Istanbul coverage data
 * (produced by the `vite-plugin-istanbul` instrumentation enabled via
 * VITE_COVERAGE=true) from the browser after every test and persist it to
 * disk so it can be merged and reported with `nyc` once the suite finishes.
 *
 * Only active when VITE_COVERAGE=true, so normal local E2E runs are
 * unaffected.
 */
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);

    if (process.env.VITE_COVERAGE !== 'true') {
      return;
    }

    const coverage = await page.evaluate(() => (window as unknown as { __coverage__?: unknown }).__coverage__);
    if (coverage) {
      fs.mkdirSync(NYC_OUTPUT_DIR, { recursive: true });
      const filename = path.join(
        NYC_OUTPUT_DIR,
        `coverage-${testInfo.testId}-${Date.now()}.json`
      );
      fs.writeFileSync(filename, JSON.stringify(coverage));
    }
  },
});

export { expect };
export type { Response };
