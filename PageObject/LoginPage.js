const { By } = require('selenium-webdriver');

class LoginPage {
  constructor(driver) {
    this.driver = driver;

    // Login elements
    this.usernameInput = By.id('user-name');
    this.passwordInput = By.id('password');
    this.loginButton = By.id('login-button');
  }

  async navigate() {
    await this.driver.get('https://www.saucedemo.com/');
}

async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
}
}

module.exports = LoginPage;
