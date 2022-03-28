import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { LicenseInfo } from '@mui/x-data-grid-pro'
import { SnackbarProvider } from 'notistack'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import GlobalCss from './components/GlobalCss'
import config from './config'
import theme from './utils/theme'

LicenseInfo.setLicenseKey(config.muiGridKey)

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalCss />
        <SnackbarProvider
          variant="info"
          transitionDuration={{ enter: 150, appear: 150, exit: 150 }}
          autoHideDuration={2000}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          maxSnack={1}
          preventDuplicate
        >
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </RecoilRoot>,
  document.querySelector('#root')
)
