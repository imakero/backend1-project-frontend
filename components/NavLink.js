import { Link } from "@chakra-ui/react"
import NextLink from "next/link"

const NavLink = ({ href, children, ...props }) => {
  return (
    <NextLink href={href} passHref>
      <Link color="teal" {...props}>
        {children}
      </Link>
    </NextLink>
  )
}

export default NavLink
