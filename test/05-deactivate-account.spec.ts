import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

/**
 * @test A user can successfully deactivate their account.
 * This test verifies that a logged-in user can delete their account
 * and confirms that the account deletion was successful.
 */

test('A user can successfully delete their account', async ({ page }) => {

  // Initiate the login page object
  const loginPage = new LoginPage(page);

  // Navigate to home page
  await loginPage.goToHomePage();

  // Perform login with stored credentials
  await loginPage.login();

  // Continue to delete account
  await page.getByRole('link', { name: 'Delete Account' }).click();

  // Assertion: Verify account deletion success
  await expect(page.getByText('Account Deleted!')).toBeVisible();

  // Take a screenshot after verifying successfully deactivating account
  await page.screenshot({ path: 'test-screenshots/account-deactivated.png' });

});