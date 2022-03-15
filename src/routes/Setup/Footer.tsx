import { LoadingButton } from '@mui/lab'
import { AppBar, Step, StepIcon, StepLabel, Stepper, styled, Toolbar } from '@mui/material'
import { FC, useCallback, useEffect, useRef } from 'react'
import { useRecoilValue } from 'recoil'
import useWindowSize from '../../hooks/useWindowSize'
import checkoutLoadingState from '../../recoil/atoms/checkoutLoadingState'
import steps from './steps'

export type FooterProps = {
  activeStep: number
}

const StyledStepIcon = styled(StepIcon)(({ theme: { palette, spacing } }) => ({
  color: 'transparent',
  width: spacing(3.5),
  height: spacing(3.5),
  marginRight: spacing(0.5),
  overflow: 'visible',
  '&.Mui-active': {
    color: 'transparent',
    circle: {
      stroke: palette.secondary.main
    }
  },
  '&.Mui-completed': {
    color: palette.secondary.main
  },
  circle: {
    strokeWidth: 1,
    stroke: palette.divider
  },
  '.MuiStepIcon-text': {
    fontSize: '0.65rem',
    fill: palette.text.secondary,
    '&.Mui-active': {
      fill: palette.text.primary
    }
  }
}))

const Footer: FC<FooterProps> = ({ activeStep }) => {
  const loading = useRecoilValue(checkoutLoadingState)
  const refs = useRef<Record<number, HTMLDivElement | null>>({})
  const { width } = useWindowSize()

  const scrollToTab = useCallback(() => {
    const el = refs.current[activeStep]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' })
    }
  }, [activeStep])

  useEffect(() => {
    scrollToTab()
  }, [activeStep, scrollToTab, width])

  return (
    <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Stepper className="hide-scrollbar" sx={{ mr: 4, overflowX: 'auto', height: '100%' }} activeStep={activeStep}>
          {steps.map(({ label }, index) => (
            <Step
              ref={(ref) => (refs.current[index] = ref as HTMLDivElement)}
              key={index}
              sx={{ mx: 2, whiteSpace: 'nowrap' }}
            >
              <StepLabel StepIconComponent={StyledStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <LoadingButton
          loading={loading}
          variant="contained"
          type="submit"
          form="signup-checkout-form"
          sx={{ flexShrink: 0 }}
          disabled={activeStep + 1 < steps.length}
        >
          Checkout
        </LoadingButton>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
