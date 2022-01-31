import { LogoutOutlined, PersonOutlined, SettingsOutlined } from '@mui/icons-material'
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { bindMenu } from 'material-ui-popup-state'
import { PopupState } from 'material-ui-popup-state/core'
import * as React from 'react'
import { FC } from 'react'
import { useNavigate } from 'react-router'
import useLogoutApi from '../api/useLogoutApi'

const ProfileMenu: FC<PopupState> = ({ children, ...popupState }) => {
  const { mutateAsync } = useLogoutApi()
  const navigate = useNavigate()

  const handleNavLink = (to: string) => {
    navigate(to)
    popupState.close()
  }
  const handleLogout = () => {
    popupState.close()
    mutateAsync()
  }
  return (
    <Menu {...bindMenu(popupState)}>
      <MenuItem onClick={() => handleNavLink('/profile')} dense>
        <ListItemIcon>
          <PersonOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>Profile</ListItemText>
      </MenuItem>
      <MenuItem onClick={() => handleNavLink('/settings')} dense>
        <ListItemIcon>
          <SettingsOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>Settings</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleLogout} dense>
        <ListItemIcon>
          <LogoutOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  )
}

export default ProfileMenu
