const { Builder, By, until } = require("selenium-webdriver");

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
    await driver.wait(until.elementLocated(By.className("app_logo")), 5000);
    const logo = await driver.findElement(By.className("app_logo"));
    const isLogoDisplayed = await logo.isDisplayed();
    if (isLogoDisplayed) {
      console.log("Dashboard logo is displayed - Login successful.");
    } else {
      console.error("Dashboard logo not displayed - Login failed.");
    }

    // Verify the cart icon on the dashboard is displayed
    const cartIcon = await driver.wait(until.elementLocated(By.className("shopping_cart_link")), 5000);
    const isCartIconDisplayed = await cartIcon.isDisplayed();
    if (isCartIconDisplayed) {
      console.log("Cart Icon is displayed - Dashboard loaded successfully.");
    } else {
      console.error("Cart Icon not displayed - Issue with the dashboard.");
    }

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

} catch (error) {
    console.error("Error during automation:", error);

    
} finally {
    // Close the browser
     await driver.quit();
}
 
};

sauceDemoTest();