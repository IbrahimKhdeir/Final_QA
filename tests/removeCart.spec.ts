import { test, expect } from '@playwright/test';
import { InvintoryPageClass } from '../pages/InvintoryPage';
import { CartPageClass } from '../pages/cart.page';

let inventory: InvintoryPageClass;
let cart: CartPageClass;

test.describe("remove cart", () => {
  test.beforeEach(async ({ page }) => {
    inventory = new InvintoryPageClass(page);
    cart = new CartPageClass(page);

    await page.goto(`${process.env.BASE_URL}/inventory.html`);
    await inventory.addItemToCartByName("Sauce Labs Backpack");
    await inventory.goToCart();
  });

  test("Remove item from cart", async () => {
    await cart.removeItemByName("Sauce Labs Backpack");
    const isPresent = await cart.isItemInCart("Sauce Labs Backpack");
    expect(isPresent).toBeFalsy();
  });

});
