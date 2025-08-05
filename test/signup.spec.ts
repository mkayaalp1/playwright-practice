import { test} from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.ts';
import { testData } from '../data/testData';

test('Account creation and deletion', async ({ page }) => {

  //use registration page
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goToHomePage();
  await registrationPage.clickSignupLogin();
  await registrationPage.fillRegistrationForm(testData);

  //Click on Create Account button
  await page.getByRole('button', { name: 'Create Account' }).click();
  await page.getByText('Account Created!').click();
  await page.screenshot({ path: 'test screenshots/accountCreated.png' });

  //Continue and delete account
  await page.getByRole('link', { name: 'Continue' }).click();
  await page.getByRole('link', { name: ' Delete Account' }).click();
  await page.getByText('Account Deleted!').click();
  await page.screenshot({ path: 'test screenshots/accountDeleted.png' });
});