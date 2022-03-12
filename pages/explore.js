import { Box, VStack } from "@chakra-ui/react"
import EntryList from "../components/EntryList"
import useApi from "../hooks/useApi"

export default function Home() {
  const { data: entries = [], loading } = useApi("/entries")

  return (
    !loading && (
      <Box>
        <VStack alignItems="start" spacing={0}>
          <EntryList entries={entries} />
        </VStack>
      </Box>
    )
  )
}
