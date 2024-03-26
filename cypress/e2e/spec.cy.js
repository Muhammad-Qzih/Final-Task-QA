describe('StacksInfo Search Feature Tests', () => {
  
  beforeEach(() => {
    cy.visit('https://stacksinfo.web.app/');
  });

  it('ensures no duplicate search results', () => {
      cy.get('.search-bar').type('code{enter}');
      cy.get('.company-name').then((companyNames) => {
        const names = [...companyNames].map(el => el.innerText);
        const uniqueNames = [...new Set(names)];
        expect(uniqueNames.length).to.equal(names.length);
      });
    });

    
  it('shows autocomplete suggestions while typing', () => {
      cy.get('.search-bar')
      .type('b');

      cy.get('.last-search-and-results')
      .should('exist');
    });
    
  it('is case insensitive in searches', () => {
      cy.get('.search-bar').type('DevOps{enter}');

      cy.get('.card')
      .should('exist');

      cy.get('.search-bar')
      .clear()
      .type('devops{enter}');

      cy.get('.card')
      .should('exist');
    });

    it('handles searches with only spaces', () => {
      cy.get('.search-bar').type('   {enter}');
      cy.get('.Not-found-container').should('exist');
    });
          
  it('should allow typing in the search bar', () => {
    cy.get('.search-bar')
    .type('code').should('have.value', 'code');
  });
  
   it('should display an error message for URL input', () => {
         cy.get('input[class="search-bar"]')
         .should("be.visible")
         .type('https://stacksinfo.web.app/')
         .should("have.value", "https://stacksinfo.web.app/")

         cy.get('.Not-found-container')
         .should('exist');
  })


  it('handles empty searches gracefully', () => {
    cy.get('.search-bar').type('{enter}');
    cy.get('.search-bar').should('be.visible');
    cy.get('.card').should('exist');
  });


  it('tests for search input field character limit', () => {
    const longString = 'B'.repeat(256);
    cy.get('.search-bar').type(longString);
    cy.get('.search-bar').should('have.value', longString.substr(0, 255));
  });


  it('performs a search with special characters', () => {
    cy.get('.search-bar').type('!{enter}');
    cy.get('.Not-found-container').should('exist');
  });


  it('performs a search with numbers', () => {
    cy.get('.search-bar').type('2{enter}');
    cy.get('.Not-found-container').should('exist');
  });


it('ensures wildcard searches return correct responses', () => {
  cy.get('.search-bar').type('*{enter}');
  cy.get('.Not-found-container').should('exist');
});


  it('should not execute SQL code', () => {
    cy.get('.search-bar').type('SELECT * FROM users;{enter}');
    cy.get('.Not-found-container').should('exist');
  });



   it('updates results on new search without page reload', () => {
    cy.get('.search-bar')
    .type('code{enter}');

    cy.get('.card')
    .should('exist');

    cy.get('.search-bar')
    .clear()
    .type('Bitcoin{enter}');

    cy.get('.card')
    .should('exist');
  });


  it('should not execute JavaScript code', () => {
    cy.get('.search-bar')
    .type('<script>alert("XSS")</script>{enter}');

    cy.get('.Not-found-container')
    .should('exist');
  });


  it('should not display or execute HTML tags', () => {
      cy.get('.search-bar')
      .type('<h1>Test</h1>{enter}');

      cy.get('.Not-found-container')
      .should('exist');
    });


    it('should not display or execute HTML tags', () => {
        cy.get('.search-bar')
        .type('<h1>Test</h1>{enter}');

        cy.get('.Not-found-container')
        .should('exist');
      });

    it('displays results for a valid company name search', () => {
      cy.get('.search-bar')
      .type('Al Andalus Software Development{enter}');

      cy.get('.card')
      .should('contain', 'Al Andalus Software Development');
    });
    
});