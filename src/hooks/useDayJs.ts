import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import localeData from 'dayjs/plugin/localeData'
import isBetween from 'dayjs/plugin/isBetween'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'
import duration from 'dayjs/plugin/duration'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import timezone from 'dayjs/plugin/timezone'
import calendar from 'dayjs/plugin/calendar'
import dayjs from 'dayjs'
import { useEffect } from 'react'

const useDayJs = () => {
  useEffect(() => {
    dayjs.extend(relativeTime)
    dayjs.extend(utc)
    dayjs.extend(localeData)
    dayjs.extend(isBetween)
    dayjs.extend(advancedFormat)
    dayjs.extend(isToday)
    dayjs.extend(isYesterday)
    dayjs.extend(duration)
    dayjs.extend(dayOfYear)
    dayjs.extend(isSameOrAfter)
    dayjs.extend(isSameOrBefore)
    dayjs.extend(timezone)
    dayjs.extend(calendar)
  }, [])
}

export default useDayJs
