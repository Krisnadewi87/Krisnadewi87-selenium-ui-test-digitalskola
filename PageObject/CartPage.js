const { By } = require("selenium-webdriver");

class CartPage {
  constructor(driver) {
    this.driver = driver;

    // Cart page elements
    this.cartItem = By.className("inventory_item_name"); // Item name on the cart page
    this.checkoutButton = By.id("checkout"); // Checkout button
    this.informationTitle = By.className("title"); // Your Information title
    this.continueButton = By.id("continue"); // Continue button
    this.cancelButton = By.id("cancel"); // Cancel button
  }

  // Verify item displayed on the cart page
  async isItemInCart() {
    const cartItems = await this.driver.findElements(this.cartItem);
    return cartItems.length > 0; // Verify the cart item element should be more than 0, if there's item in it
  }

  // Verify checkout method
  async isCheckoutBtnDisplayed() {
    const checkoutBtn = await this.driver.findElement(this.checkoutButton);
    await checkoutBtn.click();
  }

  // Verify Your Information Title displayed
  async isInformationTitle() {
    const infoTitle = await this.driver.findElement(this.informationTitle);
    return infoTitle.getText();
  }

  // Verify continue button
  async isContinueBtnDisplayed() {
    const continueBtn = await this.driver.findElement(this.continueButton);
    await continueBtn.click();
  }

  // Verify continue button
  async isCancelBtnDisplayed() {
    const cancelBtn = await this.driver.findElement(this.cancelButton);
    await cancelBtn.click();
  }
}

module.exports = CartPage;
