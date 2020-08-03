import React from "react"
import Link from "./link"
import { Box } from "@material-ui/core"

const Header = () => (
  <Box component="header" marginBottom="2rem">
    <Box component="nav" display="flex">
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

export default Header
