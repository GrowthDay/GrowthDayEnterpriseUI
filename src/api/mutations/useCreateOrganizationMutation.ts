import { isValidPhoneNumber } from 'react-phone-number-input'
import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import accessTokenState from '../../recoil/atoms/accessTokenState'
import { CreateOrganizationResponse, OrganizationCreateRequest } from '../../types/api'
import mergeSchemas from '../../utils/mergeSchemas'
import { nameRegex, passwordRegex } from '../../utils/regex'
import { ORGANIZATION_QUERY_KEY } from '../queries/useOrganizationQuery'
import { UpdateOrganizationValidationSchema } from './useUpdateOrganizationMutation'

export const CREATE_ORGANIZATION_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'CREATE_ORGANIZATION']

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Required'),
    firstName: yup.string().required('Required').matches(nameRegex.regex, 'Please enter a valid first name'),
    lastName: yup.string().required('Required').matches(nameRegex.regex, 'Please enter a valid last name'),
    email: yup.string().email('Should be a valid email address').required('Required'),
    password: yup.string().required('Required').matches(passwordRegex.regex, passwordRegex.message),
    phoneNumber: yup
      .string()
      .required('Required')
      .test('valid', 'Please enter a valid phone number', (value) => (value ? isValidPhoneNumber(value) : true))
  })
  .required()

export const CreateOrganizationValidationSchema = mergeSchemas(UpdateOrganizationValidationSchema, schema)

export const CreateOrganizationDefaultValues: Omit<OrganizationCreateRequest, 'fullName'> & {
  firstName?: string
  lastName?: string
} = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  name: '',
  phoneNumber: '',
  dataCompliancePolicyAccepted: true,
  teamAssessmentEnabled: true,
  domains: []
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
      onSuccess: (data) => {
        if (data.organization) {
          queryClient.setQueryData(ORGANIZATION_QUERY_KEY, data.organization)
        }
        if (data.loginResponse?.authenticationToken) {
          setAccessToken(data.loginResponse.authenticationToken)
        }
      },
      ...options
    }
  )
}
export default useCreateOrganizationMutation
