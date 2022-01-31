import { alpha, Button, ButtonProps, Divider, SvgIconProps, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import clsx from 'clsx'
import { bindTrigger } from 'material-ui-popup-state'
import { usePopupState } from 'material-ui-popup-state/hooks'
import * as React from 'react'
import { ComponentType, FC, useEffect, useMemo } from 'react'
import { Link as BaseLink, LinkProps, useLocation, useResolvedPath } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
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
  iconActive?: ComponentType<SvgIconProps>
  title?: string
  to?: string
  divider?: boolean
}

const topNavMenuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: DashboardIcon,
    iconActive: DashboardIconActive,
    to: '/'
  },
  {
    title: 'Reports',
    icon: ReportIcon,
    iconActive: ReportIconActive,
    to: '/reports'
  },
  {
    title: 'People',
    icon: UserIcon,
    iconActive: UserIconActive,
    to: '/users'
  },
  {
    title: 'Learn',
    icon: LearnIcon,
    iconActive: LearnIconActive,
    to: '/learn'
  }
]

const NavItem: FC<(ButtonProps<'a'> & LinkProps) | ButtonProps<'button'>> = (props) => (
  <Button
    fullWidth
    {...(props as ButtonProps<'button'>)}
    sx={[
      (theme) => ({
        flexDirection: 'column',
        textTransform: 'none',
        py: 1.5,
        borderRadius: 2,
        color: theme.palette.text.disabled,
        fill: theme.palette.text.disabled,
        stroke: theme.palette.text.disabled,
        '&.active, &:hover': {
          color: theme.palette.primary.main,
          fill: theme.palette.primary.main,
          stroke: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.1)
        }
      }),
      ...(Array.isArray(props.sx) ? props.sx : props.sx ? [props.sx] : [])
    ]}
  />
)

const RenderNavItem: FC<MenuItem> = ({ icon, iconActive, title, to, divider, ...buttonProps }) => {
  const location = useLocation()
  const path = useResolvedPath(to ?? '')
  const isActive = Boolean(to && location.pathname.toLowerCase() === path.pathname.toLowerCase())
  const ariaCurrent = isActive ? 'page' : undefined
  const Icon = (isActive && iconActive) || icon

  return (
    <>
      <Box px={1.5} py={0.5}>
        <NavItem
          {...buttonProps}
          {...(to
            ? {
                'aria-current': ariaCurrent,
                to,
                component: BaseLink,
                className: clsx(isActive && 'active')
              }
            : {})}
        >
          <Icon color="inherit" />
          {title && (
            <Typography color="text.primary" mt={0.25} variant="body2">
              {title}
            </Typography>
          )}
        </NavItem>
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

  return (
    <Box pt={9} pb={1} display="flex" flexDirection="column" height="100%">
      <Box flex={1} overflow="auto">
        {topNavMenuItems.map((navItem, index) => (
          <RenderNavItem {...navItem} key={index} />
        ))}
      </Box>
      <Box>
        {bottomNavMenuItems.map((navItem, index) => (
          <RenderNavItem {...navItem} key={index} />
        ))}
      </Box>
    </Box>
  )
}

export default NavMenu
