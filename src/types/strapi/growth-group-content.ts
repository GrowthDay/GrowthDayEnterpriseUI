import { IGrowthgroupsBanner } from './growthgroups-banner'
import { IGrowthgroupsModal } from './growthgroups-modal'
import { IGrowthgroupsTooltips } from './growthgroups-tooltips'

/**
 * Model definition for Growth Group Content
 */
export interface IGrowthGroupContent {
  id: number
  banner?: IGrowthgroupsBanner
  tooltips?: IGrowthgroupsTooltips
  createModal?: IGrowthgroupsModal
  updateModal?: IGrowthgroupsModal
  communityGuidelines?: string
  created_at?: string | null
}
