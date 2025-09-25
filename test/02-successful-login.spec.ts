import { test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';
import path from 'path';

test('A user can successfully log into their account', async ({ page }) => {

  // Use login page
  const loginPage = new LoginPage(page);
  await loginPage.goToHomePage();
  await loginPage.clickSignupLogin();

  // Screenshot after login
  await page.screenshot({ path: 'test screenshots/successful-login.png' });

});