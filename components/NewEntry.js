import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const NewEntry = ({ refresh }) => {
  const { user, token } = useContext(UserContext)

  if (!user) {
    return null
  }
  const { profileImageUrl, username, name } = user
  const src = profileImageUrl ? profileImageUrl : undefined
  const displayName = name || username

  const getOnChange = (onChange) => (event) =>
    event.target.value.length <= 140 ? onChange(event) : () => {}

  const handleSubmit = async (values, { resetForm }) => {
    const res = await fetch("/api/entries", {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: values.entryText,
      }),
    })
    await res.json()
    refresh()
    resetForm()
  }

  return (
    <Box maxWidth={500} width="100%">
      <Formik
        initialValues={{
          entryText: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values }) => (
          <Form>
            <HStack
              spacing={2}
              align="start"
              width="100%"
              p={4}
              border="1px solid #e3e3e3"
              marginTop="-1px"
            >
              <Avatar size="md" name={displayName} src={src}></Avatar>
              <VStack align="start" flexGrow={1}>
                <Field name="entryText">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.entryText && form.touched.entryText
                      }
                    >
                      <Textarea
                        placeholder="What's up?"
                        resize="none"
                        rows={5}
                        {...field}
                        onChange={getOnChange(field.onChange)}
                      ></Textarea>
                      <FormErrorMessage>
                        {form.errors.entryText}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <HStack
                  justifyContent="space-between"
                  alignItems="start"
                  width="100%"
                >
                  <Text fontSize="xs" display="block">
                    Character count {values.entryText.length}/140
                  </Text>
                  <Button
                    type="submit"
                    colorScheme="teal"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  >
                    Post
                  </Button>
                </HStack>
              </VStack>
            </HStack>
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default NewEntry
