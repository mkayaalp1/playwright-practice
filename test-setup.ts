import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  // Block requests to ad URLs
  await page.route(/.*ads.*|.*doubleclick.net.*/, route => route.abort());
});
