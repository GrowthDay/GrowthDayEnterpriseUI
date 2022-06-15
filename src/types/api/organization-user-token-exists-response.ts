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
 * @interface OrganizationUserTokenExistsResponse
 */
export interface OrganizationUserTokenExistsResponse {
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  organizationId?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  organizationLevel?: OrganizationUserTokenExistsResponseOrganizationLevelEnum
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  organizationLogoUrl?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  organizationName?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  organizationPlanId?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  organizationPlanName?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  paymentFlow?: OrganizationUserTokenExistsResponsePaymentFlowEnum
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  stripePriceId?: string
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  subscriptionLinkVisibility?: OrganizationUserTokenExistsResponseSubscriptionLinkVisibilityEnum
  /**
   *
   * @type {boolean}
   * @memberof OrganizationUserTokenExistsResponse
   */
  tokenExists?: boolean
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  userEmail?: string
  /**
   *
   * @type {boolean}
   * @memberof OrganizationUserTokenExistsResponse
   */
  userExists?: boolean
  /**
   *
   * @type {string}
   * @memberof OrganizationUserTokenExistsResponse
   */
  userName?: string
}

export const OrganizationUserTokenExistsResponseOrganizationLevelEnum = {
  Basic: 'BASIC',
  Growth: 'GROWTH',
  Mastery: 'MASTERY',
  Trial: 'TRIAL',
  None: 'NONE',
  Offer: 'OFFER',
  Challenge: 'CHALLENGE',
  Enterprise: 'ENTERPRISE'
} as const

export type OrganizationUserTokenExistsResponseOrganizationLevelEnum =
  typeof OrganizationUserTokenExistsResponseOrganizationLevelEnum[keyof typeof OrganizationUserTokenExistsResponseOrganizationLevelEnum]
export const OrganizationUserTokenExistsResponsePaymentFlowEnum = {
  Organization: 'ORGANIZATION',
  Employee: 'EMPLOYEE'
} as const

export type OrganizationUserTokenExistsResponsePaymentFlowEnum =
  typeof OrganizationUserTokenExistsResponsePaymentFlowEnum[keyof typeof OrganizationUserTokenExistsResponsePaymentFlowEnum]
export const OrganizationUserTokenExistsResponseSubscriptionLinkVisibilityEnum = {
  Public: 'PUBLIC',
  Private: 'PRIVATE'
} as const

export type OrganizationUserTokenExistsResponseSubscriptionLinkVisibilityEnum =
  typeof OrganizationUserTokenExistsResponseSubscriptionLinkVisibilityEnum[keyof typeof OrganizationUserTokenExistsResponseSubscriptionLinkVisibilityEnum]
