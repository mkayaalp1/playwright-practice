import {Page} from '@playwright/test'
import fs from 'fs';
import path from 'path';

//Load the generated user credentials
const filePath = path.join(__dirname, '../tmp/user.json');
const userData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
const { email, password } = userData;

export class LoginPage {
constructor(private page: Page) {
}

async goToHomePage() { 
//navigate to the website
await this.page.goto('https://automationexercise.com');
 }

/**
 *   @param overrides - Optional fields to override default user credentials
 */

async login(overrides: Partial<{ email?: string; password?: string }> = {}) {
const credentials = {
  email: overrides.email ?? email, // Use overridden email or default if override isnt provided
  password: overrides.password ?? password,
};

//click on signup/Login button
await this.page.getByRole('link', { name: 'Signup / Login' }).click();
await this.page.locator('.login-form input[data-qa="login-email"]').fill(credentials.email);
await this.page.locator('.login-form input[data-qa="login-password"]').fill(credentials.password);
await this.page.locator('.login-form button[data-qa="login-button"]').click();
}
}