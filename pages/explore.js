import { Box, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Entry from "../components/Entry"
import EntryList from "../components/EntryList"

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
      <VStack alignItems="start" spacing={0}>
        <EntryList entries={entries} />
      </VStack>
    </Box>
  )
}
