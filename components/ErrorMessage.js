import { Text } from "@chakra-ui/react"

const ErrorMessage = ({ children, ...props }) => {
  return (
    <Text color="red" fontSize="sm" {...props}>
      {children}
    </Text>
  )
}

export default ErrorMessage
