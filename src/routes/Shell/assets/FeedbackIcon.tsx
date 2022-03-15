import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'

const FeedbackIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} sx={{ fill: 'inherit', stroke: 'none' }} viewBox="0 0 24 24">
    <path d="M12 15.3871C11.3765 15.3871 10.871 15.8926 10.871 16.5161C10.871 17.1397 11.3765 17.6452 12 17.6452C12.6235 17.6452 13.129 17.1397 13.129 16.5161C13.129 15.8926 12.6235 15.3871 12 15.3871ZM12.3093 14.4194H11.6641C11.3969 14.4194 11.1802 14.2027 11.1802 13.9355V13.9201C11.1802 11.0837 14.3028 11.3548 14.3028 9.58915C14.3028 8.78206 13.5867 7.96774 11.9867 7.96774C10.8115 7.96774 10.2018 8.35681 9.59915 9.12468C9.44157 9.32548 9.15343 9.36641 8.94399 9.22048L8.41439 8.85153C8.18758 8.69351 8.13778 8.37689 8.30774 8.15891C9.16363 7.06105 10.1791 6.35484 11.9867 6.35484C14.0964 6.35484 15.9157 7.55448 15.9157 9.58915C15.9157 12.3075 12.7931 12.1637 12.7931 13.9201V13.9355C12.7931 14.2027 12.5765 14.4194 12.3093 14.4194ZM12 3.29032C16.7831 3.29032 20.7097 7.16431 20.7097 12C20.7097 16.8101 16.8141 20.7097 12 20.7097C7.19177 20.7097 3.29032 16.816 3.29032 12C3.29032 7.19343 7.18556 3.29032 12 3.29032ZM12 2C6.47754 2 2 6.47915 2 12C2 17.5241 6.47754 22 12 22C17.5225 22 22 17.5241 22 12C22 6.47915 17.5225 2 12 2Z" />
  </SvgIcon>
)

export default FeedbackIcon
