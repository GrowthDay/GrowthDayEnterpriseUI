import { Breakpoint, Theme, useMediaQuery } from '@mui/material'

const useMobileView = (key: number | Breakpoint = 'sm') => useMediaQuery((theme: Theme) => theme.breakpoints.down(key))

export default useMobileView
