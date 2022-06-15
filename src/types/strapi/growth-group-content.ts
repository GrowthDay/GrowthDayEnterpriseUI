import { IGrowthGroupEvents } from './growth-group-events'
import { IGrowthgroupsBanner } from './growthgroups-banner'
import { IGrowthgroupsModal } from './growthgroups-modal'
import { IGrowthgroupsTooltips } from './growthgroups-tooltips'
import { IGrowtthGroupWebhooks } from './growtth-group-webhooks'

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
  webhooks: IGrowtthGroupWebhooks[]
  events: IGrowthGroupEvents[]
  created_at?: string | null
}
