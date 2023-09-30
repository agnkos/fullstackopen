import { useEffect, useState } from "react"

const Blog = ({ blog, addLike }) => {

  const [showDetail, setShowDetail] = useState(false)

  const toggleShowDetail = () => {
    setShowDetail(!showDetail)
  }

  const hideWhenVisible = { display: showDetail ? 'none' : '' }
  const showWhenVisible = { display: showDetail ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible} className="blog-element">
        {blog.title} - {blog.author} <button onClick={toggleShowDetail}>view</button>
      </div>
      <div style={showWhenVisible} className="blog-detail">
        <p className="blog-title">{blog.title} - {blog.author} <button onClick={toggleShowDetail}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={() => addLike(blog.id)}>like</button></p>
        <p>added by: {blog?.user?.username}</p>
      </div>
    </div>
  )
}

export default Blog