import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotesService"
import { useDispatch } from "react-redux"


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    // updateAnecdote(state, action) {
    //   const anecdoteToUpdate = action.payload

    //   return state.map(anecdote => anecdote.id !== anecdoteToUpdate.id ? anecdote : anecdote.Update)
    // },
    setAnecdotes(state,action){
      return action.payload
    },
    addAnecdote(state, action){
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, addAnecdote } = anecdoteSlice.actions


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = {
      content: anecdote.content,
      votes: anecdote.votes + 1
    }
    const updatedAnecdote = await anecdotesService.update(votedAnecdote, anecdote.id)
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default anecdoteSlice.reducer