{describe('Homepage functionality', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
    });

    it('Birdsongs logo should be visible', () => {
      cy.get('.logo').should('be.visible').and('have.attr', 'alt').and('include', 'Birdsongs logo featuring a small songbird in profile')
    });

    it('When clicked, the Birdsongs logo should navigate to the homepage', () => {
      cy.get('.logo').click().url().should('eq', 'http://localhost:3000/')
    });

    it('SAVED SONGS button should be visible', () => {
      cy.get('#saved-button').should('be.visible').contains('SAVED SONGS')
    });

    it('When clicked, the SAVED SONGS button should navigate to the saved songs page', () => {
      cy.get('#saved-button').click().url().should('eq', 'http://localhost:3000/saved')
    });

    it('User should see a central header container', () => {
      cy.get('.header-top').contains('The Birdcall Library')
      .get('.header').contains('BIRD SONGS')
      .get('.header-bottom').contains('Do my ears deceive me, or was that a buff-bellied pipit?')
    });

    it('User should see a START button', () => {
      cy.get('#start-button').should('be.visible').contains('START')
    });

    it('When clicked, the START button should navigate to the search page', () => {
      cy.get('#start-button').click().url().should('eq', 'http://localhost:3000/search')
    });
  });
}
