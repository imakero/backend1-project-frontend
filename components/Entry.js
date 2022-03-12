import { Avatar, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react"
import { formatDate } from "../lib/utils"
import NextLink from "next/link"
import LinkifyTags from "./LinkifyTags"

const Entry = ({ entry }) => {
  const user = entry.author
  const { profileImageUrl, username, name } = user
  const src = profileImageUrl ? profileImageUrl : undefined
  const displayName = name || username

  return (
    <HStack
      spacing={2}
      align="start"
      width="100%"
      maxWidth={500}
      p={4}
      border="1px solid #e3e3e3"
      marginTop="-1px"
    >
      <NextLink href={`/${username}`} passHref>
        <Link>
          <Avatar size="md" name={displayName} src={src}></Avatar>
        </Link>
      </NextLink>

      <VStack spacing={2} align="start">
        <HStack spacing={1}>
          <NextLink href={`/${username}`} passHref>
            <Link>
              <Heading size="md" pr={0} isTruncated>
                {user.name || user.username}
              </Heading>{" "}
            </Link>
          </NextLink>

          <Text fontSize="md">(@{user.username})</Text>
          <Text fontSize="xs">- {formatDate(new Date(entry.createdAt))}</Text>
        </HStack>
        <Text fontSize="md">
          <LinkifyTags>{entry.text}</LinkifyTags>
        </Text>
      </VStack>
    </HStack>
  )
}

export default Entry
