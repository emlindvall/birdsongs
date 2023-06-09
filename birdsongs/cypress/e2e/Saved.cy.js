{describe('Search functionality', () => {
  it('Users should be able to save a specific recording, and that recording should be visible on the saved songs page', () => {
    cy.intercept('GET', 'https://xeno-canto.org/api/2/recordings?query=nr+391178', {
      statusCode: 200,
      fixture: 'single-xc-data.json'
    });
    cy.visit('http://localhost:3000/search')
    .get('.location-field').click().get('.Dropdown-menu').contains("Illinois").click()
    .get('.query-field').type("goose")
    .get('#search-button').click()
    .get('.common-name').contains("Canada Goose").click()
    .get('#save-button').click()
    .get('#saved-button').click()
    .get('.common-name').contains("Canada Goose")
  });

  it('Users should be notified if they have no saved songs', () => {
    cy.visit('http://localhost:3000/saved')
    .get('p').contains("Your saved songs as as scarce as hen's teeth. Once you save a few birdsongs, they'll be here waiting for you.")
  });
})
}