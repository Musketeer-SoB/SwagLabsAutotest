import {test as setup, expect } from '@playwright/test'

const authFile = 'playwright/.auth/user.json'

setup('Authenticate', async ({ page }) => {

    //Perform the authentication process
    await page.goto('https://www.saucedemo.com/');
    
    //Enter Username and Password and confirm
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    //Verify we reached our desired state
    await page.waitForURL('https://www.saucedemo.com/inventory.html')

    //Save auth state to authFile
    await page.context().storageState({ path: authFile });
});