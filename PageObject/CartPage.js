const { By } = require('selenium-webdriver');

class CartPage {
  constructor(driver) {
    this.driver = driver;

    // Cart page elements
    this.cartItem = By.className('inventory_item_name'); // Item name on the cart page
    this.checkoutButton = By.id('checkout'); // Checkout button
  }

  // Verify item displayed on the cart page
  async isItemInCart() {
    const cartItems = await this.driver.findElements(this.cartItem);
    return cartItems.length > 0; // Verify the cart item element should be more than 0, if there's item in it
  }

  // Verify checkout method
  async checkout() {
    const checkoutBtn = await this.driver.findElement(this.checkoutButton);
    await checkoutBtn.click();
  }
}

module.exports = CartPage;
