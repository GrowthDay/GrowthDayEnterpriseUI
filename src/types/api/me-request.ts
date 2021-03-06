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
import { UserPreferences } from './user-preferences'

/**
 *
 * @export
 * @interface MeRequest
 */
export interface MeRequest {
  /**
   *
   * @type {string}
   * @memberof MeRequest
   */
  countryCode?: string
  /**
   *
   * @type {string}
   * @memberof MeRequest
   */
  email?: string
  /**
   *
   * @type {string}
   * @memberof MeRequest
   */
  fullName?: string
  /**
   *
   * @type {string}
   * @memberof MeRequest
   */
  ianaTimezone?: string
  /**
   *
   * @type {string}
   * @memberof MeRequest
   */
  iso2?: string
  /**
   *
   * @type {boolean}
   * @memberof MeRequest
   */
  onboarded?: boolean
  /**
   *
   * @type {boolean}
   * @memberof MeRequest
   */
  optInForResearch?: boolean
  /**
   *
   * @type {string}
   * @memberof MeRequest
   */
  paypalEmail?: string
  /**
   *
   * @type {string}
   * @memberof MeRequest
   */
  phoneNumber?: string
  /**
   *
   * @type {PlatformInformation}
   * @memberof MeRequest
   */
  platformInformation?: PlatformInformation
  /**
   *
   * @type {UserPreferences}
   * @memberof MeRequest
   */
  preferences?: UserPreferences
  /**
   *
   * @type {string}
   * @memberof MeRequest
   */
  region?: string
  /**
   *
   * @type {boolean}
   * @memberof MeRequest
   */
  shakeToFeedback?: boolean
  /**
   *
   * @type {string}
   * @memberof MeRequest
   */
  zipCode?: string
}
