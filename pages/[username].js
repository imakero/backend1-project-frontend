import { Box, Heading } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Entry from "../components/Entry"

export default function Profile() {
  const [user, setUser] = useState(null)
  const [entries, setEntries] = useState([])
  const router = useRouter()
  const { username } = router.query

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetch(`/api/${username}`)
      const data = await res.json()
      setUser(data.user)
      setEntries(data.entries)
    }
    if (username) {
      getUserData()
    }
  }, [username])

  if (!user) {
    return (
      <Box>
        <Heading>Loading...</Heading>
      </Box>
    )
  }

  return (
    <Box>
      <Heading>@{username}</Heading>
      {entries.map((entry) => (
        <Entry key={entry._id} entry={entry} user={user} />
      ))}
    </Box>
  )
}
