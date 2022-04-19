import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { LicenseInfo } from '@mui/x-license-pro'
import { SnackbarProvider } from 'notistack'
import { StrictMode } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import GlobalCss from './components/GlobalCss'
import config from './config'
import SyncedQueueProvider from './providers/SyncedQueueProvider'
import reportWebVitals from './reportWebVitals'
import theme from './utils/theme'

LicenseInfo.setLicenseKey(config.muiGridKey)

const Main = (
  <StrictMode>
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
            <SyncedQueueProvider>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <App />
              </LocalizationProvider>
            </SyncedQueueProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
)

const container = document.getElementById('root')!

// v17
render(Main, container)

// v18
// const root = createRoot(container!)
// root.render(Main)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
