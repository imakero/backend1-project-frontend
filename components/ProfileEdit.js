import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import ErrorMessage from "./ErrorMessage"

const ProfileEdit = ({ onClose, refresh }) => {
  const { token, user, fetchUser } = useContext(UserContext)
  const [profileImageFile, setProfileImageFile] = useState("")

  const handleSubmitImage = async (event) => {
    event.preventDefault()
  }

  return (
    <VStack alignItems="start" spacing={8}>
      <Formik
        initialValues={{
          name: user?.name ? user.name : "",
          email: user?.email ? user.email : "",
        }}
        onSubmit={async (values, { setStatus }) => {
          try {
            const res = await fetch(`/api/${user.username}`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                name: values.name,
                email: values.email,
              }),
            })

            if (profileImageFile) {
              const formData = new FormData()
              formData.append("profileImage", profileImageFile)

              await fetch(`api/${user.username}/profile-image`, {
                body: formData,
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                method: "POST",
              })
            }
            onClose()
            refresh()
            fetchUser()
            console.log("test")
          } catch (error) {
            console.log("asdfasdfölaskdjfalskdf")
            console.error(error)
            setStatus(
              "There was an error submitting the form, please try again."
            )
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <VStack spacing={2} align="start">
              <ErrorMessage>{status}</ErrorMessage>
              <Field name="name">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input {...field} id="name" placeholder="name" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      {...field}
                      id="email"
                      placeholder="email"
                      type="email"
                    />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <FormControl>
                <FormLabel htmlFor="profile-image">
                  Upload a profile image
                </FormLabel>
                <Input
                  onChange={(event) =>
                    setProfileImageFile(event.target.files[0])
                  }
                  id="profile-image"
                  type="file"
                />
              </FormControl>
              <Button
                type="submit"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                Save
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>

      <form onSubmit={handleSubmitImage}></form>
    </VStack>
  )
}

export default ProfileEdit
