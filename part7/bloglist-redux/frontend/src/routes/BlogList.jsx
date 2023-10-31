import { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Toggle from "../components/Toggle"
import BlogForm from "../components/BlogForm"
import { initializeBlogs, createBlog} from "../reducers/blogReducer"
import { Link } from "react-router-dom"


const BlogList = () => {

    const blogFormRef = useRef()
    const dispatch = useDispatch()
    const blogsFromState = useSelector(state => state.blogs)
    const blogs = [...blogsFromState]

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    const addBlog = (newBlog) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createBlog(newBlog))
    }

    return (
        <div>
            <Toggle buttonLabel="add blog" ref={blogFormRef}>
                <BlogForm addBlog={addBlog} />
            </Toggle>
            <div className="blogs-container">
                {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <div key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>
                                {blog.title} - {blog.author}
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    )
}
export default BlogList