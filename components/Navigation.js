import { HStack, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Navigation = () => {
  const { user } = useContext(UserContext)

  return (
    <HStack fontSize="lg" fontWeight="bold" mb={4}>
      <NextLink href={"/"} passHref>
        <Link>Home</Link>
      </NextLink>

      {user ? (
        <>
          <NextLink href={"/explore"} passHref>
            <Link>Explore</Link>
          </NextLink>
          <NextLink href={`/${user.username}`} passHref>
            <Link>Profile</Link>
          </NextLink>
          <NextLink href={`/logout`} passHref>
            <Link>Log out</Link>
          </NextLink>
        </>
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
