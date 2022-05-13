import { isValidPhoneNumber } from 'react-phone-number-input'
import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import { useSetRecoilState } from 'recoil'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import accessTokenState from '../../recoil/atoms/accessTokenState'
import { CreateOrganizationResponse, OrganizationCreateRequest } from '../../types/api'
import { ORGANIZATION_QUERY_KEY } from '../queries/useOrganizationQuery'

export const CREATE_ORGANIZATION_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'CREATE_ORGANIZATION']

export const urlRegex =
  /@(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

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
      .required('Required'),
    phoneNumber: yup
      .string()
      .required('Required')
      .test('valid', 'Please enter a valid phone number', (value) => (value ? isValidPhoneNumber(value) : true)),
    domains: yup
      .array()
      .of(yup.string().required('Required'))
      .test('valid', 'Please enter valid domains', (values) =>
        Boolean(values?.every((value) => (value ? urlRegex.test(value) : false)))
      )
  })
  .required()

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
