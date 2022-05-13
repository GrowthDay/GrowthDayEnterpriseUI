import { noop, pick } from 'lodash-es'
import { useCallback, useMemo } from 'react'
import { OrganizationUpdateAddressRequest, OrganizationUpdateSubscription } from '../../../types/api'
import mergeSchemas from '../../../utils/mergeSchemas'
import useUpdateAddressMutation, {
  UpdateAddressDefaultValues,
  UpdateAddressValidationSchema
} from '../../../api/mutations/useUpdateAddressMutation'
import useUpdatePaymentMethodMutation, {
  UpdatePaymentMethodDefaultValues,
  UpdatePaymentMethodRequest,
  UpdatePaymentMethodValidationSchema
} from '../../../api/mutations/useUpdatePaymentMethodMutation'
import useUpdateSubscriptionMutation, {
  UpdateSubscriptionDefaultValues,
  UpdateSubscriptionValidationSchema
} from '../../../api/mutations/useUpdateSubscriptionMutation'

export type SetupSubscriptionRequest = OrganizationUpdateAddressRequest &
  OrganizationUpdateSubscription &
  UpdatePaymentMethodRequest & {
    minSeats?: number
  }

export const SetupSubscriptionValidationSchema = mergeSchemas(
  UpdateSubscriptionValidationSchema,
  UpdateAddressValidationSchema,
  UpdatePaymentMethodValidationSchema
)

export const SetupSubscriptionDefaultValues: SetupSubscriptionRequest = {
  ...UpdateAddressDefaultValues,
  ...UpdateSubscriptionDefaultValues,
  ...UpdatePaymentMethodDefaultValues
}

const useSetupSubscriptionMutation = () => {
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
  } = useUpdatePaymentMethodMutation({ onSuccess: noop })
  const {
    mutateAsync: updateSubscriptionMutateAsync,
    data: subscription,
    error: updateSubscriptionError,
    isLoading: updateSubscriptionLoading
  } = useUpdateSubscriptionMutation()

  const mutateAsync = useCallback(
    async (values: SetupSubscriptionRequest) => {
      await updateAddressMutateAsync(pick(values, 'country', 'region', 'zipCode'))
      await updatePaymentMethodMutateAsync(values.paymentMethodId)
      await updateSubscriptionMutateAsync(pick(values, 'stripePriceId', 'totalSeats'))
    },
    [updateAddressMutateAsync, updatePaymentMethodMutateAsync, updateSubscriptionMutateAsync]
  )
  const data = useMemo(() => ({ address, paymentMethod, subscription }), [address, paymentMethod, subscription])
  const error = useMemo(
    () => updateAddressError || updatePaymentMethodError || updateSubscriptionError,
    [updateAddressError, updatePaymentMethodError, updateSubscriptionError]
  )
  const isLoading = useMemo(
    () => updateAddressLoading || updatePaymentMethodLoading || updateSubscriptionLoading,
    [updateAddressLoading, updatePaymentMethodLoading, updateSubscriptionLoading]
  )

  return useMemo(() => ({ mutateAsync, data, error, isLoading }), [mutateAsync, data, error, isLoading])
}

export default useSetupSubscriptionMutation
