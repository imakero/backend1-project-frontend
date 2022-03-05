import { createContext, useEffect, useState } from "react"
import jwt from "jsonwebtoken"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (!token) {
      return
    } else {
      setUser(jwt.decode(token))
    }
  }, [token])

  return (
    <UserContext.Provider value={{ user, token, setToken }}>
      {children}
    </UserContext.Provider>
  )
}
