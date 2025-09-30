import '../test-setup';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import fs from 'fs';
import path from 'path';

// Load the generated user credentials
const filePath = path.join(__dirname, '../tmp/user.json');
const user = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

// Generate random card data
const randomCardNumber = `4${Math.floor(1000000000000000 + Math.random() * 9000000000000000)}`;
const randomCVC = `${Math.floor(100 + Math.random() * 900)}`;
const randomExpMonth = `${Math.floor(1 + Math.random() * 12)}`.padStart(2, '0');
const randomExpYear = `${Math.floor(2025 + Math.random() * 6)}`;

/**
 * @test A user can successfully place an order by
 * navigating through the site, adding items to the cart,
 * and completing the checkout process with payment details.
 */

test('A user can successfully place an order', async ({ page }) => {

  // Mini helper to select a product by its index on the page
  const selectProduct = (index: number) => 
    page.locator(`div:nth-child(${index}) > .product-image-wrapper > .choose > .nav > li > a`);

  // Initiate login page object
  const loginPage = new LoginPage(page);

  // Navigate to home page
  await loginPage.goToHomePage();

  // Perform login with stored credentials
  await loginPage.login();
  
  // Navigate to products
  await page.getByRole('link', { name: 'Products' }).click();

  // Navigate to kid's section and select a category
  await page.getByRole('link', { name: ' Kids' }).click();
  await page.getByRole('link', { name: 'Tops & Shirts' }).click();

  // Select item and add it to cart
  await selectProduct(4).click();
  await page.getByRole('button', { name: ' Add to cart' }).click();
  await page.getByRole('button', { name: 'Continue Shopping' }).click();

  // Navigate to a specific brand
  await page.getByRole('link', { name: 'H&M' }).click();

  // Select another item, adjust quantity, and add to cart
  await selectProduct(4).click();
  const quantityInput = page.locator('#quantity');
  await quantityInput.fill('2');
  await page.getByRole('button', { name: ' Add to cart' }).click();

  // Review cart and proceed to checkout
  await page.getByRole('link', { name: 'View Cart' }).click();
  await page.getByText('Proceed To Checkout').click();

  // Verify place order button is visible and click it
  const placeOrderButton = page.getByText('Place Order');
  await placeOrderButton.waitFor({ state: 'visible' });
  await placeOrderButton.scrollIntoViewIfNeeded();
  await placeOrderButton.click();

  // Enter payment details and confirm order
  await page.locator('input[name="name_on_card"]').fill(user.name);
  await page.locator('input[name="card_number"]').fill(randomCardNumber);
  await page.locator('input[name="cvc"]').fill(randomCVC);
  await page.locator('input[name="expiry_month"]').fill(randomExpMonth);
  await page.locator('input[name="expiry_year"]').fill(randomExpYear);
  await page.getByRole('button', { name: 'Pay and Confirm Order' }).click();

  // Assertion: Verify order was placed successfully
  await expect(page.getByText('Order Placed!')).toBeVisible();

  // Take a screenshot after verifying successful order placement
  await page.screenshot({ path: 'test-screenshots/order-placed.png' });

});