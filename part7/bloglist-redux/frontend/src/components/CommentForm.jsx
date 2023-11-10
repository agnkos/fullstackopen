import { useEffect } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { commentBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

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
        <Form onSubmit={addNewComment} >
            <Form.Group className="d-flex gap-2 flex-column flex-sm-row">
                <Form.Control
                    type='text'
                    value={newComment}
                    onChange={handleCommentChange}
                    className="w-100"
                />
                <Button type='submit' className="flex-sm-shrink-0" variant='success'>add comment</Button>

            </Form.Group>
        </Form>
    )
}
export default CommentForm