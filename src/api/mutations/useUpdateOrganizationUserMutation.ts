import { isValidPhoneNumber } from 'react-phone-number-input'
import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { Organization, OrganizationUpdateRequest, OrganizationUser } from '../../types/api'
import { ORGANIZATION_USER_QUERY_KEY } from '../queries/useOrganizationUserQuery'

export const UPDATE_ORGANIZATION_USER_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'UPDATE_ORGANIZATION_USER']

export const UpdateOrganizationUserValidationSchema = yup
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

const useUpdateOrganizationMutation = (
  options: Omit<
    UseMutationOptions<Organization, unknown, OrganizationUpdateRequest, typeof UPDATE_ORGANIZATION_USER_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    UPDATE_ORGANIZATION_USER_MUTATION_KEY,
    (input: OrganizationUser) => axiosGrowthDay.put<Organization>('/organizationUsers', input),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(ORGANIZATION_USER_QUERY_KEY, data)
      },
      ...options
    }
  )
}
export default useUpdateOrganizationMutation
