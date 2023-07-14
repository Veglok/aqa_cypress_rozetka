class CartMenu {
    constructor() {

    }

    elements = {
        cartProductPrice: (productNumber) => cy.get(`:nth-child(${productNumber}) > rz-cart-product [data-testid="cost"]`),
        productellipsisMenu: (number) => cy.get(`#cartProductActions${number}`),
        removeCartProduct: () => cy.get('rz-trash-icon.ng-star-inserted'),
        emptyCartMsg: () => cy.get('.cart-dummy__heading'),
    };

    getProductPrice(productNumber) {
        return this.elements.cartProductPrice(productNumber).invoke('text').then((text) => {
            return extractNumbers(text);
        });
    };

    openEllipsisMenu(number = 0) {
        this.elements.productellipsisMenu(number).click();
        return this;
    };

    removeCartProduct() {
        this.elements.removeCartProduct().click();
        return this;
    };

    emptyCart() {
        cy.get('.cart-list__item').each((product) => {
            this.openEllipsisMenu();
            this.removeCartProduct();
        })
    }

    isEmpty() {
        return cy.get('.cart-dummy__heading').should('be.visible');
    }

    get totalPrice() {
        return cy.get('.cart-receipt__sum-price > :nth-child(1)').invoke('text').then((text) => {
            return extractNumbers(text);
        });
    }

    get cartProductsList() {
        return cy.get('.cart-list');
    };
};

function extractNumbers(str) {
    str = str.replace(/[^\d]/g, '');
    return Number(str);
};

export default CartMenu;