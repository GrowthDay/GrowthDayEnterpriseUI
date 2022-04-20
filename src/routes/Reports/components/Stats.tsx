import { ArrowDropDownRounded, ArrowDropUpRounded } from '@mui/icons-material'
import { Box, Card, CardContent, Divider, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'
import Flex from '../../../components/Flex'

export type StatsProps = {
  count: number
  title: ReactNode
  icon?: ReactNode
  delta?: number
  subtitle?: ReactNode
}

const Stats: FC<StatsProps> = ({ title, icon, delta, subtitle, count }) => (
  <Card elevation={1}>
    <CardContent>
      <Flex mb={1} alignItems="center" justifyContent="space-between">
        <Typography variant="h5" fontWeight="bold">
          {count}
        </Typography>
        {icon && (
          <Box p={1} borderRadius={8} bgcolor="grey.100" display="inline-flex">
            {icon}
          </Box>
        )}
      </Flex>
      <Typography color="text.secondary" variant="subtitle2">
        {title}
      </Typography>
      {Boolean(delta) && typeof delta !== 'undefined' && (
        <>
          <Divider sx={{ my: 1.5 }} />
          <Typography color="text.disabled" variant="subtitle2">
            {delta < 0 ? (
              <Typography fontWeight={600} component="span" color="error.main">
                <ArrowDropDownRounded fontSize="large" sx={{ verticalAlign: 'bottom', m: -0.75, mr: -1.25 }} />{' '}
                {Math.abs(delta)}
              </Typography>
            ) : (
              <Typography fontWeight={600} component="span" color="success.main">
                <ArrowDropUpRounded fontSize="large" sx={{ verticalAlign: 'bottom', m: -0.75, mr: -1.25 }} />{' '}
                {Math.abs(delta)}
              </Typography>
            )}{' '}
            {subtitle}
          </Typography>
        </>
      )}
    </CardContent>
  </Card>
)

export default Stats
