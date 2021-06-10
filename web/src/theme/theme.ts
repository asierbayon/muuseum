import { createTheme } from '@material-ui/core';

const theme = createTheme({
  typography: {
    h3: {
      fontWeight: 600
    },
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 600
    }
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          marginRight: 20
        },
        wrapper: {
          flexDirection: 'row'
        },
        labelIcon: {
          minHeight: 48,
          paddingTop: 0,
          '& > .MuiTab-wrapper > *:first-of-type': {
            marginBottom: 0,
            marginRight: 10
          }
        }
      }
    }
  }
});

export default theme;
