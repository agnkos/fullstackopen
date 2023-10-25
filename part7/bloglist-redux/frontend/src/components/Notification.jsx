import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  return <div className={`${notification.error ? 'error' : notification ? 'message' : ''}`}>{notification.content}</div>
}

Notification.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.string,
}

export default Notification
