import { CheckOutlined } from '@mui/icons-material'
import {
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  Theme,
  Typography,
  useTheme
} from '@mui/material'
import classNames from 'classnames'
import { FC } from 'react'
import MarkdownHtml from '../../components/MarkdownHtml'
import { ISubscriptionPlans } from '../../types/strapi'
import { formatCurrency } from '../../utils/formatters'
import isPopularPlan from '../../utils/isPopularPlan'

export type PlanInfoProps = {
  plan: ISubscriptionPlans
  hideChip?: boolean
}

const StyledCardContent = styled(CardContent)(
  ({
    theme: {
      spacing,
      palette: { common }
    }
  }) => ({
    position: 'relative',
    '&, &:last-child': {
      padding: spacing(6, 4, 4)
    },
    '&.popular': {
      background: 'linear-gradient(138.18deg, #9fbda9 .31%,#5635af 81.83%)',
      color: common.white
    }
  })
)

const StyledChip = styled(Chip)(
  ({
    theme: {
      palette: { common },
      spacing
    }
  }) => ({
    backgroundColor: common.white,
    border: 'none',
    padding: spacing(1.75, 2.5),
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    position: 'absolute',
    right: 0,
    top: spacing(2)
  })
)

const getBulletPointsArray = (bulletPoints?: string | null): string[] =>
  bulletPoints?.split('\n')?.filter(Boolean) ?? []

const PlanInfo: FC<PlanInfoProps> = ({ plan, hideChip }) => {
  const theme = useTheme<Theme>()
  const bulletPoints = getBulletPointsArray(plan.description)
  const popular = isPopularPlan(plan)
  return (
    <Card elevation={6}>
      <StyledCardContent className={classNames({ popular })}>
        {!hideChip && popular && <StyledChip size="small" variant="outlined" label="Most Popular" />}
        <Typography textAlign="center" variant="h5" fontWeight={600}>
          {plan.name} Annual
        </Typography>
        <Typography gutterBottom textAlign="center" variant="body2" fontWeight={500}>
          {formatCurrency(plan.yearlyAmount ?? 0, plan.currency)}/year
        </Typography>
        <List>
          {bulletPoints.map((text, index) => (
            <ListItem disablePadding alignItems="flex-start" key={index}>
              <ListItemIcon>
                <CheckOutlined sx={popular ? { color: theme.palette.common.white } : {}} />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{ fontWeight: 500 }}
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
