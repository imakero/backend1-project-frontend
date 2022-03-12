import { Button, HStack } from "@chakra-ui/react"
import { useContext } from "react"
import { SocketContext } from "../context/SocketContext"

const NewPosts = ({ refresh }) => {
  const { newPosts, setNewPosts } = useContext(SocketContext)

  if (!newPosts.length) {
    return null
  }

  return (
    <HStack
      spacing={2}
      justify="center"
      width="100%"
      maxWidth={500}
      border="1px solid #e3e3e3"
      marginTop="-1px"
    >
      <Button
        variant="ghost"
        color="teal"
        width="100%"
        height="100%"
        p={4}
        borderRadius={0}
        onClick={() => {
          refresh()
          setNewPosts([])
        }}
      >
        Show {newPosts.length} new posts
      </Button>
    </HStack>
  )
}

export default NewPosts
