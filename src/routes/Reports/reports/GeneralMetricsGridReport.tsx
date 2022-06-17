import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import Moment from 'react-moment'
import { useReportQueries } from '../../../api/queries/useOrganizationReportsQuery'
import { ChallengeCompletedData, JournalEntryData, PlansCreatedData } from '../../../types/api'
import StatsGrid, { StatsGridProps } from '../components/StatsGrid'
import { aggregateData, createDateRange } from '../utils'

const GeneralMetricsGridReport: FC<{ month: string }> = ({ month }) => {
  const dateRanges = createDateRange(month)

  const [previousChallengesCompletedQuery, currentChallengesCompletedQuery, isChallengeLoading] =
    useReportQueries<ChallengeCompletedData>('challengesCompleted', dateRanges)
  const [previousJournalEntriesQuery, currentJournalEntriesQuery, isJournalLoading] =
    useReportQueries<JournalEntryData>('journalEntries', dateRanges)
  const [previousPlansCreatedQuery, currentPlansCreatedQuery, isPlanLoading] = useReportQueries<PlansCreatedData>(
    'plansCreated',
    dateRanges
  )

  const previousChallengesCompletedCount = aggregateData(previousChallengesCompletedQuery, 'challengeCompletedCount')
  const currentChallengesCompletedCount = aggregateData(currentChallengesCompletedQuery, 'challengeCompletedCount')

  const previousJournalEntriesCount = aggregateData(previousJournalEntriesQuery, 'journalSubmittedCount')
  const currentJournalEntriesCount = aggregateData(currentJournalEntriesQuery, 'journalSubmittedCount')

  const previousPlansCreatedCount = aggregateData(previousPlansCreatedQuery, 'plansCreatedCount')
  const currentPlansCreatedCount = aggregateData(currentPlansCreatedQuery, 'plansCreatedCount')

  const statsGridItems: StatsGridProps['items'] = [
    {
      count: currentJournalEntriesCount,
      title: 'Journal entries',
      delta: currentJournalEntriesCount - previousJournalEntriesCount,
      loading: isJournalLoading
    },
    {
      count: currentPlansCreatedCount,
      title: 'Plans created',
      delta: currentPlansCreatedCount - previousPlansCreatedCount,
      loading: isPlanLoading
    },
    {
      count: 12,
      title: 'Certificates of Completion',
      delta: -1,
      disabled: true
      // loading: isDailyLoading
    },
    {
      count: currentChallengesCompletedCount,
      title: 'Challenges completed',
      delta: currentChallengesCompletedCount - previousChallengesCompletedCount,
      loading: isChallengeLoading
    },
    {
      count: 44,
      title: 'Goals created',
      delta: 10,
      disabled: true
      // loading: isDailyLoading
    },
    {
      count: 18,
      title: 'Goals completed',
      delta: 7,
      disabled: true
      // loading: isDailyLoading
    }
  ]

  return (
    <>
      <Box mb={2}>
        <Typography fontWeight={700} variant="h5">
          General Metric
        </Typography>
        <Typography color="text.disabled" variant="body2">
          <Moment date={month} format="MMMM YYYY" />
        </Typography>
      </Box>
      <Box sx={{ mb: 6 }}>
        <StatsGrid items={statsGridItems} />
      </Box>
    </>
  )
}

export default GeneralMetricsGridReport
