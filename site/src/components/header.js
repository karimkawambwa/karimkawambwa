import React from "react"
import Link from "./link"
import { Box, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  nav: {
    display: "flex"
  }
});

const Header = () => {
  const classes = useStyles();

  return (
    <Box component="header" marginBottom="2rem">
      <Box component="nav" className={classes.nav}>
        <Link href="/">Karim Kawambwa ( Home )</Link>
        <Box margin="0 10px">-</Box>
        <Link href="/blog">Blog</Link> 
        <Box margin="0 10px">-</Box>
        <Link href="/projects">Projects</Link> 
        <Box margin="0 10px">-</Box>
        <Link href="/about">About</Link>
      </Box>
    </Box>
  )
}

export default Header
