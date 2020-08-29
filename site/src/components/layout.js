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

const Layout = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Box style={{ margin: "2rem 0" }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </Box>
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
