import { expect, Locator, Page } from '@playwright/test';

export class CheckoutPageClass {
    private page: Page;
    firstName: Locator;
    lastName: Locator;
    postalCode: Locator;
    continueBtn: Locator;
    finishBtn: Locator;
    successMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.finishBtn = page.locator('[data-test="finish"]');
        this.successMessage = page.locator('.complete-header');
    }

    async fillInfo(first: string, last: string, zip: string) {
        await this.firstName.fill(first);
        await this.lastName.fill(last);
        await this.postalCode.fill(zip);
        await this.continueBtn.click();
    }

    async finishCheckout() {
        await this.finishBtn.click();
    }

    async getSuccessMessage() {
        return await this.successMessage.textContent();
    }

    getPage() {
        return this.page;
    }

    async getProductNames(): Promise<string[]> {
        const productElements = this.page.locator('.inventory_item_name');
        const count = await productElements.count();
        const productNames: string[] = [];

        for (let i = 0; i < count; i++) {
            const name = await productElements.nth(i).textContent();
            if (name) productNames.push(name.trim());
        }

        return productNames;
    }

    async getItemTotal(): Promise<string> {
        const itemTotalElement = this.page.locator('.summary_subtotal_label');
        return await itemTotalElement.textContent() ?? '';
    }
}
