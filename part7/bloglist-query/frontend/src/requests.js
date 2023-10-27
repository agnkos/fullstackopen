import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

// export const setToken = newToken => {
//   token = `Bearer ${newToken}`
// }

export const getBlogs = () => axios.get(baseUrl).then(res => res.data)

export const createBlog = newBlog => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = `Bearer ${user.token}`
  }
  const config = {
    headers: { Authorization: token },
  }
  // console.log(token)
  return axios.post(baseUrl, newBlog, config).then(res => res.data)
}
