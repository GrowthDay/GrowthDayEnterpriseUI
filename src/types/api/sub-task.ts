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
 * @interface SubTask
 */
export interface SubTask {
  /**
   *
   * @type {boolean}
   * @memberof SubTask
   */
  complete?: boolean
  /**
   *
   * @type {string}
   * @memberof SubTask
   */
  completedDate?: string
  /**
   *
   * @type {number}
   * @memberof SubTask
   */
  createTimestamp?: number
  /**
   *
   * @type {number}
   * @memberof SubTask
   */
  deleteTimestamp?: number
  /**
   *
   * @type {string}
   * @memberof SubTask
   */
  dueDateTimestamp?: string
  /**
   *
   * @type {string}
   * @memberof SubTask
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof SubTask
   */
  notes?: string
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof SubTask
   */
  notesPhotosIds?: { [key: string]: string }
  /**
   *
   * @type {string}
   * @memberof SubTask
   */
  order?: string
  /**
   *
   * @type {EmbeddedReminder}
   * @memberof SubTask
   */
  reminder?: EmbeddedReminder
  /**
   *
   * @type {string}
   * @memberof SubTask
   */
  title?: string
  /**
   *
   * @type {number}
   * @memberof SubTask
   */
  updateTimestamp?: number
}
