import { Box, ChakraProvider } from "@chakra-ui/react"
import { UserProvider } from "../context/UserContext"
import Navigation from "../components/Navigation"
import { SocketProvider } from "../context/SocketContext"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <SocketProvider>
        <ChakraProvider>
          <Box m={4}>
            <Navigation />
            <Component {...pageProps} />
          </Box>
        </ChakraProvider>
      </SocketProvider>
    </UserProvider>
  )
}
export default MyApp
