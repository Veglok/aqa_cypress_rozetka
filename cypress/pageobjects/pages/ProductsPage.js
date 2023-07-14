import Header from '../Header'
import HomePage from './HomePage';

class ProductsPage {
    constructor() {
        this.header = new Header();
    };

    elements = {
        checkboxFilter: (value) => cy.get(`[data-id = '${value}']`),
        minPriceFilter: () => cy.get('[formcontrolname="min"]'),
        maxPriceFilter: () => cy.get('[formcontrolname="max"]'),
        applyPriceFilterBtn: () => cy.get('[type = "submit"]'),
        addProductToCart: () => cy.get('.toOrder'),
    };

    addFirstProductToCart() {
        this.elements.addProductToCart()
            .first()
            .click();

        return this;
    };

    applyCheckboxFilter(value) {
        this.elements.checkboxFilter(value).scrollIntoView().click({ force: true });
    };

    setMinPriceFilter(min) {
        this.elements.minPriceFilter().scrollIntoView();
        this.elements.minPriceFilter().clear();
        this.elements.minPriceFilter().type(min);
    };

    setMaxPriceFilter(max) {
        this.elements.maxPriceFilter().scrollIntoView();
        this.elements.maxPriceFilter().clear();
        this.elements.maxPriceFilter().type(max);
    };

    clickApplyPriceFilter() {
        this.elements.applyPriceFilterBtn().click({ force: true });
    };

    setPriceFilter(min, max) {
        this.setMinPriceFilter(min);
        this.setMaxPriceFilter(max);

        this.clickApplyPriceFilter();
    };

    openHomePage() {
        this.header.openHomePage();

        return new HomePage();
    };

    get catalogueHeading() {
        return cy.get('.catalog-heading');
    }

    get catalogueFilters() {
        return cy.get('.catalog-selection__list');
    };

    get prices() {
        cy.wait(1500)
        return cy.get('.goods-tile__price-value');
    };

    get productName() {
        return cy.get('.goods-tile__title');
    };
};

export default ProductsPage;