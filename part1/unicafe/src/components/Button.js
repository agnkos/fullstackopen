const Button = ({ onClick, text, color }) => {
    return (
        <button onClick={onClick} className={`btn ${color}`}>{text}</button>
    )
}
export default Button