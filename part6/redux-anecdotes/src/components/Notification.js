import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const styles = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: '1rem',
    display: notification === '' ? 'none' : 'block'
  }

  return (
    <div style={styles}>
      {notification}
    </div>
  )
}

export default Notification