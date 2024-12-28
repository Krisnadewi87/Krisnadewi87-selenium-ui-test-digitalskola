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
    this.firstItemName = By.className("inventory_item_name"); // First item name
    this.errorMessage = By.xpath("//h3[.='Error: First Name is required']"); // Error Msg
    this.userFirstName = By.id("first-name"); // First name field
    this.userLastName = By.id("last-name"); // Last name field
    this.userPostCode = By.id("postal-code"); // Postal code field
    this.checkoutOverviewTitle = By.className("title"); // Checkout overview title
    this.paymentInformation = By.xpath("//div[.='Payment Information:']"); // Payment information title
    this.shippingInformation = By.xpath("//div[.='Shipping Information:']"); // Shipping information title
    this.priceTotal = By.xpath("//div[.='Price Total']"); // Shipping information title
    this.summaryTotal = By.xpath("//div[@class='summary_total_label']"); // Summary price total
    this.finishButton = By.id("finish"); // Finish button
    this.completeTitle = By.className("title"); // Complete title last page
    this.completeHeader = By.className("complete-header"); // Complete header confirmation
    this.backHomeButton = By.id("back-to-products"); // Back home button

  }

  // Verify item displayed on the cart page
  async isItemInCart() {
    const cartItems = await this.driver.findElements(this.cartItem);
    return cartItems.length > 0; // Verify the cart item element should be more than 0, if there's item in it
  }

  // Verify fist item name displayed
  async isFirstItemDisplayed() {
    const firstItem = await this.driver.findElement(this.firstItemName);
    return firstItem.getText();
  }

  // Verify checkout button click
  async isCheckoutBtnClick() {
    const checkoutBtn = await this.driver.findElement(this.checkoutButton);
    await checkoutBtn.click();
  }

  // Verify Your Information Title displayed
  async isInformationTitle() {
    const infoTitle = await this.driver.findElement(this.informationTitle);
    return infoTitle.getText();
  }

  // Verify continue button click
  async isContinueBtnClick() {
    const continueBtn = await this.driver.findElement(this.continueButton);
    await continueBtn.click();
  }

  // Verify cancel button displayed
  async isCancelBtnDisplayed() {
    const cancelBtn = await this.driver.findElement(this.cancelButton);
    return await cancelBtn.isDisplayed();
  }

  // Verify error msg
  async isErrorMsgDisplayed() {
    const errorMsg = await this.driver.findElement(this.errorMessage);
    return errorMsg.getText();
  }

  // Veriry fill in the information fields
  async fillInformationFields(firstname, lastname, postcode) {
    await this.driver.findElement(this.userFirstName).sendKeys(firstname);
    await this.driver.findElement(this.userLastName).sendKeys(lastname);
    await this.driver.findElement(this.userPostCode).sendKeys(postcode);
  }

  // Verify Overview title displayed
  async isCheckoutOverviewTitle() {
    const overviewtitle = await this.driver.findElement(this.checkoutOverviewTitle);
    return overviewtitle.getText();
  }

  // Verify payment information displayed
  async isPaymentInfoDisplayed() {
    const paymentInfo = await this.driver.findElement(this.paymentInformation);
    return await paymentInfo.isDisplayed();
  }

  // Verify shipping information displayed
  async isShippingInfoDisplayed() {
    const shippingInfo = await this.driver.findElement(this.shippingInformation);
    return await shippingInfo.isDisplayed();
  }

  // Verify shipping information displayed
  async isPriceTotalDisplayed() {
    const pricingTotal = await this.driver.findElement(this.priceTotal);
    return await pricingTotal.isDisplayed();
  }

  // Verify summary total displayed
  async isSummaryTotalDisplayed() {
    const summaryTotal = await this.driver.findElement(this.summaryTotal);
    return await summaryTotal.isDisplayed();
  }

  // Verify finish button click
  async isFinishBtnClick() {
    const finishBtn = await this.driver.findElement(this.finishButton);
    await finishBtn.click();
  }

  // Verify shipping information displayed
  async isCompleteTitleDisplayed() {
    const completeTitle = await this.driver.findElement(this.completeTitle);
    return completeTitle.getText();
  }

  // Verify shipping information displayed
  async isCompleteHeaderDisplayed() {
    const completedHeader = await this.driver.findElement(this.completeHeader);
    return completedHeader.getText();
  }

  // Verify back home button click
  async isBackHomeBtnClick() {
    const BackHomeBtn = await this.driver.findElement(this.backHomeButton);
    await BackHomeBtn.click();
  }
}
module.exports = CartPage;
