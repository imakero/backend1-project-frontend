import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"

const Logout = () => {
  const { logOut } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    logOut()
    router.push("/")
  }, [logOut, router])

  return <></>
}

export default Logout
