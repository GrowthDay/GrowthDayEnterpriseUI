import moment from 'moment'
import Moment from 'react-moment'
import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../axios/axiosGrowthDay'
import { IUser } from '../types/user'

export const PROFILE_QUERY_KEY = 'GROWTHDAY:PROFILE'

const useMyProfileApi = (
  options: Omit<UseQueryOptions<IUser, unknown, IUser, typeof PROFILE_QUERY_KEY>, 'queryKey' | 'queryFn'> = {}
) =>
  useQuery(
    PROFILE_QUERY_KEY,
    () =>
      axiosGrowthDay.get<IUser>('/me').then((data) => {
        const [firstName, ...rest] = data.fullName?.split(' ') ?? []
        return {
          ...data,
          firstName: firstName?.trim() ?? '',
          lastName: rest?.join(' ')?.trim() ?? ''
        }
      }),
    {
      onSuccess: (data) => {
        const tz = data.ianaTimezone || moment.tz.guess()
        Moment.globalTimezone = tz
        moment.tz.setDefault(tz)
      },
      ...options
    }
  )

export default useMyProfileApi
