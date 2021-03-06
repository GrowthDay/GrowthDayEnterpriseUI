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
 * @interface URI
 */
export interface URI {
  /**
   *
   * @type {boolean}
   * @memberof URI
   */
  absolute?: boolean
  /**
   *
   * @type {string}
   * @memberof URI
   */
  authority?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  fragment?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  host?: string
  /**
   *
   * @type {boolean}
   * @memberof URI
   */
  opaque?: boolean
  /**
   *
   * @type {string}
   * @memberof URI
   */
  path?: string
  /**
   *
   * @type {number}
   * @memberof URI
   */
  port?: number
  /**
   *
   * @type {string}
   * @memberof URI
   */
  query?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  rawAuthority?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  rawFragment?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  rawPath?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  rawQuery?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  rawSchemeSpecificPart?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  rawUserInfo?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  scheme?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  schemeSpecificPart?: string
  /**
   *
   * @type {string}
   * @memberof URI
   */
  userInfo?: string
}
