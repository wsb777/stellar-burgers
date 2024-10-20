/// <reference types="cypress" />
describe('add ingredients', function () {

    beforeEach(function () {
        cy.intercept('GET', 'api/ingredients', { fixture: "ingredients.json"});
        cy.viewport(1300,800);
        cy.visit('http://localhost:4000/')
    })

    it('add bun', function() {
        cy.get('[data-cy="bun"]').contains('Добавить').click();
        cy.get('[data-cy="construcor-bun"]').contains('Ингредиент 1').should('exist');
        cy.get('[data-cy="construcor-bun-2"]').contains('Ингредиент 1').should('exist');
    })

    it('add mains', function() {
        cy.get('[data-cy="mains"]').contains('Добавить').click();
        cy.get('[data-cy="construcor-mains"]').contains('Ингредиент 2').should('exist');
    })
})