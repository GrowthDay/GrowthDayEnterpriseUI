import { PersonOutlined } from '@mui/icons-material'
import { FC } from 'react'
import { useReportQueries } from '../../../api/queries/useOrganizationReportsQuery'
import { TotalEmployeesData } from '../../../types/api'
import Stats, { StatsProps } from '../components/Stats'
import { aggregateData, createDateRange } from '../utils'

const EmployeeReport: FC<{ month: string }> = ({ month }) => {
  const dateRanges = createDateRange(month)
  const [previousEmployeeQuery, currentEmployeeQuery, isLoading] = useReportQueries<TotalEmployeesData>(
    'totalEmployees',
    dateRanges
  )
  const previousEmployeeTotal = aggregateData(previousEmployeeQuery, 'count')
  const currentEmployeeTotal = aggregateData(currentEmployeeQuery, 'count')

  const stats1: StatsProps = {
    count: currentEmployeeTotal,
    title: 'Total employees',
    icon: <PersonOutlined />,
    delta: currentEmployeeTotal - previousEmployeeTotal,
    subtitle: 'new this month',
    loading: isLoading
  }

  return <Stats {...stats1} />
}

export default EmployeeReport
