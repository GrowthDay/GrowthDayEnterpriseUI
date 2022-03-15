/**
 * Model definition for DailyGrowthPrompts
 */
export interface IDailyGrowthPrompts {
  id: number
  promptText?: string
  scoreLowerBound?: number
  scoreUpperBound?: number
  type?: EnumDailyGrowthPromptsType
  created_at?: string | null
}

export enum EnumDailyGrowthPromptsType {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  history = 'history',
  dailyHistory = 'dailyHistory',
  weeklyHistory = 'weeklyHistory',
  monthlyHistory = 'monthlyHistory',
  default = 'default'
}
