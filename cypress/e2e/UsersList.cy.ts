import { getUsers } from './utils/getUser'

beforeEach(() => {
  cy.visit('/')
  getUsers()
  cy.wait(2000)
})
describe('HomeView component', () => {
  it('Should display users ', () => {
    cy.get('.user-item').should('have.length', 25)
  })
  it('Should display more users by scrolling', () => {
    cy.get('.users-list').scrollTo('bottom')
    cy.wait(4000)
    cy.get('.user-item').should('have.length', 50)
  })
})
describe('DisplayUser component', () => {
  it('Should display selected user', () => {
    cy.get('.users-list > :nth-child(2)').click()
    cy.get('.user-display-container').contains('Madhura')
  })
})
