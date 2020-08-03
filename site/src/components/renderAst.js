import React from "react"

import rehypeReact from "rehype-react"
import {
  Typography,
  ListItem,
  List,
  Divider,
  Box,
} from "@material-ui/core"
import Link from "./link"

export const H1 = ({ children }) => (
  <Typography variant="h1"># {children}</Typography>
)

export const H2 = ({ children }) => (
  <Typography variant="h2">## {children}</Typography>
)

export const H3 = ({ children }) => (
  <Typography variant="h3">### {children}</Typography>
)

export const H4 = ({ children }) => (
  <Typography variant="h4">#### {children}</Typography>
)

export const H5 = ({ children }) => (
  <Typography variant="h5">###### {children}</Typography>
)

export const blockquote = ({ children }) => (
  <Box
    component="blockquote"
    style={{ borderLeft: "5px #f7f7ff solid", paddingLeft: "10px" }}
  >
    {children}
  </Box>
)
export const li = ({ children }) => (
  <ListItem>
    -&nbsp;
    <Typography variant="body2">{children}</Typography>
  </ListItem>
)

export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    h5: H5,
    p: Typography,
    a: Link,
    li,
    ul: List,
    hr: Divider,
    blockquote,
  },
}).Compiler
