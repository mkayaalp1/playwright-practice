import {Page} from '@playwright/test'
import fs from 'fs';
import path from 'path';

//Load the generated user credentials
const filePath = path.join(__dirname, '../tmp/user.json');
const userData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const { email, password } = userData;

export class LoginPage {
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
await this.page.locator('.login-form input[data-qa="login-email"]').fill(email);
await this.page.locator('.login-form input[data-qa="login-password"]').fill(password);
await this.page.locator('.login-form button[data-qa="login-button"]').click();
}
}