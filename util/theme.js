import { createTheme } from "@material-ui/core/styles"
const colors = {
  green: '#41D4B0',
  purple: '#A5A4FF',
  purple100: '#9F8EB6',
  grey: '#312E37',
  contrastDarkText: '#100F10',
  contrastLightText: '#fff',
  background: '#2B2930', 
  backgroundLight: '#A5A4B7'
}

const theme = createTheme({
  colors,
  palette: {
    type: "dark",
    background: {
      default: colors.background,
    },
    primary: {
      main: colors.purple, 
      contrastText: colors.contrastDarkText, 
    },
    secondary: {
      main: colors.grey,
      contrastText: colors.contrastLightText,
    },
    navbar: {
      main: colors.contrastDarkText, 
      contrastText: colors.contrastLightText,
    },
    logo: {
      main: colors.green,
    }
  },
  typography: {
    fontFamily: "'Work Sans', sans-serif",
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 28,
      }
    },
    MuiAppBar: {
      root: {
        boxShadow: 'none',
      }
    }
  },
});

export default theme;
