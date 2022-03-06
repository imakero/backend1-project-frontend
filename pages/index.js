import { Box, Heading, HStack, Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { useContext } from "react"
import NewEntry from "../components/NewEntry"
import { UserContext } from "../context/UserContext"

export default function Home() {
  const { user } = useContext(UserContext)

  return (
    <Box>
      <Heading>Home</Heading>
      <NewEntry user={user} />
      <HStack spacing={2}>
        <NextLink href={"/signup"} passHref>
          <Link>Sign up</Link>
        </NextLink>
        <NextLink href={"/login"} passHref>
          <Link>Log in</Link>
        </NextLink>
      </HStack>
    </Box>
  )
}
