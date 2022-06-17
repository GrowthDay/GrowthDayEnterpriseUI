import { FC } from 'react'
import { useReportQueries } from '../../../api/queries/useOrganizationReportsQuery'
import { LifeScoreData } from '../../../types/api'
import Stats, { StatsProps } from '../components/Stats'
import { aggregateData, createDateRange } from '../utils'

const DailyLifeScoreReport: FC<{ month: string }> = ({ month }) => {
  const dateRanges = createDateRange(month)
  const [previousDailyLifeScoreQuery, currentDailyLifeScoreQuery, isLoading] = useReportQueries<LifeScoreData>(
    'dailyLifeScore',
    dateRanges
  )
  const previousDailyLifeScoreTotal = aggregateData(previousDailyLifeScoreQuery, 'submittedScoreCount')
  const currentDailyLifeScoreTotal = aggregateData(currentDailyLifeScoreQuery, 'submittedScoreCount')

  const stats: StatsProps = {
    count: currentDailyLifeScoreTotal,
    title: 'Daily Life Scores',
    delta: currentDailyLifeScoreTotal - previousDailyLifeScoreTotal,
    loading: isLoading
  }

  return <Stats {...stats} />
}

export default DailyLifeScoreReport
