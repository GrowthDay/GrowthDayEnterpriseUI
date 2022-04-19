import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'

const QuickSetupIconActive: FC<SvgIconProps> = (props) => (
  <SvgIcon {...props} sx={{ fill: 'inherit', stroke: 'none' }} viewBox="0 0 15 24">
    <path d="M14.9346 9.24157C14.8908 9.16426 14.8271 9.09995 14.7503 9.05521C14.6734 9.01048 14.586 8.9869 14.4971 8.9869H7.9089L9.01342 0.55791C9.02528 0.445101 8.99877 0.331591 8.93818 0.235656C8.87759 0.13972 8.78644 0.0669424 8.6794 0.0290396C8.57236 -0.00886319 8.45567 -0.00968517 8.3481 0.026706C8.24054 0.0630972 8.14837 0.134584 8.08643 0.229656L0.0744956 14.2491C0.0276441 14.3252 0.001966 14.4125 0.000108466 14.5018C-0.00174907 14.5911 0.0202812 14.6793 0.0639282 14.7573C0.107575 14.8353 0.171259 14.9002 0.248413 14.9454C0.325567 14.9907 0.413399 15.0145 0.502853 15.0145H6.99259L6.11726 23.4562C6.10866 23.5686 6.13795 23.6807 6.20047 23.7745C6.26299 23.8684 6.35515 23.9387 6.46228 23.9743C6.56941 24.0098 6.68537 24.0085 6.79169 23.9706C6.89802 23.9328 6.9886 23.8605 7.04904 23.7652L14.9286 9.74726C14.9743 9.67103 14.9989 9.58406 15 9.49523C15.001 9.40639 14.9785 9.31886 14.9346 9.24157Z" />
  </SvgIcon>
)

export default QuickSetupIconActive
