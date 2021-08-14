import { createTheme } from "@material-ui/core/styles"

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fff",
      contrastText: "#000",
    },
    secondary: {
      light: "#67dcbf",
      main: "#41D4B0",
      dark: "#2d947b",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
  },
});

export default theme;
