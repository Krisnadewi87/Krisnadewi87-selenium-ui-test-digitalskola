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
    let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
    assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");
    console.log(titleText);

    // Verify "Burger" button is visible
    const menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
    assert.strictEqual(await menuButton.isDisplayed(), true, "Menu button is not displayed");

    // Verify the cart icon on the dashboard is displayed
    const cartIcon = await driver.wait(until.elementLocated(By.className("shopping_cart_link")), 5000);
    assert.strictEqual(await cartIcon.isDisplayed(), true, "Cart icon is not displayed");

    // Verify product lists are displayed
    const productList = await driver.findElements(By.className("inventory_item"), 5000);
    if (productList.length > 0) {
        console.log('Product list is displayed - Dashboard loaded successfully.');
      } else {
        console.error('Product list not displayed - Issue with the dashboard.');
      }


    // Verify ale to click Add to cart button on an item
    const addToCartButton = await driver.findElement(By.id("add-to-cart-sauce-labs-backpack"));
    await addToCartButton.click();


    // Verify able to add item to the cart and the cart count is updated
    const cartBadge = await driver.findElement(By.className("shopping_cart_badge"));
    const cartCount = await cartBadge.getText();
    console.log('Cart count after adding an item:', cartCount);
    if (cartCount !== '1') {
        throw new Error('Cart count did not update correctly.');
    }


    // Additional test: Verify Add to cart title changed to Remove
    const removeButton = await driver.findElement(By.id("remove-sauce-labs-backpack"));
    const removeButtonDisplayed = await removeButton.isDisplayed();
    if (removeButtonDisplayed) {
        console.log("Remove button displayed - Item added successfully.")
    } else {
        console.error("Remove button not displayed - Issue with the 'Add to cart' button")
    }


    // Verify remove the item from the cart
    await removeButton.click();


    // Verify the cart is empty
    const cartItems = await driver.findElements(By.className('cart_item'));
    if (cartItems.length === 0) {
        console.log('Cart is empty after removing the item.');
    } else {
        throw new Error('Item was not removed from the cart.');
    }

} catch (error) {
    console.error("Error during automation:", error);

    
} finally {
    // Close the browser
     await driver.quit();
}
 
};

sauceDemoTest();