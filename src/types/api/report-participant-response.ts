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

import { Participant } from './participant'

/**
 *
 * @export
 * @interface ReportParticipantResponse
 */
export interface ReportParticipantResponse {
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof ReportParticipantResponse
   */
  failedReason?: { [key: string]: string }
  /**
   *
   * @type {Array<Participant>}
   * @memberof ReportParticipantResponse
   */
  participantList?: Array<Participant>
}
