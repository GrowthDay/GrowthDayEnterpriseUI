import { SvgIcon, SvgIconProps, Theme, useTheme } from '@mui/material'
import { FC } from 'react'

const DashboardIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} sx={{ fill: 'none', stroke: 'inherit' }} viewBox="0 0 24 24">
    <rect x={3} y={12} width={7} height={9} rx={1} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={3} y={3} width={7} height={5} rx={1} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={14} y={16} width={7} height={5} rx={1} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={14} y={3} width={7} height={9} rx={1} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
  </SvgIcon>
)

export default DashboardIcon
