describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'N Jim',
        username: 'Jim',
        password: 'Yenkong1.'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
    it('Login form is shown', function() {
      cy.contains('login')
    })
    describe('succeeds with correct credentials', function () {
      it('user can log in', function() {
        cy.contains('login').click()
        cy.get('#username').type('Jim')
        cy.get('#password').type('Yenkong1.')
        cy.get('#login-button').click()
  
        cy.contains('N Jim logged in')
        cy.contains('logout')
      })
  
      it('fails with wrong credentials', function () {
        cy.contains('login').click()
        cy.get('#username').type('Jim')
        cy.get('#password').type('Yenkong')
        cy.get('#login-button').click()
  
        cy.get('.error').contains('Wrong username or password')
        cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get('.error').should('have.css', 'border-style', 'solid')
      })
    })
  
    describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('N Jim')
        cy.get('#password').type('Yenkong1.')
        cy.get('#login-button').click()
      })
  
      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('Saturday blog')
        cy.get('#author').type('N Michael')
        cy.get('#url').type('www.saturdayBlog.fi')
        cy.get('#createBlog').click()
  
        cy.contains('Saturday blog')
        cy.contains('www.saturdayBlog.fi')
        cy.contains('A new blog "Saturday blog" by N Michael is added')
      })
  
      it('A blog can be liked', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('Saturday blog')
        cy.get('#author').type('N Michael')
        cy.get('#url').type('www.saturdayBlog.fi')
        cy.get('#createBlog').click()
        cy.contains('view').click()
  
        cy.get('#likeButton').click()
        cy.get('#likes').contains(1)
  
        cy.get('#likeButton').click()
        cy.get('#likes').contains(2)
  
        cy.get('#likeButton').click()
        cy.get('#likes').contains(3)
  
        cy.get('#likeButton').click()
        cy.get('#likes').contains(4)
      })
      it('A blog can be removed', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('Saturday blog')
        cy.get('#author').type('N Michael')
        cy.get('#url').type('www.saturdayBlog.fi')
        cy.get('#createBlog').click()
        cy.contains('view').click()
  
        cy.contains('Saturday blog')
        cy.get('#removeButton').click()
        cy.get('html').should('not.have.value', 'Saturday blog')
  
      })
      describe.only('Blogs with most likes in order', function() {
        cy.contains('create new blog').click()
  
        it('A blog can be created', function() {
          cy.contains('create new blog').click()
          cy.get('#title').type('Saturday blog')
          cy.get('#author').type('N Michael')
          cy.get('#url').type('www.saturdayBlog.fi')
          cy.get('#likes').type('8')
          cy.get('#createBlog').click()
  
        })
        it('A blog can be created', function() {
          cy.contains('create new blog').click()
          cy.get('#title').type('Sunday blog')
          cy.get('#author').type('Milan N')
          cy.get('#url').type('www.sundayBlog.fi')
          cy.get('#likes').type('4')
          cy.get('#createBlog').click()
  
          it('A blog can be created', function() {
            cy.contains('create new blog').click()
            cy.get('#title').type('Monday blog')
            cy.get('#author').type('Kyle P')
            cy.get('#url').type('www.mondayBlog.fi')
            cy.get('#likes').type('')
            cy.get('#createBlog').click()
          })
  
          cy.get('#likes').contains(8)
          cy.get('#likes').contains(4)
          cy.get('#likes').contains(10)
  
        })
      })
    })
  })