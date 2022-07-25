import { snakeCase } from 'lodash-es'
import { useQuery, UseQueryResult } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { DateRange, DateRanges } from '../../routes/Reports/utils'

export const BASE_ORGANIZATION_REPORTS_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'ORGANIZATION_REPORTS']

export const getOrganizationReportsQueryKey = (...args: string[]) => [...BASE_ORGANIZATION_REPORTS_QUERY_KEY, ...args]

export const useReportQuery = <T>(
  report: string,
  dateRange: DateRange,
  options: Omit<
    UseQueryOptions<any, unknown, any, ReturnType<typeof getOrganizationReportsQueryKey>>,
    'queryKey' | 'queryFn'
  > = {}
): UseQueryResult<T[], unknown> =>
  useQuery(
    getOrganizationReportsQueryKey(snakeCase(report).toUpperCase(), dateRange.month),
    () => axiosGrowthDay.get<T[]>(`/organizations/report/${report}/${dateRange.startDate}/${dateRange.endDate}`),
    options
  )

export const useReportQueries = <T>(
  report: string,
  dateRanges: DateRanges,
  options: Omit<
    UseQueryOptions<any, unknown, any, ReturnType<typeof getOrganizationReportsQueryKey>>,
    'queryKey' | 'queryFn'
  > = {}
): [UseQueryResult<T[], unknown>, UseQueryResult<T[], unknown>, boolean] => {
  const previousQuery = useReportQuery<T>(report, dateRanges.previous, options)
  const currentQuery = useReportQuery<T>(report, dateRanges.current, options)
  return [previousQuery, currentQuery, previousQuery.isLoading || currentQuery.isLoading]
}
