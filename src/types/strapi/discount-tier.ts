/**
 * Model definition for Discount Tier
 */
export interface IDiscountTier {
  id: number
  userCount?: number
  discountPercentage?: number
  stripeDiscountCouponId?: string
  created_at?: string | null
}
