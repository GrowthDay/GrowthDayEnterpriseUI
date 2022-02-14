import { Theme, useTheme } from '@mui/material'
import { FC } from 'react'
import ReactGridLayout, { ReactGridLayoutProps, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

const GridLayoutWithWidth = WidthProvider(ReactGridLayout)

const GridLayout: FC<ReactGridLayoutProps> = (props) => {
  const {
    breakpoints: { values: breakpoints }
  } = useTheme<Theme>()
  return <GridLayoutWithWidth cols={12} rowHeight={30} margin={[24, 24]} isResizable={false} {...props} />
}

export default GridLayout
