import { ChakraProvider, HStack, Link, List } from "@chakra-ui/react"
import { UserProvider } from "../context/UserContext"
import NextLink from "next/link"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <HStack>
          <NextLink href={"/"} passHref>
            <Link>Home</Link>
          </NextLink>
        </HStack>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  )
}
export default MyApp
