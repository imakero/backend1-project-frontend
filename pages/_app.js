import { Box, ChakraProvider } from "@chakra-ui/react"
import { UserProvider } from "../context/UserContext"
import Navigation from "../components/Navigation"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Box m={4}>
          <Navigation />
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </UserProvider>
  )
}
export default MyApp
