import { useMutation, useQueryClient } from 'react-query'
import { UseMutationOptions } from 'react-query/types/react/types'
import * as yup from 'yup'
import axiosGrowthDay from '../../axios/axiosGrowthDay'
import { Organization, OrganizationUpdateSubscription } from '../../types/api'
import { ORGANIZATION_PAYMENT_TRANSACTIONS_QUERY_KEY } from '../queries/useOrganizationPaymentTransactionsQuery'
import { ORGANIZATION_QUERY_KEY } from '../queries/useOrganizationQuery'

export const UPDATE_SUBSCRIPTION_MUTATION_KEY = ['GROWTHDAY', 'MUTATION', 'UPDATE_SUBSCRIPTION']

export const UpdateSubscriptionValidationSchema = yup
  .object()
  .shape({
    stripePriceId: yup.string().required('Required'),
    totalSeats: yup
      .number()
      .nullable()
      .when('minSeats', (minSeats, schema) => schema.min(minSeats, `Should be minimum ${minSeats}`))
      .max(100, 'Should be maximum 100')
      .required('Required')
      .typeError('Required')
  })
  .required()

export const UpdateSubscriptionDefaultValues: OrganizationUpdateSubscription = {
  stripePriceId: '',
  totalSeats: null as unknown as number
}

const useUpdateSubscriptionMutation = (
  options: Omit<
    UseMutationOptions<OrganizationUpdateSubscription, unknown, Organization, typeof UPDATE_SUBSCRIPTION_MUTATION_KEY>,
    'mutationKey' | 'mutationFn'
  > = {}
) => {
  const queryClient = useQueryClient()
  return useMutation(
    UPDATE_SUBSCRIPTION_MUTATION_KEY,
    (input: OrganizationUpdateSubscription) => axiosGrowthDay.put<Organization>('/organizations/subscription', input),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(ORGANIZATION_QUERY_KEY, data)
        queryClient.invalidateQueries(ORGANIZATION_PAYMENT_TRANSACTIONS_QUERY_KEY)
      },
      ...options
    }
  )
}
export default useUpdateSubscriptionMutation
