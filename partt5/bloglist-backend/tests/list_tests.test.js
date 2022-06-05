const listHelper = require('../utils/list_helper')

const blogs = [
    {
        _id: "7d422aa71b67a676234d17p1",
        title: "Coding Marks",
        author: "Milan Perez",
        url: "https://codingmarks.com/",
        likes: 1,
        __v: 0
    },
    {
        _id: "7d422aa71b67a676234d17p2",
        title: "Unbitable Me",
        author: "Francis Ngan",
        likes: 2,
        __v: 0
    },
    {
        _id: "7d422aa71b67a676234d17p3",
        title: "English Grammar",
        author:"Edmond Williams",
        likes: 3,
        __v: 0
    },
    {
        _id: "7d422aa71b67a676234d17p4",
        title: "Sugar Levels",
        author: "Helmen James",
        likes: 4,
        __v: 0
    }
  
  
]

describe('total likes', () => {
    test('of empty list is zero', () => {
      const result = listHelper.totalLikes([])
      expect(result).toBe(0)
    })
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes([blogs[0]])
      expect(result).toBe(7)
    })
  
    test('of a longer list is calculated right', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })
  })
  
  describe('favorite blog', () => {
    test('of empty list is null', () => {
      const result = listHelper.favoriteBlog([])
      expect(result).toBe(null)
    })
  
    test('when list has only one blog, is that', () => {
      const result = listHelper.favoriteBlog([blogs[0]])
      expect(result).toBe(blogs[0])
    })
  
    test('of a longer list is the one with most votes', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toBe(blogs[2])
    })
  
  })
  
  describe('most blogs', () => {
    test('of empty list is null', () => {
      const result = listHelper.mostBlogs([])
      expect(result).toEqual(null)
    })
  
    test('when list has only one blog, is the author of that', () => {
      const result = listHelper.mostBlogs([blogs[0]])
      expect(result).toEqual({
        author: 'Milan Perez',
        blogs: 1
      })
    })
  
    test('of a longer list is the author with most blogs', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({
        author: 'Helmen James',
        blogs: 4
      })
    })
  })
  
  describe('most likes', () => {
    test('of empty list is null', () => {
      const result = listHelper.mostLikes([])
      expect(result).toEqual(null)
    })
  
    test('when list has only one blog, is the author of that', () => {
      const result = listHelper.mostLikes([blogs[0]])
      expect(result).toEqual({
        author: 'Milan Perez',
        likes: 1
      })
    })
  
    test('of a longer list is the author with most likes', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({
        author: 'Edmond Williams',
        likes: 3
      })
    })
  })