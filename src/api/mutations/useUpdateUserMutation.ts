import { isValidPhoneNumber } from 'react-phone-number-input'
import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { OrganizationUser, UserMetadata, UserRequest } from '../../types/api'
import { ORGANIZATION_USER_QUERY_KEY } from '../queries/useOrganizationUserQuery'

export const UPDATE_USER_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'UPDATE_USER']

export const UpdateUserValidationSchema = yup
  .object()
  .shape({
    fullName: yup.string().required('Required'),
    ianaTimezone: yup.string().required('Required'),
    phoneNumber: yup
      .string()
      .required('Required')
      .test('valid', 'Please enter a valid phone number', (value) => (value ? isValidPhoneNumber(value) : true))
  })
  .required()

const useUpdateUserMutation = (
  options: Omit<
    UseMutationOptions<
      any,
      unknown,
      OrganizationUser & UserRequest & UserMetadata & { profileImageKey?: string },
      typeof UPDATE_USER_MUTATION_KEY
    >,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    UPDATE_USER_MUTATION_KEY,
    (input: OrganizationUser & UserRequest & UserMetadata & { profileImageKey?: string }) =>
      Promise.all([
        // Todo: Update organization user
        // axiosGrowthDay.put<OrganizationUser>('/organizationUsers/me', input),
        axiosGrowthDay.put<UserRequest & UserMetadata & { profileImageKey?: string }>('/me', input)
      ]),
    {
      onSuccess: async (data) => {
        console.log({ data })
        await queryClient.invalidateQueries(ORGANIZATION_USER_QUERY_KEY)
      },
      ...options
    }
  )
}
export default useUpdateUserMutation
