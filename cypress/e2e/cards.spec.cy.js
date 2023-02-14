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

    cy.wait(3000);

    cy.get('.button').contains('OK').click();
    cy.url().should('include', '/cards');

    cy.get('.sidebar-item').contains('Transfer').click();
    cy.url().should('include', '/transfer');

    cy.get('.button').contains('EIGHT.Bank internal transfer').click();
    cy.get('input[value="newContact"]').click();
    cy.get('input[name="cardNumber"]').type('6362645656114148');
    cy.get('.contact-btn').click();
    cy.wait(2000);
    cy.get('.button').contains('Next').click();

    cy.get('input[name="totalAmount"]').type(50000);
    cy.get('input[name="totalAmount"]').should('have.value', '50 000');
    cy.get('textarea[name="detail"]').type('Transfer money to you');
    cy.get('.button').contains('Next').click();
    cy.wait(2000);

    cy.get('.button').contains('Next').click();
    cy.wait(2000);

    cy.get('.button').contains('OK').click();

    cy.get('.sidebar-item').contains('Account').click();
    cy.url().should('include', '/account');
    cy.get('.button').contains('Log out').click();
    cy.url().should('include', '/login');
  });
});
