describe('Error functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('User should be notified of failed network request', () => {
    cy.intercept('GET', 'https://xeno-canto.org/api/2/recordings?query=loc:illinois+goose', (req) => {
      req.reply({
        statusCode: 500,
        body: 'Internal Server Error',
      })
    });
    cy.visit('http://localhost:3000/search')
      .get('.location-field').click().get('.Dropdown-menu').contains('Illinois').click()
      .get('.query-field').type('goose')
      .get('#search-button').click()
      .get('p');
      // .get('p').contains("Something's gone wrong on our end.");
  });

    it('User should be notified upon search with no results', () => {
      cy.intercept('GET', 'https://xeno-canto.org/api/2/recordings?query=loc:illinois+sillygoose', {
        statusCode: 200,
        fixture: 'bad-xc-data.json'
        });
      cy.visit('http://localhost:3000/search')
      .get('.location-field').click().get('.Dropdown-menu').contains('Illinois').click()
      .get('.query-field').type('sillygoose')
      .get('#search-button').click()
      .get('.error-container')
      .get('h3').contains("Looks like you're on a wild goose chase. There are no results for that bird. Check for typos, or try broadening your search term.")
    });

    it('User should be notified of bad url paths', () => {
      cy.visit('http://localhost:3000/test');
      cy.get('p').contains("Looks like you're on a wild goose chase. Check that URL and try again.")
    });

    it('When users encounter an error, the BACK button should take them back to the homepage', () => {
      cy.intercept('GET', 'https://xeno-canto.org/api/2/recordings?query=loc:illinois+sillygoose', {
          statusCode: 200,
          fixture: 'bad-xc-data.json'
      })
      .visit('http://localhost:3000/search')
      .get('.location-field').click().get('.Dropdown-menu').contains('Illinois').click()
      .get('.query-field').type('sillygoose')
      .get('#search-button').click()
      .get('#back-button').click().url().should('eq', 'http://localhost:3000/search')
    });
})