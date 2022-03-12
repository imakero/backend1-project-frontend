import { Box, Heading, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Entry from "../../components/Entry"
import EntryList from "../../components/EntryList"

export default function Tag() {
  const [entries, setEntries] = useState([])
  const router = useRouter()
  const { tag } = router.query

  useEffect(() => {
    const getEntries = async () => {
      const res = await fetch(`/api/tags/${tag}`)
      const data = await res.json()
      setEntries(data)
    }
    if (tag) {
      getEntries()
    }
  }, [tag])

  return (
    <Box>
      <Heading>#{tag}</Heading>
      <VStack alignItems="start" spacing={0}>
        <EntryList entries={entries} />
      </VStack>
    </Box>
  )
}
