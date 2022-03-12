import { HStack } from "@chakra-ui/react"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import NavLink from "./NavLink"

const Navigation = () => {
  const { user } = useContext(UserContext)

  return (
    <HStack fontSize="lg" fontWeight="bold" mb={4}>
      <NavLink href="/">Home</NavLink>

      {user ? (
        <>
          <NavLink href="/explore">Explore</NavLink>
          <NavLink href={`/${user.username}`}>Profile</NavLink>
          <NavLink href="/logout">Log out</NavLink>
        </>
      ) : (
        <>
          <NavLink href="/login">Log in</NavLink>
          <NavLink href="/signup">Sign up</NavLink>
        </>
      )}
    </HStack>
  )
}

export default Navigation
