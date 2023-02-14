describe('Cards view test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('Test cards page', () => {
    cy.viewport(1640, 796);
    cy.url().should('include', '/login');

    cy.get('input[placeholder="Enter your email"]').type(
      'hieulechanhkk@gmail.com'
    );

    cy.get('input[placeholder="Enter your password"]').type('admin123');

    cy.get('input[placeholder="Enter your email"]').should(
      'have.value',
      'hieulechanhkk@gmail.com'
    );
    cy.get('input[placeholder="Enter your password"]').should(
      'have.value',
      'admin123'
    );
    cy.get('.button').click();
    cy.url().should('include', '/cards');

    cy.get('.add-btn').click();

    cy.get('.modal').should('be.visible');

    cy.get('input[placeholder="Enter your balance"]').type(500000);
    cy.get('.button').contains('Create').click();
  });
});
