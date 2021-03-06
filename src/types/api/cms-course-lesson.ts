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

import { CmsMedia } from './cms-media'

/**
 *
 * @export
 * @interface CmsCourseLesson
 */
export interface CmsCourseLesson {
  /**
   *
   * @type {Array<CmsMedia>}
   * @memberof CmsCourseLesson
   */
  audioContents?: Array<CmsMedia>
  /**
   *
   * @type {CmsMedia}
   * @memberof CmsCourseLesson
   */
  background?: CmsMedia
  /**
   *
   * @type {string}
   * @memberof CmsCourseLesson
   */
  category?: string
  /**
   *
   * @type {string}
   * @memberof CmsCourseLesson
   */
  description?: string
  /**
   *
   * @type {string}
   * @memberof CmsCourseLesson
   */
  duration?: string
  /**
   *
   * @type {number}
   * @memberof CmsCourseLesson
   */
  id?: number
  /**
   *
   * @type {CmsMedia}
   * @memberof CmsCourseLesson
   */
  mp3Content?: CmsMedia
  /**
   *
   * @type {string}
   * @memberof CmsCourseLesson
   */
  mp3Link?: string
  /**
   *
   * @type {number}
   * @memberof CmsCourseLesson
   */
  order?: number
  /**
   *
   * @type {string}
   * @memberof CmsCourseLesson
   */
  title?: string
  /**
   *
   * @type {string}
   * @memberof CmsCourseLesson
   */
  titleUid?: string
  /**
   *
   * @type {string}
   * @memberof CmsCourseLesson
   */
  videoID?: string
  /**
   *
   * @type {string}
   * @memberof CmsCourseLesson
   */
  worksheetLink?: string
}
