import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => {
 return axios.get(baseUrl).then(res => res.data)
}

export const createAnecdote = (newObj) => {
 return axios.post(baseUrl, newObj).then(res => res.data)
}

export const updateAnecdote = (newObj) => {
 return axios.put(`${baseUrl}/${newObj.id}`, newObj).then(res => res.data)
}