import { isValidPhoneNumber } from 'react-phone-number-input'
import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { countryStateRef } from '../../hooks/useCountryState'
import { Organization, OrganizationUpdateAddressRequest } from '../../types/api'
import { ORGANIZATION_QUERY_KEY } from '../queries/useOrganizationQuery'

export const UPDATE_PAYMENT_METHOD_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'UPDATE_PAYMENT_METHOD']

export type UpdatePaymentMethodRequest = OrganizationUpdateAddressRequest & {
  fullName: string
  paymentMethodId: string
}

export const UpdatePaymentMethodDefaultValues: UpdatePaymentMethodRequest = {
  fullName: '',
  paymentMethodId: '',
  country: '',
  region: '',
  zipCode: '',
  phoneNumber: ''
}

export const UpdatePaymentMethodValidationSchema = yup
  .object()
  .shape({
    fullName: yup.string().required('Required'),
    country: yup.string().required('Required'),
    region: yup.string().when('country', {
      is: (countryNameOrIso2: string) => {
        if (countryNameOrIso2) {
          return Boolean(countryStateRef.current?.getStates(countryNameOrIso2)?.length)
        }
        return false
      },
      then: yup.string().required('Required')
    }),
    zipCode: yup.string().required('Required'),
    phoneNumber: yup
      .string()
      .required('Required')
      .test('valid', 'Please enter a valid phone number', (value) => (value ? isValidPhoneNumber(value) : true))
  })
  .required()

const useUpdatePaymentMethodMutation = (
  options: Omit<
    UseMutationOptions<Organization, unknown, string, typeof UPDATE_PAYMENT_METHOD_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    UPDATE_PAYMENT_METHOD_MUTATION_KEY,
    (input: string) => axiosGrowthDay.put<Organization>('/organizations/paymentMethod', input),
    {
      ...options,
      onSuccess: (data, ...rest) => {
        queryClient.setQueryData(ORGANIZATION_QUERY_KEY, data)
        return options.onSuccess?.(data, ...rest)
      }
    }
  )
}

export default useUpdatePaymentMethodMutation
