import { createContext, useReducer } from "react"

const notificationReducer = (state, action) => {
  switch(action.type) {
    case "NEW_ANECDOTE":
      return `Anecdote created`
    case "VOTE":
      return `voted ${action.name}`
    case "ERROR":
      return `Error: ${action.message}`
    case "CLEAR":
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()
export const NotificationContextProvider = ({children}) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return(
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext