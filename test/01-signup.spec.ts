import { test} from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage.ts';
import { testData } from '../data/testData.ts';
import fs from 'fs';
import path from 'path'; 

const filePath = path.resolve(__dirname, '../tmp/user.json');

test('Account creation', async ({ page }) => {

  //use registration page
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goToHomePage();
  await registrationPage.clickSignupLogin();
  await registrationPage.fillRegistrationForm(testData);

  //Click on Create Account button
  await page.getByRole('button', { name: 'Create Account' }).click();
  
  await page.getByText('Account Created!').click();
  await page.screenshot({ path: 'test screenshots/accountCreated.png' });

  // Save generated user
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(testData, null, 2));
},
);