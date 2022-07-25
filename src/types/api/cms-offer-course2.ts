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

import { CmsThumbnail2 } from './cms-thumbnail2'

/**
 *
 * @export
 * @interface CmsOfferCourse2
 */
export interface CmsOfferCourse2 {
  /**
   *
   * @type {CmsThumbnail2}
   * @memberof CmsOfferCourse2
   */
  background?: CmsThumbnail2
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  category?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  courseOffer1?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  courseOffer2?: string
  /**
   *
   * @type {number}
   * @memberof CmsOfferCourse2
   */
  course_bucket?: number
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  created_at?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  description?: string
  /**
   *
   * @type {boolean}
   * @memberof CmsOfferCourse2
   */
  free?: boolean
  /**
   *
   * @type {number}
   * @memberof CmsOfferCourse2
   */
  id?: number
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  isFeatured?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  isRecommended?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  isRecommendedPremium?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  isRecommendedPro?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  isRecommendedStarter?: string
  /**
   *
   * @type {number}
   * @memberof CmsOfferCourse2
   */
  offer?: number
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  order?: string
  /**
   *
   * @type {boolean}
   * @memberof CmsOfferCourse2
   */
  published?: boolean
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  published_at?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  recommendedResources?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  rewardCoinsCount?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  title?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  titleUid?: string
  /**
   *
   * @type {string}
   * @memberof CmsOfferCourse2
   */
  updated_at?: string
}
