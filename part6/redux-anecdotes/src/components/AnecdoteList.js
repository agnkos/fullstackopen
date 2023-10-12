import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

    const dispatch = useDispatch()

    console.log()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if (filter !== '') {
            return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
        } else return anecdotes
    })

    const anecdotesToShow = [...anecdotes]

    const vote = async (id, content) => {
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`You have voted for '${content}'.`, 5))
    }

    return (
        <div>  {anecdotesToShow.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
            </div>
        )}</div>
    )
}
export default AnecdoteList