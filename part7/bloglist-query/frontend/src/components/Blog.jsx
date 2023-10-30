import PropTypes from 'prop-types'
import { useState, useContext } from 'react'
import { updateBlog, removeBlog } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from '../NotificationContext'

const Blog = ({ blog, user }) => {

  const [showDetail, setShowDetail] = useState(false)
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const updateBlogMutation = useMutation({
    mutationFn: updateBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
      notificationDispatch({ type: 'SHOW', payload: { content: `You liked '${updatedBlog.title}' blog.`, error: false } })
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({ type: 'SHOW', payload: { content: 'Error occurred', error: true } })
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' })
      }, 5000)
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: removeBlog,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ['blogs'] })
      queryClient.setQueryData(['blogs'], blogs => blogs.filter(blog => blog.id !== id))
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      notificationDispatch({ type: 'SHOW', payload: { content: 'The blog was deleted', error: false } })
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({ type: 'SHOW', payload: { content: 'Error occurred', error: true } })
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' })
      }, 5000)
    }
  })

  const addLike = blog => {
    updateBlogMutation.mutate({ ...blog, likes: blog.likes + 1 })
  }

  const deleteBlog = id => {
    if (window.confirm('Do you really want to delete the blog?')) {
      console.log(id)
      removeBlogMutation.mutate(id)
    }
  }

  const toggleShowDetail = () => {
    setShowDetail(!showDetail)
  }

  const hideWhenVisible = { display: showDetail ? 'none' : '' }
  const showWhenVisible = { display: showDetail ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible} className="blog-element">
        {blog.title} - {blog.author} <button onClick={toggleShowDetail} className='show-btn'>view</button>
      </div>
      <div style={showWhenVisible} className="blog-detail">
        <p className="blog-title">{blog.title} - {blog.author} <button onClick={toggleShowDetail}>hide</button></p>
        <p>{blog.url}</p>
        <p className='blog-likes'>likes: {blog.likes} <button onClick={() => addLike(blog)} className='like-btn'>like</button></p>
        <p>added by: {blog?.user?.username}</p>
        {user.username === blog?.user?.username && <button className="delete-btn" onClick={() => deleteBlog(blog.id)}>delete blog</button>}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog