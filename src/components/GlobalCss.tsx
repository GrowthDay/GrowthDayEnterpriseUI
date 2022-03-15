import { GlobalStyles } from '@mui/material'
import { FC } from 'react'

const GlobalCss: FC = () => (
  <GlobalStyles
    styles={{
      body: {
        backgroundColor: '#F7F8FA'
      },
      '.hide-scrollbar': {
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        '&::-webkit-scrollbar': {
          width: 0,
          height: 0
        }
      },
      '.disabled': {
        opacity: 0.5,
        '&, & *': {
          pointerEvents: 'none',
          MozUserFocus: 'none',
          WebkitUserFocus: 'none',
          MsUserFocus: 'none',
          userFocus: 'none',
          MozUserModify: 'read-only',
          WebkitUserModify: 'read-only',
          MsUserModify: 'read-only',
          userModify: 'read-only',
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          MsUserSelect: 'none',
          userSelect: 'none'
        }
      },
      '#userback_button_container': {
        display: 'none!important'
      }
    }}
  />
)

export default GlobalCss
