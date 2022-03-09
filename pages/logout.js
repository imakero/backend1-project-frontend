import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"

const Logout = () => {
  const { logOut } = useContext(UserContext)
  const router = useRouter()

  useEffect(() => {
    logOut()
    router.push("/")
  }, [])

  return <></>
}

export default Logout
