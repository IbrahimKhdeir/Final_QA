import { test, expect } from '@playwright/test';
import { LoginPageClass } from '../pages/LoginPage';
import { InvintoryPageClass } from '../pages/InvintoryPage';
import { CartPageClass } from '../pages/cart.page';
import { CheckoutPageClass } from '../pages/checkOutPage';

let loginPage: LoginPageClass;
let inventoryPage: InvintoryPageClass;
let cartPage: CartPageClass;
let checkoutPage: CheckoutPageClass;

test.describe('Checkout Feature Tests', () => {

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InvintoryPageClass(page);
    await page.goto(`${process.env.BASE_URL}/inventory.html`);

    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();

    cartPage = new CartPageClass(page);
    await cartPage.clickCheckout();

    checkoutPage = new CheckoutPageClass(page);
  });

  test('Proceed with valid checkout info', async () => {
    await checkoutPage.fillInfo('Leena', 'Qassem', '78210');
    await expect(checkoutPage.getPage()).toHaveURL(`${process.env.BASE_URL}/checkout-step-two.html`);
  });

  test('Error when first name is empty', async () => {
    await checkoutPage.fillInfo('', 'Faris', '45678');
    const errorMsg = await checkoutPage.getPage().locator('[data-test="error"]').textContent();
    expect(errorMsg).toContain('Error: First Name is required');
  });

  test('Error when last name is empty', async () => {
    await checkoutPage.fillInfo('Hadeel', '', '45678');
    const errorMsg = await checkoutPage.getPage().locator('[data-test="error"]').textContent();
    expect(errorMsg).toContain('Error: Last Name is required');
  });

  test('Error when postal code is empty', async () => {
    await checkoutPage.fillInfo('Nour', 'Tariq', '');
    const errorMsg = await checkoutPage.getPage().locator('[data-test="error"]').textContent();
    expect(errorMsg).toContain('Error: Postal Code is required');
  });

  test('Overview page displays correct order details', async () => {
    await checkoutPage.fillInfo('Rami', 'Salem', '91022');

    const productNames = await checkoutPage.getProductNames();
    expect(productNames).toContain('Sauce Labs Backpack');

    const itemTotal = await checkoutPage.getItemTotal();
    expect(itemTotal).toContain('Item total: $29.99');

    const tax = await checkoutPage.getPage().locator('.summary_tax_label').textContent();
    const total = await checkoutPage.getPage().locator('.summary_total_label').textContent();

    expect(tax).toMatch(/^Tax: \$\d+\.\d{2}$/);
    expect(total).toMatch(/^Total: \$\d+\.\d{2}$/);
  });

  test('Complete checkout and confirm success message', async () => {
    await checkoutPage.fillInfo('Dina', 'Fadel', '33100');
    await checkoutPage.finishCheckout();

    await expect(checkoutPage.getPage()).toHaveURL(`${process.env.BASE_URL}/checkout-complete.html`);
    const success = await checkoutPage.getSuccessMessage();
    expect(success).toContain('Thank you for your order!');
  });

});
