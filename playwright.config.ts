import { defineConfig, devices } from '@playwright/test';

const useSlowMo = false; // Toggle slowMo for local debug use

export default defineConfig({
  retries: 0,
  testDir: './test',
  workers: 1, // Set to 1 for sequential execution
  projects: [
    {
      name: 'Chromium',
      use: {
        browserName: 'chromium',
        headless: true,
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
    {
      name: 'Firefox',
      use: {
        browserName: 'firefox',
        headless: true,
        viewport: { width: 1280, height: 720 },
        launchOptions: {
          slowMo: useSlowMo ? 500 : 0,
        },
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'on',
      },
    },
    {
      name: 'Webkit',
      use: {
        browserName: 'webkit',
        headless: true,
        viewport: { width: 1280, height: 720 },
        launchOptions: {
          slowMo: useSlowMo ? 500 : 0,
        },
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'on',
      },
    },
    // {
    //   name: 'Mobile Safari',
    //   use: { 
    //     ...devices['iPhone 14'], 
    //     video: 'retain-on-failure',
    //     screenshot: 'only-on-failure',
    //     trace: 'on',
    //   },
    // },
    {
      name: 'Pixel 7',
      use: {
        ...devices['Pixel 7'], 
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
        trace: 'on',
      },
    },
  ],
});