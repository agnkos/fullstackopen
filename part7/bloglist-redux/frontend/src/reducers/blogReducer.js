import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setAllBlogs(state, action) {
            return action.payload
        },
        appendBlog(state, action) {
            state.push(action.payload)
        },
    }
})

export const { setAllBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setAllBlogs(blogs))
    }
}

export const createBlog = content => {
    return async dispatch => {
        try {
            const blog = await blogService.create(content)
            dispatch(appendBlog(blog))
            dispatch(setNotification({ content: `a new blog ${blog.title} by ${blog.author} was added.`, error: false }, 5))
        } catch (error) {
            console.log(error)
            dispatch(setNotification({ content: `${error.message}`, error: true }, 5))
        }
    }
}

export const likeBlog = id => {
    return async (dispatch, getState) => {
        const { blogs } = getState()
        const updatedBlog = blogs.find(blog => blog.id == id)
        try {
            const changedBlog = { ...updatedBlog, likes: updatedBlog.likes + 1 }
            const blog = await blogService.update(id, changedBlog)
            const updatedBlogs = blogs.map(b => b.id !== id ? b : blog)
            dispatch(setAllBlogs(updatedBlogs))
            dispatch(setNotification({ content: `You have liked '${blog.title}' blog.`, error: false }, 5))
        } catch (error) {
            dispatch(setNotification({ content: `Fail to update the '${updatedBlog.title}' blog. `, error: true }, 5))
        }
    }
}

export default blogSlice.reducer