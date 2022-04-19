import { createTheme } from '@mui/material/styles'
import defaultShadows, { Shadows } from '@mui/material/styles/shadows'
import {} from '@mui/material/styles/createPalette'

// @ts-ignore
import defaultTheme from '@mui/material/styles/defaultTheme'
import { alpha } from '@mui/system'

const shadows = [...defaultShadows] as Shadows
shadows[1] = '0 0 8px #0000000a'
shadows[2] = 'rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0077F7'
    },
    secondary: {
      main: '#ff770e',
      contrastText: '#fff'
    },
    success: {
      main: '#4FCD6A',
      contrastText: '#fff'
    },
    background: {
      default: '#fafafa'
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  },
  shadows,
  shape: {
    borderRadius: defaultTheme.shape.borderRadius * 1.25
  },
  mixins: {
    toolbar: {
      height: defaultTheme.spacing(8)
    }
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 1
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: 'none',
          padding: defaultTheme.spacing(2, 3),
          minHeight: defaultTheme.spacing(5)
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          borderRadius: defaultTheme.shape.borderRadius * 2
        },
        root: {
          minHeight: defaultTheme.spacing(5)
        }
      }
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained'
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: defaultTheme.shape.borderRadius * 8
        },
        startIcon: {
          marginRight: 4
        },
        endIcon: {
          marginLeft: 4
        },
        outlinedPrimary: {
          borderColor: alpha('#0077F7', 0.2)
        }
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
        keepMounted: false,
        fullWidth: true,
        maxWidth: 'sm',
        PaperProps: {
          elevation: 2
        }
      },
      styleOverrides: {
        root: {
          backdropFilter: 'blur(2px)'
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.5rem',
          fontWeight: 600
        }
      }
    },
    MuiInputBase: {
      defaultProps: {
        color: 'secondary'
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(0,0,0,0.4)',
          fontWeight: 500
        },
        shrink: {
          position: 'relative',
          transform: 'translate(4px, 2px) scale(0.75)',
          transformOrigin: 'left top'
        }
      }
    },
    MuiFormLabel: {
      defaultProps: {
        color: 'secondary'
      },
      styleOverrides: {
        root: {
          fontWeight: 500,
          color: 'rgba(0,0,0,0.4)',
          transform: 'scale(0.75)',
          transformOrigin: 'left bottom'
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          top: 0,
          legend: {
            display: 'none'
          }
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
        fontWeight: 500,
        href: '#'
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: defaultTheme.spacing(4)
        }
      }
    },
    MuiChip: {
      defaultProps: { color: 'secondary' },
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: defaultTheme.shape.borderRadius * 2
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: defaultTheme.spacing(2)
          }
        }
      }
    },
    MuiRadio: {
      defaultProps: {
        color: 'secondary'
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: `1px solid ${defaultTheme.palette.divider}`,
          justifyContent: 'flex-start',
          padding: defaultTheme.spacing(2.5, 3)
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
        margin: 'none',
        InputLabelProps: { shrink: true }
      }
    }
  }
})

export default theme
