import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const primary = '#678489';
const secondary = '#B222E0';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: primary,
      contrastText: 'white'
    },
    secondary: {
      main: secondary,
      contrastText: 'white'
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-columnHeaders .MuiButtonBase-root': {
            color: 'white',
            backgroundColor: '#678489'
          }
        },
      }
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            backgroundColor: '#2B3233',
            color: 'white'
          },
          '& .Mui-selected,': {
            backgroundColor: `${primary} !important`,
            color: 'white'
          },
          '& li:hover': {
            backgroundColor: '#364547',
            color: 'white'
          },
          '& .MuiSvgIcon-root': {
            backgroundColor: 'none',
            color: 'white'
          }
        }
      }
    }
  },
});

export default theme;
