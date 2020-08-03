import React from "react"
import Link from "./link"
import { Box, makeStyles } from "@material-ui/core"

const useStyles = makeStyles({
  footer: {
    marginTop: "2rem",
  },
  nav: {
    display: "flex",
  },
  separator: {
    margin: "0 10px",
  },
})

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component="footer" className={classes.footer}>
      <Box className={classes.nav}>
        <Link href="https://github.com/karimkawambwa" target="_blank">Github</Link>
        <Box className={classes.separator}>-</Box>
        <Link href="https://www.linkedin.com/in/karimkawambwa" target="_blank">LinkedIn</Link> 
      </Box>
    </Box>
  );
}

export default Footer
