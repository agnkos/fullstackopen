const Notification = ({ message, errorMessage }) => {

    return (
        <div className={`${message ? 'message' : errorMessage ? 'error' : '' }`}>
            {message || errorMessage}
        </div>
    )
}
export default Notification