import { UserApiResponse } from '../../../src/services/users'

export function getUsers() {
  cy.fixture('users.json').then((json: UserApiResponse) => {
    cy.intercept(
      'GET',
      'https://randomuser.me/api/?inc=gender,name,email,id,picture,location&exc=login&page=0&results=25',
      json
    ).as('getUserData')
  })
  cy.wait(3000)
}
