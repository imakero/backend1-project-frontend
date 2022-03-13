import { Box, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useRef, useState } from "react"
import EntryList from "../components/EntryList"
import NewEntry from "../components/NewEntry"
import NewPosts from "../components/NewPosts"
import { SocketContext } from "../context/SocketContext"
import { UserContext } from "../context/UserContext"
import useApi from "../hooks/useApi"

export default function Home() {
  const { user, token, ready } = useContext(UserContext)
  const { setNewPosts } = useContext(SocketContext)
  const options = useRef(null)
  const route = useRef("/entries")
  const [loading, setLoading] = useState(true)
  const { data: entries = [], refresh } = useApi(
    route.current,
    options.current,
    !ready || loading
  )

  useEffect(() => {
    setNewPosts([])
  }, [setNewPosts])

  useEffect(() => {
    options.current = user
      ? { headers: { Authorization: `Bearer ${token}` } }
      : null
    route.current = user ? `/entries/${user.username}` : "/entries"
    setLoading(false)
  }, [user, token])

  return (
    <Box>
      <VStack alignItems="start" spacing={0}>
        <NewEntry refresh={refresh} />
        <NewPosts refresh={refresh} />
        <EntryList entries={entries} />
      </VStack>
    </Box>
  )
}
