const { Builder } = require("selenium-webdriver");
const LoginPage = require("../PageObject/LoginPage");
const DashboardPage = require("../PageObject/Dashboard");
const CartPage = require("../PageObject/CartPage");
const { expect } = require("chai");
const fs = require("fs");

describe("Verify Item in Cart", function () {
  this.timeout(40000);
  let driver;
  let loginPage;
  let dashboardPage;
  let cartPage;

  const screenshotDir = "./screenshots/";
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  before(async function () {
    driver = await new Builder().forBrowser("chrome").build();
    loginPage = new LoginPage(driver);
    dashboardPage = new DashboardPage(driver);
    cartPage = new CartPage(driver);

    await driver.get("https://www.saucedemo.com");
    await loginPage.login("standard_user", "secret_sauce");
  });

  it("Verify the item is on the cart page", async function () {
    // Verify add item to cart
    await dashboardPage.addItemToCart();

    // Verify go to cart page
    await dashboardPage.goToCart();

    // Verify item displayed on cart page
    const isItemInCart = await cartPage.isItemInCart();
    expect(isItemInCart).to.be.true;
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
