import { PersonOutlined } from '@mui/icons-material'
import moment from 'moment'
import { FC } from 'react'
import useOrganizationQuery from '../../../api/queries/useOrganizationQuery'
import { useReportQueries, useReportQuery } from '../../../api/queries/useOrganizationReportsQuery'
import { EarnedAchievementsData } from '../../../types/api'
import Stats, { StatsProps } from '../components/Stats'
import { aggregateData, createDateRange, DateRange, DateRanges } from '../utils'

const EarnedAchievementsReport: FC<{ month: string }> = ({ month }) => {
  const { data: organization } = useOrganizationQuery()
  const createDate = moment(organization?.createTimestamp).startOf('M').format('YYYY-MM-DD')
  const dateRange: DateRange = {
    month: createDate,
    startDate: createDate,
    endDate: moment().format('YYYY-MM-DD')
  }
  const allEarnedAchievementsQuery = useReportQuery<EarnedAchievementsData>('earnedAchievements', dateRange)

  const dateRanges: DateRanges = createDateRange(month)
  const [previousEarnedAchievementsQuery, currentEarnedAchievementsQuery, isLoading] =
    useReportQueries<EarnedAchievementsData>('earnedAchievements', dateRanges)

  const allEarnedAchievementsTotal = aggregateData(allEarnedAchievementsQuery, 'earnedAchievementsCount')
  const previousEarnedAchievementsTotal = aggregateData(previousEarnedAchievementsQuery, 'earnedAchievementsCount')
  const currentEarnedAchievementsTotal = aggregateData(currentEarnedAchievementsQuery, 'earnedAchievementsCount')

  const stats: StatsProps = {
    count: allEarnedAchievementsTotal,
    title: 'Earned Achievements',
    icon: <PersonOutlined />,
    delta: currentEarnedAchievementsTotal - previousEarnedAchievementsTotal,
    subtitle: 'vs last month',
    loading: isLoading
  }

  return <Stats {...stats} />
}

export default EarnedAchievementsReport
