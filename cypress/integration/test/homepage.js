describe('Homepage testing', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should have header with logo', function() {
    cy.get('header').contains('Logo');
  });
  it('should have body with content', function() {
    cy.get('main').children();
  });
  it('should have navigation with 4 items', function() {
    cy.get('nav')
      .children('ul')
      .children('li')
      .should('have.length', 4);
  });
  it('navigation items should have width not eq to 100%', function() {
    cy.get('nav > ul > li > a')
      .should('have.css', 'width')
      .and('be.not.eq', '100%');
  });
  it('should tns slider with controls', function() {
    cy.get('.tns-slider')
      .children()
      .should('have.length.gt', 0);
    cy.get('.tns-outer')
      .find('.tns-controls')
      .find('button')
      .should('have.length', 2);
  });
  it('tns slider have active slide', function() {
    cy.get('.tns-slider')
      .find('.tns-item.tns-slide-active')
      .should('have.length', 1);
  });
  it('tns slider should switch pages after click on controls', function() {
    cy.get('.tns-item.tns-slide-active').then($aitem => {
      cy.get('.tns-controls > button[data-controls="next"]')
        .click()
        .then(() => {
          expect($aitem).not.to.have.class('tns-slide-active');
        });
    });
  });
  it('tns slider have active slide', function() {
    cy.get('.tns-slider')
      .find('.tns-item.tns-slide-active')
      .should('have.length', 1);
  });
});

describe('Homepage mobile screen testing', () => {
  beforeEach(function() {
    cy.viewport('iphone-6');
  });
  it('should have header with menu button', function() {
    cy.get('header')
      .find('.btn-nav-toggle')
      .should('have.length', 1);
  });
  it('should open nav after click on menu button in header', function() {
    cy.get('header')
      .find('.btn-nav-toggle')
      .click()
      .then(() => {
        cy.get('nav').should('be.visible');
      });
  });
});
