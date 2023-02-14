describe('Transfer view test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });
  it('Test cards page', () => {
    cy.viewport(1640, 796);
    cy.url().should('include', '/login');

    cy.get('input[placeholder="Enter your email"]').type(
      'ba3chaoga9x@gmail.com'
    );

    cy.get('input[placeholder="Enter your password"]').type('admin123');

    cy.get('input[placeholder="Enter your email"]').should(
      'have.value',
      'ba3chaoga9x@gmail.com'
    );
    cy.get('input[placeholder="Enter your password"]').should(
      'have.value',
      'admin123'
    );
    cy.get('.button').click();
    cy.url().should('include', '/cards');

    cy.get('.sidebar-item').contains('Transfer').click();
    cy.url().should('include', '/transfer');

    cy.get('.button').contains('EIGHT.Bank internal transfer').click();
    cy.get('input[value="newContact"]').click();
    cy.get('input[name="cardNumber"]').type('6362645656114148');
    cy.get('.contact-btn').click();
    cy.wait(2000);
    cy.get('.button').contains('Next').click();
  });
});
