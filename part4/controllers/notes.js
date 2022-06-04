const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const note = require('../models/note')



notesRouter.get('/', async (request, response) => {
    const notes = await Note
      .find({}).populate('user', { username: 1, name: 1 })
  response.json(notes.map(note => note.toJSON()))
  })


notesRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
 

  const note = new Note({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })
  
  try {
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.json(savedNote)
  } catch(exception) {
    response.status(400).end()
  }
    
})

notesRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'Missing or invalid token' })
  }
  const userid = decodedToken.id

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() === userid.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
  } else {
      response.status(400).json({ error: 'token or user does not exist' })
  }

    
})

notesRouter.put('/:id', async (request, response) => {
  const body = request.body

  const note = {
    likes: body.likes || 0,
  }

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true })
  response.status(200).json(updatedNote)

})
 

module.exports = notesRouter