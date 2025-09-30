import { Page, Locator } from '@playwright/test';
import { safeClick, safeFill, safeSelect, safeCheck } from '../utils/helpers';
import { testData } from '../data/test-data';

export class RegistrationPage {
  constructor(private page: Page) {
  }

 async goToHomePage() { 
  //navigate to the website
  await this.page.goto('https://automationexercise.com');
 }

  async clickSignupLogin() {
  //click on signup/Login button
  await safeClick(this.page.getByRole('link', { name: 'Signup / Login' }));
}
 /**
  *   @param overrides - Optional fields to override default user data
  */

  async fillRegistrationForm(overrides: Partial<typeof testData> = {}) {
  const user = { ...testData, ...overrides };

  //Enter user's name and email
  await safeFill(this.page.getByRole('textbox', { name: 'Name' }), user.name);
  await safeFill(this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address'), user.email);

  //Click on Signup button
  await safeClick(this.page.getByRole('button', { name: 'Signup' }));

  //Toggle radio button for title
  await safeCheck(this.page.locator(user.genderSelector));

  //Enter password
  await safeFill(this.page.getByRole('textbox', { name: 'Password' }), user.password);

  //Enter date of birth
  await safeSelect(this.page.locator('#days'), user.day);
  await safeSelect(this.page.locator('#months'), user.month);
  await safeSelect(this.page.locator('#years'), user.year);

  //Check the newsletter and special offers checkboxs
  await safeCheck(this.page.getByLabel('Sign up for our newsletter!'));
  await safeCheck(this.page.getByLabel('Receive special offers from our partners!'));

  //Enter user's name
  await safeFill(this.page.getByRole('textbox', { name: 'First name' }), user.firstName);
  await safeFill(this.page.getByRole('textbox', { name: 'Last name' }), user.lastName);

  //Enter company name
  await safeFill(this.page.locator('[data-qa="company"]'), user.company);

  //Enter address and contact details
  await safeFill(this.page.getByRole('textbox', {  name: 'Address * (Street address, P.O. Box, Company name, etc.)' }), user.address);
  await this.page.getByLabel('Country').selectOption(user.country);
  await safeFill(this.page.getByRole('textbox', { name: /State/i }), user.state);
  await safeFill(this.page.getByRole('textbox', { name: /City/i }), user.city);
  await safeFill(this.page.locator('[data-qa="zipcode"]'), user.zipcode);
  await safeFill(this.page.locator('[data-qa="mobile_number"]'), user.mobileNumber);
}
}