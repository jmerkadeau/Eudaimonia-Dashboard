import ProductSans from './../../../google-sans-cufonfonts/ProductSans-Black.ttf'
import { createMuiTheme } from '@material-ui/core/styles';

const productSans = {
    fontFamily: 'Product Sans',
    fontStyle: 'regular',
    fontWeight: '400',
    src: `        local('ProductSans'), 
    local('ProductSans-Black'), 
    url(${ProductSans}) format('ttf');`,
    
    unicodeRange: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#58A1C1",
            light: "#7BB5CE",
        },
        grey: {
            A100: '#616161',
            A200: '#999999',
            A400: '#8C8C8C'
        }
    },
    typography: {
        fontFamily: ['"Open Sans"', 'ProductSans', 'Roboto'].join(','),
        fontSize: 16
    },
    overrides: {
    MuiCssBaseline: {
        '@global': {
        '@font-face': [productSans],
        },
    }
    }
})

export default theme;