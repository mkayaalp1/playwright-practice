import { test} from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';
import { testData } from '../data/test-data';
import fs from 'fs';
import path from 'path'; 

const filePath = path.resolve(__dirname, '../tmp/user.json');

test('A user can successfully complete a signup', async ({ page }) => {

  // Use registration page
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goToHomePage();
  await registrationPage.clickSignupLogin();
  await registrationPage.fillRegistrationForm(testData);

  // Click on Create Account button
  await page.getByRole('button', { name: 'Create Account' }).click();
  
  await page.getByText('Account Created!').click();
  await page.screenshot({ path: 'test screenshots/signup-successful.png' });

  // Save generated user
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(testData, null, 2));

},
);