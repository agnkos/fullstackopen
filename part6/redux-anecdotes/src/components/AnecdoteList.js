import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {

    const dispatch = useDispatch()

    const anecdotes = useSelector((state) => {
        if (state.filter !== '') {
            return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
        } else return state.anecdotes
    })


    return (
        <div>  {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
            <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
                </div>
            </div>
        )}</div>
    )
}
export default AnecdoteList