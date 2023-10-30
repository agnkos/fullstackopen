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
import UserContext from './UserContext'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { notificationDispatch } = useContext(NotificationContext)
  const { user, userDispatch } = useContext(UserContext)
  const blogFormRef = useRef()

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs,
    refetchOnWindowFocus: false
  })
  // console.log(JSON.parse(JSON.stringify(result)))

  // useEffect(() => {
  //   console.log('context', user)
  // }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
    }
  }, [userDispatch])

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
      userDispatch({ type: 'LOGIN', payload: user })
      setUsername('')
      setPassword('')
      notificationDispatch({ type: 'SHOW', payload: { content: `${user.username} has logged in`, error: false } })
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' })
      }, 5000)
    } catch (exception) {
      notificationDispatch({ type: 'SHOW', payload: { content: 'Wrong credentials', error: true } })
      setTimeout(() => {
        notificationDispatch({ type: 'NULL' })
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    userDispatch({ type: 'LOGOUT' })
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

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div className='flex'>
        <p>
          <span className='bolded'>{user.name} </span>
          logged in
        </p>
        <button onClick={logOut}>Log out</button>
      </div>
      <Toggle buttonLabel="add blog" ref={blogFormRef}>
        <BlogForm
          hideForm={hideForm}
        />
      </Toggle>
      <div className='blogs-container'>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} />
        )}
      </div>
    </div>
  )
}

export default App