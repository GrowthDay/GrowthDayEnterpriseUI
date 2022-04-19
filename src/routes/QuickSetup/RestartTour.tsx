import { ChevronRightOutlined } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Card, CardContent, Collapse, styled, Typography } from '@mui/material'
import React, { FC } from 'react'
import { useSetRecoilState } from 'recoil'
import useUserTourQuery from '../../api/queries/useUserTourQuery'
import dot from '../../assets/images/EnterpriseTourDot.gif'
import icon from '../../assets/images/EnterpriseTourIcon.png'
import CloseButton from '../../components/CloseButton'
import Flex from '../../components/Flex'
import useTourActions from '../../features/Tour/hooks/useTourActions'
import tourState from '../../recoil/atoms/tourState'

const IconImage = styled('img')(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8)
}))

const DotImage = styled('img')(({ theme }) => ({
  width: theme.spacing(5),
  height: theme.spacing(5),
  margin: theme.spacing(-1, 0)
}))

const RestartTour: FC = () => {
  const { data: userTour } = useUserTourQuery()
  const { update: updateTour, isLoading } = useTourActions()
  const setOpenState = useSetRecoilState(tourState)
  const open = Boolean(userTour && !userTour.completed && userTour.started)

  const handleTourEnd = () => updateTour('complete', 100)

  return (
    <Collapse in={open}>
      <Card sx={{ mb: 4 }}>
        <CardContent sx={{ position: 'relative' }}>
          <CloseButton onClick={handleTourEnd} />
          <Flex>
            <IconImage src={icon} alt="" />
            <Box ml={2} flex={1}>
              <Typography variant="caption" color="text.disabled">
                Enterprise orientation
              </Typography>
              <Typography gutterBottom fontWeight={600}>
                Learn about GrowthDay Enterprise by taking a quick product tour
              </Typography>
              <LoadingButton
                loading={isLoading}
                onClick={() => setOpenState(true)}
                sx={{ borderRadius: 1 }}
                startIcon={<DotImage src={dot} alt="" />}
                endIcon={<ChevronRightOutlined />}
                variant="text"
              >
                Start tour
              </LoadingButton>
            </Box>
          </Flex>
        </CardContent>
      </Card>
    </Collapse>
  )
}

export default RestartTour
