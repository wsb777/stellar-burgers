/// <reference types="cypress" />
describe('post order', function () {
    beforeEach(function () {
        cy.intercept('GET', 'api/ingredients', { fixture: "ingredients.json"});
        cy.intercept('GET', 'api/auth/user', { fixture: "user.json"});
        cy.intercept('POST', 'api/orders', { fixture: "post_order.json"})
        cy.viewport(1300,800);
        cy.visit('http://localhost:4000/')
    })

    it('post order', function() {
        cy.get('[data-cy="order-modal"]').should('not.exist')
        cy.get('[data-cy="bun"]').contains('Добавить').click();
        cy.get('[data-cy="mains"]').contains('Добавить').click();
        cy.get('[data-cy="order-button"').click();
        cy.get('[data-cy="order-modal"]').should('exist')
    })
})