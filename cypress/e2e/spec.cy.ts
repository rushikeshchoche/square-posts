describe('e2e Test', () => {
  it('Visits the initial app page', () => {
    cy.visit('/');
    cy.contains('No post clicked!');
  });

  it('Clicks the first row first post', () => {
    cy.visit('/');
    cy.contains('sunt aut facere').click();
    cy.contains('1');
    cy.contains('Current active post Id: 1');
  });

  it('Clicks the first row second post', () => {
    cy.visit('/');
    cy.contains('qui est esse').click();
    cy.contains('1');
    cy.contains('sunt aut facere');
    cy.contains('Current active post Id: 2');
  });

  it('Clicks the second row third post', () => {
    cy.visit('/');
    cy.contains('dolorum ut in').click();
    cy.contains('2');
    cy.contains('qui est esse');
    cy.contains('Current active post Id: 13');
  });
});
