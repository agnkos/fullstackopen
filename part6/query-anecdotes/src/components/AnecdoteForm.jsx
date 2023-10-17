import { useQueryClient, useMutation } from "@tanstack/react-query"
import { createAnecdote } from '../requests'
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: newAnecdote => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({ type: 'ADD', payload: content })
    setTimeout(() => {
      notificationDispatch({ type: 'NULL' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
