import { SvgIcon, SvgIconProps, Theme, useTheme } from '@mui/material'
import { FC } from 'react'

const ReportIconActive: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} sx={{ fill: 'inherit', stroke: 'none' }} viewBox="0 0 24 24">
    <path d="M16.7561 3H8.41463C6.07317 3 4.17073 4.91803 4.17073 7.27869V7.57377H3.58537C3.29268 7.57377 3 7.86885 3 8.16393C3 8.45902 3.29268 8.7541 3.58537 8.7541H4.17073V10.8934H3.58537C3.29268 10.8934 3 11.1885 3 11.4836C3 11.7787 3.29268 12.0738 3.58537 12.0738H4.17073V14.3607H3.58537C3.29268 14.3607 3 14.6557 3 14.9508C3 15.2459 3.29268 15.541 3.58537 15.541H4.17073V16.7213C4.17073 19.082 6.07317 21 8.41463 21H16.7561C19.0976 21 21 19.082 21 16.7213V7.27869C21 4.91803 19.0976 3 16.7561 3ZM16.7561 12.0738H12.2195C11.9268 12.0738 11.6341 11.7787 11.6341 11.4836C11.6341 11.1885 11.9268 10.8934 12.2195 10.8934H16.7561C17.0488 10.8934 17.3415 11.1885 17.3415 11.4836C17.3415 11.7787 17.0488 12.0738 16.7561 12.0738ZM16.7561 9.27049H12.2195C11.9268 9.27049 11.6341 8.97541 11.6341 8.68033C11.6341 8.38525 11.9268 8.09016 12.2195 8.09016H16.7561C17.0488 8.09016 17.3415 8.38525 17.3415 8.68033C17.3415 8.97541 17.0488 9.27049 16.7561 9.27049ZM5.41463 16.7213V15.541H6C6.29268 15.541 6.58537 15.2459 6.58537 14.9508C6.58537 14.6557 6.29268 14.3607 6 14.3607H5.41463V12.0738H6C6.29268 12.0738 6.58537 11.7787 6.58537 11.4836C6.58537 11.1885 6.29268 10.8934 6 10.8934H5.41463V8.7541H6C6.29268 8.7541 6.58537 8.45902 6.58537 8.16393C6.58537 7.86885 6.29268 7.57377 6 7.57377H5.41463V7.27869C5.41463 5.72951 6.58537 4.40164 8.04878 4.2541V19.8197C6.5122 19.5984 5.41463 18.3443 5.41463 16.7213Z" />
  </SvgIcon>
)

export default ReportIconActive
