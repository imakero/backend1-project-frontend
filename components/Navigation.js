import { HStack, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Navigation = () => {
  const { user } = useContext(UserContext)

  return (
    <HStack>
      <NextLink href={"/"} passHref>
        <Link>Home</Link>
      </NextLink>
      {user ? (
        <NextLink href={`/${user.username}`} passHref>
          <Link>Profile</Link>
        </NextLink>
      ) : (
        <>
          <NextLink href={`/login`} passHref>
            <Link>Log in</Link>
          </NextLink>
          <NextLink href={`/signup`} passHref>
            <Link>Sign up</Link>
          </NextLink>
        </>
      )}
    </HStack>
  )
}

export default Navigation
