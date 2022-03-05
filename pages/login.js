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
import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import jwt from "jsonwebtoken"

export default function Home() {
  const router = useRouter()
  const { setToken } = useContext(UserContext)

  return (
    <Box>
      <Heading>Log in</Heading>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async (values) => {
          const res = await fetch("/api/auth/tokens", {
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
          setToken(data.token)
          const { username } = jwt.decode(data.token)
          router.push(`/${username}`)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="username">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input {...field} id="username" placeholder="username" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
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
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              Log in!
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  )
}
