import { test, expect } from '@playwright/test';
import { InvintoryPageClass } from '../pages/InvintoryPage';

let inventoryPage: InvintoryPageClass;

test.describe('Inventory - Sorting Features', () => {

  test.beforeEach(async ({ page }) => {
    inventoryPage = new InvintoryPageClass(page);
    await page.goto(`${process.env.BASE_URL}/inventory.html`);
  });

  test('Should sort items alphabetically (A to Z)', async () => {
    await inventoryPage.chooseSortOption('az');
    const productNames = await inventoryPage.fetchItemNames();
    const expectedOrder = [...productNames].sort();
    expect(productNames).toEqual(expectedOrder);
  });

  test('Should sort items by price from high to low', async () => {
    await inventoryPage.chooseSortOption('hilo');
    const itemPrices = await inventoryPage.fetchItemPrices();
    const expectedPrices = [...itemPrices].sort((a, b) => b - a);
    expect(itemPrices).toEqual(expectedPrices);
  });

});
