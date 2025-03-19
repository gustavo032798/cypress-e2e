describe('Login', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/notes').as('getNotes')
        cy.guiLogin()
    })

    it('Successfully login', () => {
        cy.wait('@getNotes')

        cy.contains('h1', 'Your Notes').should('be.visible')
        cy.contains('a', 'Create a new note').should('be.visible')
    })

    it('Successfully logout', () => {
        cy.wait('@getNotes')

        cy.contains('h1', 'Your Notes').should('be.visible')

        if (Cypress.config('viewportWidth') < Cypress.env('viewportWidthBreakpoint')) {
            cy.get('.navbar-toggle.collapsed').should('be.visible').click()
        }

        cy.contains('.nav a', 'Logout').click()

        cy.get('#email').should('be.visible')
    })
})