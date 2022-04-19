import { useMemo } from 'react'
import useOrganizationQuery from '../api/queries/useOrganizationQuery'
import useSubscriptionPlansQuery from '../api/queries/useSubscriptionPlansQuery'

const useActiveSubscription = () => {
  const { data: organization, isLoading: organizationLoading } = useOrganizationQuery()
  const { data: subscriptionPlans = [], isLoading: subscriptionPlansLoading } = useSubscriptionPlansQuery()
  return useMemo(
    () => ({
      isLoading: organizationLoading || subscriptionPlansLoading,
      subscription: subscriptionPlans.find((plan) => plan.stripeYearlyPriceId === organization?.stripePriceId)
    }),
    [subscriptionPlans, organization, organizationLoading, subscriptionPlansLoading]
  )
}

export default useActiveSubscription
