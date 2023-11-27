import { getUsers } from './utils/getUser'

beforeEach(() => {
  cy.visit('/')
  getUsers()
})
describe('Search User component', () => {
  it('Should filter users by changing the gender ', () => {
    cy.get('.select-container').select('female')
    cy.get('.users-list > :nth-child(1)').not('Pedro')
  })
  it('Should filter users by writing in the input ', () => {
    cy.get('.input-field').type('Madhura')
    cy.get('.users-list > :nth-child(1)').contains('Madhura')
  })
})
