import { Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import EntryList from "../components/EntryList"
import ProfileHeader from "../components/ProfileHeader"
import useApi from "../hooks/useApi"

export default function Profile() {
  const router = useRouter()
  const { username } = router.query
  const { data, refresh } = useApi(`/${username}`, null, !username)
  const { user, entries } = data ? data : { user: null, entries: [] }

  return (
    user && (
      <Box>
        <ProfileHeader user={user} refresh={refresh} />
        <EntryList entries={entries} />
      </Box>
    )
  )
}
