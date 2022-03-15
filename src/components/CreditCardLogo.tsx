import { styled } from '@mui/material'
import { ComponentProps, FC } from 'react'
import amexCard from '../assets/images/credit-cards/card-logo-amex.svg'
import masterCard from '../assets/images/credit-cards/card-logo-mastercard.svg'

import unknownCard from '../assets/images/credit-cards/card-logo-unknown.svg'
import visaCard from '../assets/images/credit-cards/card-logo-visa.svg'
import coerceArray from '../utils/coerceArray'

const Image = styled('img')({})

export type CreditCardLogoProps = ComponentProps<typeof Image> & {
  type: 'visa' | 'mastercard' | 'amex' | string
  size?: number
}

const logoMap: Record<CreditCardLogoProps['type'], string> = {
  amex: amexCard,
  mastercard: masterCard,
  visa: visaCard
}

const CreditCardLogo: FC<CreditCardLogoProps> = ({ size = 4, type, ...props }) => {
  const source = logoMap[type] || unknownCard
  return (
    <Image
      src={source}
      alt={type}
      {...props}
      sx={[{ width: (theme) => theme.spacing(size) }, ...coerceArray(props.sx)]}
    />
  )
}

export default CreditCardLogo
