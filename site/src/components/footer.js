import React from "react"
import Link from "./link"
import { Box } from "@material-ui/core"

const Footer = () => (
  <Box component="footer" marginTop="2rem">
    <Box component="nav" display="flex">
      <Link href="https://github.com/karimkawambwa" target="_blank">Github</Link>
      <Box margin="0 10px">-</Box>
      <Link href="https://www.linkedin.com/in/karimkawambwa" target="_blank">LinkedIn</Link> 
    </Box>
  </Box>
)

export default Footer
