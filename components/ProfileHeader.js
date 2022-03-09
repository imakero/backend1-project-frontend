import {
  Avatar,
  Button,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import ProfileEdit from "./ProfileEdit"

const ProfileHeader = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user: loggedInUser, token } = useContext(UserContext)
  const isLoggedInUser = loggedInUser && user.username === loggedInUser.username
  const profileImageUrl = user.profileImageUrl || ""
  const displayName = user.name || user.username

  const handleUnfollow = async () => {
    const res = await fetch(`http://localhost:5000/${user.username}/unfollow`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  const handleFollow = async () => {
    const res = await fetch(`http://localhost:5000/${user.username}/follow`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  const followButton = loggedInUser.following.includes(user._id) ? (
    <Button onClick={handleUnfollow}>Unfollow</Button>
  ) : (
    <Button onClick={handleFollow}>Follow</Button>
  )

  return (
    <>
      <VStack
        align="start"
        border="1px solid #e3e3e3"
        marginTop="-1px"
        width="100%"
        p={4}
        maxWidth={500}
        spacing={0}
      >
        <HStack
          align="start"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          <Avatar size="2xl" name={displayName} src={profileImageUrl}></Avatar>
          {isLoggedInUser && <Button onClick={onOpen}>Edit profile</Button>}
        </HStack>
        <Heading size="lg" mt={0}>
          {displayName}
        </Heading>
        <Text size="sm">@{user.username}</Text>
        <HStack justifyContent="space-between" w="100%">
          <HStack spacing={4}>
            <HStack>
              <Text fontWeight="bold">{user.followingCount}</Text>
              <Text color="gray.500">following</Text>
            </HStack>
            <HStack>
              <Text fontWeight="bold">{user.followersCount}</Text>
              <Text color="gray.500">followers</Text>
            </HStack>
          </HStack>
          {!isLoggedInUser && followButton}
        </HStack>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ProfileEdit />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileHeader
