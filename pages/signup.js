import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import ErrorMessage from "../components/ErrorMessage"

export default function Home() {
  const router = useRouter()

  return (
    <Box>
      <Heading>Sign up</Heading>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values, { setStatus }) => {
          try {
            const res = await fetch("/api/auth/users", {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: values.username,
                password: values.password,
              }),
            })
            const data = await res.json()
            router.push("/login")
          } catch (error) {
            setStatus("There was an error while signing up.")
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <Field
              name="username"
              validate={(value) => (value ? undefined : "username is required")}
            >
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input {...field} id="username" placeholder="username" />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field
              name="password"
              validate={(value) => (value ? undefined : "password is required")}
            >
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input
                    {...field}
                    id="password"
                    placeholder="password"
                    type="password"
                  />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <ErrorMessage>{status}</ErrorMessage>
            <Button type="submit">Sign up!</Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
