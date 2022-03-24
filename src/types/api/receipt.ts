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

import { InApp } from './in-app'

/**
 *
 * @export
 * @interface Receipt
 */
export interface Receipt {
  /**
   *
   * @type {number}
   * @memberof Receipt
   */
  adam_id?: number
  /**
   *
   * @type {number}
   * @memberof Receipt
   */
  app_item_id?: number
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  application_version?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  bundle_id?: string
  /**
   *
   * @type {number}
   * @memberof Receipt
   */
  download_id?: number
  /**
   *
   * @type {Array<InApp>}
   * @memberof Receipt
   */
  in_app?: Array<InApp>
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  original_application_version?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  original_purchase_date?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  original_purchase_date_ms?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  original_purchase_date_pst?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  receipt_creation_date?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  receipt_creation_date_ms?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  receipt_creation_date_pst?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  receipt_type?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  request_date?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  request_date_ms?: string
  /**
   *
   * @type {string}
   * @memberof Receipt
   */
  request_date_pst?: string
  /**
   *
   * @type {number}
   * @memberof Receipt
   */
  version_external_identifier?: number
}
