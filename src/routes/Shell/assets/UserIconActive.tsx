import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'

const UserIconActive: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} sx={{ fill: 'inherit', stroke: 'none' }} viewBox="0 0 24 24">
    <circle cx={12} cy={7} r={3.5} />
    <circle cx={18.5} cy={8} r={2.5} />
    <circle cx={5.5} cy={8} r={2.5} />
    <path d="M7 15.5C7 12.7386 9.23858 10.5 12 10.5C14.7614 10.5 17 12.7386 17 15.5V18C17 19.3807 15.8807 20.5 14.5 20.5H9.5C8.11929 20.5 7 19.3807 7 18V15.5Z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.59875 11.4221C6.60655 12.4925 6 13.9254 6 15.5V18.5C6 18.8506 6.06015 19.1872 6.17071 19.5H3.625C2.45139 19.5 1.5 18.5486 1.5 17.375V15.25C1.5 12.9028 3.40279 11 5.75 11C6.4126 11 7.03979 11.1516 7.59875 11.4221ZM17.8293 19.5C17.9398 19.1872 18 18.8506 18 18.5V15.5C18 13.9254 17.3934 12.4925 16.4013 11.4221C16.9602 11.1516 17.5874 11 18.25 11C20.5972 11 22.5 12.9028 22.5 15.25V17.375C22.5 18.5486 21.5486 19.5 20.375 19.5H17.8293Z"
    />
  </SvgIcon>
)

export default UserIconActive
