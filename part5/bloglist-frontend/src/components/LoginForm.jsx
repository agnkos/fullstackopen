const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin} className="form">
                <div className="form-element">
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div className="form-element">
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}
export default LoginForm