import { Box, Card, CardContent, CardHeader, Container } from '@mui/material'
import classNames from 'classnames'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import GrowthDayBackground from '../../components/GrowthDayBackground'
import useAuthOrganization from '../../hooks/useAuthOrganization'
import Header from '../Shell/Header'
import Footer from './Footer'
import steps from './steps'

const Setup: FC = () => {
  const navigate = useNavigate()
  const organization = useAuthOrganization()
  const [activeStep, setActiveStep] = useState(0)
  const handleNext = useCallback(() => setActiveStep((active) => active + 1), [])
  const refs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    if (activeStep >= steps.length) {
      navigate('/')
    }
  }, [navigate, activeStep])

  useEffect(() => {
    const el = refs.current[activeStep]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' })
    }
  }, [activeStep])

  useEffect(() => {
    if (organization) {
      if (organization?.seats) {
        setActiveStep(2)
      } else {
        setActiveStep(1)
      }
    }
  }, [activeStep, organization])

  return (
    <>
      <GrowthDayBackground />
      <Header setupMode />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box py={{ xs: 0, sm: 4 }}>
          {steps.map(({ label, description, component: Component }, index) => {
            const active = index === activeStep
            return (
              <Card
                ref={(ref) => (refs.current[index] = ref)}
                className={classNames({
                  disabled: !active
                })}
                sx={{ my: 4 }}
                key={index}
              >
                <CardHeader
                  title={label}
                  subheader={description}
                  titleTypographyProps={{ variant: 'h6', fontWeight: 600, mb: 1 }}
                  subheaderTypographyProps={{ variant: 'body2', color: 'textPrimary' }}
                />
                <CardContent sx={{ py: 1 }}>
                  <Component next={handleNext} active={active} />
                </CardContent>
              </Card>
            )
          })}
        </Box>
      </Container>
      <Footer activeStep={activeStep} />
    </>
  )
}

export default Setup
