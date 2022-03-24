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

import { PlatformInformation } from './platform-information'

/**
 *
 * @export
 * @interface MarketingRegistrationRequest
 */
export interface MarketingRegistrationRequest {
  /**
   *
   * @type {number}
   * @memberof MarketingRegistrationRequest
   */
  campaignId?: number
  /**
   *
   * @type {string}
   * @memberof MarketingRegistrationRequest
   */
  countryCode?: string
  /**
   *
   * @type {string}
   * @memberof MarketingRegistrationRequest
   */
  email?: string
  /**
   *
   * @type {string}
   * @memberof MarketingRegistrationRequest
   */
  fullName?: string
  /**
   *
   * @type {boolean}
   * @memberof MarketingRegistrationRequest
   */
  giftBuyer?: boolean
  /**
   *
   * @type {object}
   * @memberof MarketingRegistrationRequest
   */
  ianaTimezone?: object
  /**
   *
   * @type {boolean}
   * @memberof MarketingRegistrationRequest
   */
  isGiftBuyer?: boolean
  /**
   *
   * @type {string}
   * @memberof MarketingRegistrationRequest
   */
  iso2?: string
  /**
   *
   * @type {Array<number>}
   * @memberof MarketingRegistrationRequest
   */
  offerIds?: Array<number>
  /**
   *
   * @type {string}
   * @memberof MarketingRegistrationRequest
   */
  password?: string
  /**
   *
   * @type {string}
   * @memberof MarketingRegistrationRequest
   */
  paymentMethodId?: string
  /**
   *
   * @type {string}
   * @memberof MarketingRegistrationRequest
   */
  phoneNumber?: string
  /**
   *
   * @type {PlatformInformation}
   * @memberof MarketingRegistrationRequest
   */
  platformInformation?: PlatformInformation
}
