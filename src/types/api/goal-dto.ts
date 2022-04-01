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

import { EmbeddedReminderRequest } from './embedded-reminder-request'
import { GoalMilestoneDto } from './goal-milestone-dto'
import { Plan } from './plan'

/**
 *
 * @export
 * @interface GoalDto
 */
export interface GoalDto {
  /**
   *
   * @type {boolean}
   * @memberof GoalDto
   */
  complete?: boolean
  /**
   *
   * @type {string}
   * @memberof GoalDto
   */
  description?: string
  /**
   *
   * @type {number}
   * @memberof GoalDto
   */
  dueDate?: number
  /**
   *
   * @type {Array<string>}
   * @memberof GoalDto
   */
  focusAreas?: Array<string>
  /**
   *
   * @type {Array<GoalMilestoneDto>}
   * @memberof GoalDto
   */
  goalMilestoneDtos?: Array<GoalMilestoneDto>
  /**
   *
   * @type {string}
   * @memberof GoalDto
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof GoalDto
   */
  masterOptionalId?: string
  /**
   *
   * @type {string}
   * @memberof GoalDto
   */
  masterPrimaryId?: string
  /**
   *
   * @type {string}
   * @memberof GoalDto
   */
  masterSecondaryId?: string
  /**
   *
   * @type {number}
   * @memberof GoalDto
   */
  order?: number
  /**
   *
   * @type {Array<string>}
   * @memberof GoalDto
   */
  planIds?: Array<string>
  /**
   *
   * @type {Array<Plan>}
   * @memberof GoalDto
   */
  plans?: Array<Plan>
  /**
   *
   * @type {EmbeddedReminderRequest}
   * @memberof GoalDto
   */
  reminder?: EmbeddedReminderRequest
  /**
   *
   * @type {string}
   * @memberof GoalDto
   */
  title?: string
  /**
   *
   * @type {string}
   * @memberof GoalDto
   */
  type?: GoalDtoTypeEnum
}

export const GoalDtoTypeEnum = {
  Challenge: 'CHALLENGE',
  Journal: 'JOURNAL',
  Goal: 'GOAL',
  Plan: 'PLAN'
} as const

export type GoalDtoTypeEnum = typeof GoalDtoTypeEnum[keyof typeof GoalDtoTypeEnum]