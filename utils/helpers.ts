import { Locator, expect } from '@playwright/test';

/**
 * Safely clicks an element by ensuring it's visible and enabled first.
 * @param locator The Playwright Locator to click
 * @param timeout Optional timeout in ms (default: 15000)
 */

export async function safeClick(locator: Locator, timeout = 15000) {
  await locator.scrollIntoViewIfNeeded();             // Make sure it's in view
  await expect(locator).toBeVisible({ timeout });     // Confirm it's visible
  await expect(locator).toBeEnabled({ timeout });     // Confirm it's enabled
  await locator.click();                              // Click it
}

/**
 * Safely fills an input field by ensuring it's visible and enabled first.
 * @param locator The Playwright Locator to fill
 * @param value The string value to fill into the input
 * @param timeout Optional timeout in ms (default: 15000)
 */

export async function safeFill(locator: Locator, value: string, timeout = 15000) {
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeVisible({ timeout });
  await expect(locator).toBeEnabled({ timeout });
  await locator.fill(value);
}

/**
 * Safely selects an option from a <select> element.
 * @param locator The Playwright Locator for the <select>
 * @param value The value to select
 * @param timeout Optional timeout in ms (default: 15000)
 */

export async function safeSelect(locator: Locator, value: string, timeout = 15000) {
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeVisible({ timeout });
  await expect(locator).toBeEnabled({ timeout });
  await locator.selectOption(value);
}

/**
 * Safely checks a checkbox or radio button.
 * @param locator The Playwright Locator for the checkbox/radio
 * @param timeout Optional timeout in ms (default: 15000)
 */

export async function safeCheck(locator: Locator, timeout = 15000) {
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeVisible({ timeout });
  await expect(locator).toBeEnabled({ timeout });
  await locator.check();
}