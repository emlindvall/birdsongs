{describe('Error handling functionality', () => {

  it('Users should be notified in case of of bad url paths', () => {
    cy.visit('http://localhost:3000/test')
  });

});
}
