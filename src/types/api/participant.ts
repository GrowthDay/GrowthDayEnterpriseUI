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

import { ParticipantJoinInfo } from './participant-join-info'

/**
 *
 * @export
 * @interface Participant
 */
export interface Participant {
  /**
   *
   * @type {number}
   * @memberof Participant
   */
  createTimestamp?: number
  /**
   *
   * @type {number}
   * @memberof Participant
   */
  deleteTimestamp?: number
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  firstName?: string
  /**
   *
   * @type {boolean}
   * @memberof Participant
   */
  flagged?: boolean
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  growthGroupId?: string
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  growthGroupInstanceId?: string
  /**
   *
   * @type {boolean}
   * @memberof Participant
   */
  hasJoined?: boolean
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  lastName?: string
  /**
   *
   * @type {Array<ParticipantJoinInfo>}
   * @memberof Participant
   */
  participantJoinInfos?: Array<ParticipantJoinInfo>
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  profileImage?: string
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  role?: ParticipantRoleEnum
  /**
   *
   * @type {number}
   * @memberof Participant
   */
  updateTimestamp?: number
  /**
   *
   * @type {string}
   * @memberof Participant
   */
  uuid?: string
}

export const ParticipantRoleEnum = {
  Host: 'host',
  Attendee: 'attendee',
  CoHost: 'co-host',
  Speaker: 'speaker',
  Preview: 'preview',
  WaitingRoom: 'waiting-room'
} as const

export type ParticipantRoleEnum = typeof ParticipantRoleEnum[keyof typeof ParticipantRoleEnum]
