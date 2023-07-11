import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({filter, anecdotes}) => {
    console.log(anecdotes)
    if (filter !== ''){
      const expression = new RegExp(filter, 'i')
      const filteredAnecdotes = anecdotes.filter(a => expression.test(a.content))
      return filteredAnecdotes.sort((a,b) => b.votes - a.votes)
    }
    const anecdotesToSort = [...anecdotes]
    return anecdotesToSort.sort((a,b) => b.votes - a.votes)
  })
  

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(setNotification(`voted anecdote: ${anecdote.content}`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, "5000")
  }


  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList