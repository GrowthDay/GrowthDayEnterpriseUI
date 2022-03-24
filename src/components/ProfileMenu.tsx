import { AccountCircleOutlined, DescriptionOutlined, LogoutOutlined } from '@mui/icons-material'
import { ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material'
import { bindMenu } from 'material-ui-popup-state'
import { PopupState } from 'material-ui-popup-state/core'
import { FC } from 'react'
import useLogoutMutation from '../api/mutations/useLogoutMutation'

const ProfileMenu: FC<PopupState> = ({ children, ...popupState }) => {
  const { mutateAsync } = useLogoutMutation()
  const handleExternalLink = (href: string) => {
    window.open(href, '_blank')
    popupState.close()
  }
  const handleLogout = () => {
    popupState.close()
    mutateAsync()
  }
  return (
    <Menu {...bindMenu(popupState)}>
      <MenuItem onClick={() => handleExternalLink('mailto:support@growthday.com')} dense>
        <ListItemIcon>
          <AccountCircleOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>Contact support</ListItemText>
      </MenuItem>
      <MenuItem divider onClick={() => handleExternalLink('https://www.growthday.com/enterprise')} dense>
        <ListItemIcon>
          <DescriptionOutlined fontSize="small" />
        </ListItemIcon>
        <ListItemText>Resources</ListItemText>
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
