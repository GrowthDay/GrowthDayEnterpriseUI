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

/**
 *
 * @export
 * @interface SubTask1
 */
export interface SubTask1 {
  /**
   *
   * @type {boolean}
   * @memberof SubTask1
   */
  complete?: boolean
  /**
   *
   * @type {string}
   * @memberof SubTask1
   */
  completedDate?: string
  /**
   *
   * @type {number}
   * @memberof SubTask1
   */
  createTimestamp?: number
  /**
   *
   * @type {number}
   * @memberof SubTask1
   */
  deleteTimestamp?: number
  /**
   *
   * @type {string}
   * @memberof SubTask1
   */
  dueDateTimestamp?: string
  /**
   *
   * @type {string}
   * @memberof SubTask1
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof SubTask1
   */
  notes?: string
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof SubTask1
   */
  notesPhotosIds?: { [key: string]: string }
  /**
   *
   * @type {string}
   * @memberof SubTask1
   */
  order?: string
  /**
   *
   * @type {EmbeddedReminder}
   * @memberof SubTask1
   */
  reminder?: EmbeddedReminder
  /**
   *
   * @type {string}
   * @memberof SubTask1
   */
  title?: string
  /**
   *
   * @type {number}
   * @memberof SubTask1
   */
  updateTimestamp?: number
}
