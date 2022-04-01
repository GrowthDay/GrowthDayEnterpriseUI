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
 * @interface PinnedNoteRequest
 */
export interface PinnedNoteRequest {
  /**
   *
   * @type {number}
   * @memberof PinnedNoteRequest
   */
  lessonId?: number
  /**
   *
   * @type {string}
   * @memberof PinnedNoteRequest
   */
  noteCategory?: PinnedNoteRequestNoteCategoryEnum
  /**
   *
   * @type {string}
   * @memberof PinnedNoteRequest
   */
  noteId?: string
  /**
   *
   * @type {string}
   * @memberof PinnedNoteRequest
   */
  noteObjectId?: string
}

export const PinnedNoteRequestNoteCategoryEnum = {
  Live: 'LIVE',
  Challenge: 'CHALLENGE',
  Lesson: 'LESSON',
  GrowthGroup: 'GROWTH_GROUP'
} as const

export type PinnedNoteRequestNoteCategoryEnum =
  typeof PinnedNoteRequestNoteCategoryEnum[keyof typeof PinnedNoteRequestNoteCategoryEnum]