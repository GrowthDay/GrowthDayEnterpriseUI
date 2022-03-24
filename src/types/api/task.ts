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

import { EmbeddedReminder } from './embedded-reminder'
import { SubTask } from './sub-task'

/**
 *
 * @export
 * @interface Task
 */
export interface Task {
  /**
   *
   * @type {boolean}
   * @memberof Task
   */
  complete?: boolean
  /**
   *
   * @type {string}
   * @memberof Task
   */
  completedDate?: string
  /**
   *
   * @type {number}
   * @memberof Task
   */
  createTimestamp?: number
  /**
   *
   * @type {number}
   * @memberof Task
   */
  deleteTimestamp?: number
  /**
   *
   * @type {string}
   * @memberof Task
   */
  dueDateTimestamp?: string
  /**
   *
   * @type {string}
   * @memberof Task
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof Task
   */
  notes?: string
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof Task
   */
  notesPhotosIds?: { [key: string]: string }
  /**
   *
   * @type {string}
   * @memberof Task
   */
  order?: string
  /**
   *
   * @type {EmbeddedReminder}
   * @memberof Task
   */
  reminder?: EmbeddedReminder
  /**
   *
   * @type {Array<SubTask>}
   * @memberof Task
   */
  tasks?: Array<SubTask>
  /**
   *
   * @type {string}
   * @memberof Task
   */
  title?: string
  /**
   *
   * @type {number}
   * @memberof Task
   */
  updateTimestamp?: number
}
