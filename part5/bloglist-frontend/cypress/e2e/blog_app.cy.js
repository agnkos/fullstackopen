describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Agnieszka Kosiedowska',
      username: 'aga',
      password: 'Piotrek123'
    }
    cy.request('POST', 'http://localhost:5173/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('aga')
      cy.get('#password').type('Piotrek123')
      cy.get('#login-button').click()

      cy.get('html').should('contain', 'Agnieszka Kosiedowska logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('Piotrek')
      cy.get('#password').type('aga123')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-color', 'rgb(255, 0, 0)')
    })

  })
})