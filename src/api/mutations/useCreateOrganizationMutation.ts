import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import accessTokenState from '../../recoil/atoms/accessTokenState'
import { CreateOrganizationResponse, OrganizationCreateRequest } from '../../types/api'
import { ORGANIZATION_QUERY_KEY } from '../queries/useOrganizationQuery'

export const CREATE_ORGANIZATION_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'CREATE_ORGANIZATION']

export const CreateOrganizationValidationSchema = yup
  .object()
  .shape({
    name: yup.string().required('Required'),
    firstName: yup.string().required('Required'),
    lastName: yup.string().required('Required'),
    email: yup.string().email('Should be a valid email address').required('Required'),
    password: yup
      .string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        'Choose a password with at least 8 characters. Choose a mixture of upper and lower case letters, numbers, and symbols.'
      )
      .required('Required')
  })
  .required()

export const CreateOrganizationDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  name: '',
  dataCompliancePolicyAccepted: true,
  teamAssessmentEnabled: true
}

const useCreateOrganizationMutation = (
  options: Omit<
    UseMutationOptions<
      CreateOrganizationResponse,
      unknown,
      OrganizationCreateRequest,
      typeof CREATE_ORGANIZATION_MUTATION_KEY
    >,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  const setAccessToken = useSetRecoilState(accessTokenState)
  return useMutation(
    CREATE_ORGANIZATION_MUTATION_KEY,
    (input: OrganizationCreateRequest) => axiosGrowthDay.post<CreateOrganizationResponse>('/organizations', input),
    {
      ...options,
      onSuccess: (data, ...rest) => {
        if (data.organization) {
          queryClient.setQueryData(ORGANIZATION_QUERY_KEY, data.organization)
        }
        if (data.loginResponse?.authenticationToken) {
          setAccessToken(data.loginResponse.authenticationToken)
        }
        return options.onSuccess?.(data, ...rest)
      }
    }
  )
}
export default useCreateOrganizationMutation