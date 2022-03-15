/**
 * Model definition for GrowthGroupPackage
 */
export interface IGrowthGroupPackage {
  id: number
  name?: string
  description?: string
  planFrequency?: EnumGrowthGroupPackagePlanFrequency
  maxParticipantsAllowed?: number
  price?: number
  stripePriceId?: string
  applePriceId?: string
  meetingsAllowed?: number
  created_at?: string | null
}

export enum EnumGrowthGroupPackagePlanFrequency {
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}
