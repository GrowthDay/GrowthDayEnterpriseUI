import { BoxProps, styled, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'
import Center from './Center'

export type EmptyStateProps = BoxProps & {
  image?: string
  title?: ReactNode
}

const StyledImage = styled('img')(({ theme: { spacing } }) => ({
  maxWidth: '100%',
  width: spacing(25),
  marginBottom: spacing(2)
}))

const EmptyState: FC<EmptyStateProps> = ({ image, title, children, ...props }) => {
  return (
    <Center minHeight={560} {...props}>
      {image && <StyledImage src={image} alt="" />}
      {title && <Typography color="text.secondary">{title}</Typography>}
      {children}
    </Center>
  )
}

export default EmptyState
