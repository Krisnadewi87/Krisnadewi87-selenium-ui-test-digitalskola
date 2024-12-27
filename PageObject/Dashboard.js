const { By } = require("selenium-webdriver");

class DashboardPage {
  constructor(driver) {
    this.driver = driver;

    // Dashboard Elements
    this.productList = By.className("inventory_list"); // Product list
    this.addToCartButton = By.id("add-to-cart-sauce-labs-backpack"); // Add to cart item for first product
    this.cartIcon = By.className("shopping_cart_link"); // Cart icon
    this.cartBadge = By.className("shopping_cart_badge"); // Cart badge
    this.dashboardLogo = By.className("title"); // Title displayed
  }

  // Verify Dashboard Title displayed
  async isDashboardTitleVisible() {
    const dashboardLogo = await this.driver.findElement(this.dashboardLogo);
    return await dashboardLogo.isDisplayed();
  }

  // Verify Cart Icon displayed
  async isCartIconVisible() {
    const cartIcon = await this.driver.findElement(this.cartIcon);
    return await cartIcon.isDisplayed();
  }

  // Verify product list displayed
  async isProductListVisible() {
    const productList = await this.driver.findElement(this.productList);
    return await productList.isDisplayed();
  }

  // Verify add item to the cart
  async addItemToCart() {
    const addToCartBtn = await this.driver.findElement(this.addToCartButton);
    await addToCartBtn.click();
  }

  // Verify cart badge displayed
  async isCartBadgetVisible() {
    const cartBadge = await this.driver.findElement(this.cartBadge);
    return await cartBadge.isDisplayed();
  }

  // Verify go to the cart page
  async goToCart() {
    const cartIcon = await this.driver.findElement(this.cartIcon);
    await cartIcon.click();
  }
}

module.exports = DashboardPage;
