Cypress.Commands.add('submitSignUp', (email, password) => {
  cy.visit('/signup')
  cy.get('#email').type(email)
  cy.get('#password').type(password, { log: false })
  cy.get('#confirmPassword').type(password, { log: false })
  cy.contains('button', 'Signup').click()
  cy.get('#confirmationCode').should('be.visible')

  cy.mailosaurGetMessage(Cypress.env('MAILOSAUR_SERVER_ID'), {
    sentTo: email
  }).then(message => {
    const confirmationCode = message.html.body.match(/\d{6}/)[0]
    cy.get('#confirmationCode').type(`${confirmationCode}{enter}`)
  })
})

Cypress.Commands.add('guiLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  cy.intercept('GET', '**/notes').as('getNotes')
  cy.visit('/login')
  cy.get('#email').type(username)
  cy.get('#password').type(password, { log: false })
  cy.contains('button', 'Login').click()
  cy.wait('@getNotes')
  cy.contains('h1', 'Your Notes').should('be.visible')
})

Cypress.Commands.add('sessionLogin', (
  username = Cypress.env('USER_EMAIL'),
  password = Cypress.env('USER_PASSWORD')
) => {
  const login = () => cy.guiLogin(username, password)
  cy.session(username, login)
})

Cypress.Commands.add('createNote', (text, file = false, filePath = 'cypress/fixtures/example.json') => {
  cy.visit('/notes/new')
  cy.get('#content').type(text)

  if (file === true) {
    cy.get('#file').selectFile(filePath)
  }

  cy.contains('button', 'Create').click()
  cy.contains('.list-group-item', text).should('be.visible')
})

Cypress.Commands.add('editNote', (oldText, newText, file = false, filePath = 'cypress/fixtures/example.json') => {
  cy.intercept('GET', '**/notes/**').as('getNote')
  cy.contains('.list-group-item', oldText).click()
  cy.wait('@getNote')
  cy.get('#content').as('contentField').clear()
  cy.get('@contentField').type(newText)

  if (file === true) {
    cy.get('#file').selectFile(filePath)
  }

  cy.contains('button', 'Save').click()
  cy.contains('.list-group-item', oldText).should('not.exist')
})

Cypress.Commands.add('deleteNote', (textNote) => {
  cy.intercept('GET', '**/notes/**').as('getNote')
  cy.contains('.list-group-item', textNote).should('be.visible').click()
  cy.wait('@getNote')
  cy.contains('button', 'Delete').click()
  cy.get('.list-group-item').its('length').should('be.at.least', 1)
  cy.contains('.list-group-item', textNote).should('not.exist')
})

Cypress.Commands.add('setFormSettings', () => {
  cy.visit('/settings')

  cy.get('#storage').type('1')
  cy.get('#name').type('Mary Doe')

  cy.iframe('.card-field iframe').as('iframe').find('[name="cardnumber"]').type('4242424242424242')
  cy.get('@iframe').find('[name="exp-date"]').type('1271')
  cy.get('@iframe').find('[name="cvc"]').type('123')
  cy.get('@iframe').find('[name="postal"]').type('12345')

  cy.contains('button', 'Purchase').click()

})