import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import blogs from './services/blogs'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { getBlogs, createBlog } from './requests'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState({ 'title': '', 'author': '', 'url': '' })

  const blogFormRef = useRef()
  // const queryClient = useQueryClient()


  // const newBlogMutation = useMutation(createBlog, {
  //   onSuccess: createdBlog => {
  //     const blogs = queryClient.getQueryData(['blogs'])
  //     queryClient.setQueryData(['blogs'], blogs.concat(createdBlog))
  //   },
  // })

  // const newBlogMutation = useMutation({ mutationFn: createBlog })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  })
  console.log(JSON.parse(JSON.stringify(result)))


  // useEffect(() => {
  //   blogService.getAll().then(blogs =>
  //     setBlogs(blogs)
  //   )
  // }, [])

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
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
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
        <Notification message={message} errorMessage={errorMessage} />
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
    // event.preventDefault()

    blogFormRef.current.toggleVisibility()

    // newBlogMutation.mutate(newBlog)

    // blogService
    //   .create(newBlog)
    //   .then(returnedBlog => {
    //     // setBlogs(blogs.concat(returnedBlog))
    //     setNewBlog({ 'title': '', 'author': '', 'url': '' })
    //     setMessage(`a new blog ${newBlog.title} by ${newBlog.author} was added.`)
    //     setTimeout(() => {
    //       setMessage(null)
    //     }, 5000)
    //   })
    //   .catch(error => console.log('error', error.response.data.error))
  }

  const hideForm = () => {
    blogFormRef.current.toggleVisibility()
  }

  const addLike = id => {
    const blog = blogs.find(blog => blog.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }

    blogService
      .update(id, likedBlog)
      .then(() => {
        // setBlogs(blogs.map(blog => blog.id !== id ? blog : likedBlog))
      })
      .catch(() => {
        setErrorMessage(`there is no blog ${blog.title}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        // setBlogs(blogs.filter(blog => blog.id !== id))
      })
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
          <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} user={user} />
        )}
      </div>
    </div>
  )
}

export default App