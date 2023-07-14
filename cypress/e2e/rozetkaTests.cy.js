import CartMenu from '../pageobjects/CartMenu';
import HomePage from '../pageobjects/pages/HomePage';
import ProductsPage from '../pageobjects/pages/ProductsPage';

describe('Rozetka tests', () => {
  const home = new HomePage();
  const productsPage = new ProductsPage();
  const cart = new CartMenu();

  it('verify products page filters', () => {
    home.visit();

    cy.url()
      .should('eq', Cypress.config().baseUrl);

    home.header
      .search('Ноутбуки');

    cy.url()
      .should('contain', Cypress.env('notebooksPageUrl'));

    productsPage.applyCheckboxFilter(Cypress.env('producer'));
    productsPage.applyCheckboxFilter(Cypress.env('processor'));
    productsPage.setPriceFilter(Cypress.env('minPrice'), Cypress.env('maxPrice'));

    productsPage.catalogueHeading
      .should('contain', Cypress.env('producer'));

    productsPage.catalogueFilters
      .should('contain', Cypress.env('processor'));

    productsPage.prices.each((element) => {
      expect(extractNumbers(Cypress.$(element).text()))
        .to.be.greaterThan(Number(Cypress.env('minPrice')) - 1);
    });

    productsPage.prices.each((element) => {
      expect(extractNumbers(Cypress.$(element).text()))
        .to.be.below(Number(Cypress.env('maxPrice')) + 1);
    });
  });

  it('verify cart functionality', () => {
    cy.url()
      .should('eq', Cypress.config().baseUrl);

    home
      .openNotebooksAndComputersPage()
      .openProductsPage('Монітори')
      .addFirstProductToCart()
      .openHomePage()
      .openNotebooksAndComputersPage()
      .openProductsPage('Планшети')
      .addFirstProductToCart()
      .openHomePage()
      .header
      .openCartMenu();

    cart.totalPrice.then((extractedValue) => {
      cart.getProductPrice(1).then((price1) => {
        cart.getProductPrice(2).then((price2) => {
          const totalPrice = price1 + price2;
          expect(extractedValue).to.eq(totalPrice);
        });
      });
    });

    cart.emptyCart();
    cart.isEmpty();
  });
});

function extractNumbers(str) {
  str = str.replace(/[^\d]/g, '');
  return Number(str);
};