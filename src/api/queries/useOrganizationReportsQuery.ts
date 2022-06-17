import { snakeCase } from 'lodash-es'
import { useQuery, UseQueryResult } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { createDateRange, DateRange, DateRanges } from '../../routes/Reports/utils'
import {
  ChallengeCompletedData,
  JournalEntryData,
  LifeScoreData,
  PlansCreatedData,
  TopCoursesData,
  TopEventsData,
  TotalEmployeesData
} from '../../types/api'

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

const useOrganizationReportsQuery = (
  month: string,
  options: Omit<
    UseQueryOptions<any, unknown, any, ReturnType<typeof getOrganizationReportsQueryKey>>,
    'queryKey' | 'queryFn'
  > = {}
) => {
  const dateRanges = createDateRange(month)

  const dailyLifeScoreQueries = useReportQueries<LifeScoreData>('dailyLifeScore', dateRanges, options)
  const weeklyLifeScoreQueries = useReportQueries<LifeScoreData>('weeklyLifeScore', dateRanges, options)
  const monthlyLifeScoreQueries = useReportQueries<LifeScoreData>('monthlyLifeScore', dateRanges, options)
  const previousMonthlyLifeScoreQueries = useReportQueries<LifeScoreData>('monthlyLifeScore', dateRanges, options)
  const challengesCompletedQueries = useReportQueries<ChallengeCompletedData>(
    'challengesCompleted',
    dateRanges,
    options
  )
  const journalEntriesQueries = useReportQueries<JournalEntryData>('journalEntries', dateRanges, options)
  const plansCreatedQueries = useReportQueries<PlansCreatedData>('plansCreated', dateRanges, options)
  const totalEmployeesQueries = useReportQueries<TotalEmployeesData>('totalEmployees', dateRanges, options)

  const topCoursesQuery = useReportQuery<TopCoursesData>('topCourses', dateRanges.current, options)
  const topEventsQuery = useReportQuery<TopEventsData>('topEvents', dateRanges.current, options)

  return {
    challengesCompletedQueries,
    dailyLifeScoreQueries,
    weeklyLifeScoreQueries,
    monthlyLifeScoreQueries,
    previousMonthlyLifeScoreQueries,
    journalEntriesQueries,
    plansCreatedQueries,
    totalEmployeesQueries,

    topCoursesQuery,
    topEventsQuery
  }
}

export default useOrganizationReportsQuery
