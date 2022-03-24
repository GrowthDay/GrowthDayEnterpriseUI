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

/**
 *
 * @export
 * @interface GdprCollectDataResponse
 */
export interface GdprCollectDataResponse {
  /**
   *
   * @type {string}
   * @memberof GdprCollectDataResponse
   */
  eraseToken?: string
  /**
   *
   * @type {number}
   * @memberof GdprCollectDataResponse
   */
  executedTimestamp?: number
  /**
   *
   * @type {number}
   * @memberof GdprCollectDataResponse
   */
  requestTimestamp?: number
  /**
   *
   * @type {string}
   * @memberof GdprCollectDataResponse
   */
  status?: GdprCollectDataResponseStatusEnum
}

export const GdprCollectDataResponseStatusEnum = {
  Empty: 'EMPTY',
  Submitted: 'SUBMITTED',
  DeleteSubmitted: 'DELETE_SUBMITTED',
  Deleting: 'DELETING',
  Running: 'RUNNING',
  Ready: 'READY',
  Error: 'ERROR',
  Deleted: 'DELETED'
} as const

export type GdprCollectDataResponseStatusEnum =
  typeof GdprCollectDataResponseStatusEnum[keyof typeof GdprCollectDataResponseStatusEnum]
