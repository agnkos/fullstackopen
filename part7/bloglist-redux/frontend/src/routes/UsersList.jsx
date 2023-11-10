import { useEffect } from "react"
import { initializeUsers } from "../reducers/usersReducer"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Table } from 'react-bootstrap'

const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    return (
        <div>
            <h2>Users</h2>
            <Table striped className="users-table">
                <thead>
                    <tr>
                        <th>user name</th>
                        <th>blogs created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td><Link to={`/users/${user.id}`} className="link-dark link-opacity-75 link-opacity-100-hover link-underline-opacity-25 link-underline-opacity-100-hover link-offset-2">{user.username}</Link></td>
                            <td>{user.blogs.length}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
export default Users