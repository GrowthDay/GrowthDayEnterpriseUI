import { Card, CardContent, List, ListItem, ListItemText, styled, Typography } from '@mui/material'
import { FC } from 'react'
import Flex from '../../../components/Flex'
import MarkdownHtml from '../../../components/MarkdownHtml'
import { ISubscriptionPlans } from '../../../types/strapi'
import { formatCurrency } from '../../../utils/formatters'

export type PlanInfoProps = {
  plan: ISubscriptionPlans
}

const StyledCardContent = styled(CardContent)(({ theme: { spacing } }) => ({
  '&, &:last-child': {
    padding: spacing(1)
  }
}))

const getBulletPointsArray = (bulletPoints?: string | null): string[] =>
  bulletPoints?.split('\n')?.filter(Boolean) ?? []

const PlanInfo: FC<PlanInfoProps> = ({ plan }) => {
  const bulletPoints = getBulletPointsArray(plan.description)
  return (
    <Card elevation={1}>
      <StyledCardContent>
        <Flex bgcolor="background.default" borderRadius={1} p={1.5} justifyContent="space-between" alignItems="center">
          <Typography color="primary" variant="h6" fontWeight={600}>
            {plan.name} Plan
          </Typography>
          <Typography color="text.secondary" variant="body2">
            <Typography color="text.primary" variant="body1" component="span" fontWeight={600}>
              {formatCurrency(plan.yearlyAmount ?? 0, plan.currency)}
            </Typography>
            /year
          </Typography>
        </Flex>
        <List>
          {bulletPoints.map((text, index) => (
            <ListItem sx={{ py: 0.5, strong: { fontWeight: 500 } }} alignItems="flex-start" key={index}>
              <ListItemText
                primaryTypographyProps={{ fontWeight: 300, variant: 'body2' }}
                primary={<MarkdownHtml>{text}</MarkdownHtml>}
              />
            </ListItem>
          ))}
        </List>
      </StyledCardContent>
    </Card>
  )
}

export default PlanInfo
