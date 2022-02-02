import { alpha, Button as MuiButton, ButtonProps, Divider, styled, SvgIconProps, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import clsx from 'clsx'
import { bindTrigger } from 'material-ui-popup-state'
import { usePopupState } from 'material-ui-popup-state/hooks'
import * as React from 'react'
import { ComponentType, FC, useCallback, useEffect, useMemo } from 'react'
import { Link as BaseLink } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import useRouteMatch from '../../hooks/useRouteMatch'
import feedbackModalState from '../../recoil/atoms/feedbackModalState'
import notificationsPopoverState from '../../recoil/atoms/notificationsPopoverState'
import DashboardIcon from './assets/DashboardIcon'
import DashboardIconActive from './assets/DashboardIconActive'
import FeedbackIcon from './assets/FeedbackIcon'
import LearnIcon from './assets/LearnIcon'
import LearnIconActive from './assets/LearnIconActive'
import NotificationIcon from './assets/NotificationIcon'
import ReportIcon from './assets/ReportIcon'
import ReportIconActive from './assets/ReportIconActive'
import SettingIcon from './assets/SettingIcon'
import UserIcon from './assets/UserIcon'
import UserIconActive from './assets/UserIconActive'

export type MenuItem = ButtonProps<'button'> & {
  icon: ComponentType<SvgIconProps>
  activeIcon?: ComponentType<SvgIconProps>
  title?: string
  to?: string
  divider?: boolean
}

const topNavMenuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    activeIcon: DashboardIconActive,
    to: '/'
  },
  {
    title: 'Reports',
    icon: ReportIcon,
    activeIcon: ReportIconActive,
    to: '/reports'
  },
  {
    title: 'People',
    icon: UserIcon,
    activeIcon: UserIconActive,
    to: '/users'
  },
  {
    title: 'Learn',
    icon: LearnIcon,
    activeIcon: LearnIconActive,
    to: '/learn'
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
    color: theme.palette.primary.main,
    fill: theme.palette.primary.main,
    stroke: theme.palette.primary.main,
    backgroundColor: alpha(theme.palette.primary.main, 0.1)
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
          {...buttonProps}
          {...(to
            ? {
                'aria-current': ariaCurrent,
                to,
                component: BaseLink,
                className: clsx(active && 'active')
              }
            : {})}
        >
          <Icon color="inherit" />
          {title && (
            <Typography color="text.primary" mt={0.25} variant="body2">
              {title}
            </Typography>
          )}
        </Button>
      </Box>
      {divider && <Divider variant="middle" sx={{ my: 0.5 }} />}
    </>
  )
}

const NavMenu: FC = () => {
  const setFeedbackState = useSetRecoilState(feedbackModalState)
  const popupState = usePopupState({ variant: 'popover', popupId: 'notification-popup' })
  const setNotificationsPopover = useSetRecoilState(notificationsPopoverState)

  useEffect(() => {
    setNotificationsPopover(popupState)
  }, [popupState])

  const bottomNavMenuItems: MenuItem[] = useMemo(
    () => [
      {
        icon: FeedbackIcon,
        onClick: () => setFeedbackState(true)
      },
      {
        icon: SettingIcon,
        to: '/settings',
        divider: true
      },
      {
        icon: NotificationIcon,
        ...bindTrigger(popupState)
      }
    ],
    [setFeedbackState, popupState]
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
    <Box pt={9} pb={1} display="flex" flexDirection="column" height="100%">
      <Box flex={1} overflow="auto">
        {renderMenuItems(topNavMenuItems)}
      </Box>
      <Box>{renderMenuItems(bottomNavMenuItems)}</Box>
    </Box>
  )
}

export default NavMenu
