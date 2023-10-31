import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { commentBlog } from '../reducers/blogReducer'

const CommentForm = () => {
    const [newComment, setNewComment] = useState('')
    const dispatch = useDispatch()
    const id = useParams().id

    const handleCommentChange = ({ target }) => {
        setNewComment(target.value)
    }

    const addNewComment = (event) => {
        event.preventDefault()
        dispatch(commentBlog(id, { comment: newComment }))
        setNewComment('')
    }

    useEffect(() => {
        console.log(newComment)
    }, [newComment])


    return (
        <form onSubmit={addNewComment}>
            <input
                type='text'
                value={newComment}
                onChange={handleCommentChange}
            />
            <button type='submit'>add comment</button>
        </form>
    )
}
export default CommentForm