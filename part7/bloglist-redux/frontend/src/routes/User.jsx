import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useMatch } from "react-router-dom"
import { initializeUsers } from "../reducers/usersReducer"
import { ListGroup } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap"

const User = () => {
    const dispatch = useDispatch()
    const id = useParams().id

    useEffect(() => {
        dispatch(initializeUsers())
    }, [])

    const users = useSelector(state => state.users)
    const user = users.find(user => user.id === id)

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs:</h3>
            <ListGroup className="list">
                {user.blogs.map(blog => (
                    <ListGroup.Item
                        action
                        variant='light'
                        key={blog.id}>
                        <LinkContainer to={`/blogs/${blog.id}`}>
                            <a className="link-dark link-underline-opacity-0"> {blog.title}</a>
                        </LinkContainer>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}
export default User