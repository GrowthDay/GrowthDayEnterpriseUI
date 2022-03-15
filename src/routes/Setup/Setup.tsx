import { Box, Card, CardContent, CardHeader, Container } from '@mui/material'
import classNames from 'classnames'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import useMyProfileApi from '../../api/useMyProfileApi'
import GrowthDayBackground from '../../components/GrowthDayBackground'
import Loading from '../../components/Loading'
import Header from '../Shell/Header'
import Footer from './Footer'
import steps from './steps'

const Setup: FC = () => {
  const { data: user, isLoading, isFetchedAfterMount } = useMyProfileApi({ enabled: true })
  const [activeStep, setActiveStep] = useState(0)
  const handleNext = useCallback(() => setActiveStep((active) => active + 1), [])
  const refs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    const el = refs.current[activeStep]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'center' })
    }
  }, [activeStep])

  useEffect(() => {
    if (user && activeStep === 0) {
      handleNext()
    }
  }, [activeStep, user, handleNext])

  return (
    <>
      <GrowthDayBackground />
      <Header setupMode />
      <Container maxWidth="sm" sx={{ py: 8 }}>
        <Box py={4}>
          {isLoading && !isFetchedAfterMount ? (
            <Loading />
          ) : (
            steps.map(({ label, description, component: Component }, index) => {
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
                    <Component next={handleNext} user={user} active={active} />
                  </CardContent>
                </Card>
              )
            })
          )}
        </Box>
      </Container>
      {!isLoading && <Footer activeStep={activeStep} />}
    </>
  )
}

export default Setup
