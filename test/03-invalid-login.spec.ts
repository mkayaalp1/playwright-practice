import { test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';
import path from 'path';

test('A user fails to log into their account', async ({ page }) => {

  // Load the generated user credentials
  const filePath = path.join(__dirname, '../tmp/user.json');
  const userData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const { email, password } = userData;

  // Use login page
  const loginPage = new LoginPage(page);
  await loginPage.goToHomePage();

  // Click on signup/Login button
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await page.locator('.login-form input[data-qa="login-email"]').fill(email);
  await page.locator('.login-form input[data-qa="login-password"]').fill('invalidpassword');
  await page.locator('.login-form button[data-qa="login-button"]').click();

  // Screenshot after failed login
  await page.screenshot({ path: 'test screenshots/invalid-login.png' });

});