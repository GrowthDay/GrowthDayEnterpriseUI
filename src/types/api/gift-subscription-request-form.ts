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
 * @interface GiftSubscriptionRequestForm
 */
export interface GiftSubscriptionRequestForm {
  /**
   *
   * @type {string}
   * @memberof GiftSubscriptionRequestForm
   */
  buyerEmail?: string
  /**
   *
   * @type {string}
   * @memberof GiftSubscriptionRequestForm
   */
  buyerFullName?: string
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof GiftSubscriptionRequestForm
   */
  consumerEmails?: { [key: string]: string }
  /**
   *
   * @type {string}
   * @memberof GiftSubscriptionRequestForm
   */
  message?: string
  /**
   *
   * @type {number}
   * @memberof GiftSubscriptionRequestForm
   */
  planId?: number
}