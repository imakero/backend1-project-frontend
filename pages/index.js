import { Box, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import Entry from "../components/Entry"
import NewEntry from "../components/NewEntry"
import NewPosts from "../components/NewPosts"
import { SocketContext } from "../context/SocketContext"
import { UserContext } from "../context/UserContext"

export default function Home() {
  const [entries, setEntries] = useState([])
  const { user, token } = useContext(UserContext)
  const { refresh, setNewPosts } = useContext(SocketContext)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getEntries = async (user) => {
      let url = "/api/entries"
      let options = {}
      if (user) {
        url = `/api/entries/${user.username}`
        options = { headers: { Authorization: `Bearer ${token}` } }
        console.log(url, options)
      }
      const res = await fetch(url, options)
      const data = await res.json()
      setEntries(data)
    }
    getEntries()
  }, [user, token, refresh])

  useEffect(() => {
    if (loading) {
      setNewPosts([])
      setLoading(false)
    }
  }, [loading, setNewPosts])

  return (
    <Box>
      <VStack alignItems="start" spacing={0}>
        <NewEntry />
        <NewPosts />
        {entries.map((entry) => (
          <Entry key={entry._id} entry={entry} user={entry.author} />
        ))}
      </VStack>
    </Box>
  )
}
