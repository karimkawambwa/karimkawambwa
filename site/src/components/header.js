import React from "react"
import Link from "./link"
import { Box, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  header: {
    marginBottom: "2rem",
  },
  nav: {
    display: "flex",
  },
  separator: {
    margin: "0 10px",
  },
})

const Header = () => {
  const classes = useStyles()

  return (
    <Box component="header" className={classes.header}>
      <Box component="nav" className={classes.nav}>
        <Link href="/">Karim Kawambwa ( Home )</Link>
        <Box className={classes.separator}>-</Box>
        <Link href="/blog">Blog</Link>
        <Box className={classes.separator}>-</Box>
        <Link href="/projects">Projects</Link>
        <Box className={classes.separator}>-</Box>
        <Link href="/about">About</Link>
      </Box>
    </Box>
  )
}

export default Header
