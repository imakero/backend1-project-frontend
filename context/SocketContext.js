import { createContext, useContext, useEffect, useRef, useState } from "react"
import socketClient from "socket.io-client"
import { UserContext } from "./UserContext"

export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null)
  const { user } = useContext(UserContext)
  const [newPosts, setNewPosts] = useState([])

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

  return (
    <SocketContext.Provider value={{ newPosts, setNewPosts }}>
      {children}
    </SocketContext.Provider>
  )
}
