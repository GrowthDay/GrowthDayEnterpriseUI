import { ITooltipItem } from './tooltip-item'

/**
 * Model definition for Tooltips
 */
export interface ITooltips {
  id: number
  trigger?: EnumTooltipsTrigger
  disabled?: boolean
  items: ITooltipItem[]
  created_at?: string | null
}

export enum EnumTooltipsTrigger {
  ON_CHALLENGE_LOAD = 'ON_CHALLENGE_LOAD',
  ON_CHALLENGE_FIRST_TASK_COMPLETE = 'ON_CHALLENGE_FIRST_TASK_COMPLETE',
  ON_CHALLENGE_DAY_ONE_COMPLETE = 'ON_CHALLENGE_DAY_ONE_COMPLETE',
  ON_DASHBOARD_LOAD = 'ON_DASHBOARD_LOAD',
  ON_ENTERPRISE_DASHBOARD_LOAD = 'ON_ENTERPRISE_DASHBOARD_LOAD'
}
