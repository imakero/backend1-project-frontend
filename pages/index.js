import { Box, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Entry from "../components/Entry"
import NewEntry from "../components/NewEntry"

export default function Home() {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    const getEntries = async () => {
      const res = await fetch("/api/entries")
      const data = await res.json()
      setEntries(data)
    }
    getEntries()
  }, [])

  return (
    <Box>
      <VStack alignItems="start">
        <NewEntry />
        {entries.map((entry) => (
          <Entry key={entry._id} entry={entry} user={entry.author} />
        ))}
      </VStack>
    </Box>
  )
}
