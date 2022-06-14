import { useMutation } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { countryStateRef } from '../../hooks/useCountryState'
import { OrganizationUpdateAddressRequest } from '../../types/api'

export const UPDATE_ADDRESS_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'UPDATE_ADDRESS']

export const UpdateAddressValidationSchema = yup
  .object()
  .shape({
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
    zipCode: yup.string().required('Required')
  })
  .required()

export const UpdateAddressDefaultValues: OrganizationUpdateAddressRequest = {
  country: '',
  region: '',
  zipCode: ''
}

const useUpdateAddressMutation = (
  options: Omit<
    UseMutationOptions<
      OrganizationUpdateAddressRequest,
      unknown,
      Record<string, any>,
      typeof UPDATE_ADDRESS_MUTATION_KEY
    >,
    'mutationKey' | 'mutationFn'
  > = {}
) =>
  useMutation(
    UPDATE_ADDRESS_MUTATION_KEY,
    (input: OrganizationUpdateAddressRequest) =>
      axiosGrowthDay.put<Record<string, any>>('/organizations/address', input),
    options
  )

export default useUpdateAddressMutation
