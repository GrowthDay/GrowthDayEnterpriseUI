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

import { OrganizationUser } from './organization-user'

/**
 *
 * @export
 * @interface PagedResultOrganizationUser
 */
export interface PagedResultOrganizationUser {
  /**
   *
   * @type {number}
   * @memberof PagedResultOrganizationUser
   */
  limit?: number
  /**
   *
   * @type {number}
   * @memberof PagedResultOrganizationUser
   */
  offset?: number
  /**
   *
   * @type {Array<OrganizationUser>}
   * @memberof PagedResultOrganizationUser
   */
  results?: Array<OrganizationUser>
  /**
   *
   * @type {number}
   * @memberof PagedResultOrganizationUser
   */
  totalRecords?: number
}
