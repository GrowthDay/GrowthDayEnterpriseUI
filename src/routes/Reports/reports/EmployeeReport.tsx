import { PersonOutlined } from '@mui/icons-material'
import moment from 'moment'
import { FC } from 'react'
import useOrganizationQuery from '../../../api/queries/useOrganizationQuery'
import { useReportQueries, useReportQuery } from '../../../api/queries/useOrganizationReportsQuery'
import { TotalEmployeesData } from '../../../types/api'
import Stats, { StatsProps } from '../components/Stats'
import { aggregateData, createDateRange, DateRange } from '../utils'

const EmployeeReport: FC<{ month: string }> = ({ month }) => {
  const { data: organization } = useOrganizationQuery()
  const createDate = moment(organization?.createTimestamp).startOf('M').format('YYYY-MM-DD')
  const dateRange: DateRange = {
    month: createDate,
    startDate: createDate,
    endDate: moment().format('YYYY-MM-DD')
  }
  const allEmployeeQuery = useReportQuery<TotalEmployeesData>('totalEmployees', dateRange)

  const dateRanges = createDateRange(month)
  const [previousEmployeeQuery, currentEmployeeQuery, isLoading] = useReportQueries<TotalEmployeesData>(
    'totalEmployees',
    dateRanges
  )

  const allEmployeeTotal = aggregateData(allEmployeeQuery, 'count')
  const previousEmployeeTotal = aggregateData(previousEmployeeQuery, 'count')
  const currentEmployeeTotal = aggregateData(currentEmployeeQuery, 'count')

  const stats: StatsProps = {
    count: allEmployeeTotal,
    title: 'Total employees',
    icon: <PersonOutlined />,
    delta: currentEmployeeTotal - previousEmployeeTotal,
    subtitle: 'new this month',
    loading: isLoading
  }

  return <Stats {...stats} />
}

export default EmployeeReport
