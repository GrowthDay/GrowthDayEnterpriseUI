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

import { CmsContentTag } from './cms-content-tag'
import { CmsCourseChapter } from './cms-course-chapter'
import { CmsCourseLesson } from './cms-course-lesson'
import { CmsCourseOffer } from './cms-course-offer'
import { CmsMedia } from './cms-media'
import { CmsRecommendedResource } from './cms-recommended-resource'

/**
 *
 * @export
 * @interface CmsCourse
 */
export interface CmsCourse {
  /**
   *
   * @type {string}
   * @memberof CmsCourse
   */
  Description?: string
  /**
   *
   * @type {string}
   * @memberof CmsCourse
   */
  Title?: string
  /**
   *
   * @type {CmsMedia}
   * @memberof CmsCourse
   */
  background?: CmsMedia
  /**
   *
   * @type {string}
   * @memberof CmsCourse
   */
  category?: string
  /**
   *
   * @type {Array<CmsContentTag>}
   * @memberof CmsCourse
   */
  content_tags?: Array<CmsContentTag>
  /**
   *
   * @type {CmsCourseOffer}
   * @memberof CmsCourse
   */
  courseOffer1?: CmsCourseOffer
  /**
   *
   * @type {CmsCourseOffer}
   * @memberof CmsCourse
   */
  courseOffer2?: CmsCourseOffer
  /**
   *
   * @type {Array<CmsCourseOffer>}
   * @memberof CmsCourse
   */
  courseOffers?: Array<CmsCourseOffer>
  /**
   *
   * @type {number}
   * @memberof CmsCourse
   */
  course_bucket?: number
  /**
   *
   * @type {Array<CmsCourseChapter>}
   * @memberof CmsCourse
   */
  course_chapters?: Array<CmsCourseChapter>
  /**
   *
   * @type {Array<CmsCourseLesson>}
   * @memberof CmsCourse
   */
  course_lessons?: Array<CmsCourseLesson>
  /**
   *
   * @type {string}
   * @memberof CmsCourse
   */
  created_at?: string
  /**
   *
   * @type {string}
   * @memberof CmsCourse
   */
  description?: string
  /**
   *
   * @type {boolean}
   * @memberof CmsCourse
   */
  featured?: boolean
  /**
   *
   * @type {boolean}
   * @memberof CmsCourse
   */
  free?: boolean
  /**
   *
   * @type {number}
   * @memberof CmsCourse
   */
  id?: number
  /**
   *
   * @type {number}
   * @memberof CmsCourse
   */
  offer?: number
  /**
   *
   * @type {number}
   * @memberof CmsCourse
   */
  order?: number
  /**
   *
   * @type {boolean}
   * @memberof CmsCourse
   */
  published?: boolean
  /**
   *
   * @type {string}
   * @memberof CmsCourse
   */
  published_at?: string
  /**
   *
   * @type {boolean}
   * @memberof CmsCourse
   */
  recommended?: boolean
  /**
   *
   * @type {boolean}
   * @memberof CmsCourse
   */
  recommendedPremium?: boolean
  /**
   *
   * @type {boolean}
   * @memberof CmsCourse
   */
  recommendedPro?: boolean
  /**
   *
   * @type {boolean}
   * @memberof CmsCourse
   */
  recommendedStarter?: boolean
  /**
   *
   * @type {Array<CmsRecommendedResource>}
   * @memberof CmsCourse
   */
  recommended_resources?: Array<CmsRecommendedResource>
  /**
   *
   * @type {number}
   * @memberof CmsCourse
   */
  rewardCoinsCount?: number
  /**
   *
   * @type {string}
   * @memberof CmsCourse
   */
  title?: string
  /**
   *
   * @type {string}
   * @memberof CmsCourse
   */
  titleUid?: string
  /**
   *
   * @type {string}
   * @memberof CmsCourse
   */
  updated_at?: string
}
