import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('Blog />', () => {
  let component
  const likeBlog = jest.fn()
  const blog = {
    title: 'Done by me',
    author: 'By me',
    url: 'www.byme.com',
    user: { 
      username: 'Wiskas',
      name: 'Gizmo',
      id: '123',
    },
   
    likes: 36
  }

  beforeEach(() => {
    const user = {}

    component = render( <Blog blog={blog} updateBlog={likeBlog} user={user} />
    )
  })

describe('What is shown in a blog', () => {
    test('renders the blogs title and author, but does not render its url or number', () => {
      const div = component.container.querySelector('.blog')
      expect(div).toHaveTextContent(blog.title)
      expect(div).toHaveTextContent(blog.author)

      expect(div).not.toHaveTextContent(blog.url)
      expect(div).not.toHaveTextContent(blog.likes)
    
  })


    test('checks that url and number of likes are shown when the button has been clicked', () => {  
      const button = component.getByText('view')
      fireEvent.click(button)

      const div = component.container.querySelector('.blog')
      expect(div).toHaveTextContent(blog.title)
      expect(div).toHaveTextContent(blog.author)

      const div2 = component.container.querySelector('.detail')
      expect(div2).toHaveTextContent(blog.url)
      expect(div2).toHaveTextContent(blog.likes)
      expect(div2).not.toHaveStyle('display: none')

    })
  })
  describe('Like function', () => {
    test('if the like button is clicked twice, the event handler the component is called twice', () => {

 
    const likeButton = component.getByText('like')
    component.debug()
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(likeBlog.mock.calls).toHaveLength(2)
  })
 
  })
})