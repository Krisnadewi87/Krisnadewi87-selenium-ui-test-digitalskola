const { Builder, By, until } = require("selenium-webdriver");
const assert = require('assert');

async function sauceDemoTest() {
   // Set up the WebDriver
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Open the Saucedemo login page
    await driver.get("https://www.saucedemo.com/");

    // Login to the application
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    // Verify the dashboard logo is displayed
    const titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
    assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");
    console.log(titleText);

    // Verify "Burger" button is visible
    const menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
    assert.strictEqual(await menuButton.isDisplayed(), true, "Menu button is not displayed");

    // Verify the cart icon on the dashboard is displayed
    const cartIcon = await driver.findElement(By.className("shopping_cart_link"));
    assert.strictEqual(await cartIcon.isDisplayed(), true, "Cart icon is not displayed");

    // Verify product lists are displayed
    const productList = await driver.findElements(By.className("inventory_item"));
    if (productList.length > 0) {
        console.log('Product list is displayed - Dashboard loaded successfully.');
      } else {
        console.error('Product list not displayed - Issue with the dashboard.');
      }


    // Verify able to click Add to cart button on an item
    const addToCartButton = await driver.findElement(By.id("add-to-cart-sauce-labs-backpack"));
    await addToCartButton.click();


    // Verify able to add item to the cart and the cart count is updated
    const cartBadge = await driver.findElement(By.className('shopping_cart_badge'));
    await driver.wait(until.elementTextIs(cartBadge, '1'));


    // Verify Add to cart title changed to Remove
    const removeButton = await driver.findElement(By.id("remove-sauce-labs-backpack"));
    assert.strictEqual(await removeButton.isDisplayed(), true, "Remove is not displayed");


    // Verify Item on the cart
    await cartIcon.click();
    const addedItem = await driver.findElement(By.className("inventory_item_name"));
    assert.strictEqual(await addedItem.isDisplayed(), true, "Added Item is not displayed"); //assert1
    const addedItemDisplayed = await addedItem.isDisplayed(); //assert2
    if (addedItemDisplayed) {
      console.log("Added Item is displayed - Add to cart successful.");
    } else {
      console.error("Added Item is not displayed - Add to cart failed.");
    }


} catch (error) {
    console.error("Error during automation:", error);

    
} finally {
    // Close the browser
     await driver.quit();
}
 
};

sauceDemoTest();