import { ChakraProvider, HStack, Link, List } from "@chakra-ui/react"
import { UserProvider } from "../context/UserContext"
import NextLink from "next/link"
import Navigation from "../components/Navigation"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Navigation />
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  )
}
export default MyApp
