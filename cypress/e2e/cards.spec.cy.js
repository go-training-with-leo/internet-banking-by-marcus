describe('Cards view test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('Test login page', () => {
    cy.get('input[placeholder="Enter your email"]').type(
      'ba3chaoga9x@gmail.com'
    );
    cy.get('input[placeholder="Enter your password"]').type('admin123');
    cy.wait(5000);
    cy.get('.button').click();
  });
});
