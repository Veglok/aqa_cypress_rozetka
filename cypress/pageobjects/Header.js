import CartMenu from "./CartMenu";

class Header {
    constructor() {

    };

    elements = {
        searchInput: () => cy.get('.search-form__input'),
        catalogue: () => cy.get('#fat-menu'),
        logo: () => cy.get('[alt = "Rozetka Logo"]'),
        cart: () => cy.get('.header-actions__item--cart > .header-actions__component > .header__button'),
    };

    search(value) {
        this.elements.searchInput().clear();
        this.elements.searchInput().type(value + '{enter}');
    };

    openCatalogueMenu() {
        this.elements.catalogue().click();
    };

    openHomePage() {
        this.elements.logo().click();
    };

    openCartMenu() {
        this.elements.cart().click();
        return new CartMenu();
    };
};

export default Header;