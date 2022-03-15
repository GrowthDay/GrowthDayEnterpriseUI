import { IPromptsCategories } from './prompts-categories'

/**
 * Model definition for Prompts
 */
export interface IPrompts {
  id: number
  prompt?: string
  prompts_category?: IPromptsCategories
  prompt_text?: string
  order?: number
  created_at?: string | null
}
