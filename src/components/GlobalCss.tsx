import { GlobalStyles, Theme } from '@mui/material'
import { forEach, isFunction, isObject, merge, kebabCase, mapKeys } from 'lodash-es'
import { FC } from 'react'

const flattenObject = (obj: Object, name?: string, key?: string) => {
  let res: Record<string, string> = {}
  key = key ? key + '-' + name : name

  if (!isObject(obj) && !isFunction(obj)) {
    res[kebabCase(key)] = obj
    return res
  }

  forEach(obj, (v, k) => {
    if (!isFunction(v)) {
      const p = flattenObject(v, k, key)
      res = merge(res, p)
    }
  })

  return res
}

const cssVariables = ({ palette, shape, zIndex, typography, spacing, shadows, transitions }: Theme) => {
  const styles = mapKeys(
    flattenObject({
      palette,
      zIndex,
      shadows,
      transitions,
      typography
    }),
    (v, k) => `--${k}`
  )
  return {
    ':root': {
      ...styles,
      '--spacing': `${spacing(1)}px`,
      '--shape-border-radius': `${shape.borderRadius}px`
    }
  }
}

const GlobalCss: FC = () => (
  <GlobalStyles
    styles={[
      {
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
      },
      cssVariables
    ]}
  />
)

export default GlobalCss
