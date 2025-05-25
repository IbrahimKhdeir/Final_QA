import { test as setup, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import path from 'path';
import { LoginPageClass } from '../pages/loginPage';
dotenv.config();

let login : LoginPageClass;


const session = path.join(__dirname, '../data/.auth/user.json');

setup('Authenticateion', async ({ page }) => {
  login = new LoginPageClass(page);
  await login.goto();
  await login.login(`${process.env.USER_NAME}`, `${process.env.PASSWORD}`);
  await expect(page).toHaveURL(`${process.env.BASE_URL}/inventory.html`);


  await page.context().storageState({ path: session });
});
