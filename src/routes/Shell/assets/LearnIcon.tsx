import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'

const LearnIcon: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} sx={{ fill: 'inherit', stroke: 'none' }} viewBox="0 0 24 24">
    <path d="M12 20.5C7.29464 20.5 3.5 16.7054 3.5 12C3.5 7.29464 7.29464 3.5 12 3.5C16.7054 3.5 20.5 7.29464 20.5 12C20.5 16.7054 16.7054 20.5 12 20.5ZM12 4.71429C7.97768 4.71429 4.71429 7.97768 4.71429 12C4.71429 16.0223 7.97768 19.2857 12 19.2857C16.0223 19.2857 19.2857 16.0223 19.2857 12C19.2857 7.97768 16.0223 4.71429 12 4.71429Z" />
    <path d="M9.87504 15.7947C9.79915 15.7947 9.64736 15.7947 9.57147 15.7188C9.34379 15.6429 9.2679 15.4152 9.2679 15.1875V8.88842C9.2679 8.66074 9.41969 8.43306 9.57147 8.35717C9.79915 8.28128 10.0268 8.28128 10.1786 8.35717L15.6429 11.4688C15.8706 11.5447 15.9465 11.7723 15.9465 12C15.9465 12.2277 15.8706 12.4554 15.6429 12.5313L10.1786 15.6429C10.1027 15.7188 10.0268 15.7947 9.87504 15.7947ZM10.4822 9.95092V14.125L14.0492 12.0759L10.4822 9.95092Z" />
  </SvgIcon>
)

export default LearnIcon
