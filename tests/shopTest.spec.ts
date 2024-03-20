import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

  });

  test('AddToCart', async ({ page }) => {

    //Prepare all the locators we need
    const pageHeader = page.locator('#header_container');
    const itemAddButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    const cartItems = pageHeader.locator('#shopping_cart_container a');
    const itemRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');

    //Verify that cart icon doesn't show any products in it
    await expect(cartItems).toBeEmpty();
    
    //Check if Add to Cart behaves properly
    await expect(itemAddButton).toHaveText('Add to cart');
    await itemAddButton.click();
    await expect(itemRemoveButton).toHaveText('Remove');
    expect(await cartItems.innerText()).toBe('1');

    //Check if remove from cart behaves properly
    await itemRemoveButton.click();
    await expect(itemAddButton).toHaveText('Add to cart');
    await expect(cartItems).toBeEmpty();

});

test('CheckItemContents', async ({ page }) => {
  
    //Prepare all the locators we need TODO: Add this to page module
    const productSortElement = page.locator('[data-test="product_sort_container"]');
    const itemContainer = page.locator('.inventory_item').first();
    const productName = itemContainer.locator('.inventory_item_name');
    const productDescription = itemContainer.locator('.inventory_item_desc');
    const productPrice = itemContainer.locator('.inventory_item_price');
    const productImage = itemContainer.getByRole('img');

    //Double-check the setup is correct
    await productSortElement.selectOption({value: 'az'});
    await expect.soft(productImage).toHaveAttribute('src' && 'alt');
 
    //TODO: Adding json with dynamic content, checking the inventory item name and matching it in DB might be more suitable for this test to avoid hardcoding

    //Verify all contents of the product are filled correctly TODO: JSON to remove hardcoding
    await expect.soft(productName).toHaveText('Sauce Labs Backpack');
    await expect.soft(productDescription).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    await expect.soft(productPrice).toHaveText('$29.99')
    expect.soft(await productImage.getAttribute('alt')).toBe('Sauce Labs Backpack');
    expect(await productImage.getAttribute('src')).toBe('/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');


});

test('SortItems', async ({ page }) => {

    //Prepare all locators
    const productSortElement = page.locator('[data-test="product_sort_container"]');
    //Locate the first product in the list, because dynamic content expected
    const firstItemContainer = page.locator('.inventory_item').first();
    //const lastItemContainer = page.locator('.inventory_list > div:nth-child(6)')
    const firstItemName = firstItemContainer.locator('.inventory_item_name');
    
    //TODO: This can be simplified and generalized with for loop and data driven json
    //Testing the first item should be enough, as testing all would just do the same operations as the site is doing, might be a nice check, but low prio
    
    //Check the expected product is first with Z to A name sorting
    await productSortElement.selectOption({value: 'za'});
    await expect(firstItemName).toHaveText('Test.allTheThings() T-Shirt (Red)');

    //Check the expected product is first with low to high sorting
    await productSortElement.selectOption({value: 'lohi'});
    await expect(firstItemName).toHaveText('Sauce Labs Onesie');

    //Check the expected product is first with high to low price sorting
    await productSortElement.selectOption({value: 'hilo'});
    await expect(firstItemName).toHaveText('Sauce Labs Fleece Jacket');

    //Check the expected product is first with A to Z name sorting
    await productSortElement.selectOption({value: 'az'});
    await expect(firstItemName).toHaveText('Sauce Labs Backpack');

});

test('CheckDetails', async ({ page }) => {

    //First get to details page (page.goto('https://www.saucedemo.com/inventory-item.html?id=4') might work too :think:)
    await page.getByAltText('Sauce Labs Backpack').click();

    //Check of unique element to verify success (Might use WaitForURL instead?)
    const backButton = page.getByText('Back to Products');
    await expect(backButton).toBeVisible();
    
    //Setup all constants needed for the test. TODO: detailsPage module
    const cartItems = page.locator('#shopping_cart_container a');
    const itemContainer = page.locator('.inventory_details_container');
    const productName = itemContainer.locator('.inventory_details_name');
    const productDescription = itemContainer.locator('.inventory_details_desc');
    const productPrice = itemContainer.locator('.inventory_details_price');
    const productImage = itemContainer.getByRole('img');
    const itemCartButton = itemContainer.getByRole('button');
    
    //error check
    await expect.soft(productImage).toHaveAttribute('src' && 'alt');

    //Check that all contents are filled properly
    //TODO: Remove Hardcoding
    await expect.soft(productName).toHaveText('Sauce Labs Backpack');
    await expect.soft(productDescription).toHaveText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
    await expect.soft(productPrice).toHaveText('$29.99')
    expect.soft(await productImage.getAttribute('alt')).toBe('Sauce Labs Backpack');
    expect.soft(await productImage.getAttribute('src')).toBe('/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');

    //Check if Add to cart button works properly
    //TODO: Now I am redoing a case from different test, just on different page, module, please
    await expect.soft(itemCartButton).toHaveText('Add to cart');
    await itemCartButton.click()
    await expect(itemCartButton).toHaveText('Remove');
    await itemCartButton.click()
    await expect.soft(itemCartButton).toHaveText('Add to cart');
    
    //Let's check if our item remains added after return
    await itemCartButton.click()

    //Verify the back button works
    await backButton.click();
    await page.waitForURL('https://www.saucedemo.com/inventory.html');
    //Check if the product is still in cart
    expect(await cartItems.innerText()).toBe('1');

}); 
