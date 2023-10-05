import PropTypes from 'prop-types'

import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog }) => {

  const [showDetail, setShowDetail] = useState(false)

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
        <p>likes {blog.likes} <button onClick={() => addLike(blog.id)}>like</button></p>
        <p>added by: {blog?.user?.username}</p>
        <button className="delete-btn" onClick={() => removeBlog(blog.id)}>delete blog</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog