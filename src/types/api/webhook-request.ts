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

import { ReceiptDetails } from './receipt-details'

/**
 *
 * @export
 * @interface WebhookRequest
 */
export interface WebhookRequest {
  /**
   *
   * @type {string}
   * @memberof WebhookRequest
   */
  auto_renew_product_id?: string
  /**
   *
   * @type {boolean}
   * @memberof WebhookRequest
   */
  auto_renew_status?: boolean
  /**
   *
   * @type {string}
   * @memberof WebhookRequest
   */
  bid?: string
  /**
   *
   * @type {string}
   * @memberof WebhookRequest
   */
  environment?: string
  /**
   *
   * @type {string}
   * @memberof WebhookRequest
   */
  notification_type?: string
  /**
   *
   * @type {string}
   * @memberof WebhookRequest
   */
  password?: string
  /**
   *
   * @type {ReceiptDetails}
   * @memberof WebhookRequest
   */
  unified_receipt?: ReceiptDetails
}