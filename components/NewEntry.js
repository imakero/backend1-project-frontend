import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { Field, Formik } from "formik"

const NewEntry = ({ user }) => {
  if (!user) {
    return null
  }
  const { profileImageUrl, username, name } = user
  const src = profileImageUrl ? profileImageUrl : undefined
  const displayName = name || username

  const getOnChange = (onChange) => (event) =>
    event.target.value.length <= 140 ? onChange(event) : () => {}

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
      <Formik
        initialValues={{
          entryText: "",
        }}
        onSubmit={() => {}}
      >
        {({ isSubmitting, values }) => (
          <VStack align="start" flexGrow={1}>
            <Field name="entryText">
              {({ field, form }) => {
                console.log(field, form)
                return (
                  <FormControl
                    isInvalid={form.errors.entryText && form.touched.entryText}
                  >
                    <Textarea
                      placeholder="What's up?"
                      resize="none"
                      rows={5}
                      {...field}
                      onChange={getOnChange(field.onChange)}
                    ></Textarea>
                    <FormErrorMessage>{form.errors.entryText}</FormErrorMessage>
                  </FormControl>
                )
              }}
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
        )}
      </Formik>
    </HStack>
  )
}

export default NewEntry
