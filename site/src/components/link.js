import { Link as GatsbyLink } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { Link as MuiLink } from "@material-ui/core"

const Link = ({ href, target, children }) => (
  <MuiLink component={GatsbyLink} to={href} target={target}>
    {children}
  </MuiLink>
)

Link.propTypes = {
    href: PropTypes.string,
    target: PropTypes.string,
}

Link.defaultProps = {
    href: "#",
    target: undefined
}

export default Link
