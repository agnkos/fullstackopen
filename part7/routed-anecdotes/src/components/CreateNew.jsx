import { useField } from "../hooks"
import { useNavigate } from "react-router-dom"

const CreateNew = (props) => {
    const navigate = useNavigate()
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')

    console.log(info)

    const handleSubmit = (e) => {
        e.preventDefault()
        props.addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        navigate('/')
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} className="form">
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <div className="btn-container">
                    <button className="btn">create</button>
                    <button onClick={handleReset} className="btn reset-btn">reset</button>
                </div>
            </form>
        </div >
    )
}

export default CreateNew