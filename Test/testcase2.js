const { Builder, By, until } = require('selenium-webdriver');
const LoginPage = require('../PageObject/LoginPage');
const assert = require('assert');
const { expect } = require('chai');
const fs = require('fs');
require('dotenv').config();


const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const passwword = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}


describe('Add to Cart Test', function () {
  this.timeout(30000);
  let driver;

      switch(browser.toLowerCase()){
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
            options.addArguments('--headless');
        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
            break
    }

  before(async function() {
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
        loginPage = new LoginPage(driver);    
  })

  beforeEach(async function () {
    const loginPage = new LoginPage(driver);
    await loginPage.navigate(baseUrl);
    await loginPage.login(username, passwword);
  });

  it('Should add an item to the cart successfully', async () => {
    const addToCartButton = await driver.findElement(By.id("add-to-cart-sauce-labs-backpack"));
    await addToCartButton.click();

    // Add to card button changed to Remove button
    const removeButton = await driver.findElement(By.id("remove-sauce-labs-backpack"));
    assert.strictEqual(await removeButton.isDisplayed(), true, "Remove button is not visible");

    // Wait for the cart badge to appear
    const cartBadge = await driver.findElement(By.className('shopping_cart_badge'));
    await driver.wait(until.elementTextIs(cartBadge, '1'), 5000);

    // Verify the cart badge displays the correct count
    const cartBadgeText = await cartBadge.getText();
    expect(cartBadgeText).to.equal('1');
  });

  afterEach(async function () {
    const screenshot = await driver.takeScreenshot();
    const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
    fs.writeFileSync(filepath, screenshot, 'base64');
  });

  after(async function () {
    // Quit the WebDriver after all tests
    await driver.quit();
  });
});




