import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { showNotification, hideNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

    const dispatch = useDispatch()

    console.log()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter !== '') {
            return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        } else return anecdotes
    })

    const anecdotesToShow = [...anecdotes]

    const vote = (id, content) => {
        dispatch(addVote(id))
        dispatch(showNotification(`You have voted for '${content}'.`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
    }

    return (
        <div>  {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    {/* <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button> */}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>
        )}</div>
    )
}
export default AnecdoteList