import { test, expect } from '@playwright/test';
import { LoginPageClass } from '../pages/LoginPage';
import { InvintoryPageClass } from '../pages/InvintoryPage';

let loginPage: LoginPageClass;
let inventoryPage: InvintoryPageClass;

test.describe('Cart Functionality Tests', () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPageClass(page);
    inventoryPage = new InvintoryPageClass(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('Add a single product to the cart', async () => {
    await inventoryPage.addItemToCart();
    const cartCount = await inventoryPage.getCartCount();

    expect(cartCount).toBe('1');

    await inventoryPage.getPage().waitForTimeout(1000); 
  });

  test('Check if specific item is present after adding', async () => {
    await inventoryPage.addItemToCart();
    await inventoryPage.goToCart();

    const productNames = await inventoryPage.fetchItemNames();
    expect(productNames).toContain('Sauce Labs Backpack');
  });

  test('Add multiple distinct items to the cart', async () => {
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');
    await inventoryPage.addItemToCartByName('Sauce Labs Bolt T-Shirt');
    await inventoryPage.addItemToCartByName('Sauce Labs Fleece Jacket');

    const cartCount = await inventoryPage.getCartCount();
    expect(cartCount).toBe('4');
  });

  test('Verify presence of multiple products in cart', async () => {
    await inventoryPage.addItemToCartByName('Sauce Labs Backpack');
    await inventoryPage.addItemToCartByName('Sauce Labs Bike Light');

    await inventoryPage.goToCart();
    const cartItems = await inventoryPage.fetchItemNames();

    expect(cartItems).toEqual(
      expect.arrayContaining([
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light'
      ])
    );
  });

});
