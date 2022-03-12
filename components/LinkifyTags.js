import React from "react"
import { HASHTAGS } from "../lib/constants"
import NavLink from "./NavLink"

const LinkifyTags = ({ children }) => {
  children = [...children.split(HASHTAGS)].map((str, index) =>
    index % 2 === 1 ? (
      <NavLink key={index} href={`/tags/${str}`} color="teal">
        #{str}
      </NavLink>
    ) : (
      str
    )
  )

  return children
}

export default LinkifyTags
