import { Page, Locator } from "@playwright/test";

export class CartPageClass{
    private page : Page;
    cartItems : Locator;
    removeBtn : Locator;
    price : Locator;
    checkoutBtn:Locator;
    backBtn:Locator;

    constructor(page:Page){
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.removeBtn = page.locator('.cart_button');
        this.price = page.locator('.inventory_item_price');
        this.checkoutBtn = page.locator('[data-test="checkout"]');
        this.backBtn = page.locator('[data-test="continue-shopping"]');
    }

    async clickCheckout(){
        await this.checkoutBtn.click();
    }

    async clickContinueShopping(){
        await this.backBtn.click();
    }

    async removeItemByName(productName: string) {
        const removeButton = this.page.locator(`.cart_item:has-text("${productName}") >> .cart_button`);
        await removeButton.click();
    }

    async isItemInCart(productName : string){
        const item = this.page.locator(`.cart_item:has-text("${productName}")`);
        return await item.isVisible();

    }

    async getCartItemsCount(){
    return await this.cartItems.count();
    }
    

}


