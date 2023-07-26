import { useQueryClient, useMutation } from "react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const anecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
      dispatch({ 
        type:"NEW_ANECDOTE"
       })
      setTimeout(()=>{
        dispatch({type:"CLEAR"})
      }, 5000)
    },
    onError: () => {
      console.log('error')
      dispatch({ 
        type:"ERROR",
        message: "Too short anecdote, must have length 5 or more"
       })
      setTimeout(()=>{
        dispatch({type:"CLEAR"})
      }, 5000)
    }
  })


  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteMutation.mutate({content, votes: 0})
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
