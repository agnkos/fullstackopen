import { useEffect } from "react"
import { initializeUsers } from "../reducers/usersReducer"
import { useDispatch, useSelector } from "react-redux"

const Users = () => {

    const dispatch = useDispatch()
    const users = useSelector(state => state.users)

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    return (
        <div>
            <h2>Users</h2>
            <table>
                <tr>
                    <th>user name</th>
                    <th>blogs created</th>
                </tr>
                {users.map(user => (
                    <tr>
                        <td>{user.username}</td>
                        <td>{user.blogs.length}</td>
                    </tr>
                ))}
            </table>
        </div>
    )
}
export default Users