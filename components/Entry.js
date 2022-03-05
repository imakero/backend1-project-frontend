import { Avatar, Box, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import { formatDate } from "../lib/utils"

const Entry = ({ entry, user }) => {
  const { profileImageUrl, username, name } = user
  const src = profileImageUrl ? profileImageUrl : undefined
  const displayName = name || username

  console.log(entry, user)
  return (
    <HStack
      spacing={2}
      align="start"
      maxWidth={400}
      p={4}
      border="1px solid #e3e3e3"
      margin="-1px"
    >
      <Avatar size="md" name={displayName} src={src}></Avatar>
      <VStack spacing={2} align="start">
        <HStack spacing={1}>
          <Heading size="md" pr={0}>
            {user.name}
          </Heading>
          <Text fontSize="md">(@{user.username})</Text>
          <Text fontSize="xs">- {formatDate(new Date(entry.createdAt))}</Text>
        </HStack>
        <Text fontSize="md">{entry.text}</Text>
      </VStack>
    </HStack>
  )
}

export default Entry
