import { EnumSubscriptionPlansLevel, ISubscriptionPlans } from '../types/strapi'

const isPopularPlan = (plan: ISubscriptionPlans): boolean => plan.level === EnumSubscriptionPlansLevel.enterprise

export default isPopularPlan
