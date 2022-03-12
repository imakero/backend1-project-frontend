import { Link } from "@chakra-ui/react"
import NextLink from "next/link"

const NavLink = ({ href, children }) => {
  return (
    <NextLink href={href} passHref>
      <Link>{children}</Link>
    </NextLink>
  )
}

export default NavLink
