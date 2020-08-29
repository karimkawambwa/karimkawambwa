import React from "react";
import { ThemeProvider } from "@material-ui/core";

import Theme from "./theme";

export const wrapRootElement = ({ element }) => {
  return <ThemeProvider theme={Theme}>{element}</ThemeProvider>
}
