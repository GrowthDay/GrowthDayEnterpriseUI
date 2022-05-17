import { useQuery } from 'react-query'
import { UseQueryOptions } from 'react-query/types/react/types'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import useModifiedRecoilState from '../../hooks/useModifiedRecoilState'
import organizationIdState from '../../recoil/atoms/organizationIdState'
import { OrganizationUser, UserRequest, UserMetadata } from '../../types/api'

export const ORGANIZATION_USER_QUERY_KEY = ['GROWTHDAY', 'QUERY', 'ORGANIZATION_USER']

export type IUser = OrganizationUser &
  UserRequest &
  UserMetadata & {
    firstName?: string
    lastName?: string
    profileImageKey?: string
    profileImage?: string
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
        axiosGrowthDay.get<UserRequest & UserMetadata & { profileImageKey?: string }>('/me')
      ]).then(async ([organizationUser, me]): Promise<IUser> => {
        let profileImage = ''
        if (me.profileImageKey) {
          profileImage = await axiosGrowthDay.get<any>('/users/profilePic').then((res) => res?.profilePicUrl)
        }
        const [firstName, ...rest] = me.fullName?.split(' ') ?? []
        return {
          ...organizationUser,
          ...me,
          name: me.fullName,
          profileImage,
          firstName: firstName?.trim() ?? '',
          lastName: rest?.join(' ')?.trim() ?? ''
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
