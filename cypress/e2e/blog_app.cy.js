describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
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

    it.only('user login fails with wrong credentials', function () {
      cy.get('input:first').type('reinout')
      cy.get('input:last').type('password1')
      cy.contains('login').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})