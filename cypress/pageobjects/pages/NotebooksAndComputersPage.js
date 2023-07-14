import Header from '../Header'
import ProductsPage from './ProductsPage';

class NotebooksAndComputersPage {
    constructor() {
        this.header = new Header();
    };

    elements = {
        productsPage: (productName) => cy.get("[alt = '" + productName + "']"),
    };

    openProductsPage(productName) {
        this.elements.productsPage(productName)
            .scrollIntoView()
            .click();

        return new ProductsPage();
    };
};

export default NotebooksAndComputersPage;