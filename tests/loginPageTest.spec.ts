import { test, expect } from '@playwright/test';

//reset storage state to get rid of authenticated state
test.use({ storageState: { cookies: [], origins: [] } });

test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

});


test('CheckLabel', async ({ page }) => {

    await expect(page).toHaveTitle(/Swag Labs/);

});

test('EnterUsername', async({ page }) => {
    
    //Setup locators TODO: loginPage module
    const loginContainer = page.locator('#login_button_container');
    const usernameInput = loginContainer.getByPlaceholder('Username');
    const errorElement = page.locator('[data-test="error"]');

    //Check if the error dialog is hidden by default
    await expect(errorElement).toBeHidden();

    //Enter user name only and confirm
    await usernameInput.fill('standard_user');
    await page.locator('[data-test="login-button"]').click();

    //Verify the proper error message is shown
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toHaveText('Epic sadface: Password is required');
    
    //Error message can be closed
    await errorElement.getByRole('button').click();
    await expect(errorElement).toBeHidden();

});

test('EnterWrongPassword', async ({ page }) => {

    //Setup locators TODO: loginPage module
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const errorElement = page.locator('[data-test="error"]');

    //Enter wrong credentials and confirm //TODO: Remove hardcoded credentials
    await usernameInput.fill('standard_user');
    await passwordInput.fill('test');
    await page.locator('[data-test="login-button"]').click();

    //Check that the correct error is shown
    await expect(errorElement).toBeVisible();
    await expect(errorElement).toHaveText('Epic sadface: Username and password do not match any user in this service');

     //Error message can be closed
    await errorElement.getByRole('button').click();
    await expect(errorElement).toBeHidden();
});

test('LoginSuccessfully', async ({ page }) => {

    //get Username and password fields
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');

    //Enter Username and Password and confirm
    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    //Verify a unique element loaded afrer login
    const pageHeader = page.locator('#header_container');
    const titleText = pageHeader.getByText('Products');
    await expect(titleText).toBeVisible();

});