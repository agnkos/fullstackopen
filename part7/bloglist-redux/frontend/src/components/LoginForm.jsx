import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} className="form">
        <div className="form-element">
          username
          <input type="text" value={username} name="Username" onChange={handleUsernameChange} id="username" />
        </div>
        <div className="form-element">
          password
          <input type="password" value={password} name="Password" onChange={handlePasswordChange} id="password" />
        </div>
        <button type="submit" id="login-button">
          log in
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
