import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { Organization, OrganizationUpdateRequest } from '../../types/api'
import mergeSchemas from '../../utils/mergeSchemas'
import { emailDomainsRegex } from '../../utils/regex'
import { ORGANIZATION_QUERY_KEY } from '../queries/useOrganizationQuery'
import { UpdateOrganizationNameValidationSchema } from './useUpdateOrganizationNameMutation'

export const UPDATE_ORGANIZATION_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'UPDATE_ORGANIZATION']

const schema = yup
  .object()
  .shape({
    domains: yup
      .array()
      .of(yup.string().required('Required'))
      .test('valid', emailDomainsRegex.message, (values) =>
        Boolean(values?.every((value) => (value ? emailDomainsRegex.regex.test(value) : false)))
      )
  })
  .required()

export const UpdateOrganizationValidationSchema = mergeSchemas(UpdateOrganizationNameValidationSchema, schema)

const useUpdateOrganizationMutation = (
  options: Omit<
    UseMutationOptions<Organization, unknown, OrganizationUpdateRequest, typeof UPDATE_ORGANIZATION_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    UPDATE_ORGANIZATION_MUTATION_KEY,
    (input: OrganizationUpdateRequest) => axiosGrowthDay.put<Organization>('/organizations', input),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(ORGANIZATION_QUERY_KEY, data)
      },
      ...options
    }
  )
}
export default useUpdateOrganizationMutation
