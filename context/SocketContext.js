import { createContext, useContext, useEffect, useRef, useState } from "react"
import socketClient from "socket.io-client"
import { UserContext } from "./UserContext"

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null)
  const { user } = useContext(UserContext)
  const [newPosts, setNewPosts] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    socketRef.current = socketClient("http://localhost:5000")

    return () => socketRef.current.disconnect()
  }, [])

  useEffect(() => {
    if (user && socketRef.current.disconnect) {
      socketRef.current.emit("setUser", {
        userId: user._id,
        username: user.username,
      })
      socketRef.current.on("newPost", (post) => {
        setNewPosts((prev) => [...prev, post])
      })
    }

    return () => socketRef.current.off("newPost")
  }, [user])

  useEffect(() => {
    if (!newPosts.length) {
      setRefresh(false)
    }
  }, [newPosts])

  const loadNewPosts = () => {
    setRefresh(true)
    setNewPosts([])
  }

  return (
    <SocketContext.Provider
      value={{ newPosts, setNewPosts, loadNewPosts, refresh }}
    >
      {children}
    </SocketContext.Provider>
  )
}
