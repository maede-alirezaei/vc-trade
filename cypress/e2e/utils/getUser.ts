import { UserApiResponse } from '../../../src/services/users'

export function getUsers() {
  cy.fixture('users.json').then((json: UserApiResponse) => {
    cy.intercept('GET', 'https://randomuser.me/api/*', json).as('getUserData')
  })
  cy.wait(3000)
}
