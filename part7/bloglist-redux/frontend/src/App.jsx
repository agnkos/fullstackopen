import { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import UsersList from './routes/UsersList'
import User from './routes/User'
import BlogList from './routes/BlogList'
import Blog from './routes/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { setLoggedUser } from './reducers/loggedUserReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector(state => state.loggedUser)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLoggedUser(user))
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
      dispatch(setLoggedUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({ content: 'wrong credentials', error: true }, 5))
      console.log('wrong credentials')
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setLoggedUser(null))
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

  return (
    <div>
      <Notification />
      <div className="flex">
        <div>
          <NavLink to='/' className='menu-item'>Blogs</NavLink>
          <NavLink to='/users' className='menu-item'>Users</NavLink>
        </div>
        <p>
          <span className="bolded">{user.name} </span>
          logged in
        </p>
        <button onClick={logOut}>Log out</button>
      </div>
      <h2>blogsapp</h2>

      <Routes>
        <Route path='/' element={<BlogList user={user} />} />
        <Route path='blogs/:id' element={<Blog user={user} />} />
        <Route path='/users' element={<UsersList />} />
        <Route path='/users/:id' element={<User />} />
      </Routes>
    </div>
  )
}

export default App
