import { Card, CardContent, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { FC, ReactElement, ReactNode } from 'react'
import { ResponsiveContainer } from 'recharts'
import Loading from '../../../components/Loading'

export type BlockContainerProps = {
  title?: ReactNode
  description?: ReactNode
  isLoading?: boolean
  children?: ReactElement
  height?: number
}

const BlockContainer: FC<BlockContainerProps> = ({ height = 400, children, title, description, isLoading }) => (
  <>
    {(title || description) && (
      <Box mb={2}>
        {title && (
          <Typography fontWeight="bold" variant="h5">
            {title}
          </Typography>
        )}
        {description && (
          <Typography color="textSecondary" variant="body2">
            {description}
          </Typography>
        )}
      </Box>
    )}
    {children && (
      <Card sx={{ position: 'relative' }} elevation={1}>
        <CardContent sx={{ height }}>
          {isLoading ? <Loading /> : <ResponsiveContainer height={height}>{children}</ResponsiveContainer>}
        </CardContent>
      </Card>
    )}
  </>
)

export default BlockContainer
