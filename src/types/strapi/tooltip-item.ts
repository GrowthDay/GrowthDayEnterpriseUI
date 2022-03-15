import { IFile } from './file'

/**
 * Model definition for Tooltip-Item
 */
export interface ITooltipItem {
  id: number
  title?: string
  description?: string
  nextButtonLabel?: string
  element: string
  order?: number
  position?: EnumTooltipItemPosition
  image?: IFile
  created_at?: string | null
}

export enum EnumTooltipItemPosition {
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  TOP = 'TOP'
}
