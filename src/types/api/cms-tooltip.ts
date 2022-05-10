/* tslint:disable */
/* eslint-disable */
/**
 * Api Documentation
 * Api Documentation
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { CmsTooltipItem } from './cms-tooltip-item'

/**
 *
 * @export
 * @interface CmsTooltip
 */
export interface CmsTooltip {
  /**
   *
   * @type {boolean}
   * @memberof CmsTooltip
   */
  disabled?: boolean
  /**
   *
   * @type {string}
   * @memberof CmsTooltip
   */
  id?: string
  /**
   *
   * @type {Array<CmsTooltipItem>}
   * @memberof CmsTooltip
   */
  items?: Array<CmsTooltipItem>
  /**
   *
   * @type {string}
   * @memberof CmsTooltip
   */
  trigger?: CmsTooltipTriggerEnum
}

export const CmsTooltipTriggerEnum = {
  ChallengeLoad: 'ON_CHALLENGE_LOAD',
  ChallengeFirstTaskComplete: 'ON_CHALLENGE_FIRST_TASK_COMPLETE',
  ChallengeDayOneComplete: 'ON_CHALLENGE_DAY_ONE_COMPLETE',
  DashboardLoad: 'ON_DASHBOARD_LOAD',
  EnterpriseDashboardLoad: 'ON_ENTERPRISE_DASHBOARD_LOAD'
} as const

export type CmsTooltipTriggerEnum = typeof CmsTooltipTriggerEnum[keyof typeof CmsTooltipTriggerEnum]
