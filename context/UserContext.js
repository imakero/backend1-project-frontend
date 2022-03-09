import { createContext, useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import { LOCAL_STORAGE_KEY } from "../lib/constants"
import { isExpired } from "../lib/utils"

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

    const saveToken = () => localStorage.setItem(LOCAL_STORAGE_KEY, token)

    if (!token) {
      const localToken = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (localToken && !isExpired(jwt.decode(localToken).exp)) {
        setToken(localToken)
      } else {
        return
      }
    } else {
      saveToken()
      getUser()
    }
  }, [token])

  const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setUser(null)
    setToken(null)
  }

  return (
    <UserContext.Provider value={{ user, token, setToken, logOut }}>
      {children}
    </UserContext.Provider>
  )
}
