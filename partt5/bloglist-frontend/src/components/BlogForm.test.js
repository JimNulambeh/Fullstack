import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('check that the form calls the event handler it received as props with the right details when a new blog is created. ', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'testing form author' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'testing form author' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'testing form url' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("testing form author")
  expect(createBlog.mock.calls[0][0].author).toBe("testing form author")
  expect(createBlog.mock.calls[0][0].url).toBe("testing form url")

})