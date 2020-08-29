import { createMuiTheme } from "@material-ui/core"

export default createMuiTheme({
  palette: {
    secondary: {
      main: "#4a473e",
    },
  },
  typography: {
    body1: {
      fontSize: "1rem",
      color: "#f7f7ff",
      margin: "1em 0",
    },
    body2: {
      fontSize: "1rem",
      color: "#f7f7ff",
    },
    caption: {
      color: "rgba(255,255,255,0.5)",
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
