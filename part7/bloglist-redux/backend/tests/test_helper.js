const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "guitar blog",
        "author": "Wojtek",
        "url": "www.guitar-hero.com",
        "likes": 14,
        "user": {
            "username": "aga",
            "name": "aga",
            "id": "650f0013e87cf8619251f63b"
        },
        "id": "651545594e161ef90f1da0b4"
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        user: "1234",
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
]

const initialUsers = [
    {
        username: 'aga',
        name: 'aga',
        password: 'piotrek85',
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    blogsInDb,
    usersInDb,
    initialUsers
}