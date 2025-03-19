describe('Credit Card', () => {
  it('Submit form settings with success', () => {
    cy.intercept('GET', '**/notes').as('getNotes')
    cy.sessionLogin()

    cy.intercept('POST', '**/prod/billing').as('paymentRequest')

    cy.setFormSettings()
    cy.wait('@getNotes')

    cy.wait('@paymentRequest').its('state').should('be.equal', 'Complete')
  })
})