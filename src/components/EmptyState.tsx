import { styled, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'
import Center from './Center'

export type EmptyStateProps = {
  image?: string
  title?: ReactNode
}

const StyledImage = styled('img')(({ theme: { spacing } }) => ({
  maxWidth: '100%',
  width: spacing(25),
  marginBottom: spacing(2)
}))

const EmptyState: FC<EmptyStateProps> = ({ image, title, children }) => {
  return (
    <Center minHeight={560}>
      {image && <StyledImage src={image} alt="" />} {title && <Typography color="text.secondary">{title}</Typography>}
      {children}
    </Center>
  )
}

export default EmptyState
