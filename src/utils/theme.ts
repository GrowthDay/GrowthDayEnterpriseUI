import { createTheme } from '@mui/material/styles'
import defaultShadows, { Shadows } from '@mui/material/styles/shadows'

const shadows = [...defaultShadows] as Shadows
shadows[1] = '0 0 8px #0000000a'
shadows[2] = 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff770e',
      contrastText: '#fff'
    },
    secondary: {
      main: '#3394ff'
    },
    tonalOffset: 0.5
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  },
  shadows,
  mixins: {
    toolbar: {
      minHeight: 64
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 1
      }
    },
    MuiMenu: {
      defaultProps: {
        elevation: 2
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 2
      }
    },
    MuiPopover: {
      defaultProps: {
        elevation: 2
      }
    },
    MuiDialog: {
      defaultProps: {
        PaperProps: {
          elevation: 2
        }
      },
      styleOverrides: {
        root: {
          backdropFilter: 'blur(2px)'
        }
      }
    }
  }
})

export default theme
