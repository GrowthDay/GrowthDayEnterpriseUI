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
 * @interface CmsRecommendedResource
 */
export interface CmsRecommendedResource {
  /**
   *
   * @type {string}
   * @memberof CmsRecommendedResource
   */
  created_at?: string
  /**
   *
   * @type {string}
   * @memberof CmsRecommendedResource
   */
  description?: string
  /**
   *
   * @type {number}
   * @memberof CmsRecommendedResource
   */
  id?: number
  /**
   *
   * @type {string}
   * @memberof CmsRecommendedResource
   */
  link?: string
  /**
   *
   * @type {boolean}
   * @memberof CmsRecommendedResource
   */
  newTab?: boolean
  /**
   *
   * @type {number}
   * @memberof CmsRecommendedResource
   */
  recommended_courses?: number
  /**
   *
   * @type {CmsMedia}
   * @memberof CmsRecommendedResource
   */
  thumb?: CmsMedia
  /**
   *
   * @type {string}
   * @memberof CmsRecommendedResource
   */
  title?: string
  /**
   *
   * @type {string}
   * @memberof CmsRecommendedResource
   */
  updated_at?: string
}
