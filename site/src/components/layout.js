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

import {
  MuiThemeProvider,
  createMuiTheme,
  Container,
  Box,
} from "@material-ui/core"
import Footer from "./footer"

const Theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#4a473e",
    },
  },
  typography: {
    body1: {
      fontSize: "1rem",
      color: "#f7f7ff",
      margin: "1em 0"
    },
    body2: {
      fontSize: "1rem",
      color: "#f7f7ff",
    },
    caption: {
      color: "rgba(255,255,255,0.5)"
    },
    h1: {
      fontSize: "1rem",
      fontWeight: "400",
      color: "#bdd5ea",
      margin: ".67rem 0",
      paddingBottom: ".67rem",
      borderBottom: "2px dashed #bdd5ea",
    },
    h2: {
      fontSize: "1rem",
      fontWeight: "400",
      margin: ".67rem 0",
      color: "#bdd5ea",
    },
    h3: {
      fontSize: "1rem",
      fontWeight: "400",
      margin: ".67rem 0",
      color: "#bdd5ea",
    },
    h4: {
      fontSize: "1rem",
      fontWeight: "400",
      margin: ".67rem 0",
      color: "#bdd5ea",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: "400",
      margin: ".67rem 0",
      color: "#bdd5ea",
    },
  },
  overrides: {
    MuiDivider: {
      root: {
        border: 0,
        backgroundColor: "transparent",
        borderBottom: "2px dashed #bdd5ea",
      },
    },
    MuiList: {
      root: {
        listStyleType: `"* "`,
        listStylePosition: "outside",
      },
    },
    MuiListItem: {
      root: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiLink: {
      root: {
        color: "#fe5f55",
      },
    },
  },
})

const Layout = ({ children }) => {
  return (
    <MuiThemeProvider theme={Theme}>
      <Container maxWidth="md">
        <Box margin="2rem 0">
          <Header />
          <main>{children}</main>
          <Footer />
        </Box>
      </Container>
    </MuiThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
