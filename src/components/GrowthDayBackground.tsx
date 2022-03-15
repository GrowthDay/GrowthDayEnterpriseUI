import { BoxProps } from '@mui/material'
import Box from '@mui/material/Box'
import { FC } from 'react'
import bg from '../assets/images/GrowthDayBackground.png'

const GrowthDayBackground: FC<BoxProps> = (props) => {
  return (
    <Box
      position="fixed"
      left={0}
      top={0}
      right={0}
      bottom={0}
      zIndex={-1}
      height="100%"
      width="100%"
      {...props}
      sx={{
        pointerEvents: 'none',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
        opacity: 0.06,
        filter: 'saturate(0)',
        ...props.sx
      }}
    />
  )
}

export default GrowthDayBackground
