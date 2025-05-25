import { test as baseTest, expect } from '@playwright/test';
import { LoginPageClass } from '../pages/LoginPage';

const test = baseTest.extend({
  storageState: undefined
});

let loginPage: LoginPageClass;

test.describe('Login Functionality Tests', () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPageClass(page);
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(`${process.env.BASE_URL}/inventory.html`);
  });

  const invalidLogins = [
    {
      title: 'should display error when both fields are empty',
      username: '',
      password: '',
      expectedError: 'Epic sadface: Username is required',
    },
    {
      title: 'should show error if username is missing',
      username: '',
      password: 'secret_sauce',
      expectedError: 'Epic sadface: Username is required',
    },
    {
      title: 'should show error if password is missing',
      username: 'standard_user',
      password: '',
      expectedError: 'Epic sadface: Password is required',
    },
    {
      title: 'should not allow login with incorrect password',
      username: 'standard_user',
      password: 'wrongpass',
      expectedError: 'Epic sadface: Username and password do not match any user in this service',
    },
    {
      title: 'should show error for locked out user',
      username: 'locked_out_user',
      password: 'secret_sauce',
      expectedError: 'Epic sadface: Sorry, this user has been locked out.',
    },
    {
      title: 'should not allow login with incorrect username',
      username: 'wrong_user',
      password: 'secret_sauce',
      expectedError: 'Epic sadface: Username and password do not match any user',
    },
  ];

  for (const { title, username, password, expectedError } of invalidLogins) {
    test(title, async () => {
      await loginPage.login(username, password);
      await expect(loginPage.errorMessage).toBeVisible();
      await expect(loginPage.errorMessage).toContainText(expectedError);
    });
  }

});
