const lodash = require('lodash')
const dummy = (blogs) => {
    
    return 1
  }
  const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}

  const favoriteOfBlogs = (blogs) => {
    let favorite = blogs[0]
    blogs.forEach((blog) => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }

    })
        delete favorite._id
        delete favorite._v
        return favorite
        
    }
    const mostBlogs = (blogs) => {
        const groupedByAuthor = lodash.groupBy(blogs, blog => blog.author)
        const authorlist = []
        lodash.forEach(groupedByAuthor, (authorBlogs, author) => {
            authorlist.push({
                author: author,
                blogs: authorBlogs.length
            })

        })
            const sortedAuthorList = lodash.sortBy(authorlist, author => author.blogs)
                return sortedAuthorList.pop()
    }

        const mostLikes = (blogs) => {
            const groupedByAuthor = lodash.groupBy(blogs, blog => blog.author)
            const authorList = []
            lodash.forEach(groupedByAuthor, (authorBlogs, author) => {
                authorList.push({
                    author: author,
                    likes: totalLikes(authorBlogs)
                })
            })
        
            const sortedAuthorList = lodash.sortBy(authorList, author => author.likes)
            return sortedAuthorList.pop()
        
    
}

  
  module.exports = {
    dummy, totalLikes, favoriteOfBlogs, mostBlogs, mostLikes,
  }