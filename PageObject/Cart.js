const { By } = require('selenium-webdriver')

class CartPage {
    constructor(driver){
        this.driver = driver;
    }

    async isOnCartPage() {
        const cartPageTitle = await this.driver.findElement(By.classname('title'));
        return cartPageTitle.getText();
    }
}

module.exports = CartPage;