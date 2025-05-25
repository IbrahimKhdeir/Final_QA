import { Page ,Locator} from "@playwright/test";

export class LoginPageClass{
    private Page: Page;
    name : Locator;
    pass : Locator;
    errorMessage : Locator;
    loginbtn : Locator;

    constructor(page: Page){
       this.Page = page;
       this.name=this.page.locator('[data-test="username"]')
       this.pass=this.page.locator('[data-test="password"]')
       this.loginbtn = this.page.locator('[data-test="login-button"]');
       this.errorMessage = this.page.locator('[data-test="error"]');
    }
    async goto(){
         await this.Page.goto(`${process.env.BASE_URL}`);
    }
    get page(){
        return this.Page;
    }
    async login(name:string,pass:string){
    await this.name.fill(name);
    await this.pass.fill(pass);
    await this.loginbtn.click();
    }

}