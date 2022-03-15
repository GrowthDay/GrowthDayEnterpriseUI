import { MenuOutlined } from '@mui/icons-material'
import { AppBar as MuiAppBar, Avatar, Divider, IconButton, Link, styled, Toolbar, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { bindTrigger } from 'material-ui-popup-state'
import { usePopupState } from 'material-ui-popup-state/hooks'
import { FC } from 'react'
import { useSetRecoilState } from 'recoil'
import useProfileImageApi from '../../api/useProfileImageApi'
import GrowthDayIcon from '../../assets/icons/GrowthDayIcon'
import ProfileMenu from '../../components/ProfileMenu'
import config from '../../config'
import useAuthUser from '../../hooks/useAuthUser'
import useMobileView from '../../hooks/useMobileView'
import sidebarState from '../../recoil/atoms/sidebarState'

export const AppBar = styled(MuiAppBar)(({ theme }) => ({ zIndex: theme.zIndex.drawer + 1 }))

export type HeaderProps = {
  setupMode?: boolean
}

const Header: FC<HeaderProps> = ({ setupMode }) => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'profile-menu' })
  const user = useAuthUser()
  const { data: profileImage } = useProfileImageApi()
  const smallDevice = useMobileView('sm')
  const mobileView = useMobileView('md')
  const setSidebarState = useSetRecoilState(sidebarState)

  return (
    <AppBar color="secondary">
      <Toolbar sx={{ py: 0.5 }}>
        {!setupMode && mobileView && (
          <IconButton sx={{ ml: -1, mr: 1 }} color="inherit" onClick={() => setSidebarState((value) => !value)}>
            <MenuOutlined />
          </IconButton>
        )}
        <GrowthDayIcon sx={{ width: { xs: 160, md: 190 } }} />
        {!smallDevice && (
          <>
            <Divider orientation="vertical" flexItem variant="middle" color="white" sx={{ mx: 3, width: 2 }} />
            <Typography variant="h6" fontWeight="bold">
              Enterprise
            </Typography>
          </>
        )}
        {user && (
          <>
            <Box flex={1} />
            {!setupMode && (
              <Link fontWeight={500} color="white" mr={2} href={config.webUrl}>
                Back to App
              </Link>
            )}
            <IconButton size="small" {...(setupMode ? {} : bindTrigger(popupState))}>
              <Avatar sx={{ width: 36, height: 36, backgroundColor: 'primary.light' }} src={profileImage}>
                {user?.fullName?.slice(0, 1)}
              </Avatar>
            </IconButton>
            {!setupMode && <ProfileMenu {...popupState} />}
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Header
