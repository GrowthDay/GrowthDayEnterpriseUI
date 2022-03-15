import { IFile } from './file'

/**
 * Model definition for PromptsCategories
 */
export interface IPromptsCategories {
  id: number
  category_id?: number
  prompt_category?: string
  background?: IFile
  order?: number
  created_at?: string | null
}
