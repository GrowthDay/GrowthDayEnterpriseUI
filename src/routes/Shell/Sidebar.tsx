import { Drawer as MuiDrawer, styled, Theme, useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import { DrawerProps } from '@mui/material/Drawer/Drawer'
import { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import useUserTourQuery from '../../api/queries/useUserTourQuery'
import Flex from '../../components/Flex'
import useTour from '../../features/Tour/hooks/useTour'
import useMobileView from '../../hooks/useMobileView'
import useToggleValue from '../../hooks/useToggleValue'
import useUpdateEffect from '../../hooks/useUpdateEffect'
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
  const setSidebarState = useSetRecoilState(sidebarState)
  const { pathname } = useLocation()
  const { data: userTour, isLoading } = useUserTourQuery()
  const { start: startTour } = useTour()

  useEffect(() => {
    if (
      !isLoading &&
      (userTour ? !userTour.started && !userTour.completed : true) &&
      (variant === 'permanent' || (variant === 'temporary' && open))
    ) {
      startTour()
    }
  }, [isLoading, userTour, variant, startTour, open])

  useUpdateEffect(() => {
    setSidebarState(false)
  }, [setSidebarState, pathname])

  return (
    <Flex pt={8}>
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
    </Flex>
  )
}

export default Sidebar
