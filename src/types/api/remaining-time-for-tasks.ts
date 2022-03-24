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
 * @interface RemainingTimeForTasks
 */
export interface RemainingTimeForTasks {
  /**
   *
   * @type {number}
   * @memberof RemainingTimeForTasks
   */
  hoursLeft?: number
  /**
   *
   * @type {boolean}
   * @memberof RemainingTimeForTasks
   */
  isYesterday?: boolean
  /**
   *
   * @type {number}
   * @memberof RemainingTimeForTasks
   */
  minutesLeft?: number
  /**
   *
   * @type {string}
   * @memberof RemainingTimeForTasks
   */
  remainingTimeStatus?: RemainingTimeForTasksRemainingTimeStatusEnum
  /**
   *
   * @type {number}
   * @memberof RemainingTimeForTasks
   */
  secondsLeft?: number
}

export const RemainingTimeForTasksRemainingTimeStatusEnum = {
  InProgress: 'IN_PROGRESS',
  Expired: 'EXPIRED'
} as const

export type RemainingTimeForTasksRemainingTimeStatusEnum =
  typeof RemainingTimeForTasksRemainingTimeStatusEnum[keyof typeof RemainingTimeForTasksRemainingTimeStatusEnum]
