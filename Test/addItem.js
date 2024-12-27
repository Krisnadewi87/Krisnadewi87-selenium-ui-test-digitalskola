const { Builder } = require("selenium-webdriver");
const LoginPage = require("../PageObject/LoginPage");
const DashboardPage = require("../PageObject/Dashboard");
const CartPage = require("../PageObject/CartPage");
const fs = require("fs");
const { expect } = require("chai");
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const passwword = process.env.PASSWORD;

describe("Verify Item in Cart", function () {
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
    driver = await new Builder().forBrowser(browser).build();
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
    cartPage = new CartPage(driver);

    await loginPage.navigate(baseUrl);
    await loginPage.login(username, passwword);
  });

  it("Verify add item successful and item displayed on cart page", async function () {
    // Verify add item to the cart
    await dashboardPage.addItemToCart();

    // Verify cart badge displayed
    await dashboardPage.isCartBadgetVisible();

    // Verify go to the cart page
    await dashboardPage.goToCart();

    // Verify item displayed on the cart page
    await cartPage.isItemInCart();
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
