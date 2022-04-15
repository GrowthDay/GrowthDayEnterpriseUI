import CssBaseline from '@mui/material/CssBaseline'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import { LicenseInfo } from '@mui/x-data-grid-pro'
import { SnackbarProvider } from 'notistack'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import GlobalCss from './components/GlobalCss'
import config from './config'
import theme from './utils/theme'
import reportWebVitals from './reportWebVitals'
import { StrictMode } from 'react'

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
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
)

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(Main)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
