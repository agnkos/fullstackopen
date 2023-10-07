import PropTypes from 'prop-types'

const Notification = ({ message, errorMessage }) => {

  return (
    <div className={`${message ? 'message' : errorMessage ? 'error' : ''}`}>
      {message || errorMessage}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string
}

export default Notification