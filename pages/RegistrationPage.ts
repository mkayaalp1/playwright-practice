import {Page} from '@playwright/test'

export class RegistrationPage {
  constructor(private page: Page) {
    this.page = page;
  }

 async goToHomePage() { 
//navigate to the website
await this.page.goto('https://automationexercise.com');
 }

async clickSignupLogin() {
//click on signup/Login button
await this.page.getByRole('link', { name: ' Signup / Login' }).click();
}

async fillRegistrationForm(user: any) {
//Enter user's name and email
  await this.page.getByRole('textbox', { name: 'Name' }).click();
  await this.page.getByRole('textbox', { name: 'Name' }).fill(user.name);
  await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').click();
  await this.page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(user.email);

  //Click on Signup button
  await this.page.getByRole('button', { name: 'Signup' }).click();

  //Toggle radio button for title
  await this.page.getByRole('radio', { name: 'Mr.' }).check();

  //Enter password
  await this.page.getByRole('textbox', { name: 'Password *' }).click();
  await this.page.getByRole('textbox', { name: 'Password *' }).fill(user.password);

  //Enter date of birth
  await this.page.locator('#days').selectOption(user.day);
  await this.page.locator('#months').selectOption(user.month);
  await this.page.locator('#years').selectOption(user.year);
  await this.page.screenshot({ path: 'test screenshots/userDOB.png' });

  //Check the newsletter checkbox
  await this.page.getByRole('checkbox', { name: 'Sign up for our newsletter!' }).check();

  //Enter user's name
  await this.page.getByRole('textbox', { name: 'First name *' }).click();
  await this.page.getByRole('textbox', { name: 'First name *' }).fill(user.firstName);
  await this.page.getByRole('textbox', { name: 'Last name *' }).click();
  await this.page.getByRole('textbox', { name: 'Last name *' }).fill(user.lastName);

  //Enter company name
  await this.page.getByRole('textbox', { name: 'Company', exact: true }).click();
  await this.page.getByRole('textbox', { name: 'Company', exact: true }).fill(user.company);

  //Enter address and contact details
  await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).click();
  await this.page.getByRole('textbox', { name: 'Address * (Street address, P.' }).fill(user.address);
  await this.page.getByLabel('Country *').selectOption(user.country);
  await this.page.getByRole('textbox', { name: 'State' }).click();
  await this.page.getByRole('textbox', { name: 'State' }).fill(user.state);
  await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).click();
  await this.page.getByRole('textbox', { name: 'City * Zipcode *' }).fill(user.city);
  await this.page.locator('#zipcode').click();
  await this.page.locator('#zipcode').fill(user.zipcode);
  await this.page.getByRole('textbox', { name: 'Mobile Number' }).click();
  await this.page.getByRole('textbox', { name: 'Mobile Number' }).fill(user.mobileNumber);
}
}