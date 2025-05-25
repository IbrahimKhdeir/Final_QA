import { Page ,Locator} from "@playwright/test";

export class InvintoryPageClass{
    private MyPage: Page;
    addToCartButton : Locator;
    cartBadge : Locator;
    itemNames : Locator;
    itemPrice : Locator;
    cartLink : Locator;
    sortDropdown : Locator;

    constructor(page: Page){
       this.MyPage = page;
       this.addToCartButton = this.MyPage.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
       this.cartBadge = this.MyPage.locator('.shopping_cart_badge');
       this.itemNames = this.MyPage.locator('.inventory_item_name');
       this.itemPrice = this.MyPage.locator('.inventory_item_price');
       this.cartLink = this.MyPage.locator('[data-test="shopping-cart-link"]');
       this.sortDropdown = this.MyPage.locator('[data-test="product-sort-container"]');
    }

    async addItemToCart(){
        await this.addToCartButton.click();
    }

    async addItemToCartByName(productName: string) {
        const productLocator = this.MyPage.locator(`.inventory_item:has-text("${productName}") >> [data-test^="add-to-cart"]`);
        await productLocator.click();
    }

    async getCartCount(){
       return await this.cartBadge.innerText();
    }

    async goToCart(){
        await this.cartLink.click();
    }

    async fetchItemNames() {
        return await this.itemNames.allTextContents();
    }

    getPage(){
        return this.MyPage;
    }

    async fetchItemPrices(){
    const priceTexts = await this.itemPrice.allTextContents();
    return priceTexts.map(price => parseFloat(price.replace('$', '')));    }

    async chooseSortOption(option: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(option);
    }

}
