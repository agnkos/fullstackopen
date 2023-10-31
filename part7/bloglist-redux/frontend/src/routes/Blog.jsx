import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initializeBlogs } from "../reducers/blogReducer"
import { likeBlog, deleteBlog } from "../reducers/blogReducer"
import { useParams, useNavigate } from "react-router-dom"
import CommentForm from "../components/CommentForm"

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
        <div>
            <h2>{blog.title} - {blog.author}</h2>
            <p><a href={blog.url}>{blog.url}</a></p>
            <p>
                likes: {blog.likes}
                <button onClick={() => dispatch(likeBlog(blog.id))} className="like-btn">
                    like
                </button>
            </p>
            <p>added by: {blog?.user?.username}</p>
            {user.username === blog?.user?.username && (
                <button className="delete-btn" onClick={() => removeBlog(blog.id)}>
                    delete blog
                </button>
            )}
            <h2>comments</h2>
            <CommentForm />
            <ul>
                {blog.comments.map((comment, index) => (
                    <li key={`${comment}${index}`}>{comment}</li>
                ))}
            </ul>
        </div>
    )
}
export default Blog