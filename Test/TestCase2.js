const { Builder,By } = require("selenium-webdriver");
const LoginPage = require("../PageObject/LoginPage");
const DashboardPage = require("../PageObject/Dashboard");
const CartPage = require("../PageObject/CartPage");
const fs = require("fs");
const { expect } = require("chai");
const assert = require('assert');

describe('Test Case 2 [Add item to cart]', function () {
  this.timeout(40000);
  let driver;
  let loginPage;
  let dashboardPage;
  let cartPage;

  const screenshotDir = './screenshots/';
  if(!fs.existsSync(screenshotDir)){
      fs.mkdirSync(screenshotDir, {recursive: true});
  }

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
    cartPage = new CartPage(driver);

    await driver.get("https://www.saucedemo.com");
    await loginPage.login("standard_user", "secret_sauce");
  });

  it("Verify add item successful and item displayed on cart page", async function () {
    // Verify add item to the cart
    await dashboardPage.addItemToCart();

    // Verify cart badge displayed
    await dashboardPage.isCartBadgetVisible();


    // Verify go to the cart page
    await dashboardPage.goToCart();

    // Verify item displayed on the cart page
    const isItemInCart = await cartPage.isItemInCart();
    expect(isItemInCart).to.be.true;

    // Verify first item name displayed correctly
    const firstItem = await cartPage.isFirstItemDisplayed();
    assert.strictEqual(firstItem, 'Sauce Labs Backpack', 'Product name does not match!');
  });

  afterEach(async function () {
    const screenshot = await driver.takeScreenshot();
    const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, "_")}_${Date.now()}.png`;
    fs.writeFileSync(filepath, screenshot, "base64");
  });

  after(async function () {
    await driver.quit();
  });
});
