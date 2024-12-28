const { Builder } = require("selenium-webdriver");
const LoginPage = require("../PageObject/LoginPage");
const CartPage = require("../PageObject/CartPage");
const { expect } = require("chai");
const fs = require("fs");
const assert = require("assert");
const DashboardPage = require("../PageObject/Dashboard");
require("dotenv").config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const passwword = process.env.PASSWORD;
const firstname = process.env.FIRST_NAME;
const lastname = process.env.LAST_NAME;
const postcode = process.env.POST_CODE;

const screenshotDir = "./screenshots/";
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

describe("Test Case 3 [Checkout method]", function () {
  this.timeout(40000);
  let driver;

  switch (browser.toLowerCase()) {
    case "firefox":
      const firefox = require("selenium-webdriver/firefox");
      options = new firefox.Options();
      options.addArguments("--headless");
    case "edge":
      const edge = require("selenium-webdriver/edge");
      options = new edge.Options();
      options.addArguments("--headless");
    case "chrome":
    default:
      const chrome = require("selenium-webdriver/chrome");
      options = new chrome.Options();
      options.addArguments("--headless");
      break;
  }

  before(async function () {
    driver = await new Builder().forBrowser("chrome").setChromeOptions(options).build();
  });

  beforeEach(async function () {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate(baseUrl);
    await loginPage.login(username, passwword);
  });

  it("Verify checkout method successful", async function () {
    const dashboardPage = new DashboardPage(driver);
    const cartPage = new CartPage(driver);

    // Verify add item to the cart
    await dashboardPage.addItemToCart();

    // Verify cart badge displayed
    await dashboardPage.isCartBadgetVisible();

    // Verify go to the cart page
    await dashboardPage.goToCart();

    // Verify item displayed on the cart page
    const cartItems = await cartPage.isItemInCart();
    expect(cartItems).to.be.true;

    // Verify first item name displayed correctly
    const firstItem = await cartPage.isFirstItemDisplayed();
    assert.strictEqual(firstItem, "Sauce Labs Backpack", "Product name does not match!");

    // Verify click checkout button
    await cartPage.isCheckoutBtnClick();

    // Verify your information displayed
    const informationTitle = await cartPage.isInformationTitle();
    assert.strictEqual(informationTitle, "Checkout: Your Information", "Information title is not displayed!");

    // Verify click continue button
    await cartPage.isContinueBtnClick();

    // Verify error msg displayed
    const errorMessage = await cartPage.isErrorMsgDisplayed();
    assert.strictEqual(errorMessage, "Error: First Name is required", "Expected error message does not match");

    // Veriry fill in the information fields
    await cartPage.fillInformationFields(firstname, lastname, postcode);

    // Verify click checkout button
    await cartPage.isContinueBtnClick();

    // Verify Overview title displayed
    const overviewtitle = await cartPage.isCheckoutOverviewTitle();
    assert.strictEqual(overviewtitle, "Checkout: Overview", "Checkout overview title is not displayed!");

    // Verify item displayed
    await cartPage.isItemInCart();

    // Verify first item name displayed correctly
    const checkoutItem = await cartPage.isFirstItemDisplayed();
    assert.strictEqual(checkoutItem, "Sauce Labs Backpack", "Product name does not match!");

    // Verify payment information displayed correctly
    await cartPage.isPaymentInfoDisplayed();

    // Verify payment information displayed correctly
    await cartPage.isShippingInfoDisplayed();

    // Verify price total displayed correctly
    await cartPage.isPriceTotalDisplayed();


    // Verify summary total displayed
    await cartPage.isSummaryTotalDisplayed();

    // Verify Cancel button displayed
    await cartPage.isCancelBtnDisplayed();

    // Verify finish button clicked
    await cartPage.isFinishBtnClick();

    // Verify complete page title displayed correctly
    const completeTitle = await cartPage.isCompleteTitleDisplayed();
    assert.strictEqual(completeTitle, "Checkout: Complete!", "Complete page tittle does not match!");

    // Verify complete page title displayed correctly
    const completedHeader = await cartPage.isCompleteHeaderDisplayed();
    assert.strictEqual(completedHeader, "Thank you for your order!", "Complete header text does not match!");

    // Verify back home button clicked
    // await cartPage.isBackHomeBtnClick();
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
