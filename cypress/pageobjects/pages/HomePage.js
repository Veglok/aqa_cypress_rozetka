import Header from '../Header'
import NotebooksAndComputersPage from './NotebooksAndComputersPage';

class HomePage {
    constructor() {
        this.header = new Header();
    };

    elements = {
        notebooksAndComputers: () => cy.get('.fat-wrap :nth-child(1) > .menu-categories__link'),
    };

    visit() {
        cy.visit('/');
    };

    openNotebooksAndComputersPage() {
        this.elements.notebooksAndComputers().click();

        return new NotebooksAndComputersPage();
    };

};

export default HomePage;