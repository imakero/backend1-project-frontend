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

  const { user: loggedInUser } = useContext(UserContext)
  const isLoggedIn = loggedInUser && user.username === loggedInUser.username
  const profileImageUrl = user.profileImageUrl || ""
  const displayName = user.name || user.username

  return (
    <>
      <VStack
        align="start"
        //border="1px solid #e3e3e3"
        //margin="-1px"
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
          {isLoggedIn && <Button onClick={onOpen}>Edit profile</Button>}
        </HStack>
        <Heading size="lg" mt={0}>
          {displayName}
        </Heading>
        <Text size="sm">@{user.username}</Text>
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
