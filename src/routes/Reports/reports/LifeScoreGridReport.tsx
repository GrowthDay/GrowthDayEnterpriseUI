import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import Moment from 'react-moment'
import { useReportQueries } from '../../../api/queries/useOrganizationReportsQuery'
import { DailyLifeScoreData, WeeklyLifeScoreData, MonthlyLifeScoreData } from '../../../types/api'
import StatsGrid, { StatsGridProps } from '../components/StatsGrid'
import { aggregateData, createDateRange } from '../utils'

const LifeScoreGridReport: FC<{ month: string }> = ({ month }) => {
  const dateRanges = createDateRange(month)

  const [previousDailyLifeScoreQuery, currentDailyLifeScoreQuery, isDailyLoading] =
    useReportQueries<DailyLifeScoreData>('dailyLifeScore', dateRanges)

  const [previousWeeklyLifeScoreQuery, currentWeeklyLifeScoreQuery, isWeeklyLoading] =
    useReportQueries<WeeklyLifeScoreData>('weeklyLifeScore', dateRanges)

  const [previousMonthlyLifeScoreQuery, currentMonthlyLifeScoreQuery, isMonthlyLoading] =
    useReportQueries<MonthlyLifeScoreData>('monthlyLifeScore', dateRanges)

  const previousDailyCount = aggregateData(previousDailyLifeScoreQuery, 'submittedScoreCount')
  const currentDailyCount = aggregateData(currentDailyLifeScoreQuery, 'submittedScoreCount')

  const previousWeeklyCount = aggregateData(previousWeeklyLifeScoreQuery, 'submittedScoreCount')
  const currentWeeklyCount = aggregateData(currentWeeklyLifeScoreQuery, 'submittedScoreCount')

  const previousMonthlyCount = aggregateData(previousMonthlyLifeScoreQuery, 'submittedScoreCount')
  const currentMonthlyCount = aggregateData(currentMonthlyLifeScoreQuery, 'submittedScoreCount')

  const statsGridItems: StatsGridProps['items'] = [
    {
      count: currentDailyCount,
      title: 'Daily Life Scores',
      delta: currentDailyCount - previousDailyCount,
      loading: isDailyLoading
    },
    {
      count: currentWeeklyCount,
      title: 'Weekly Life Scores',
      delta: currentWeeklyCount - previousWeeklyCount,
      loading: isWeeklyLoading
    },
    {
      count: currentMonthlyCount,
      title: 'Monthly Life Scores',
      delta: currentMonthlyCount - previousMonthlyCount,
      loading: isMonthlyLoading
    }
  ]

  return (
    <>
      <Box mb={2}>
        <Typography fontWeight={700} variant="h5">
          Life Scores Completed
        </Typography>
        <Typography color="text.disabled" variant="body2">
          This month (<Moment date={month} format="MMMM YYYY" />)
        </Typography>
      </Box>
      <Box sx={{ mb: 6 }}>
        <StatsGrid items={statsGridItems} />
      </Box>
    </>
  )
}

export default LifeScoreGridReport
