import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { IUser } from '../../types/user'

const PEOPLE_QUERY = 'GROWTHDAY:QUERY:PEOPLE'

const usePeopleQuery = (
  options: Omit<UseQueryOptions<IUser[], unknown, IUser[], typeof PEOPLE_QUERY>, 'queryKey' | 'queryFn'> = {}
) =>
  useQuery(
    PEOPLE_QUERY,
    () =>
      axiosGrowthDay
        .post('/cs/users', {
          offset: 0,
          limit: 100
        })
        .then((res) => res.results as IUser[]),
    options
  )

export default usePeopleQuery
