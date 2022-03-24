import { useMemo } from 'react'
import { useQueryClient } from 'react-query'
import { ORGANIZATION_QUERY_KEY } from '../api/queries/useOrganizationQuery'
import useSubscriptionPlansQuery from '../api/queries/useSubscriptionPlansQuery'
import { Organization } from '../types/api'

// TODO: remove manual calculation

const useAuthOrganization = () => {
  const queryClient = useQueryClient()
  const { data: strapiSubscriptions } = useSubscriptionPlansQuery()
  const organization = queryClient.getQueryData<Organization>(ORGANIZATION_QUERY_KEY)
  return useMemo(() => {
    if (!organization) return undefined

    const modifiedOrganization = Object.assign({}, organization)
    const subscriptionPlan = strapiSubscriptions?.find(
      (plan) => plan.level?.toUpperCase() === modifiedOrganization.plan?.toUpperCase()
    )
    if (modifiedOrganization.seats && subscriptionPlan) {
      modifiedOrganization.subscriptionAmount = modifiedOrganization.seats * (subscriptionPlan.yearlyAmount ?? 0)
      modifiedOrganization.stripePriceId = subscriptionPlan.stripeYearlyPriceId
    }
    return modifiedOrganization
  }, [organization, strapiSubscriptions])
}

export default useAuthOrganization
