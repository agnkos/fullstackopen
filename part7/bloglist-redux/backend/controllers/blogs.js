const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id,
        comments: body.comments || []
    })

    if (body.title && body.url) {
        const savedBlog = await blog.save()
        // response.status(201).json(savedBlog)
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()

        const responseBlog = await Blog.findById(savedBlog.id).populate('user', { username: 1, name: 1 })
        response.status(201).json(responseBlog)
    } else response.status(400).end()
})

blogsRouter.post('/:id/comments', async (request, response) => {

    const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 })
    const comment = request.body.comment
    blog.comments.push(comment)
    const commentedBlog = await blog.save()
    response.status(201).json(commentedBlog)

})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        id: body.id,
        user: body.user.id,
        comments: body.comments || []
    }

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })
        response.status(200).json(updatedBlog)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else return response.status(401).json({ error: "user not authorized" })

})

module.exports = blogsRouter