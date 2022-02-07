/// <reference types="Cypress" />

describe('Mars Rover page', () => {

    it('should display the filter form', () => {
        cy.visit('/');
        cy.get('#marsRoverFilterForm').should('be.visible')
    });

    it('should be able to get Mars Rover images', () => {
        cy.visit('/');
        fillForm();
        cy.get('#confirmMarsRoverFormBtn').click();
        cy.get('.roverPhoto').should('have.length', 2);
    });

    it('should be able to save and re-use filters', () => {
        cy.visit('/');
        fillForm();
        cy.get('#saveFilterBtn').click();
        cy.get('#selectFavoriteFilters').select('Date: 2020-09-22 - Rover: curiosity - Camera: RHAZ');
        cy.get('#cameraSelect').select('NAVCAM');
        cy.get('#selectFavoriteFilters').select('Date: 2020-09-22 - Rover: curiosity - Camera: RHAZ');
        cy.get('#cameraSelect').should('have.value','RHAZ');
    });

    it('should be able to search by sol date', () => {
        cy.visit('/');
        fillForm();
        cy.get('#earthDate').should('have.value','2020-09-22');
        cy.get('#solDate').type('1000');
        cy.get('#earthDate').focus();
        cy.get('#earthDate').should('have.value','');
        cy.get('#confirmMarsRoverFormBtn').click();
        cy.get('.roverPhoto').should('have.length', 2);
    });

    it('should be able change page', () => {
        cy.visit('/');
        fillForm();
        cy.get('#cameraSelect').select('NAVCAM');
        cy.get('#confirmMarsRoverFormBtn').click();
        cy.get('.roverPhoto').should('have.length', 25);
        cy.get('#nextPageBtn').click();
        cy.get('.roverPhoto').should('have.length', 4);
    });


});

function fillForm(){
    cy.get('#marsRoverFilterForm').should('be.visible');
    cy.get('#earthDate').type('2020-09-22');
    cy.get('#roverSelect').select('curiosity');
    cy.get('#cameraSelect').select('RHAZ');
}