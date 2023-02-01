// playwright.config.ts
/* 
 This start the app before running tests
*/

import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  webServer: {
    command: 'yarn dev',
    url: 'http://localhost:3000/',
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000/',
  },
  testMatch: '*.e2e.ts',
};
export default config;
