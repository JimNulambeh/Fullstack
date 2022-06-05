import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addNewBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
             title:
          <input
            id='title'
            type="text"
            value={newBlogTitle}
            name="title"
            onChange={({ target }) => setNewBlogTitle(target.value)}
          />
        </div>
        <div>
                author:
          <input
            id='author'
            type="text"
            value={newBlogAuthor}
            name="author"
            onChange={({ target }) => setNewBlogAuthor(target.value)}
          />
        </div>
        <div>
                url:
          <input
            id='url'
            type="text"
            value={newBlogUrl}
            name="url"
            onChange={({ target }) => setNewBlogUrl(target.value)}
          />
        </div>
        <button id="createBlog" type="submit">create</button>
      </form >
    </div>
  )


}


export default BlogForm