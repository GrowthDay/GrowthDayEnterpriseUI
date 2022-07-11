import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import Moment from 'react-moment'
import { useReportQueries } from '../../../api/queries/useOrganizationReportsQuery'
import {
  ChallengeCompletedData,
  JournalEntryData,
  PlansCreatedData,
  CertificateCompletionData
} from '../../../types/api'
import StatsGrid, { StatsGridProps } from '../components/StatsGrid'
import { aggregateData, createDateRange } from '../utils'

const GeneralMetricsGridReport: FC<{ month: string }> = ({ month }) => {
  const dateRanges = createDateRange(month)

  const [previousJournalEntriesQuery, currentJournalEntriesQuery, isJournalLoading] =
    useReportQueries<JournalEntryData>('journalEntries', dateRanges)

  const [previousPlansCreatedQuery, currentPlansCreatedQuery, isPlanLoading] = useReportQueries<PlansCreatedData>(
    'plansCreated',
    dateRanges
  )

  const [previousCertificateCompletionQuery, currentCertificateCompletionQuery, isCertificateLoading] =
    useReportQueries<CertificateCompletionData>('certificateCompletion', dateRanges)

  const [previousChallengesCompletedQuery, currentChallengesCompletedQuery, isChallengeLoading] =
    useReportQueries<ChallengeCompletedData>('challengesCompleted', dateRanges)

  const [previousGoalsCreatedQuery, currentGoalsCreatedQuery, isGoalsCreatedLoading] =
    useReportQueries<ChallengeCompletedData>('goalsCreated', dateRanges)

  const [previousGoalsCompletedQuery, currentGoalsCompletedQuery, isGoalsCompletedLoading] =
    useReportQueries<ChallengeCompletedData>('goalsCompleted', dateRanges)

  const previousJournalEntriesCount = aggregateData(previousJournalEntriesQuery, 'journalSubmittedCount')
  const currentJournalEntriesCount = aggregateData(currentJournalEntriesQuery, 'journalSubmittedCount')

  const previousPlansCreatedCount = aggregateData(previousPlansCreatedQuery, 'plansCreatedCount')
  const currentPlansCreatedCount = aggregateData(currentPlansCreatedQuery, 'plansCreatedCount')

  const previousCertificateCompletionCount = aggregateData(previousCertificateCompletionQuery, 'certificateEarnedCount')
  const currentCertificateCompletionCount = aggregateData(currentCertificateCompletionQuery, 'certificateEarnedCount')

  const previousChallengesCompletedCount = aggregateData(previousChallengesCompletedQuery, 'challengeCompletedCount')
  const currentChallengesCompletedCount = aggregateData(currentChallengesCompletedQuery, 'challengeCompletedCount')

  const previousGoalsCreatedCount = aggregateData(previousGoalsCreatedQuery, 'challengeCompletedCount')
  const currentGoalsCreatedCount = aggregateData(currentGoalsCreatedQuery, 'challengeCompletedCount')

  const previousGoalsCompletedCount = aggregateData(previousGoalsCompletedQuery, 'challengeCompletedCount')
  const currentGoalsCompletedCount = aggregateData(currentGoalsCompletedQuery, 'challengeCompletedCount')

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
      count: currentCertificateCompletionCount,
      title: 'Certificates of Completion',
      delta: currentCertificateCompletionCount - previousCertificateCompletionCount,
      loading: isCertificateLoading
    },
    {
      count: currentChallengesCompletedCount,
      title: 'Challenges completed',
      delta: currentChallengesCompletedCount - previousChallengesCompletedCount,
      loading: isChallengeLoading
    },
    {
      count: currentGoalsCreatedCount,
      title: 'Goals created',
      delta: currentGoalsCreatedCount - previousGoalsCreatedCount,
      loading: isGoalsCreatedLoading
    },
    {
      count: currentGoalsCompletedCount,
      title: 'Goals completed',
      delta: currentGoalsCompletedCount - previousGoalsCompletedCount,
      loading: isGoalsCompletedLoading
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
