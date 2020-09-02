/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "./header"
import "./layout.css"

import { Container, Box } from "@material-ui/core"

import Footer from "./footer"

const Layout = ({ lang, children }) => {
  return (
    <Container maxWidth="md">
      <Box style={{ margin: "2rem 0" }}>
        <Header lang={lang} />
        <main>{children}</main>
        <Footer />
      </Box>
    </Container>
  )
}

Layout.propTypes = {
  lang: PropTypes.string,
  children: PropTypes.node.isRequired,
}

Layout.defaultProps = {
  lang: "",
}

export default Layout
