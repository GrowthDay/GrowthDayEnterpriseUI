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
 * @interface CodeForTokenRequest
 */
export interface CodeForTokenRequest {
  /**
   *
   * @type {string}
   * @memberof CodeForTokenRequest
   */
  code?: string
  /**
   *
   * @type {object}
   * @memberof CodeForTokenRequest
   */
  ianaTimezone?: object
  /**
   *
   * @type {PlatformInformation}
   * @memberof CodeForTokenRequest
   */
  platformInformation?: PlatformInformation
  /**
   *
   * @type {string}
   * @memberof CodeForTokenRequest
   */
  playerId?: string
  /**
   *
   * @type {string}
   * @memberof CodeForTokenRequest
   */
  redirectUri?: string
  /**
   *
   * @type {Array<string>}
   * @memberof CodeForTokenRequest
   */
  roles?: Array<string>
  /**
   *
   * @type {number}
   * @memberof CodeForTokenRequest
   */
  signupChallengeId?: number
  /**
   *
   * @type {number}
   * @memberof CodeForTokenRequest
   */
  signupId?: number
  /**
   *
   * @type {number}
   * @memberof CodeForTokenRequest
   */
  signupLiveEventId?: number
  /**
   *
   * @type {number}
   * @memberof CodeForTokenRequest
   */
  signupOfferId?: number
  /**
   *
   * @type {number}
   * @memberof CodeForTokenRequest
   */
  signupPlanId?: number
  /**
   *
   * @type {string}
   * @memberof CodeForTokenRequest
   */
  signupType?: CodeForTokenRequestSignupTypeEnum
  /**
   *
   * @type {string}
   * @memberof CodeForTokenRequest
   */
  trigger?: string
  /**
   *
   * @type {number}
   * @memberof CodeForTokenRequest
   */
  utcOffsetInMinutes?: number
  /**
   *
   * @type {number}
   * @memberof CodeForTokenRequest
   */
  webhookId?: number
}

export const CodeForTokenRequestSignupTypeEnum = {
  Challenge: 'CHALLENGE',
  Offer: 'OFFER',
  LiveEvent: 'LIVE_EVENT',
  Plan: 'PLAN'
} as const

export type CodeForTokenRequestSignupTypeEnum =
  typeof CodeForTokenRequestSignupTypeEnum[keyof typeof CodeForTokenRequestSignupTypeEnum]