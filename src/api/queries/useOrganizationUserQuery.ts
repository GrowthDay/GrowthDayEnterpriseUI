import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import useModifiedRecoilState from '../../hooks/useModifiedRecoilState'
import organizationIdState from '../../recoil/atoms/organizationIdState'
import { OrganizationUser, UserRequest, UserMetadata } from '../../types/api'

export const ORGANIZATION_USER_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'ORGANIZATION_USER_QUERY_KEY']

export type IUser = OrganizationUser &
  UserRequest &
  UserMetadata & {
    firstName?: string
    lastName?: string
  }

const useOrganizationUserQuery = (
  options: Omit<UseQueryOptions<IUser, unknown, IUser, typeof ORGANIZATION_USER_QUERY_KEY>, 'queryKey' | 'queryFn'> = {}
) => {
  const [, setOrganizationId, resetOrganizationId] = useModifiedRecoilState(organizationIdState)
  return useQuery(
    ORGANIZATION_USER_QUERY_KEY,
    () =>
      Promise.all([
        axiosGrowthDay.get<OrganizationUser[]>('/organizationUsers/me').then((res) => res[0]),
        axiosGrowthDay.get<UserRequest & UserMetadata>(`/me`)
      ]).then(([organizationUser, me]): IUser => {
        const [firstName, ...rest] = organizationUser?.name?.split(' ') ?? []
        return {
          ...me,
          firstName: firstName?.trim() ?? '',
          lastName: rest?.join(' ')?.trim() ?? '',
          ...organizationUser
        }
      }),
    {
      onSuccess: (data) => {
        if (data.organizationId) {
          setOrganizationId(data.organizationId)
        } else {
          resetOrganizationId()
        }
      },
      ...options
    }
  )
}
export default useOrganizationUserQuery
