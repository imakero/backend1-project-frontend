import React from "react"
import { HASHTAGS } from "../lib/constants"
import NextLink from "next/link"
import { Link } from "@chakra-ui/react"

const LinkifyTags = ({ children }) => {
  children = [...children.split(HASHTAGS)].map((str, index) =>
    index % 2 === 1 ? (
      <NextLink key={index} href={`/tags/${str}`} passHref>
        <Link color="blue.500">#{str}</Link>
      </NextLink>
    ) : (
      str
    )
  )

  return children
}

export default LinkifyTags
