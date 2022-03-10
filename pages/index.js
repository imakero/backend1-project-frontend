import { Box, VStack } from "@chakra-ui/react"
import { useContext, useEffect, useState } from "react"
import Entry from "../components/Entry"
import NewEntry from "../components/NewEntry"
import { UserContext } from "../context/UserContext"

export default function Home() {
  const [entries, setEntries] = useState([])
  const { user, token } = useContext(UserContext)

  useEffect(() => {
    const getEntries = async () => {
      const res = await fetch(`/api/entries/${user.username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setEntries(data)
    }
    if (user) {
      getEntries()
    }
  }, [user, token])

  return (
    <Box>
      <VStack alignItems="start" spacing={0}>
        <NewEntry />
        {entries.map((entry) => (
          <Entry key={entry._id} entry={entry} user={entry.author} />
        ))}
      </VStack>
    </Box>
  )
}
