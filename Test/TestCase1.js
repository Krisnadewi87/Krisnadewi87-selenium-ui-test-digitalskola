const { Builder, Browser } = require("selenium-webdriver");
const LoginPage = require("../PageObject/LoginPage");
const DashboardPage = require("../PageObject/Dashboard");
const fs = require("fs");
const { expect } = require("chai");
require("dotenv").config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const passwword = process.env.PASSWORD;

const screenshotDir = "./screenshots/";
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

describe("Test Case 1 [Login and Verify Dashboard]", function () {
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
    driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
  });

  beforeEach(async function () {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate(baseUrl);
    await loginPage.login(username, passwword);
  });

  it("Verify login successful and all products displayed on dashboard", async function () {
    const dashboardPage = new DashboardPage(driver);

    // Verify product list displayed
    const isProductListVisible = await dashboardPage.isProductListVisible();
    expect(isProductListVisible).to.be.true;
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
