import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "../reducers/blogReducer"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { useParams, useNavigate } from "react-router-dom"
import CommentForm from "../components/CommentForm"
import { Button } from 'react-bootstrap'

const Blog = ({ user }) => {
    const dispatch = useDispatch()
    const id = useParams().id
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(blog => blog.id === id)

    const removeBlog = (id) => {
        if (window.confirm('Do you really want to delete the blog?')) {
            dispatch(deleteBlog(id))
            navigate('/')
        }
    }

    if (!blog) {
        return null
    }

    return (
        <>
            <div className="mb-4">
                <h2>{blog.title} - {blog.author}</h2>
                <p><a href={blog.url} className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover link-opacity-75 link-opacity-100-hover">{blog.url}</a></p>
                <p className="d-flex gap-2">
                    likes: {blog.likes}
                    <Button onClick={() => dispatch(likeBlog(blog.id))} className="text-white py-0" variant='info'>
                        like
                    </Button>
                </p>
                <p>added by: {blog?.user?.username}</p>
                {user.username === blog?.user?.username && (
                    <Button className="delete-btn py-1" onClick={() => removeBlog(blog.id)} variant='danger'>
                        delete blog
                    </Button>
                )}
            </div>
            <h3>comments</h3>
            <CommentForm />
            <div className="p-2 mt-2">
                {blog.comments.map((comment, index) => (
                    <p
                        key={`${comment}${index}`}
                        className="bg-body-secondary p-2"
                    >{comment}</p>
                ))}
            </div>
        </>
    )
}
export default Blog