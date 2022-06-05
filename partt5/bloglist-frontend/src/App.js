import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notifications from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import './App.css'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    noteService.getAll().then(initialNotes =>
      setNotes(initialNotes)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setMessage(`A new blog "${blogObject.title}" by ${blogObject.author} is added`)
        setTimeout(() => {
          setMessage(null)
        }, 4000)
      })
  }

  const updateBlog = (id, blogObject) => {
    const blogToUpdate = blogs.find(blog => blog.id === id)
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        returnedBlog.user = blogToUpdate.user
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        console.log('Something is wrong here!', error)
      })

  }

  const deleteBlog = (id) => {
    const blog = blogs.find(b => b.id === id)
    const confMessage = (window.confirm(`Remove blog "${blog.title}" by ${blog.author} ?`))
    if(confMessage) {
      blogService
        .removeObject(id)
        .then(() => {
          setBlogs(blogs.filter(b => id !== b.id))
          setMessage(`${blog.title} was deleted!`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
    else {
      return null
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)


    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Successfully logged in')
      setTimeout(() => {
        setMessage(null)
      }, 4000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  const blogsSorted = (blogs) => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  if (user === null) {
    return (
      <div>

        <Notifications message={message} errorMessage={errorMessage} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={ handleLogin }
        />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notifications message={message} errorMessage={errorMessage} />
      <p>{user.name} logged in
        <button onClick={() => {
          window.localStorage.removeItem('loggedUser')
          setUser(null)
        }}>logout</button></p>
      <div>

        <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm createBlog={addNewBlog} />
        </Toggleable>

      </div>
      {blogsSorted(blogs).map(blog =>
        <Blog key={blog.id} blog={blog}updateBlog={updateBlog} deleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )
}

export default App