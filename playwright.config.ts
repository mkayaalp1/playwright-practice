import { defineConfig } from '@playwright/test';

const useSlowMo = false; // Toggle slowMo for local debug use

export default defineConfig({
  retries: 1,
    testDir: './test',
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1280, height: 720 },
        launchOptions: {
          slowMo: useSlowMo ? 500 : 0,
        },
        video: 'retain-on-failure',
         //video: 'off', // Enable video recording
        screenshot: 'only-on-failure',
        //screenshot: 'on', // Capture screenshots on every failed test run
        trace: 'on', // Enable Playwright tracing (network + console logs)
      },
    },
  ],
});