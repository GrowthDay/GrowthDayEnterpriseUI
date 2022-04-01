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

import { CmsImage } from './cms-image'
import { CmsThumbnail } from './cms-thumbnail'

/**
 *
 * @export
 * @interface CmsFormats
 */
export interface CmsFormats {
  /**
   *
   * @type {CmsImage}
   * @memberof CmsFormats
   */
  large?: CmsImage
  /**
   *
   * @type {CmsImage}
   * @memberof CmsFormats
   */
  medium?: CmsImage
  /**
   *
   * @type {CmsImage}
   * @memberof CmsFormats
   */
  small?: CmsImage
  /**
   *
   * @type {CmsThumbnail}
   * @memberof CmsFormats
   */
  thumbnail?: CmsThumbnail
}