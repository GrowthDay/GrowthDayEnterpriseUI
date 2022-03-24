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

import { CmsCourseLesson } from './cms-course-lesson'
import { CmsMedia } from './cms-media'

/**
 *
 * @export
 * @interface CmsDailyFire
 */
export interface CmsDailyFire {
  /**
   *
   * @type {CmsMedia}
   * @memberof CmsDailyFire
   */
  audioContent?: CmsMedia
  /**
   *
   * @type {string}
   * @memberof CmsDailyFire
   */
  audioLink?: string
  /**
   *
   * @type {CmsCourseLesson}
   * @memberof CmsDailyFire
   */
  course_lesson?: CmsCourseLesson
  /**
   *
   * @type {string}
   * @memberof CmsDailyFire
   */
  created_at?: string
  /**
   *
   * @type {number}
   * @memberof CmsDailyFire
   */
  id?: number
  /**
   *
   * @type {number}
   * @memberof CmsDailyFire
   */
  order?: number
  /**
   *
   * @type {string}
   * @memberof CmsDailyFire
   */
  publish_at?: string
  /**
   *
   * @type {string}
   * @memberof CmsDailyFire
   */
  published_at?: string
  /**
   *
   * @type {string}
   * @memberof CmsDailyFire
   */
  subTitle?: string
  /**
   *
   * @type {string}
   * @memberof CmsDailyFire
   */
  title?: string
  /**
   *
   * @type {string}
   * @memberof CmsDailyFire
   */
  updated_at?: string
}
