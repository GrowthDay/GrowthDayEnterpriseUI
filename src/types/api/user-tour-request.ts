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

/**
 *
 * @export
 * @interface UserTourRequest
 */
export interface UserTourRequest {
  /**
   *
   * @type {boolean}
   * @memberof UserTourRequest
   */
  completed?: boolean
  /**
   *
   * @type {number}
   * @memberof UserTourRequest
   */
  createTimestamp?: number
  /**
   *
   * @type {number}
   * @memberof UserTourRequest
   */
  deleteTimestamp?: number
  /**
   *
   * @type {string}
   * @memberof UserTourRequest
   */
  id?: string
  /**
   *
   * @type {number}
   * @memberof UserTourRequest
   */
  progress?: number
  /**
   *
   * @type {boolean}
   * @memberof UserTourRequest
   */
  started?: boolean
  /**
   *
   * @type {string}
   * @memberof UserTourRequest
   */
  trigger?: UserTourRequestTriggerEnum
  /**
   *
   * @type {string}
   * @memberof UserTourRequest
   */
  triggerId?: string
  /**
   *
   * @type {string}
   * @memberof UserTourRequest
   */
  triggerType?: UserTourRequestTriggerTypeEnum
  /**
   *
   * @type {number}
   * @memberof UserTourRequest
   */
  updateTimestamp?: number
}

export const UserTourRequestTriggerEnum = {
  ChallengeDayOneComplete: 'ON_CHALLENGE_DAY_ONE_COMPLETE',
  ChallengeLoad: 'ON_CHALLENGE_LOAD',
  ChallengeFirstTaskComplete: 'ON_CHALLENGE_FIRST_TASK_COMPLETE',
  DashboardLoad: 'ON_DASHBOARD_LOAD'
} as const

export type UserTourRequestTriggerEnum = typeof UserTourRequestTriggerEnum[keyof typeof UserTourRequestTriggerEnum]
export const UserTourRequestTriggerTypeEnum = {
  Challenge: 'CHALLENGE',
  Plan: 'PLAN',
  Offer: 'OFFER',
  Campaign: 'CAMPAIGN'
} as const

export type UserTourRequestTriggerTypeEnum =
  typeof UserTourRequestTriggerTypeEnum[keyof typeof UserTourRequestTriggerTypeEnum]
