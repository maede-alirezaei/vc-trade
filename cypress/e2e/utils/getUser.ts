export function getUsers() {
  cy.fixture('users.json').then((json) => {
    cy.intercept('GET', 'https://randomuser.me/api/*', json)
  })
}
