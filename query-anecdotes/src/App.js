import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })


  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({
      type: "VOTE",
      name: anecdote.content
    })
    setTimeout(()=>{
      dispatch({type:"CLEAR"})
    }, 5000)
    console.log('vote')
  }

  const result = useQuery('anecdotes', getAnecdotes,{
    retry: 1
  }) 

  if(result.isLoading){
    return(
      <div>loading...</div>
    )
  }

  if(result.isError){
    return(
      <div>anecdote service not available due to problems in server</div>
    )
  }

  console.log(result.data)
  const anecdotes = result.data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes && anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
