it('should do subscribe to news letter', () => {
  cy.visit('https://www.cypress.io/');
  cy.get(':nth-child(3) > .menu\:px-\[20px\]').click()
});
