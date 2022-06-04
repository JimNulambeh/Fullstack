const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Note = require('../models/note')
const User = require('../models/user')

const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false,
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true,
  },
]
  beforeEach(async () => {
    await Note.deleteMany({})

    for (let note of initialNotes) {
        let noteObject = new Note(note)
        await noteObject.save()
    }
  
  })
 

test('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of notes', async () => {
    const response = await api.get('/api/notes')

})

test('unique identifier named id', async () => {
  const response = await api.get('/api/notes')
  expect(response.body[0].id).toBeDefined()

})

test('add a note', async () => {
  const newNote = {
    content: 'This Note',
    date: new Date(),
    important: false,
  } 
  
await api
  .post('/api/notes')
  .send(newNote)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const notes = await Note.find({})
  expect(notes).toHaveLength(initialNotes.length + 1)

  const authors = notes.map(aut => aut.author)
  expect(authors).toContain(newNote.author)

})

test('if no likes, default to 0', async () => {
  const newNote = {
    content: 'New Note',
    date: new Date(),
    important: true,
  }

  await api
    .post('/api/notes')
    .send(newNote)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  

  const notes = await Note.find({})
  expect(notes[initialNotes.length].likes).toBe(0)
})

test('notes must have url and title', async () => {
  const newNote = {
    author: "A.L"
  }
  await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

  const notelist = await Note.find({})
  expect(notelist).toHaveLength(initialNotes.length)
  
})

test('succeeds if the id is valid with code 204', async () => {
  const notes = await Note.find({})
  const noteToDelete = notes[0]

  await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await Note.find({})
    expect(notesAtEnd).toHaveLength(initialNotes.length - 1)

    const note = notesAtEnd.map(b => b.title)
    expect(note).not.toContain(noteToDelete.title)
})

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'Hannes', passwordHash })
  await user.save()
})

test('succeeded with a new username', async () => {
  const usersStart = await User.find({})
  const usersAtStart = await usersStart.map(u => u.toJSON())

  const newUser = {
    username: 'Lisa',
    name: 'Lisa L.',
    password: 'Lissu',
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const usersEnd = await User.find({})
  const usersAtEnd = await usersEnd.map(u => u.toJSON())
  expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

  const usernames = usersAtEnd.map(u => u.username)
  expect(usernames).toContain(newUser.username)
})

afterAll(() => {
  mongoose.connection.close()
  
})