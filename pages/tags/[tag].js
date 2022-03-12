import { Box, Heading, VStack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import EntryList from "../../components/EntryList"
import useApi from "../../hooks/useApi"

export default function Tag() {
  const router = useRouter()
  const { tag } = router.query
  const {
    data: entries = [],
    refresh,
    loading,
  } = useApi(`/tags/${tag}`, null, !tag)

  return (
    <Box>
      <Heading>#{tag}</Heading>
      {!loading && <EntryList entries={entries} />}
    </Box>
  )
}
