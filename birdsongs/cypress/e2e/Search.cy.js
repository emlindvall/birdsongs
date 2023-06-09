{describe('Search functionality', () => {
    beforeEach(() => {
      cy.intercept('GET', 'https://xeno-canto.org/api/2/recordings?query=loc:illinois+goose', {
        statusCode: 200,
        fixture: 'xc-data.json'
      });
      cy.visit('http://localhost:3000/search');
    });
    
    it('User should see a search form', () => {
      cy.get('.search-description').first().contains("Start by selecting a state to explore from the menu below.")
      .get('.location-field').contains("Choose your state")
      .get('.search-description').last().contains("Looking for a specific bird?")
      .get('.query-field').and('have.attr', 'placeholder').and('include', 'Common name')
    });

    it('Search button should be disabled on page load', () => {
      cy.get('#search-button').should('not.exist');
    });

    it('Search button should be enabled when location field has value', () => {
      cy.get('.location-field').click().get('.Dropdown-menu').contains("Illinois").click()
      .get('.location-field').contains("Illinois")
      .get('#search-button').should('be.visible');
    });

    it('User should be able to search birdsongs by location and query', () => {
      cy.get('.location-field').click().get('.Dropdown-menu').contains("Illinois").click()
      .get('.query-field').type("goose")
      cy.intercept('GET', 'https://xeno-canto.org/api/2/recordings?query=nr+391178', {
        statusCode: 200,
        fixture: 'single-xc-data.json'
      });
      cy.get('#search-button').click()
      .get('.common-name').contains("Canada Goose")
      .get('.scientific-name').contains("Canadensis")
      .get('.specific-location').contains("Midewin Tallgrass Prairie, Will County")
      .get('.audio').should('have.attr', 'src').and('include', "https://xeno-canto.org/391178/download")
    });

    it('When clicked, the NEW SEARCH button should navigate back to the search page', () => {
      cy.get('.location-field').click().get('.Dropdown-menu').contains("Illinois").click()
      .get('.query-field').type("goose")
      .get('#search-button').click()
      .get('#new-search-button').click().url().should('eq', 'http://localhost:3000/search')
    });

    it('When a recording is clicked, user should see additional details', () => {
      cy.visit('http://localhost:3000/search')
      .get('.location-field').click().get('.Dropdown-menu').contains("Illinois").click()
      .get('.query-field').type("goose");
      cy.intercept('GET', 'https://xeno-canto.org/api/2/recordings?query=nr+391178', {
        statusCode: 200,
        fixture: 'single-xc-data.json'
      });
      cy.get('#search-button').click()
      .get('.common-name').contains("Canada Goose").click()
      .get('.selected-common-name').contains("Canada Goose")
      .get('#selected-date').contains("Recorded on October 17, 2017")
      .get('#selected-recordist').contains("by Greg Irving")
      .get('#selected-remark').contains("I assume these are Canada and not Cackling, but not seen clearly enough to say for sure. Flock of 30-40 migrating individuals.")
    });

    // it('User should be notified of failed network request', () => {
    //   cy.get('.location-field').click().get('.Dropdown-menu').contains('Illinois').click();
    //   cy.get('.query-field').type('goose');
    //   cy.intercept('GET', 'https://xeno-canto.org/api/2/recordings?query=loc:illinois+goose', {
    //     statusCode: 500,
    //   });
    //   cy.get('#search-button').click();
    //   cy.get('p').contains("Something's gone wrong on our end.");
    // });

    it('User should be notified upon search with no results', () => {
      cy.get('.location-field').click().get('.Dropdown-menu').contains('Illinois').click()
      .get('.query-field').type('sillygoose');
      cy.intercept('GET', 'https://xeno-canto.org/api/2/recordings?query=loc:illinois+sillygoose', {
        statusCode: 200,
        fixture: 'bad-xc-data.json'
        });
      cy.get('#search-button').click()
      .get('.error-container')
      .get('h3').contains("Looks like you're on a wild goose chase. There are no results for that bird. Check for typos, or try broadening your search term.")
    });

    it('The BACK button should return users to the homepage', () => {
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
}