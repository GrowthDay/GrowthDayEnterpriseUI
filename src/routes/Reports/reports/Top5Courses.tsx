import { Box, Paper, Typography } from '@mui/material'
import { sortBy } from 'lodash-es'
import { FC } from 'react'
import { useReportQuery } from '../../../api/queries/useOrganizationReportsQuery'
import EmptyState from '../../../components/EmptyState'
import Loading from '../../../components/Loading'
import { TopCoursesData } from '../../../types/api'
import { createDateRange } from '../utils'

const Top5Courses: FC<{ month: string }> = ({ month }) => {
  const dateRanges = createDateRange(month)
  const topCoursesQuery = useReportQuery<TopCoursesData>('topCourses', dateRanges.current)

  const data = sortBy(topCoursesQuery.data, 'watchedNoNo').slice(0, 5)

  return (
    <>
      <Box mb={2}>
        <Typography fontWeight={700} variant="h5">
          Top 5 Courses
        </Typography>
        <Typography color="text.disabled" variant="body2">
          By number of hours watched
        </Typography>
      </Box>
      <Paper sx={{ py: 2, pr: 4, pl: 1, minHeight: 240, position: 'relative' }} elevation={1}>
        {topCoursesQuery.isLoading ? (
          <Loading />
        ) : data?.length ? (
          <ol>
            {data.map((data, index) => (
              <Typography gutterBottom component="li" key={index}>
                {data.courseName}
              </Typography>
            ))}
          </ol>
        ) : (
          <EmptyState minHeight={208} title="No courses watched in this month!" />
        )}
      </Paper>
    </>
  )
}

export default Top5Courses
