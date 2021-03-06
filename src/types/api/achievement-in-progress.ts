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
 * @interface AchievementInProgress
 */
export interface AchievementInProgress {
  /**
   *
   * @type {number}
   * @memberof AchievementInProgress
   */
  achievementCurrentCount?: number
  /**
   *
   * @type {string}
   * @memberof AchievementInProgress
   */
  achievementName?: string
  /**
   *
   * @type {number}
   * @memberof AchievementInProgress
   */
  achievementNextCount?: number
  /**
   *
   * @type {number}
   * @memberof AchievementInProgress
   */
  achievementNextLevel?: number
  /**
   *
   * @type {string}
   * @memberof AchievementInProgress
   */
  achievementType?: string
  /**
   *
   * @type {number}
   * @memberof AchievementInProgress
   */
  createTimestamp?: number
  /**
   *
   * @type {number}
   * @memberof AchievementInProgress
   */
  deleteTimestamp?: number
  /**
   *
   * @type {object}
   * @memberof AchievementInProgress
   */
  extraInfo?: object
  /**
   *
   * @type {string}
   * @memberof AchievementInProgress
   */
  groupId?: string
  /**
   *
   * @type {string}
   * @memberof AchievementInProgress
   */
  id?: string
  /**
   *
   * @type {CmsMedia}
   * @memberof AchievementInProgress
   */
  image?: CmsMedia
  /**
   *
   * @type {string}
   * @memberof AchievementInProgress
   */
  rewardType?: AchievementInProgressRewardTypeEnum
  /**
   *
   * @type {number}
   * @memberof AchievementInProgress
   */
  strapiId?: number
  /**
   *
   * @type {number}
   * @memberof AchievementInProgress
   */
  tierId?: number
  /**
   *
   * @type {string}
   * @memberof AchievementInProgress
   */
  trigger?: string
  /**
   *
   * @type {number}
   * @memberof AchievementInProgress
   */
  updateTimestamp?: number
  /**
   *
   * @type {string}
   * @memberof AchievementInProgress
   */
  uuid?: string
}

export const AchievementInProgressRewardTypeEnum = {
  Badge: 'BADGE',
  Certificate: 'CERTIFICATE',
  Coin: 'COIN'
} as const

export type AchievementInProgressRewardTypeEnum =
  typeof AchievementInProgressRewardTypeEnum[keyof typeof AchievementInProgressRewardTypeEnum]
