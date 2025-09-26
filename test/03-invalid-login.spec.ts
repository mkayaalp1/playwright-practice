import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';
import path from 'path';

// Load the generated user credentials
const filePath = path.join(__dirname, '../tmp/user.json');
const user = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

/**
 * @test A user fails to log into their account.
 * This test verifies that an error is thrown if the user 
 * attempts to log in with invalid credentials.
 */

test('A user fails to log into their account', async ({ page }) => {

  // Initiate the login page object
  const loginPage = new LoginPage(page);

  // Navigate to home page
  await loginPage.goToHomePage();

  // Attempt login with stored email and invalid password
  await loginPage.login({email: user.email, password: 'wrongpassword'}); // Intentionally using wrong password

  // Assertion: Verify that an error message is displayed for invalid login
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

  // Take a screenshot after verifying failed login
  await page.screenshot({ path: 'test-screenshots/invalid-login.png' });

});