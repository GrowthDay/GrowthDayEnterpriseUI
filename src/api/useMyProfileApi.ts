import axios from 'axios'
import moment from 'moment'
import Moment from 'react-moment'
import { useQuery } from 'react-query'
import { IUser } from '../types/user'

export const PROFILE_QUERY_KEY = 'PROFILE'

const useMyProfileApi = () =>
  useQuery([PROFILE_QUERY_KEY], () => axios.get<IUser>('/me'), {
    select: (data): IUser => {
      const [firstName, ...rest] = data.fullName?.split(' ') ?? []
      return {
        ...data,
        firstName: firstName?.trim() ?? '',
        lastName: rest?.join(' ')?.trim() ?? ''
      }
    },
    onSuccess: (data) => {
      const tz = data.ianaTimezone || moment.tz.guess()
      Moment.globalTimezone = tz
      moment.tz.setDefault(tz)
    }
  })

export default useMyProfileApi
