import { CircularProgress, circularProgressClasses, CircularProgressProps } from '@mui/material'
import Box from '@mui/material/Box'
import { StandardCSSProperties } from '@mui/system'
import { FC } from 'react'
import Center from './Center'

const Loading: FC<CircularProgressProps & { position?: StandardCSSProperties['position'] }> = ({
  position = 'absolute',
  ...props
}) => (
  <Center sx={{ width: '100%', height: '100%', position, zIndex: 1, left: 0, top: 0, bottom: 0, right: 0 }}>
    <Box sx={{ position: 'relative', height: props.size || 40 }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800]
        }}
        size={40}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={{
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round'
          }
        }}
        size={40}
        thickness={4}
        {...props}
      />
    </Box>
  </Center>
)

export default Loading
