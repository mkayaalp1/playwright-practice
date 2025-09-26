import { test, expect } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { testData } from '../data/test-data';
import fs from 'fs';
import path from 'path'; 

const filePath = path.resolve(__dirname, '../tmp/user.json');

/**
 * @test A user can successfully complete the signup process.
 * This test validates that a new account can be created end-to-end
 * using randomly generated user data, and verifies success before saving it.
 */

test('A user can successfully complete a signup', async ({ page }) => {

  // Initiate the registration page object
  const registrationPage = new RegistrationPage(page);

  // Navigate to home page and click Signup/Login
  await registrationPage.goToHomePage();
  await registrationPage.clickSignupLogin();

  // Fill out the registration form with random test data
  await registrationPage.fillRegistrationForm(testData);

  // Submit the signup form
  await page.getByRole('button', { name: 'Create Account' }).click();

  // Assertion: Verify account creation success
  await expect(page.getByText('Account Created!')).toBeVisible();

  // Take a screenshot after verifying successful signup
  await page.screenshot({ path: 'test-screenshots/signup-successful.png' });

  // Save generated user data to a JSON file for future tests
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(testData, null, 2));

},
);