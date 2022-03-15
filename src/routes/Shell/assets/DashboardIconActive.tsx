import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'

const DashboardIconActive: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} sx={{ fill: 'inherit', stroke: 'none' }} viewBox="0 0 24 24">
    <rect x={3} y={11} width={7.5} height={10} rx={1} />
    <rect x={13.5} y={16} width={7.5} height={5} rx={1} />
    <rect x={13.5} y={3} width={7.5} height={10} rx={1} />
    <rect x={3} y={3} width={7.5} height={5} rx={1} />
  </SvgIcon>
)

export default DashboardIconActive
