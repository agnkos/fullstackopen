import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({ 'title': '', 'author': '', 'url': '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

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
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
    />
  }

  const handleBlogChange = ({ target }) => {
    setNewBlog({ ...newBlog, [target.name]: target.value })
  }

  const addBlog = (event) => {
    event.preventDefault()

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog({ 'title': '', 'author': '', 'url': '' })
      })
      .catch(error => console.log('error', error.response.data.error))
  }


  return (
    <div>
      <h2>blogs</h2>
      <div className='flex'>
        <p>
          <span className='bolded'>{user.name} </span>
          logged in
        </p>
        <button onClick={logOut}>Log out</button>
      </div>
      <BlogForm
        handleBlogChange={handleBlogChange}
        newBlog={newBlog}
        addBlog={addBlog}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App