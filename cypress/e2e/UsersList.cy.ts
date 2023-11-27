

import { getUsers } from './utils/getUser'


describe('HomeView component', () => {
  it('should display users ', () => {
    cy.visit('/')
    getUsers()
    cy.get('.users-list').should('have.length.greaterThan', 0)
  })
})
describe('DisplayUser component', () => {
  it('should display selected user', () => {
    cy.visit('/')
    getUsers()
    cy.get('.users-list > :nth-child(2)').click()
    cy.get('.user-display-container').contains('Madhura')
  })
})
