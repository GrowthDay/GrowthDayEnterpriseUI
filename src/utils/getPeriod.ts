import moment from 'moment'

export type Period = 'morning' | 'afternoon' | 'evening'

const getPeriod = (): Period => {
  const currentHour = moment.tz().hour()
  // Morning      -   5:00 AM — 11:59 AM
  // Afternoon    -   12:00 PM — 6:59 PM
  // Evening      -   7:00 PM — 4:59 AM
  if (currentHour >= 5 && currentHour < 12) {
    return 'morning'
  }
  if (currentHour >= 12 && currentHour < 19) {
    return 'afternoon'
  }
  return 'evening'
}

export default getPeriod
