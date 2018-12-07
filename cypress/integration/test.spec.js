describe('First test', () => {
  it('Should have title', () => {
    cy.visit('http://localhost:3000');
    cy.title().should('include', 'Charly Cares');
  });
  it('Should have buttons on login page', () => {
    cy.visit('http://localhost:3000/signup');
    cy.get('button').should('have.length', 2);
  });
  it.skip('Should have title', () => {
    cy.visit('http://localhost:3000');
    cy.title().should('include', 'Charly Cares');
  });
});
