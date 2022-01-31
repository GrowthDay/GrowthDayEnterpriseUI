import { Drawer as MuiDrawer, styled, Theme, useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import { DrawerProps } from '@mui/material/Drawer/Drawer'
import { FC } from 'react'
import { useRecoilState } from 'recoil'
import useMobileView from '../../hooks/useMobileView'
import useToggleValue from '../../hooks/useToggleValue'
import sidebarState from '../../recoil/atoms/sidebarState'
import NavMenu from './NavMenu'

const Drawer = styled(MuiDrawer)(({ theme: { spacing, breakpoints }, open }) => ({
  width: spacing(15),
  '& .MuiDrawer-paper': {
    borderRight: 'none',
    width: spacing(15)
  }
}))

const Sidebar: FC = ({ children }) => {
  const variant = useToggleValue<DrawerProps['variant']>(useMobileView('md'), 'temporary', 'permanent')
  const largeDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'))
  const [open, setOpen] = useRecoilState(sidebarState)
  return (
    <Box sx={{ display: 'flex', pt: 8 }}>
      <Drawer
        anchor="left"
        variant={variant}
        onClose={() => setOpen(false)}
        open={largeDevice ? true : open}
        ModalProps={{
          keepMounted: true
        }}
        PaperProps={{
          elevation: 1
        }}
      >
        <NavMenu />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>
    </Box>
  )
}

export default Sidebar
