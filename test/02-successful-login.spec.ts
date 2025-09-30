import '../test-setup';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';
import path from 'path';

// Load the generated user credentials
const filePath = path.join(__dirname, '../tmp/user.json');
const user = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

/**
 * @test A user can successfully log into their account.
 * This test verifies that a user can log in using previously
 * generated credentials and confirms successful login.
 */

test('A user can successfully log into their account', async ({ page }) => {

  // Initiate the login page object
  const loginPage = new LoginPage(page);

  // Navigate to home page
  await loginPage.goToHomePage();

  // Perform login with stored credentials
  await loginPage.login();

  // Assertion: Verify that user is logged in successfully
  await expect(page.getByText(`Logged in as ${user.name}`)).toBeVisible({ timeout: 10000 });

  // Take a screenshot after verifying successful login
  await page.screenshot({ path: 'test-screenshots/successful-login.png' });

});