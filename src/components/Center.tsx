import { BoxProps } from '@mui/material'
import Box from '@mui/material/Box'
import { FC } from 'react'

const Center: FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...props.sx }}
  />
)

export default Center
