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

    it('User should see an image of a magpie', () => {
      cy.get('.magpie').should('be.visible').and('have.attr', 'alt').and('include', 'Vintage illustration of a black-billed magpie perched on a blooming prickly pear cactus')
    });

    it('User should see a central header container', () => {
      cy.get('.header-top').contains('Do my ears deceive me, or was that a buff-bellied pipit?')
      .get('.header').contains('BIRD SONGS')
      .get('.header-bottom').contains('How well do you know the vocalizations around you? Build your backyard birding skills with Birdsongs!')
    });

    it('User should see a START button', () => {
      cy.get('#start-button').should('be.visible').contains('START')
    });

    it('When clicked, the START button should navigate to the search page', () => {
      cy.get('#start-button').click().url().should('eq', 'http://localhost:3000/search')
    });

    it('User should be notified of bad url paths', () => {
      cy.visit('http://localhost:3000/test');
      cy.get('p').contains("Looks like you're on a wild goose chase. Check that URL and try again.")
    });
  });
}
