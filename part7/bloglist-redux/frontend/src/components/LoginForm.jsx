import PropTypes from 'prop-types'
import { Form, Button, Container } from 'react-bootstrap'

const LoginForm = ({ handleLogin, username, password, handleUsernameChange, handlePasswordChange }) => {
  return (
    <Container className='p-5'>
      <h2 className='mb-4'>Sign in to the application</h2>
      <Form onSubmit={handleLogin} className="login-form">
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control type="text" value={username} name="Username" onChange={handleUsernameChange} id="username" />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control type="password" value={password} name="Password" onChange={handlePasswordChange} id="password" />
        </Form.Group>
        <Button type="submit" id="login-button" variant='success' className='mt-3'>
          log in
        </Button>
      </Form>
    </Container>
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
