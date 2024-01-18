describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'reinout schols',
      username: 'reinout',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('user can login with correct credentials', function () {
      cy.get('input:first').type('reinout')
      cy.get('input:last').type('password')
      cy.contains('login').click()
      cy.contains('reinout logged in')
    })

    it('user login fails with wrong credentials', function () {
      cy.get('input:first').type('reinout')
      cy.get('input:last').type('password1')
      cy.contains('login').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'reinout', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title-id').type('amazing title')
      cy.get('#author-id').type('amazing author')
      cy.get('#url-id').type('url')
      cy.get('#create').click()
      cy.contains('amazing title amazing author')
    })

    it.only('Blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title-id').type('amazing title')
      cy.get('#author-id').type('amazing author')
      cy.get('#url-id').type('url')
      cy.get('#create').click()
      cy.get('#view').click()
      cy.get('#like').click()
      cy.contains('likes 1')
    })
  })
})