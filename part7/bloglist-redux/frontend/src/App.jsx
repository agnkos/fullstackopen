import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const blogFormRef = useRef()
  const blogsFromState = useSelector(state => state.blogs)
  const blogs = [...blogsFromState]

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = ({ target }) => {
    setUsername(target.value)
  }
  const handlePasswordChange = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({ content: 'wrong credentials', error: true }, 5))
      console.log('wrong credentials')
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </>
    )
  }

  const addBlog = (newBlog) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
  }

  const removeBlog = (id) => {
    if (window.confirm('Do you really want to delete the blog?')) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
          dispatch(setNotification({ content: 'Blog deleted', error: false }, 5))
        })
        .catch((error) => {
          dispatch(setNotification({ content: `${error.message}`, error: true }, 5))
        })
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div className="flex">
        <p>
          <span className="bolded">{user.name} </span>
          logged in
        </p>
        <button onClick={logOut}>Log out</button>
      </div>
      <Toggle buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Toggle>
      <div className="blogs-container">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} removeBlog={removeBlog} user={user} />
          ))}
      </div>
    </div>
  )
}

export default App
