import React, { useMemo } from "react"
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

const Header = ({ lang }) => {
  const classes = useStyles()
  const prefix = useMemo(() => (lang ? `/${lang}` : ""), [lang])

  return (
    <Box component="header" className={classes.header}>
      <Box component="nav" className={classes.nav}>
        <Link href={`${prefix}/`}>Karim Kawambwa ( Home )</Link>
        <Box className={classes.separator}>-</Box>
        <Link href={`${prefix}/blog`}>Blog</Link>
        <Box className={classes.separator}>-</Box>
        <Link href={`${prefix}/projects`}>Projects</Link>
        <Box className={classes.separator}>-</Box>
        <Link href={`${prefix}/about`}>About</Link>
      </Box>
    </Box>
  )
}

export default Header
