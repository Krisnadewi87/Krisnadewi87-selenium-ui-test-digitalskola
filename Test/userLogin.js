const { Builder, Browser } = require('selenium-webdriver');
const LoginPage = require('../PageObject/LoginPage')
const assert = require('assert');
const DashboardPage = require('../PageObject/Dashboard');
const fs = require('fs')
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const passwword = process.env.PASSWORD;

const screenshotDir = './screenshots/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {recursive: true});
}

describe('User Login and verify dashboard', function() {
    this.timeout(40000);
    let driver;

    before(async function() {
        driver = await new Builder().forBrowser(browser).build();
    });

    beforeEach(async function () {
        const loginPage = new LoginPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, passwword);
    });
    
    it('Login successfully and verify dashboard', async function() {
        const dashboardPage = new DashboardPage(driver);
        const title = await dashboardPage.isOnDashboard();
        assert.strictEqual(title, 'Products', 'Expected dashboard title to be products')
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_')}_${Date.now()}.png`
        fs.writeFileSync(filepath, screenshot, 'base64');
    });

    after(async function() {
        await driver.quit();
    });

});