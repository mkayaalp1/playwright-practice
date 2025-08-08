import { test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';
import path from 'path';

test('Account deletion', async ({ page }) => {

  //use registration page
  const loginPage = new LoginPage(page);
  await loginPage.goToHomePage();
  await loginPage.clickSignupLogin();

  //Continue and delete account
  await page.getByRole('link', { name: ' Delete Account' }).click();
  await page.getByText('Account Deleted!').click();
  await page.screenshot({ path: 'test screenshots/accountDeleted.png' });
});