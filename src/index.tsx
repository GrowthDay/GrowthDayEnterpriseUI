import { css } from '@emotion/react'
import { GlobalStyles, Theme } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from './App'
import theme from './utils/theme'

const globalStyles = (
  <GlobalStyles
    styles={({ palette }) => ({
      body: {
        backgroundColor: palette.grey['50']
      }
    })}
  />
)

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {globalStyles}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </RecoilRoot>,
  document.querySelector('#root')
)
