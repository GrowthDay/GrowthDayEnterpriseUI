import { Card, CardContent, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { FC, ReactElement } from 'react'
import { ResponsiveContainer } from 'recharts'
import Loading from '../../../components/Loading'

export type ChartContainerProps = {
  title?: string
  isLoading?: boolean
  children: ReactElement
}

const ChartContainer: FC<ChartContainerProps> = ({ children, title, isLoading }) => {
  return (
    <Card sx={{ position: 'relative' }}>
      <CardContent sx={{ height: 400 }}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Typography align="center" variant="h6" gutterBottom>
              {title}
            </Typography>
            <Box sx={{ fontSize: 10, pr: 4 }}>
              <ResponsiveContainer height={328}>{children}</ResponsiveContainer>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default ChartContainer
