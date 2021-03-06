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

/**
 *
 * @export
 * @interface SubTaskCreateRequest
 */
export interface SubTaskCreateRequest {
  /**
   *
   * @type {boolean}
   * @memberof SubTaskCreateRequest
   */
  complete?: boolean
  /**
   *
   * @type {string}
   * @memberof SubTaskCreateRequest
   */
  dueDateTimestamp?: string
  /**
   *
   * @type {string}
   * @memberof SubTaskCreateRequest
   */
  notes?: string
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof SubTaskCreateRequest
   */
  notesPhotosIds?: { [key: string]: string }
  /**
   *
   * @type {EmbeddedReminderRequest}
   * @memberof SubTaskCreateRequest
   */
  reminder?: EmbeddedReminderRequest
  /**
   *
   * @type {string}
   * @memberof SubTaskCreateRequest
   */
  title?: string
  /**
   *
   * @type {boolean}
   * @memberof SubTaskCreateRequest
   */
  undo?: boolean
}
