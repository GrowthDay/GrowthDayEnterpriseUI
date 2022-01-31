import { MenuOutlined } from '@mui/icons-material'
import { AppBar as MuiAppBar, Avatar, Divider, IconButton, styled, Toolbar, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { bindTrigger } from 'material-ui-popup-state'
import { usePopupState } from 'material-ui-popup-state/hooks'
import * as React from 'react'
import { FC } from 'react'
import { useSetRecoilState } from 'recoil'
import useMyProfileApi from '../../api/useMyProfileApi'
import useProfileImageApi from '../../api/useProfileImageApi'
import GrowthDayIcon from '../../assets/GrowthDayIcon'
import ProfileMenu from '../../components/ProfileMenu'
import useMobileView from '../../hooks/useMobileView'
import sidebarState from '../../recoil/atoms/sidebarState'

const AppBar = styled(MuiAppBar)(({ theme }) => ({ zIndex: theme.zIndex.drawer + 1 }))

const Header: FC = () => {
  const popupState = usePopupState({ variant: 'popover', popupId: 'profile-menu' })
  const { data: profile } = useMyProfileApi()
  const { data: profileImage } = useProfileImageApi()
  const smallDevice = useMobileView('sm')
  const mobileView = useMobileView('md')
  const setSidebarState = useSetRecoilState(sidebarState)

  return (
    <AppBar>
      <Toolbar sx={{ py: 0.5 }}>
        {mobileView && (
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
        <Box flex={1} />
        <IconButton size="small" {...bindTrigger(popupState)}>
          <Avatar sx={{ width: 36, height: 36, backgroundColor: 'primary.light' }} src={profileImage}>
            {profile?.fullName?.slice(0, 1)}
          </Avatar>
        </IconButton>
        <ProfileMenu {...popupState} />
      </Toolbar>
    </AppBar>
  )
}

export default Header
