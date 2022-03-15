import { EnumSubscriptionPlansLevel, ISubscriptionPlans } from '../types/strapi'

const isPopularPlan = (plan: ISubscriptionPlans): boolean => plan.level === EnumSubscriptionPlansLevel.mastery

export default isPopularPlan
