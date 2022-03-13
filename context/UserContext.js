import { createContext, useCallback, useEffect, useState } from "react"
import jwt from "jsonwebtoken"
import { LOCAL_STORAGE_KEY } from "../lib/constants"
import { isExpired } from "../lib/utils"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)

  const fetchUser = useCallback(async () => {
    const res = await fetch(`/api/${jwt.decode(token).username}`)
    const data = await res.json()
    setUser(data.user)
    setReady(true)
  }, [setUser, token])

  useEffect(() => {
    setReady(false)
    const saveToken = () => localStorage.setItem(LOCAL_STORAGE_KEY, token)

    if (!token) {
      const localToken = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (localToken && !isExpired(jwt.decode(localToken).exp)) {
        setToken(localToken)
      } else if (!localToken) {
        setReady(true)
      } else {
        return
      }
    } else {
      saveToken()
      fetchUser()
    }
  }, [token, fetchUser])

  const logOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setUser(null)
    setToken(null)
  }

  return (
    <UserContext.Provider
      value={{ user, token, ready, setToken, logOut, fetchUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
