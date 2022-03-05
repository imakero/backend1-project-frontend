import { Box, Heading, Link } from "@chakra-ui/react"
import NextLink from "next/link"

export default function Home() {
  return (
    <Box>
      <Heading>Home</Heading>
      <NextLink href={"/signup"} passHref>
        <Link>Sign up</Link>
      </NextLink>
    </Box>
  )
}
