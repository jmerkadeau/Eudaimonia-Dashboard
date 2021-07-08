import ProductSans from './../../../google-sans-cufonfonts/ProductSans-Regular.ttf'
import { createMuiTheme } from '@material-ui/core/styles';
import './../../../App.css';

const productSans = {
  fontFamily: 'Product Sans',
  fontStyle: 'Regular',
  fontWeight: '400',
  src: `
    local('ProductSans-Regular'),
    url(${ProductSans}) format('ttf');`,

  unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF UTF-8",
}

const font = " 'Open Sans', sans-serif";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#58A1C1",
      light: "#8BD2F4",
      dark: "#1e7291",
    },
    secondary: {
      main: '#dd7c85',
      light: '#ffadb5',
      dark: '#a94e58'
    },
    grey: {
      A100: '#EEEEEE',
      A200: '#D9D9D9',
      A300: "#b3b3b3",
      A400: '#A8A8A8',
      A500: '#8C8C8C',
      A600: '#5F5F5F',
      A700: '#333333',
    }
  },
  typography: {
    fontFamily: font,
    fontSize: 16,
    button: {
      textTransform: 'none'
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  // typography: {
  //     fontFamily: ['"Open Sans"', 'ProductSans', 'Roboto'].join(','),
  //     fontSize: 16
  // },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [productSans],
      },
    }
  }
});

export default theme;