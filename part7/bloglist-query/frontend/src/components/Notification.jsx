import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {

  const { notification } = useContext(NotificationContext)

  if (notification === undefined) return null

  else
    return (
      <div className={`${notification?.error ? 'error' : notification ? 'message' : ''}`}>
        {notification.content}
      </div>
    )
}

export default Notification