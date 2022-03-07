import { createContext, useEffect, useState } from "react"
import jwt from "jsonwebtoken"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch(`/api/${jwt.decode(token).username}`)
      const data = await res.json()
      setUser(data.user)
    }

    if (!token) {
      return
    } else {
      getUser()
    }
  }, [token])

  return (
    <UserContext.Provider value={{ user, token, setToken }}>
      {children}
    </UserContext.Provider>
  )
}
