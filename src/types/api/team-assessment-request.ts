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
 * @interface TeamAssessmentRequest
 */
export interface TeamAssessmentRequest {
  /**
   *
   * @type {string}
   * @memberof TeamAssessmentRequest
   */
  departmentId?: string
  /**
   *
   * @type {string}
   * @memberof TeamAssessmentRequest
   */
  organizationId?: string
  /**
   *
   * @type {{ [key: string]: { [key: string]: number; }; }}
   * @memberof TeamAssessmentRequest
   */
  scoreCard?: { [key: string]: { [key: string]: number } }
}
