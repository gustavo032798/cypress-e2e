import { faker } from '@faker-js/faker/locale/en'

describe('CRUD', () => {
  it('CRUDs a note', () => {
    const noteDescription = faker.lorem.words(4)

    cy.intercept('GET', '**/notes').as('getNotes')
    cy.sessionLogin()

    cy.createNote(noteDescription)
    cy.get('@getNotes')

    const updatedNoteDescription = faker.lorem.words(4)

    cy.editNote(noteDescription, updatedNoteDescription, true)
    cy.get('@getNotes')

    cy.deleteNote(updatedNoteDescription)
    cy.get('@getNotes')
  })
})
