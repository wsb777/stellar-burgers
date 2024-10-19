/// <reference types="cypress" />
describe('modal', function () {

    beforeEach(function () {
        cy.intercept('GET', 'api/ingredients', { fixture: "ingredients.json"});
        cy.viewport(1300,800);
        cy.visit('http://localhost:4000/')
    })

    it('modal open', function() {
        cy.get('[data-cy="ingredient-link"]').first().click();
        cy.get('[data-cy="modal"').should('exist');
    })

    it('modal close', function() {
        cy.get('[data-cy="ingredient-link"]').first().click();
        cy.get('[data-cy="close-modal"').click();
        cy.get('[data-cy="modal"').should('not.exist');
    })
})