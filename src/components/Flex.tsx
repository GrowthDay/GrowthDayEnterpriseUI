import { BoxProps } from '@mui/material'
import Box from '@mui/material/Box'
import { FC } from 'react'

const Flex: FC<BoxProps> = (props) => <Box display="flex" {...props} />

export default Flex
