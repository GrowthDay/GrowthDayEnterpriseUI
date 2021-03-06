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

import { CustomChallengeTask } from './custom-challenge-task'
import { RemainingTimeForTasks } from './remaining-time-for-tasks'

/**
 *
 * @export
 * @interface CustomChallenge
 */
export interface CustomChallenge {
  /**
   *
   * @type {Array<CustomChallengeTask>}
   * @memberof CustomChallenge
   */
  customChallengeTasks?: Array<CustomChallengeTask>
  /**
   *
   * @type {string}
   * @memberof CustomChallenge
   */
  date?: string
  /**
   *
   * @type {number}
   * @memberof CustomChallenge
   */
  id?: number
  /**
   *
   * @type {string}
   * @memberof CustomChallenge
   */
  name?: string
  /**
   *
   * @type {string}
   * @memberof CustomChallenge
   */
  nameUid?: string
  /**
   *
   * @type {RemainingTimeForTasks}
   * @memberof CustomChallenge
   */
  remainingTimeForTasks?: RemainingTimeForTasks
}
