import { useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Toggle from "../components/Toggle"
import BlogForm from "../components/BlogForm"
import { initializeBlogs, createBlog } from "../reducers/blogReducer"
import { ListGroup } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


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
            <h2 className="mt-3">List of blogs</h2>
            <ListGroup className="mt-2 col-lg-8 list">
                {blogs
                    .sort((a, b) => b.likes - a.likes)
                    .map((blog) => (
                        <ListGroup.Item key={blog.id} action variant="light">
                            <LinkContainer to={`/blogs/${blog.id}`}>
                                <a className="link-dark link-underline-opacity-0">{blog.title} - {blog.author}</a>
                            </LinkContainer>
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    )
}
export default BlogList