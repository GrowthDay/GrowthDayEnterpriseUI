import { alpha, Button as MuiButton, ButtonProps, Divider, styled, SvgIconProps, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import clsx from 'clsx'
import { ComponentType, FC, useCallback, useMemo } from 'react'
import { Link as BaseLink } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import Flex from '../../components/Flex'
import useRouteMatch from '../../hooks/useRouteMatch'
import feedbackModalState from '../../recoil/atoms/feedbackModalState'
import FeedbackIcon from './assets/FeedbackIcon'
import SettingIcon from './assets/SettingIcon'
import UserIcon from './assets/UserIcon'

export type MenuItem = ButtonProps<'button'> & {
  icon: ComponentType<SvgIconProps>
  activeIcon?: ComponentType<SvgIconProps>
  title?: string
  to?: string
  divider?: boolean
}

const topNavMenuItems: MenuItem[] = [
  {
    title: 'People',
    icon: UserIcon,
    to: '/people'
  },
  {
    title: 'Account',
    icon: SettingIcon,
    to: '/account'
  }
]

const Button = styled(MuiButton)(({ theme }) => ({
  flexDirection: 'column',
  textTransform: 'none',
  padding: theme.spacing(1.5),
  borderRadius: 8,
  color: theme.palette.text.disabled,
  fill: theme.palette.text.disabled,
  stroke: theme.palette.text.disabled,
  '&.active, &:hover': {
    color: theme.palette.secondary.main,
    fill: theme.palette.secondary.main,
    stroke: theme.palette.secondary.main,
    backgroundColor: alpha(theme.palette.secondary.main, 0.1)
  }
}))

const RenderNavItem: FC<MenuItem & { active?: boolean }> = ({
  active,
  icon,
  activeIcon,
  title,
  to,
  divider,
  ...buttonProps
}) => {
  const ariaCurrent = active ? 'page' : undefined
  const Icon = (active && activeIcon) || icon

  return (
    <>
      <Box px={1.5} py={0.5}>
        <Button
          fullWidth
          variant="text"
          color="secondary"
          {...buttonProps}
          {...(to
            ? {
                'aria-current': ariaCurrent,
                to,
                component: BaseLink,
                className: clsx(active && 'active')
              }
            : {})}
          data-cy={`sidebar-${title?.toLowerCase()}-button`}
        >
          <Icon color="inherit" />{' '}
          {title && (
            <Typography color="text.primary" mt={0.25} variant="body2">
              {title}
            </Typography>
          )}
        </Button>
      </Box>{' '}
      {divider && <Divider variant="middle" sx={{ my: 0.5 }} />}
    </>
  )
}

const NavMenu: FC = () => {
  const setFeedbackState = useSetRecoilState(feedbackModalState)

  const bottomNavMenuItems: MenuItem[] = useMemo(
    () => [
      {
        icon: FeedbackIcon,
        onClick: () => setFeedbackState(true)
      }
    ],
    [setFeedbackState]
  )

  const routes = useMemo(
    () => [...topNavMenuItems, ...bottomNavMenuItems].filter((item) => item.to).map((item) => item.to!),
    [bottomNavMenuItems]
  )
  const routeMatch = useRouteMatch(routes)
  const currentTab = routeMatch?.pattern?.path

  const renderMenuItems = useCallback(
    (menuItems: MenuItem[]) =>
      menuItems.map((navItem, index) => (
        <RenderNavItem {...navItem} active={Boolean(navItem.to && currentTab === navItem.to)} key={index} />
      )),
    [currentTab]
  )

  return (
    <Flex pt={9} pb={1} flexDirection="column" height="100%">
      <Box flex={1} overflow="auto">
        {renderMenuItems(topNavMenuItems)}
      </Box>
      <Box>{renderMenuItems(bottomNavMenuItems)}</Box>
    </Flex>
  )
}

export default NavMenu
