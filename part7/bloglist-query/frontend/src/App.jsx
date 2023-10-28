import { useState, useEffect, useRef, useContext } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import { useQuery } from '@tanstack/react-query'
import { getBlogs } from './requests'
import NotificationContext from './NotificationContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const { notificationDispatch } = useContext(NotificationContext)
  const blogFormRef = useRef()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })
  console.log(JSON.parse(JSON.stringify(result)))

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <span>blog service not available due to problems in server</span>
  }

  const blogs = result.data

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
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({ type: 'SHOW', payload: { content: 'Wrong credentials', error: true } })
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' })
      }, 5000)
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

  const hideForm = () => {
    blogFormRef.current.toggleVisibility()
  }

  const removeBlog = id => {
    if (window.confirm('Do you really want to delete the blog?')) {
      blogService
        .remove(id)
        .then(() => {
          // setBlogs(blogs.filter(blog => blog.id !== id))
          setMessage('Blog deleted')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(error.message)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <div className='flex'>
        <p>
          <span className='bolded'>{user.name} </span>
          logged in
        </p>
        <button onClick={logOut}>Log out</button>
      </div>
      <Toggle buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm
          // addBlog={addBlog}
          hideForm={hideForm}
        />
      </Toggle>
      <div className='blogs-container'>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} removeBlog={removeBlog} user={user} />
        )}
      </div>
    </div>
  )
}

export default App