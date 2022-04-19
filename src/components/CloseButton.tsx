import { CloseOutlined } from '@mui/icons-material'
import { IconButton, IconButtonProps } from '@mui/material'
import React, { FC } from 'react'
import coerceArray from '../utils/coerceArray'

const CloseButton: FC<IconButtonProps> = (props) => (
  <IconButton
    {...props}
    sx={[
      {
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 1
      },
      ...coerceArray(props.sx)
    ]}
  >
    <CloseOutlined />
  </IconButton>
)

export default CloseButton
