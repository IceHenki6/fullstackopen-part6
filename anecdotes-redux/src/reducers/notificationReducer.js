
import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    showNotification(state, action){
      return action.payload
    },
    clearNotification(state, action){
      return null
    }
  }
})

export const { showNotification, clearNotification } = notificationSlice.actions

export const setNotification = notification => {
  return async dispatch => {
    dispatch(showNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, "5000")
  }
}

export default notificationSlice.reducer 