import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return <Alert
    variant={`${notification.error ? 'danger' : notification ? 'success' : ''}`}
    className={`${notification.error || notification ? 'd-block w-50 position-absolute top-0 end-0 m-2 opacity-75 z-1' : 'd-none'}`}
  >{notification.content}
  </Alert>
}

Notification.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string,
}

export default Notification
