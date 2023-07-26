import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  // if (true) return null

  const [notification, dispatch] = useContext(NotificationContext)
  return (
    <div>
      {notification && <div style={style}>
        {notification}
      </div>}
    </div>
  )
}

export default Notification
