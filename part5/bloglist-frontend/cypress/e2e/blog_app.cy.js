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

  describe('When logged in', function () {
    beforeEach(function () {
      // cy.get('#username').type('aga')
      // cy.get('#password').type('Piotrek123')
      // cy.get('#login-button').click()
      cy.login({ username: 'aga', password: 'Piotrek123' })
    })

    it('A blog can be created', function () {
      cy.contains('add blog').click()
      cy.get('.title-input').type('frontend blog')
      cy.get('.author-input').type('aga kos')
      cy.get('.url-input').type('www.frontend.blogspot.com')
      cy.get('.add-btn').click()

      cy.get('.blogs-container').contains('www.frontend.blogspot.com')
    })

    it.only('user can like a blog', function () {
      cy.contains('add blog').click()
      // cy.get('.title-input').type('frontend blog')
      // cy.get('.author-input').type('aga kos')
      // cy.get('.url-input').type('www.frontend.blogspot.com')
      // cy.get('.add-btn').click()

      cy.createBlog({ author: 'aga kos', title: 'frontend blog', url: 'www.frontend.blogspot.com' })
      cy.createBlog({ author: 'aga', title: 'bike blog', url: 'www.mybike.com' })

      cy.contains('frontend blog').parent().find('.show-btn').click()
      cy.contains('frontend blog').parent().find('.like-btn').click()
      cy.get('.blog-likes').should('include.text', 'likes: 1')

    })
  })
})