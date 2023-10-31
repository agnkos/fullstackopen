import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams, useMatch } from "react-router-dom"
import { initializeUsers } from "../reducers/usersReducer"

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
            <h3>added blogs</h3>
            <ul>
                {user.blogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}
export default User