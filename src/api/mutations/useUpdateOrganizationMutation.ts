import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { Organization, OrganizationUpdateRequest } from '../../types/api'
import { ORGANIZATION_QUERY_KEY } from '../queries/useOrganizationQuery'

export const UPDATE_ORGANIZATION_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'UPDATE_ORGANIZATION']

export const UpdateOrganizationValidationSchema = yup
  .object()
  .shape({
    name: yup.string().required('Required')
  })
  .required()

export const UpdateOrganizationDefaultValues = {
  name: '',
  dataCompliancePolicyAccepted: true,
  teamAssessmentEnabled: true
}

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
