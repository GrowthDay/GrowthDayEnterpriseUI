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
 * @interface OrganizationCreateRequest
 */
export interface OrganizationCreateRequest {
  /**
   *
   * @type {string}
   * @memberof OrganizationCreateRequest
   */
  country?: string
  /**
   *
   * @type {boolean}
   * @memberof OrganizationCreateRequest
   */
  dataCompliancePolicyAccepted?: boolean
  /**
   *
   * @type {Array<string>}
   * @memberof OrganizationCreateRequest
   */
  domains?: Array<string>
  /**
   *
   * @type {string}
   * @memberof OrganizationCreateRequest
   */
  email?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationCreateRequest
   */
  fullName?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationCreateRequest
   */
  ianaTimezone?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationCreateRequest
   */
  iso2?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationCreateRequest
   */
  name?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationCreateRequest
   */
  password?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationCreateRequest
   */
  phoneNumber?: string
  /**
   *
   * @type {boolean}
   * @memberof OrganizationCreateRequest
   */
  teamAssessmentEnabled?: boolean
}
