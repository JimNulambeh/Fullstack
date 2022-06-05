const Blogs = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    
    title: "Coding Marks",
    author: "Milan Perez",
    url: "https://codingmarks.com/",
    likes: 1,
  },
  {
    title: "Unbitable Me",
    author: "Francis Ngan",
    likes: 2,
  },
  {
    _id: "7d422aa71b67a676234d17p3",
    title: "English Grammar",
    author:"Edmond Williams",
    likes: 3,
  },
]

const nonExistingId = async () => {
  const blog = new Blogs({ content: 'willremovethissoon' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blogs.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb}