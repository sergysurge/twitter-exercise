import { createMuiTheme } from '@material-ui/core/styles';
import colors from './colors';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: colors.gray.l30,
      contrastText: colors.white,
    },
    secondary: {
      main: '#2196f3',
      contrastText: colors.white,
    },
    text: {
      primary: '#000',
      secondary: colors.white,
    },
    error: {
      main: '#E61920',
    },
    background: {
      default: '#fafafa',
      paper: colors.white,
    },
  },
  typography: {
    fontFamily: ['sans-serif', 'Roboto', 'Helvetica', 'Arial'].join(),
    h1: {
      fontSize: '2.4rem',
      fontWeight: 700,
      lineHeight: '3.2rem',
      letterSpacing: '0.15px',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: '2.8rem',
      letterSpacing: '0.15px',
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 700,
      lineHeight: '2.4rem',
      letterSpacing: '0.15px',
    },
    subtitle1: {
      fontSize: '1.6rem',
      fontWeight: 600,
      lineHeight: '2.4rem',
      letterSpacing: '0.15px',
      textAlign: 'left',
    },
    subtitle2: {
      fontSize: '1.4rem',
      fontWeight: 600,
      lineHeight: '2.0rem',
      letterSpacing: '0.15px',
    },
    button: {
      fontSize: '1.6rem',
      fontWeight: 700,
      letterSpacing: '0.21px',
      lineHeight: '2.4rem',
    },
    body1: {
      fontWeight: 400,
      fontSize: '1.4rem',
      letterSpacing: '0.25px',
      lineHeight: '2rem',
    },
    body2: {
      // Bold body text
      fontWeight: 700,
      fontSize: '1.4rem',
      letterSpacing: '0.25px',
      lineHeight: '2rem',
    },
  },
  overrides: {
    MuiChip: {
      root: {
        borderRadius: '21px',
        textTransform: 'uppercase',
        fontWeight: 600,
      },
      outlinedPrimary: {
        color: colors.white,
        borderColor: colors.white,
      },
    },
  },
});

export default theme;
