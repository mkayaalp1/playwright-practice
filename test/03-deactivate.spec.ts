import { test} from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Account deletion', async ({ page }) => {

  //Load the generated user credentials
  const filePath = path.join(__dirname, '../tmp/user.json');
  const userData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const { email, password } = userData;

  //Login
  await page.goto('https://automationexercise.com'); 
  await page.getByRole('link', { name: ' Signup / Login' }).click();
  await page.locator('.login-form input[data-qa="login-email"]').fill(email);
  await page.locator('.login-form input[data-qa="login-password"]').fill(password);
  await page.locator('.login-form button[data-qa="login-button"]').click();
  

  //Continue and delete account
  await page.getByRole('link', { name: ' Delete Account' }).click();
  await page.getByText('Account Deleted!').click();
  await page.screenshot({ path: 'test screenshots/accountDeleted.png' });
});