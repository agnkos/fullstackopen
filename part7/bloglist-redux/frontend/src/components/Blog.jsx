import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, removeBlog, user }) => {
  const [showDetail, setShowDetail] = useState(false)
  const dispatch = useDispatch()

  const toggleShowDetail = () => {
    setShowDetail(!showDetail)
  }

  const hideWhenVisible = { display: showDetail ? 'none' : '' }
  const showWhenVisible = { display: showDetail ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible} className="blog-element">
        {blog.title} - {blog.author}{' '}
        <button onClick={toggleShowDetail} className="show-btn">
          view
        </button>
      </div>
      <div style={showWhenVisible} className="blog-detail">
        <p className="blog-title">
          {blog.title} - {blog.author} <button onClick={toggleShowDetail}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p className="blog-likes">
          likes: {blog.likes}{' '}
          <button onClick={() => dispatch(likeBlog(blog.id))} className="like-btn">
            like
          </button>
        </p>
        <p>added by: {blog?.user?.username}</p>
        {user.username === blog?.user?.username && (
          <button className="delete-btn" onClick={() => removeBlog(blog.id)}>
            delete blog
          </button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
