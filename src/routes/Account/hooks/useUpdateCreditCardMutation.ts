import { pick } from 'lodash-es'
import { useCallback, useMemo } from 'react'
import useUpdateAddressMutation, {
  UpdateAddressDefaultValues,
  UpdateAddressValidationSchema
} from '../../../api/mutations/useUpdateAddressMutation'
import useUpdatePaymentMethodMutation, {
  UpdatePaymentMethodDefaultValues,
  UpdatePaymentMethodRequest,
  UpdatePaymentMethodValidationSchema
} from '../../../api/mutations/useUpdatePaymentMethodMutation'
import { OrganizationUpdateAddressRequest, OrganizationUpdateSubscription } from '../../../types/api'
import mergeSchemas from '../../../utils/mergeSchemas'

export type UpdateCreditCardRequest = OrganizationUpdateAddressRequest &
  OrganizationUpdateSubscription &
  UpdatePaymentMethodRequest & {
    minSeats?: number
  }

export const UpdateCreditCardValidationSchema = mergeSchemas(
  UpdateAddressValidationSchema,
  UpdatePaymentMethodValidationSchema
)

export const UpdateCreditCardDefaultValues: UpdateCreditCardRequest = {
  ...UpdateAddressDefaultValues,
  ...UpdatePaymentMethodDefaultValues
}

const useUpdateCreditCardMutation = () => {
  const {
    mutateAsync: updateAddressMutateAsync,
    data: address,
    error: updateAddressError,
    isLoading: updateAddressLoading
  } = useUpdateAddressMutation()
  const {
    mutateAsync: updatePaymentMethodMutateAsync,
    data: paymentMethod,
    error: updatePaymentMethodError,
    isLoading: updatePaymentMethodLoading
  } = useUpdatePaymentMethodMutation()

  const mutateAsync = useCallback(
    async (values: UpdateCreditCardRequest) => {
      await updateAddressMutateAsync(pick(values, 'country', 'region', 'zipCode'))
      await updatePaymentMethodMutateAsync(values.paymentMethodId)
    },
    [updateAddressMutateAsync, updatePaymentMethodMutateAsync]
  )
  const data = useMemo(() => ({ address, paymentMethod }), [address, paymentMethod])
  const error = useMemo(
    () => updateAddressError || updatePaymentMethodError,
    [updateAddressError, updatePaymentMethodError]
  )
  const isLoading = useMemo(
    () => updateAddressLoading || updatePaymentMethodLoading,
    [updateAddressLoading, updatePaymentMethodLoading]
  )

  return useMemo(() => ({ mutateAsync, data, error, isLoading }), [mutateAsync, data, error, isLoading])
}

export default useUpdateCreditCardMutation
