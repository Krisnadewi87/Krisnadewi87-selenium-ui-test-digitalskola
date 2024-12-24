const { Builder, By, until } = require("selenium-webdriver");

(async function testSauceDemo() {
  // Set up the WebDriver
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Open the Saucedemo login page
    await driver.get("https://www.saucedemo.com/");

    // Locate and interact with login fields
    const usernameField = await driver.findElement(By.id("user-name"));
    const passwordField = await driver.findElement(By.id("password"));
    const loginButton = await driver.findElement(By.id("login-button"));

    // Input credentials
    await usernameField.sendKeys("standard_user");
    await passwordField.sendKeys("secret_sauce");

    // Click the login button
    await loginButton.click();

    // Verify the dashboard logo is visible
    await driver.wait(until.elementLocated(By.className("app_logo")), 5000);
    const logo = await driver.findElement(By.className("app_logo"));
    const isLogoDisplayed = await logo.isDisplayed();
    if (isLogoDisplayed) {
      console.log("Dashboard logo is visible - Login successful.");
    } else {
      console.error("Dashboard logo not visible - Login failed.");
    }

    // Verify the cart icon on the dashboard is visible
    await driver.wait(until.elementLocated(By.className("shopping_cart_link")), 5000);
    const cartIcon = await driver.findElement(By.className("shopping_cart_link"));
    const isCartIconDisplayed = await cartIcon.isDisplayed();
    if (isCartIconDisplayed) {
      console.log("Cart Icon is visible - Login successful.");
    } else {
      console.error("Cart Icon not visible - Login failed.");
    }

    // Verify all the product displayed
    const productList = await driver.findElement(By.className("inventory_container"));
    const productListDisplayed = await productList.isDisplayed();
    if (productListDisplayed) {
      console.log("Product List is visible - Login successful.");
    } else {
      console.error("Product List is not visible - Login failed.");
    }


    // Verify able to add items to the cart
    const addToCartButton = await driver.findElement(By.id("add-to-cart-sauce-labs-backpack"));
    await addToCartButton.click();


    // Verify cart count displayed
    const cartCount = await driver.findElement(By.className("shopping_cart_badge"));
    const cartCountDisplayed = await cartCount.isDisplayed();
    if (cartCountDisplayed) {
        console.log("Cart Count is visible - add item to the cart successful.")
    } else {
        console.error("Cart Count is not visible - add item to the cart failed.")
    }


    // Verify Add to cart title changed to Remove
    const removeButton = await driver.findElement(By.id("remove-sauce-labs-backpack"));
    const removeButtonDisplayed = await removeButton.isDisplayed();
    if (removeButtonDisplayed) {
        console.log("Remove button visible - add item to the cart successful.")
    } else {
        console("Remove button not visible - add item to the cart failed.")
    }

    } catch (error) {
        console.error("Error during automation:", error);
    } finally {
        // Step 5: Close the browser
         await driver.quit();
    }
})();
