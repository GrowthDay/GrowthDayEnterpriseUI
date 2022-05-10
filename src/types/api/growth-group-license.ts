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
 * @interface GrowthGroupLicense
 */
export interface GrowthGroupLicense {
  /**
   *
   * @type {number}
   * @memberof GrowthGroupLicense
   */
  allowedLimit?: number
  /**
   *
   * @type {number}
   * @memberof GrowthGroupLicense
   */
  consumed?: number
  /**
   *
   * @type {number}
   * @memberof GrowthGroupLicense
   */
  createTimestamp?: number
  /**
   *
   * @type {number}
   * @memberof GrowthGroupLicense
   */
  cycleEndTime?: number
  /**
   *
   * @type {number}
   * @memberof GrowthGroupLicense
   */
  cycleStartTime?: number
  /**
   *
   * @type {number}
   * @memberof GrowthGroupLicense
   */
  deleteTimestamp?: number
  /**
   *
   * @type {string}
   * @memberof GrowthGroupLicense
   */
  growthGroupPackageId?: string
  /**
   *
   * @type {string}
   * @memberof GrowthGroupLicense
   */
  id?: string
  /**
   *
   * @type {string}
   * @memberof GrowthGroupLicense
   */
  licenseType?: GrowthGroupLicenseLicenseTypeEnum
  /**
   *
   * @type {boolean}
   * @memberof GrowthGroupLicense
   */
  notRenewChecked?: boolean
  /**
   *
   * @type {number}
   * @memberof GrowthGroupLicense
   */
  participantsAllowed?: number
  /**
   *
   * @type {number}
   * @memberof GrowthGroupLicense
   */
  updateTimestamp?: number
  /**
   *
   * @type {string}
   * @memberof GrowthGroupLicense
   */
  uuid?: string
}

export const GrowthGroupLicenseLicenseTypeEnum = {
  ProSubscriptionPlan: 'PRO_SUBSCRIPTION_PLAN',
  ProTrialSubscriptionPlan: 'PRO_TRIAL_SUBSCRIPTION_PLAN',
  GgPackage: 'GG_PACKAGE'
} as const

export type GrowthGroupLicenseLicenseTypeEnum =
  typeof GrowthGroupLicenseLicenseTypeEnum[keyof typeof GrowthGroupLicenseLicenseTypeEnum]
