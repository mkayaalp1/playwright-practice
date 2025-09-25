import { test, expect} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';
import path from 'path';

test('A user can successfully place an order', async ({ page }) => {

  // Load the generated user information
  const filePath = path.join(__dirname, '../tmp/user.json');
  const user = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Generate random card data
  const randomCardNumber = `4${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`;
  const randomCVC = `${Math.floor(100 + Math.random() * 900)}`;
  const randomExpMonth = `${Math.floor(1 + Math.random() * 12)}`.padStart(2, '0');
  const randomExpYear = `${Math.floor(2025 + Math.random() * 6)}`;

  // Use login page
  const loginPage = new LoginPage(page);
  await loginPage.goToHomePage();
  await loginPage.clickSignupLogin();
  
  // Add products to cart
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.getByRole('link', { name: 'here' }).click();

  // Add item from children's section
  await page.getByRole('link', { name: ' Kids' }).click();
  await page.getByRole('link', { name: 'Tops & Shirts' }).click();
  await page.locator('div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a').click();
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // Add multiple of an item from a specific brand
  await page.getByRole('link', { name: 'H&M' }).click();
  await page.locator('div:nth-child(4) > .product-image-wrapper > .choose > .nav > li > a').click();
  const quantityInput = page.locator('#quantity');
  await quantityInput.waitFor({ state: 'visible' });
  await quantityInput.click();
  await quantityInput.press('Control+A');
  await quantityInput.press('Backspace');
  await quantityInput.fill('2');
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();
  await page.getByText('Place Order').click();

  // Enter payment details and confirm order
  await page.locator('input[name="name_on_card"]').click();
  await page.locator('input[name="name_on_card"]').fill(user.name);
  await page.locator('input[name="card_number"]').click();
  await page.locator('input[name="card_number"]').fill(randomCardNumber);
  await page.locator('input[name="cvc"]').click();
  await page.locator('input[name="cvc"]').fill(randomCVC);
  await page.locator('input[name="expiry_month"]').click();
  await page.locator('input[name="expiry_month"]').fill(randomExpMonth);
  await page.locator('input[name="expiry_year"]').click();
  await page.locator('input[name="expiry_year"]').fill(randomExpYear);
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  // Verify order confirmation
  const orderPlaced = page.getByText('Order Placed!');
  await expect(orderPlaced).toHaveText('Order Placed!');
  await page.screenshot({ path: 'test screenshots/order-placed.png' });

});