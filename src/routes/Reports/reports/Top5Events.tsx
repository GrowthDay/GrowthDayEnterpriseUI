import { Box, Paper, Typography } from '@mui/material'
import { sortBy } from 'lodash-es'
import { FC } from 'react'
import { useReportQuery } from '../../../api/queries/useOrganizationReportsQuery'
import EmptyState from '../../../components/EmptyState'
import Loading from '../../../components/Loading'
import { TopEventsData } from '../../../types/api'
import { createDateRange } from '../utils'

const Top5Events: FC<{ month: string }> = ({ month }) => {
  const dateRanges = createDateRange(month)
  const topEventsQuery = useReportQuery<TopEventsData>('topEvents', dateRanges.current)

  const data = sortBy(topEventsQuery.data, 'watchedNo').slice(0, 5)

  return (
    <>
      <Box mb={2}>
        <Typography fontWeight={700} variant="h5">
          Live Events
        </Typography>
        <Typography color="text.disabled" variant="body2">
          Most popular events
        </Typography>
      </Box>
      <Paper sx={{ py: 2, pr: 4, pl: 1, minHeight: 240, position: 'relative' }} elevation={1}>
        {topEventsQuery.isLoading ? (
          <Loading />
        ) : data?.length ? (
          <ol>
            {data.map((data, index) => (
              <Typography gutterBottom component="li" key={index}>
                {data.liveEventName}
              </Typography>
            ))}
          </ol>
        ) : (
          <EmptyState minHeight={208} title="No live events watched in this month!" />
        )}
      </Paper>
    </>
  )
}

export default Top5Events
