import { Box, ChakraProvider, VStack } from "@chakra-ui/react"
import { UserProvider } from "../context/UserContext"
import Navigation from "../components/Navigation"
import { SocketProvider } from "../context/SocketContext"

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <SocketProvider>
        <ChakraProvider>
          <VStack>
            <Box m={4} width={500}>
              <Navigation />
              <Component {...pageProps} />
            </Box>
          </VStack>
        </ChakraProvider>
      </SocketProvider>
    </UserProvider>
  )
}
export default MyApp
