import moment from 'moment'
import { UseQueryResult } from 'react-query'

export type DateRange = {
  month: string
  startDate: string
  endDate: string
}
export type DateRanges = {
  previous: DateRange
  current: DateRange
}
export const createDateRange = (month: string): DateRanges => {
  const currentMonth = moment(month).format('YYYY-MM-DD')
  const previousMonth = moment(month).subtract(1, 'M').format('YYYY-MM-DD')

  const currentStartDate = moment(currentMonth, 'YYYY-MM-DD').startOf('M').format('YYYY-MM-DD')
  const currentEndDate = moment(currentMonth, 'YYYY-MM-DD').endOf('M').format('YYYY-MM-DD')
  const previousStartDate = moment(previousMonth, 'YYYY-MM-DD').startOf('M').format('YYYY-MM-DD')
  const previousEndDate = moment(previousMonth, 'YYYY-MM-DD').endOf('M').format('YYYY-MM-DD')

  return {
    previous: {
      month: previousMonth,
      startDate: previousStartDate,
      endDate: previousEndDate
    },
    current: {
      month: currentMonth,
      startDate: currentStartDate,
      endDate: currentEndDate
    }
  }
}

export const aggregateData = <T>(result: UseQueryResult<T[]>, key: keyof T) =>
  result.data?.reduce((total, curr) => ((curr[key] as unknown as number) ?? 0) + total, 0) ?? 0
