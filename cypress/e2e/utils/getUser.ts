import { UserApiResponse } from '../../../src/services/users'

export function getUsers() {
  console.log('in test bef')

  cy.fixture('users.json').then((json: UserApiResponse) => {
    cy.intercept('GET', 'https://randomuser.me/api/?page=0&results=25', json).as('getUserData') 
  })
  // cy.wait('@getUserData')
}
